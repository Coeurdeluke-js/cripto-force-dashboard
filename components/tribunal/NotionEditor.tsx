'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Plus, Type, List, CheckSquare, Image, Video, Link, Code, Quote, Minus } from 'lucide-react';
import NotionBlock from './NotionBlock';

interface Block {
  id: string;
  type: 'text' | 'heading' | 'subheading' | 'list' | 'checklist' | 'image' | 'video' | 'link' | 'code' | 'quote' | 'divider';
  content: string;
  metadata?: any;
  order: number;
}

// Función para convertir bloques del NotionEditor a ContentBlock del sistema
const convertBlockToContentBlock = (block: Block): any => {
  const baseBlock = {
    id: block.id,
    order: block.order,
    metadata: block.metadata || {}
  };

  switch (block.type) {
    case 'heading':
      return {
        ...baseBlock,
        type: 'text',
        content: block.content,
        metadata: {
          ...block.metadata,
          isHeading: true
        }
      };
    case 'subheading':
      return {
        ...baseBlock,
        type: 'text',
        content: block.content,
        metadata: {
          ...block.metadata,
          isSubheading: true
        }
      };
    case 'list':
      return {
        ...baseBlock,
        type: 'text',
        content: block.content,
        metadata: {
          ...block.metadata,
          isList: true
        }
      };
    case 'checklist':
      return {
        ...baseBlock,
        type: 'checklist',
        content: block.content
      };
    case 'image':
      return {
        ...baseBlock,
        type: 'image',
        content: block.content
      };
    case 'video':
      return {
        ...baseBlock,
        type: 'video',
        content: block.content
      };
    case 'link':
      return {
        ...baseBlock,
        type: 'link',
        content: block.content
      };
    case 'code':
      return {
        ...baseBlock,
        type: 'code',
        content: block.content
      };
    case 'quote':
      return {
        ...baseBlock,
        type: 'quote',
        content: block.content
      };
    case 'divider':
      return {
        ...baseBlock,
        type: 'divider',
        content: block.content
      };
    default:
      return {
        ...baseBlock,
        type: 'text',
        content: block.content
      };
  }
};

interface NotionEditorProps {
  initialBlocks?: Block[];
  onBlocksChange?: (blocks: Block[]) => void;
  onSave?: (blocks: any[], metadata: ProposalMetadata) => void;
  readOnly?: boolean;
}

interface ProposalMetadata {
  title: string;
  description: string;
  category: 'theoretical' | 'practical' | 'checkpoint';
  targetHierarchy: number;
}

const blockTypeOptions = [
  { type: 'heading', icon: Type, label: 'Título', description: 'Título principal grande' },
  { type: 'subheading', icon: Type, label: 'Subtítulo', description: 'Subtítulo mediano' },
  { type: 'text', icon: Type, label: 'Texto', description: 'Párrafo simple' },
  { type: 'list', icon: List, label: 'Lista', description: 'Lista con viñetas' },
  { type: 'checklist', icon: CheckSquare, label: 'Checklist', description: 'Lista de tareas' },
  { type: 'image', icon: Image, label: 'Imagen', description: 'Insertar imagen' },
  { type: 'video', icon: Video, label: 'Video', description: 'Insertar video' },
  { type: 'link', icon: Link, label: 'Enlace', description: 'Enlace externo' },
  { type: 'code', icon: Code, label: 'Código', description: 'Bloque de código' },
  { type: 'quote', icon: Quote, label: 'Cita', description: 'Cita destacada' },
  { type: 'divider', icon: Minus, label: 'Separador', description: 'Línea divisoria' },
];

