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
    case 'subheading':
      return {
        ...baseBlock,
        type: 'text',
        content: {
          text: block.content,
          isHeading: block.type === 'heading',
          isSubheading: block.type === 'subheading'
        }
      };
    case 'list':
      return {
        ...baseBlock,
        type: 'text',
        content: {
          text: block.content,
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
  readOnly = false
}: NotionEditorProps) {
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
    targetHierarchy: 6, // Acólito por defecto
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
    if (blocks.length <= 1) return; // No eliminar el último bloque
    
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

  // Inicializar con un bloque si no hay ninguno
  useEffect(() => {
    if (blocks.length === 0) {
      const initialBlock = createBlock('text', '');
      setBlocks([initialBlock]);
      setSelectedBlockId(initialBlock.id);
    }
  }, []);

  // Solo sugerir título y descripción si están vacíos
  useEffect(() => {
    if (!proposalMetadata.title && !proposalMetadata.description) {
      const titleBlock = blocks.find(b => b.type === 'heading');
      const textBlock = blocks.find(b => b.type === 'text');
      
      setProposalMetadata(prev => ({
        ...prev,
        title: titleBlock?.content || '',
        description: textBlock?.content || '',
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
            Editor de contenido estilo Notion para el sistema de aprobación
          </p>
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
              <button
                onClick={() => setShowConfigModal(true)}
                className="group relative p-2 text-[#FFD447] hover:text-[#FFC437] transition-colors"
                title="Configurar y Guardar"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-1v5.586l-2.293-2.293z"/>
                </svg>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#1a1a1a] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Configurar y Guardar
                </span>
              </button>
              <button
                onClick={() => setSelectedBlockId(null)}
                className="group relative p-2 text-gray-400 hover:text-white transition-colors"
                title="Deseleccionar"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#1a1a1a] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Deseleccionar
                </span>
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
                   {/* Título */}
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">
                       Título de la Propuesta 
                       <span className="text-xs text-gray-500 ml-2">(Independiente del contenido)</span>
                     </label>
                     <input
                       type="text"
                       value={proposalMetadata.title}
                       onChange={(e) => setProposalMetadata(prev => ({ ...prev, title: e.target.value }))}
                       className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white"
                       placeholder="Título único para la propuesta..."
                     />
                   </div>

                   {/* Descripción */}
                   <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">
                       Descripción de la Propuesta
                       <span className="text-xs text-gray-500 ml-2">(Independiente del contenido)</span>
                     </label>
                     <textarea
                       value={proposalMetadata.description}
                       onChange={(e) => setProposalMetadata(prev => ({ ...prev, description: e.target.value }))}
                       className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white resize-none"
                       rows={3}
                       placeholder="Descripción única de la propuesta..."
                     />
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
                      <option value={6}>Acólito (Nivel 6)</option>
                      <option value={5}>Iniciado (Nivel 5)</option>
                      <option value={4}>Aprendiz (Nivel 4)</option>
                      <option value={3}>Padawan (Nivel 3)</option>
                      <option value={2}>Caballero (Nivel 2)</option>
                      <option value={1}>Maestro (Nivel 1)</option>
                    </select>
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
                       if (proposalMetadata.title.trim() && proposalMetadata.description.trim()) {
                         // Convertir bloques al formato del sistema
                         const convertedBlocks = blocks.map(convertBlockToContentBlock);
                         onSave?.(convertedBlocks, proposalMetadata);
                         setShowConfigModal(false);
                       } else {
                         alert('Por favor completa el título y la descripción antes de guardar.');
                       }
                     }}
                    className="px-4 py-2 bg-[#FFD447] text-[#1a1a1a] rounded hover:bg-[#FFC437] transition-colors font-medium"
                  >
                    Guardar Propuesta
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