export default function NotionEditor({
  initialBlocks = [],
  onBlocksChange,
  onSave,
  readOnly = false,
  isEditing = false,
  onUpdate
}: NotionEditorProps & {
  isEditing?: boolean;
  onUpdate?: (blocks: any[], metadata: ProposalMetadata) => void;
}) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<Block | null>(null);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [slashMenuFilter, setSlashMenuFilter] = useState('');
  const [showConfigModal, setShowConfigModal] = useState(false);
     const [proposalMetadata, setProposalMetadata] = useState<ProposalMetadata>({
     title: '',
     description: '',
     category: 'theoretical',
     targetHierarchy: 2, // Acólito por defecto (Nivel 2)
   });
  const editorRef = useRef<HTMLDivElement>(null);
  const slashMenuRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Autosave con debounce
  useEffect(() => {
    if (onBlocksChange) {
      const timeoutId = setTimeout(() => {
        onBlocksChange(blocks);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [blocks, onBlocksChange]);

  // Generar ID único
  const generateId = () => `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Crear nuevo bloque
  const createBlock = (type: string, content: string = '', metadata?: any): Block => ({
    id: generateId(),
    type: type as Block['type'],
    content,
    metadata,
    order: blocks.length,
  });

  // Agregar bloque
  const addBlock = (afterId: string, type: string) => {
    const afterIndex = blocks.findIndex(b => b.id === afterId);
    const newBlock = createBlock(type);
    
    const newBlocks = [...blocks];
    newBlocks.splice(afterIndex + 1, 0, newBlock);
    
    // Reordenar
    newBlocks.forEach((block, index) => {
      block.order = index;
    });
    
    setBlocks(newBlocks);
    setSelectedBlockId(newBlock.id);
    setShowBlockMenu(false);
  };

  // Actualizar bloque
  const updateBlock = (id: string, content: string, metadata?: any) => {
    setBlocks(prev => prev.map(block => 
      block.id === id 
        ? { ...block, content, metadata: { ...block.metadata, ...metadata } }
        : block
    ));
  };

     // Eliminar bloque
   const deleteBlock = (id: string) => {
     const blockToDelete = blocks.find(b => b.id === id);
     
     // No permitir eliminar bloques obligatorios si son los únicos de su tipo
     if (blockToDelete?.type === 'heading' && blocks.filter(b => b.type === 'heading').length <= 1) {
       alert('No puedes eliminar el único bloque de título. Debes tener al menos uno.');
       return;
     }
     
     if (blockToDelete?.type === 'subheading' && blocks.filter(b => b.type === 'subheading').length <= 1) {
       alert('No puedes eliminar el único bloque de subtítulo. Debes tener al menos uno.');
       return;
     }
     
     if (blocks.length <= 2) return; // Mantener al menos título y subtítulo
     
     setBlocks(prev => {
       const newBlocks = prev.filter(block => block.id !== id);
       // Reordenar
       newBlocks.forEach((block, index) => {
         block.order = index;
       });
       return newBlocks;
     });
     
     setSelectedBlockId(null);
   };

  // Duplicar bloque
  const duplicateBlock = (id: string) => {
    const blockToDuplicate = blocks.find(b => b.id === id);
    if (!blockToDuplicate) return;
    
    const newBlock = createBlock(
      blockToDuplicate.type,
      blockToDuplicate.content,
      blockToDuplicate.metadata
    );
    
    const blockIndex = blocks.findIndex(b => b.id === id);
    const newBlocks = [...blocks];
    newBlocks.splice(blockIndex + 1, 0, newBlock);
    
    // Reordenar
    newBlocks.forEach((block, index) => {
      block.order = index;
    });
    
    setBlocks(newBlocks);
    setSelectedBlockId(newBlock.id);
  };

  // Mover bloque
  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const currentIndex = blocks.findIndex(b => b.id === id);
    if (currentIndex === -1) return;
    
    let newIndex: number;
    if (direction === 'up' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'down' && currentIndex < blocks.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      return;
    }
    
    const newBlocks = [...blocks];
    [newBlocks[currentIndex], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[currentIndex]];
    
    // Reordenar
    newBlocks.forEach((block, index) => {
      block.order = index;
    });
    
    setBlocks(newBlocks);
  };

     // Cambiar tipo de bloque
   const changeBlockType = (id: string, newType: string) => {
     const blockToChange = blocks.find(b => b.id === id);
     
     // No permitir cambiar el tipo de bloques obligatorios si son los únicos de su tipo
     if (blockToChange?.type === 'heading' && blocks.filter(b => b.type === 'heading').length <= 1 && newType !== 'heading') {
       alert('No puedes cambiar el tipo del único bloque de título. Debes mantener al menos uno.');
       return;
     }
     
     if (blockToChange?.type === 'subheading' && blocks.filter(b => b.type === 'subheading').length <= 1 && newType !== 'subheading') {
       alert('No puedes cambiar el tipo del único bloque de subtítulo. Debes mantener al menos uno.');
       return;
     }
     
     setBlocks(prev => prev.map(block => 
       block.id === id 
         ? { ...block, type: newType as Block['type'] }
         : block
     ));
   };

  // Drag & Drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedBlock = blocks.find(block => block.id === active.id);
    setDraggedBlock(draggedBlock || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedBlock(null);

    if (active.id !== over?.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newBlocks = arrayMove(items, oldIndex, newIndex);
        
        // Reordenar
        newBlocks.forEach((block, index) => {
          block.order = index;
        });
        
        return newBlocks;
      });
    }
  };

  // Slash menu
  const handleSlashKey = (e: React.KeyboardEvent) => {
    if (e.key === '/' && !showSlashMenu) {
      e.preventDefault();
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSlashMenuPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom + window.scrollY
        });
        setShowSlashMenu(true);
        setSlashMenuFilter('');
      }
    }
  };

  // Filtrar opciones del slash menu
  const filteredBlockOptions = blockTypeOptions.filter(option =>
    option.label.toLowerCase().includes(slashMenuFilter.toLowerCase()) ||
    option.description.toLowerCase().includes(slashMenuFilter.toLowerCase())
  );

  // Agregar bloque desde slash menu
  const addBlockFromSlash = (type: string) => {
    if (selectedBlockId) {
      addBlock(selectedBlockId, type);
    } else {
      const newBlock = createBlock(type);
      setBlocks(prev => [...prev, newBlock]);
      setSelectedBlockId(newBlock.id);
    }
    setShowSlashMenu(false);
  };

  // Click fuera del slash menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (slashMenuRef.current && !slashMenuRef.current.contains(event.target as Node)) {
        setShowSlashMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

     // Inicializar con bloques obligatorios si no hay ninguno
   useEffect(() => {
     if (blocks.length === 0) {
       const titleBlock = createBlock('heading', 'Título de la propuesta');
       const subtitleBlock = createBlock('subheading', 'Subtítulo de la propuesta');
       const initialBlocks = [titleBlock, subtitleBlock];
       setBlocks(initialBlocks);
       setSelectedBlockId(titleBlock.id);
     }
   }, []);

     // Solo sugerir título y descripción si están vacíos
   useEffect(() => {
     if (!proposalMetadata.title && !proposalMetadata.description) {
       const titleBlock = blocks.find(b => b.type === 'heading');
       const subtitleBlock = blocks.find(b => b.type === 'subheading');
       
       setProposalMetadata(prev => ({
         ...prev,
         title: titleBlock?.content || '',
         description: subtitleBlock?.content || '',
       }));
     }
   }, [blocks, proposalMetadata.title, proposalMetadata.description]);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-3xl mx-auto py-8 px-4">
                 {/* Header del editor */}
         <div className="mb-8 text-center">
           <h1 className="text-3xl font-bold text-[#FFD447] mb-2">
             Tribunal Imperial
           </h1>
           <p className="text-gray-400">
             {isEditing ? 'Editando propuesta existente' : 'Editor de contenido estilo Notion para el sistema de aprobación'}
           </p>
           {isEditing && (
             <div className="mt-2 p-2 bg-blue-900/20 border border-blue-500 rounded-lg">
               <span className="text-blue-300 text-sm">✏️ Modo edición activo</span>
             </div>
           )}
         </div>

        {/* Editor principal */}
        <div
          ref={editorRef}
          className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6 min-h-[600px]"
          onKeyDown={handleSlashKey}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={blocks.map(block => block.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {blocks.map((block) => (
                  <NotionBlock
                    key={block.id}
                    id={block.id}
                    type={block.type}
                    content={block.content}
                    metadata={block.metadata}
                    isSelected={selectedBlockId === block.id}
                    onSelect={setSelectedBlockId}
                    onUpdate={updateBlock}
                    onDelete={deleteBlock}
                    onDuplicate={duplicateBlock}
                    onMove={moveBlock}
                    onTypeChange={changeBlockType}
                    onAddBlock={addBlock}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay>
              {draggedBlock ? (
                <div className="bg-[#2a2a2a] border border-[#FFD447] rounded-lg p-4 shadow-2xl opacity-90">
                  <div className="text-[#FFD447] font-medium">
                    {draggedBlock.content || 'Bloque vacío'}
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

          {/* Botón flotante para agregar bloque */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowBlockMenu(!showBlockMenu)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-[#FFD447] text-[#1a1a1a] rounded-lg hover:bg-[#FFC437] transition-colors font-medium"
            >
              <Plus size={16} />
              <span>Agregar bloque</span>
            </button>
          </div>

          {/* Menú de tipos de bloque */}
          {showBlockMenu && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#1a1a1a] border border-[#444] rounded-lg shadow-2xl max-w-md w-full mx-4">
                <div className="p-4 border-b border-[#444]">
                  <h3 className="text-lg font-semibold text-white">Seleccionar tipo de bloque</h3>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-2">
                    {blockTypeOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <button
                          key={option.type}
                          onClick={() => {
                            if (selectedBlockId) {
                              addBlock(selectedBlockId, option.type);
                            } else {
                              const newBlock = createBlock(option.type);
                              setBlocks(prev => [...prev, newBlock]);
                              setSelectedBlockId(newBlock.id);
                            }
                            setShowBlockMenu(false);
                          }}
                          className="flex items-center space-x-3 p-3 text-left hover:bg-[#2a2a2a] rounded-lg transition-colors group"
                        >
                          <div className="p-2 bg-[#333] rounded group-hover:bg-[#FFD447] group-hover:text-[#1a1a1a] transition-colors">
                            <IconComponent size={16} />
                          </div>
                          <div>
                            <div className="font-medium text-white">{option.label}</div>
                            <div className="text-sm text-gray-400">{option.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Slash menu */}
        {showSlashMenu && (
          <div
            ref={slashMenuRef}
            className="fixed z-50 bg-[#1a1a1a] border border-[#444] rounded-lg shadow-2xl max-w-sm w-full"
            style={{
              left: slashMenuPosition.x - 150,
              top: slashMenuPosition.y + 10,
            }}
          >
            <div className="p-3 border-b border-[#444]">
              <input
                type="text"
                value={slashMenuFilter}
                onChange={(e) => setSlashMenuFilter(e.target.value)}
                placeholder="Buscar tipo de bloque..."
                className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400"
                autoFocus
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filteredBlockOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.type}
                    onClick={() => addBlockFromSlash(option.type)}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-[#2a2a2a] transition-colors"
                  >
                    <div className="p-2 bg-[#333] rounded">
                      <IconComponent size={16} className="text-[#FFD447]" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{option.label}</div>
                      <div className="text-sm text-gray-400">{option.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Barra de herramientas flotante */}
        {selectedBlockId && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#444] rounded-lg shadow-2xl p-2 z-40">
            <div className="flex items-center space-x-2">
              {/* Botón de Guardar con ícono de diskette */}
              <button
                onClick={() => setShowConfigModal(true)}
                className="group relative overflow-hidden p-3 text-[#FFD447] hover:text-[#FFC437] transition-all duration-300 ease-out bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg border border-transparent hover:border-[#FFD447]/30 min-w-[40px]"
                title="Configurar y Guardar"
              >
                {/* Ícono de diskette */}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <path d="M14 2v6h6"/>
                  <path d="M16 13H8"/>
                  <path d="M16 17H8"/>
                  <path d="M10 9H8"/>
                </svg>
                
                {/* Descripción que aparece dentro del botón */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#FFD447] text-[#1a1a1a] font-medium text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform scale-95 group-hover:scale-100">
                  <span className="whitespace-nowrap text-center">Guardar</span>
                </div>
              </button>
              
              {/* Botón de Deseleccionar */}
              <button
                onClick={() => setSelectedBlockId(null)}
                className="group relative overflow-hidden p-3 text-gray-400 hover:text-white transition-all duration-300 ease-out bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg border border-transparent hover:border-gray-400/30 min-w-[40px]"
                title="Deseleccionar"
              >
                {/* Ícono X */}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
                
                {/* Descripción que aparece dentro del botón */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-400 text-[#1a1a1a] font-medium text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform scale-95 group-hover:scale-100">
                  <span className="whitespace-nowrap text-center">Deseleccionar</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Modal de Configuración */}
        {showConfigModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] border border-[#444] rounded-lg shadow-2xl max-w-md w-full mx-4">
              <div className="p-6">
                                 <h3 className="text-xl font-semibold text-white mb-4">Configurar Propuesta</h3>
                 
                                 <div className="space-y-4">
                  {/* Información automática */}
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">i</span>
                      </div>
                      <h4 className="text-blue-300 font-medium">Información Automática</h4>
                    </div>
                    <p className="text-blue-200 text-sm">
                      El título y descripción se obtienen automáticamente del primer bloque (Título) y segundo bloque (Subtítulo) del contenido.
                    </p>
                  </div>

                  {/* Categoría */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
                    <select
                      value={proposalMetadata.category}
                      onChange={(e) => setProposalMetadata(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white"
                    >
                      <option value="theoretical">Teórico</option>
                      <option value="practical">Práctico</option>
                      <option value="checkpoint">Punto de Control</option>
                    </select>
                  </div>

                  {/* Dashboard Destino */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Dashboard Destino</label>
                    <select
                      value={proposalMetadata.targetHierarchy}
                      onChange={(e) => setProposalMetadata(prev => ({ ...prev, targetHierarchy: parseInt(e.target.value) }))}
                      className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white"
                    >
                      <option value={1} className="flex items-center space-x-2">
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">1</span>
                          </div>
                          <span>Iniciado (Nivel 1)</span>
                        </span>
                      </option>
                      <option value={2} className="flex items-center space-x-2">
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">2</span>
                          </div>
                          <span>Acólito (Nivel 2)</span>
                        </span>
                      </option>
                      <option value={3} className="flex items-center space-x-2">
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">3</span>
                          </div>
                          <span>Warrior (Nivel 3)</span>
                        </span>
                      </option>
                      <option value={4} className="flex items-center space-x-2">
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">4</span>
                          </div>
                          <span>Lord (Nivel 4)</span>
                        </span>
                      </option>
                      <option value={5} className="flex items-center space-x-2">
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">5</span>
                          </div>
                          <span>Darth (Nivel 5)</span>
                        </span>
                      </option>
                      <option value={6} className="flex items-center space-x-2">
                        <span className="inline-flex items-center space-x-2">
                          <div className="w-5 h-5 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">6</span>
                          </div>
                          <span>Maestro (Nivel 6)</span>
                        </span>
                      </option>
                    </select>
                    
                    {/* Vista previa de la insignia seleccionada */}
                    <div className="mt-3 flex items-center space-x-3 p-3 bg-[#1a1a1a] border border-[#444] rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        proposalMetadata.targetHierarchy === 1 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                        proposalMetadata.targetHierarchy === 2 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                        proposalMetadata.targetHierarchy === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                        proposalMetadata.targetHierarchy === 4 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                        proposalMetadata.targetHierarchy === 5 ? 'bg-gradient-to-br from-red-500 to-red-700' :
                        'bg-gradient-to-br from-gray-500 to-gray-700'
                      }`}>
                        <span className="text-white text-sm font-bold">{proposalMetadata.targetHierarchy}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {proposalMetadata.targetHierarchy === 1 ? 'Iniciado' :
                           proposalMetadata.targetHierarchy === 2 ? 'Acólito' :
                           proposalMetadata.targetHierarchy === 3 ? 'Warrior' :
                           proposalMetadata.targetHierarchy === 4 ? 'Lord' :
                           proposalMetadata.targetHierarchy === 5 ? 'Darth' :
                           'Maestro'}
                        </div>
                        <div className="text-gray-400 text-sm">
                          Nivel {proposalMetadata.targetHierarchy}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowConfigModal(false)}
                    className="px-4 py-2 bg-[#333] text-white rounded hover:bg-[#444] transition-colors"
                  >
                    Cancelar
                  </button>
                                     <button
                     onClick={() => {
                       // Validar que existan los bloques obligatorios
                       const hasTitle = blocks.some(b => b.type === 'heading' && b.content.trim());
                       const hasSubtitle = blocks.some(b => b.type === 'subheading' && b.content.trim());
                       
                       if (!hasTitle) {
                         alert('Debes tener al menos un bloque de tipo "Título" con contenido.');
                         return;
                       }
                       
                       if (!hasSubtitle) {
                         alert('Debes tener al menos un bloque de tipo "Subtítulo" con contenido.');
                         return;
                       }
                       
                       // Obtener título y descripción automáticamente de los bloques
                       const titleBlock = blocks.find(b => b.type === 'heading');
                       const subtitleBlock = blocks.find(b => b.type === 'subheading');
                       
                       if (titleBlock && subtitleBlock) {
                         // Actualizar metadata con el contenido de los bloques
                         const updatedMetadata = {
                           ...proposalMetadata,
                           title: titleBlock.content.trim(),
                           description: subtitleBlock.content.trim()
                         };
                         
                         // Convertir bloques al formato del sistema
                         const convertedBlocks = blocks.map(convertBlockToContentBlock);
                         
                         if (isEditing && onUpdate) {
                           onUpdate(convertedBlocks, updatedMetadata);
                         } else if (onSave) {
                           onSave(convertedBlocks, updatedMetadata);
                         }
                         
                         setShowConfigModal(false);
                       } else {
                         alert('Error: No se pudieron obtener el título y subtítulo de los bloques.');
                       }
                     }}
                     className="px-4 py-2 bg-[#FFD447] text-[#1a1a1a] rounded hover:bg-[#FFC437] transition-colors font-medium"
                   >
                                           {isEditing ? 'Actualizar Propuesta' : 'Guardar Propuesta'}
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
