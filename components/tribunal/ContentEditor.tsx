'use client';

import { useState, useRef, useCallback } from 'react';
import { Plus, X, Eye, Save, FileText, Image as ImageIcon, Video, Link, Code, Quote, Minus, CheckSquare, Upload, Bold, Italic, Underline, Type, Move, Maximize2 } from 'lucide-react';
import { ContentBlock } from '@/lib/tribunal/types';

interface ContentEditorProps {
  onSave: (content: ContentBlock[]) => void;
  onPreview: (content: ContentBlock[]) => void;
}

// Nueva paleta de colores basada en la identidad visual de Crypto Force
const HIERARCHY_LEVELS = [
  { id: 1, name: 'Iniciado', color: '#FAFAFA', bgColor: 'bg-gray-100/20', borderColor: 'border-gray-300/30', insignia: '/images/insignias/1-iniciados.png' },
  { id: 2, name: 'Acólito', color: '#FFD447', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-400/30', insignia: '/images/insignias/2-acolitos.png' },
  { id: 3, name: 'Warrior', color: '#3ED598', bgColor: 'bg-green-500/20', borderColor: 'border-green-400/30', insignia: '/images/insignias/3-warriors.png' },
  { id: 4, name: 'Lord', color: '#4671D5', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-400/30', insignia: '/images/insignias/4-lords.png' },
  { id: 5, name: 'Darth', color: '#EC4D58', bgColor: 'bg-red-500/20', borderColor: 'border-red-400/30', insignia: '/images/insignias/5-darths.png' },
  { id: 6, name: 'Maestro', color: '#8A8A8A', bgColor: 'bg-gray-500/20', borderColor: 'border-gray-400/30', insignia: '/images/insignias/6-maestros.png' }
];

// Configuración de tamaños de texto estándar
const TEXT_SIZES = [
  { value: 'text-xs', label: 'Muy Pequeño' },
  { value: 'text-sm', label: 'Pequeño' },
  { value: 'text-base', label: 'Normal' },
  { value: 'text-lg', label: 'Grande' },
  { value: 'text-xl', label: 'Muy Grande' },
  { value: 'text-2xl', label: 'Título' },
  { value: 'text-3xl', label: 'Título Principal' }
];

export default function ContentEditor({ onSave, onPreview }: ContentEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [moduleCategory, setModuleCategory] = useState<'theoretical' | 'practical'>('theoretical');
  const [targetHierarchy, setTargetHierarchy] = useState<number>(1);
  const [showPreview, setShowPreview] = useState(false);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [dragOverBlock, setDragOverBlock] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: '',
      order: blocks.length,
      metadata: {
        fontSize: 'text-base',
        isBold: false,
        isItalic: false,
        isUnderlined: false,
        width: type === 'image' ? '100%' : undefined,
        height: type === 'image' ? 'auto' : undefined
      }
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, content: string, metadata?: any) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content, ...(metadata && { metadata: { ...block.metadata, ...metadata } }) } : block
    ));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(block => block.id === id);
    if (index === -1) return;

    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    
    // Actualizar el orden
    newBlocks.forEach((block, idx) => {
      block.order = idx;
    });
    
    setBlocks(newBlocks);
  };

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlock(blockId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Timeout de seguridad para limpiar estados si algo sale mal
    setTimeout(() => {
      if (draggedBlock === blockId) {
        setDraggedBlock(null);
        setDragOverBlock(null);
      }
    }, 5000); // 5 segundos de timeout
    
    // Agregar efecto visual al cursor
    if (e.dataTransfer.setDragImage) {
      const dragImage = document.createElement('div');
      dragImage.innerHTML = '📄 Arrastrando...';
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-1000px';
      dragImage.style.left = '-1000px';
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      setTimeout(() => document.body.removeChild(dragImage), 0);
    }
  };

  const handleDragEnd = () => {
    // Limpiar estados cuando termina el arrastre
    setDraggedBlock(null);
    setDragOverBlock(null);
  };

  const handleDragOver = (e: React.DragEvent, blockId: string) => {
    e.preventDefault();
    if (draggedBlock && draggedBlock !== blockId) {
      setDragOverBlock(blockId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Solo limpiar si realmente salimos del elemento
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverBlock(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetBlockId: string) => {
    e.preventDefault();
    if (!draggedBlock || draggedBlock === targetBlockId) {
      // Si no hay bloque arrastrado o es el mismo, solo limpiar estados
      setDraggedBlock(null);
      setDragOverBlock(null);
      return;
    }

    const draggedIndex = blocks.findIndex(b => b.id === draggedBlock);
    const targetIndex = blocks.findIndex(b => b.id === targetBlockId);
    
    if (draggedIndex === -1 || targetIndex === -1) {
      // Si hay algún error, limpiar estados
      setDraggedBlock(null);
      setDragOverBlock(null);
      return;
    }

    const newBlocks = [...blocks];
    const [draggedBlockData] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetIndex, 0, draggedBlockData);
    
    // Actualizar el orden
    newBlocks.forEach((block, idx) => {
      block.order = idx;
    });
    
    setBlocks(newBlocks);
    
    // Limpiar estados después de un breve delay para permitir la animación
    setTimeout(() => {
      setDraggedBlock(null);
      setDragOverBlock(null);
    }, 100);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, blockId: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          updateBlock(blockId, result, { 
            fileName: file.name, 
            fileType: file.type,
            width: '100%',
            height: 'auto'
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = (blockId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-block-id', blockId);
      fileInputRef.current.click();
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
    onPreview(blocks);
  };

  const handleSave = () => {
    if (!moduleTitle.trim()) {
      alert('Por favor, ingresa un título para el módulo');
      return;
    }
    onSave(blocks);
  };

  const getCurrentHierarchy = () => {
    return HIERARCHY_LEVELS.find(level => level.id === targetHierarchy) || HIERARCHY_LEVELS[0];
  };

  const toggleTextStyle = (blockId: string, style: 'isBold' | 'isItalic' | 'isUnderlined') => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      updateBlock(blockId, block.content, {
        [style]: !block.metadata?.[style]
      });
    }
  };

  const updateTextSize = (blockId: string, fontSize: string) => {
    updateBlock(blockId, '', { fontSize });
  };

  const renderTextToolbar = (block: ContentBlock) => (
    <div className="flex items-center space-x-2 mb-3 p-2 bg-[#2a2a2a] rounded-lg border border-[#444]">
      <span className="text-xs text-gray-400 mr-2">Formato:</span>
      
      <button
        onClick={() => toggleTextStyle(block.id, 'isBold')}
        className={`p-1 rounded ${block.metadata?.isBold ? 'bg-[#FFD447] text-[#1a1a1a]' : 'text-gray-400 hover:text-white'}`}
        title="Negrita"
      >
        <Bold size={14} />
      </button>
      
      <button
        onClick={() => toggleTextStyle(block.id, 'isItalic')}
        className={`p-1 rounded ${block.metadata?.isItalic ? 'bg-[#FFD447] text-[#1a1a1a]' : 'text-gray-400 hover:text-white'}`}
        title="Cursiva"
      >
        <Italic size={14} />
      </button>
      
      <button
        onClick={() => toggleTextStyle(block.id, 'isUnderlined')}
        className={`p-1 rounded ${block.metadata?.isUnderlined ? 'bg-[#FFD447] text-[#1a1a1a]' : 'text-gray-400 hover:text-white'}`}
        title="Subrayado"
      >
        <Underline size={14} />
      </button>
      
      <select
        value={block.metadata?.fontSize || 'text-base'}
        onChange={(e) => updateTextSize(block.id, e.target.value)}
        className="ml-2 px-2 py-1 bg-[#1a1a1a] border border-[#444] rounded text-xs text-white"
      >
        {TEXT_SIZES.map(size => (
          <option key={size.value} value={size.value}>{size.label}</option>
        ))}
      </select>
    </div>
  );

  const renderBlockInput = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div>
            {renderTextToolbar(block)}
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Escribe tu texto aquí..."
              className={`w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400 resize-none ${
                block.metadata?.fontSize || 'text-base'
              } ${
                block.metadata?.isBold ? 'font-bold' : ''
              } ${
                block.metadata?.isItalic ? 'italic' : ''
              } ${
                block.metadata?.isUnderlined ? 'underline' : ''
              }`}
              rows={4}
            />
          </div>
        );
      case 'image':
        return (
          <div className="space-y-3">
            {/* Carga local de imagen */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => triggerImageUpload(block.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#FFD447] text-[#1a1a1a] rounded-lg hover:bg-[#FFA500] transition-colors"
              >
                <Upload size={16} />
                <span>Cargar Imagen Local</span>
              </button>
              <span className="text-sm text-gray-400">o</span>
              <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                placeholder="URL de la imagen..."
                className="flex-1 p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400"
              />
            </div>
            
            {/* Vista previa de la imagen con controles de redimensionamiento */}
            {block.content && (
              <div className="mt-3">
                <div className="relative inline-block">
                  <img 
                    src={block.content} 
                    alt="Vista previa" 
                    className="max-w-full rounded-lg border border-[#444]"
                    style={{
                      width: block.metadata?.width || '100%',
                      height: block.metadata?.height || 'auto'
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-[#1a1a1a] rounded-lg p-2 border border-[#444]">
                    <div className="flex items-center space-x-2 text-white text-xs">
                      <Maximize2 size={14} />
                      <span>Redimensionar</span>
                    </div>
                  </div>
                </div>
                
                {/* Controles de redimensionamiento */}
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Ancho</label>
                    <input
                      type="text"
                      value={block.metadata?.width || '100%'}
                      onChange={(e) => updateBlock(block.id, block.content, { ...block.metadata, width: e.target.value })}
                      placeholder="100% o 300px"
                      className="w-full p-2 bg-[#2a2a2a] border border-[#444] rounded text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Alto</label>
                    <input
                      type="text"
                      value={block.metadata?.height || 'auto'}
                      onChange={(e) => updateBlock(block.id, block.content, { ...block.metadata, height: e.target.value })}
                      placeholder="auto o 200px"
                      className="w-full p-2 bg-[#2a2a2a] border border-[#444] rounded text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <input
              type="text"
              value={block.metadata?.alt || ''}
              onChange={(e) => updateBlock(block.id, block.content, { ...block.metadata, alt: e.target.value })}
              placeholder="Texto alternativo (alt)..."
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400"
            />
          </div>
        );
      case 'video':
        return (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            placeholder="URL del video (YouTube, Vimeo, etc.)..."
            className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400"
          />
        );
      case 'link':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="URL del enlace..."
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400"
            />
            <input
              type="text"
              value={block.metadata?.text || ''}
              onChange={(e) => updateBlock(block.id, block.content, { ...block.metadata, text: e.target.value })}
              placeholder="Texto del enlace..."
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400"
            />
          </div>
        );
      case 'code':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.metadata?.language || ''}
              onChange={(e) => updateBlock(block.id, block.content, { ...block.metadata, language: e.target.value })}
              placeholder="Lenguaje (JavaScript, Python, etc.)..."
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400"
            />
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Código..."
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400 font-mono resize-none"
              rows={6}
            />
          </div>
        );
      case 'quote':
        return (
          <div className="space-y-2">
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Cita..."
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400 resize-none"
              rows={3}
            />
            <input
              type="text"
              value={block.metadata?.author || ''}
              onChange={(e) => updateBlock(block.id, block.content, { ...block.metadata, author: e.target.value })}
              placeholder="Autor de la cita..."
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400"
            />
          </div>
        );
      case 'checklist':
        return (
          <div className="space-y-3">
            <div className="text-sm text-gray-400 mb-2">
              💡 Escribe cada elemento en una línea separada. Usa "✓" al inicio para marcar como completado.
            </div>
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="✓ Elemento completado&#10;Elemento pendiente&#10;✓ Otro completado"
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400 resize-none font-mono"
              rows={6}
            />
            <div className="text-xs text-gray-500">
              Ejemplo: ✓ Tarea completada | Tarea pendiente
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPreviewBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="prose prose-invert max-w-none">
            <p className={`leading-relaxed ${
              block.metadata?.fontSize || 'text-base'
            } ${
              block.metadata?.isBold ? 'font-bold' : ''
            } ${
              block.metadata?.isItalic ? 'italic' : ''
            } ${
              block.metadata?.isUnderlined ? 'underline' : ''
            }`}>
              {block.content}
            </p>
          </div>
        );
      case 'image':
        return (
          <div className="my-4">
            {block.content ? (
              <>
                <img 
                  src={block.content} 
                  alt={block.metadata?.alt || 'Imagen'} 
                  className="max-w-full rounded-lg border border-[#444]"
                  style={{
                    width: block.metadata?.width || '100%',
                    height: block.metadata?.height || 'auto'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
                {block.metadata?.alt && (
                  <p className="text-sm text-gray-400 mt-2 italic">{block.metadata.alt}</p>
                )}
              </>
            ) : (
              <div className="bg-[#2a2a2a] border border-[#444] rounded-lg p-8 text-center">
                <ImageIcon size={48} className="text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">Sin imagen</p>
              </div>
            )}
          </div>
        );
      case 'video':
        return (
          <div className="my-4">
            <div className="aspect-video bg-[#2a2a2a] rounded-lg border border-[#444] flex items-center justify-center">
              <div className="text-center">
                <Video size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Video: {block.content}</p>
              </div>
            </div>
          </div>
        );
      case 'link':
        return (
          <div className="my-4">
            <a 
              href={block.content} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#FFD447] hover:text-[#FFA500] underline break-all"
            >
              {block.metadata?.text || block.content}
            </a>
          </div>
        );
      case 'code':
        return (
          <div className="my-4">
            <div className="bg-[#1a1a1a] border border-[#444] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400 font-mono">
                  {block.metadata?.language || 'text'}
                </span>
              </div>
              <pre className="text-sm text-white font-mono overflow-x-auto">
                <code>{block.content}</code>
              </pre>
            </div>
          </div>
        );
      case 'quote':
        return (
          <div className="my-4">
            <blockquote className="border-l-4 border-[#FFD447] pl-4 italic text-white">
              <p className="text-lg mb-2">"{block.content}"</p>
              {block.metadata?.author && (
                <footer className="text-sm text-gray-400">— {block.metadata.author}</footer>
              )}
            </blockquote>
          </div>
        );
      case 'checklist':
        return (
          <div className="my-4">
            <div className="space-y-2">
              {block.content.split('\n').filter((item: string) => item.trim()).map((item: string, index: number) => {
                const isCompleted = item.trim().startsWith('✓');
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckSquare 
                      size={20} 
                      className={`flex-shrink-0 ${isCompleted ? 'text-green-500' : 'text-gray-400'}`} 
                    />
                    <span className={`text-white ${isCompleted ? 'line-through text-gray-400' : ''}`}>
                      {item.trim().replace(/^✓\s*/, '')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const currentHierarchy = getCurrentHierarchy();

  return (
    <div className="space-y-6">
      {/* Configuración del Módulo */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
        <h3 className="text-xl font-semibold text-[#FFD447] mb-4">Configuración del Módulo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Título del Módulo *</label>
            <input
              type="text"
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
              placeholder="Ej: Introducción a la Lógica Económica"
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400 text-lg font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
            <input
              type="text"
              value={moduleDescription}
              onChange={(e) => setModuleDescription(e.target.value)}
              placeholder="Breve descripción del módulo"
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-400 text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
            <select
              value={moduleCategory}
              onChange={(e) => setModuleCategory(e.target.value as 'theoretical' | 'practical')}
              className="w-full p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white"
            >
              <option value="theoretical">Teórico</option>
              <option value="practical">Práctico</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nivel Objetivo</label>
            <div className="flex items-center space-x-3">
              <select
                value={targetHierarchy}
                onChange={(e) => setTargetHierarchy(Number(e.target.value))}
                className="flex-1 p-3 bg-[#2a2a2a] border border-[#444] rounded-lg text-white"
                style={{ color: currentHierarchy.color }}
              >
                {HIERARCHY_LEVELS.map((level) => (
                  <option 
                    key={level.id} 
                    value={level.id}
                    style={{ 
                      color: level.color,
                      backgroundColor: '#2a2a2a'
                    }}
                  >
                    {level.name}
                  </option>
                ))}
              </select>
              <div 
                className="w-12 h-12 rounded-lg border-2 flex items-center justify-center"
                style={{ 
                  backgroundColor: currentHierarchy.bgColor.replace('bg-', '').replace('/20', ''),
                  borderColor: currentHierarchy.borderColor.replace('border-', '').replace('/30', '')
                }}
              >
                <img 
                  src={currentHierarchy.insignia} 
                  alt={currentHierarchy.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Editor de Contenido */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#FFD447]">Contenido del Módulo</h3>
          <div className="flex space-x-2">
            <button
              onClick={handlePreview}
              className="flex items-center space-x-2 px-4 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors"
            >
              <Eye size={16} />
              <span>Vista Previa</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-[#FFD447] text-[#1a1a1a] rounded-lg hover:bg-[#FFA500] transition-colors"
            >
              <Save size={16} />
              <span>Guardar Propuesta</span>
            </button>
          </div>
        </div>

        {/* Botones para agregar bloques */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => addBlock('text')}
              className="flex items-center space-x-2 px-3 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors text-sm"
            >
              <FileText size={16} />
              <span>Texto</span>
            </button>
            <button
              onClick={() => addBlock('image')}
              className="flex items-center space-x-2 px-3 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors text-sm"
            >
              <ImageIcon size={16} />
              <span>Imagen</span>
            </button>
            <button
              onClick={() => addBlock('video')}
              className="flex items-center space-x-2 px-3 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors text-sm"
            >
              <Video size={16} />
              <span>Video</span>
            </button>
            <button
              onClick={() => addBlock('link')}
              className="flex items-center space-x-2 px-3 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors text-sm"
            >
              <Link size={16} />
              <span>Enlace</span>
            </button>
            <button
              onClick={() => addBlock('code')}
              className="flex items-center space-x-2 px-3 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors text-sm"
            >
              <Code size={16} />
              <span>Código</span>
            </button>
            <button
              onClick={() => addBlock('quote')}
              className="flex items-center space-x-2 px-3 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors text-sm"
            >
              <Quote size={16} />
              <span>Cita</span>
            </button>
            <button
              onClick={() => addBlock('checklist')}
              className="flex items-center space-x-2 px-3 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors text-sm"
            >
              <CheckSquare size={16} />
              <span>Lista</span>
            </button>
            <button
              onClick={() => addBlock('divider')}
              className="flex items-center space-x-2 px-3 py-2 bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors text-sm"
            >
              <Minus size={16} />
              <span>Separador</span>
            </button>
          </div>
        </div>

        {/* Bloques de contenido con Drag & Drop */}
        <div className="space-y-4">
          {/* Indicador de instrucciones de Drag & Drop */}
          {blocks.length > 1 && (
            <div className="bg-gradient-to-r from-[#FFD447]/10 to-[#FFA500]/10 border border-[#FFD447]/20 rounded-lg p-3 text-center">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[#FFD447]">
                  <Move size={16} />
                  <span className="text-sm font-medium">💡 Arrastra los bloques para reorganizarlos</span>
                  <Move size={16} />
                </div>
                <button
                  onClick={() => {
                    setDraggedBlock(null);
                    setDragOverBlock(null);
                  }}
                  className="px-3 py-1 bg-[#FFD447] text-[#1a1a1a] rounded text-xs font-medium hover:bg-[#FFA500] transition-colors"
                  title="Resetear estado de arrastre"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          )}
          {blocks.map((block, index) => (
            <div 
              key={block.id} 
              className={`bg-[#2a2a2a] border border-[#444] rounded-lg p-4 transition-all duration-300 ${
                dragOverBlock === block.id ? 'border-[#FFD447] border-2 bg-[#2a2a2a]/90 scale-105 shadow-lg shadow-[#FFD447]/20' : ''
              } ${
                draggedBlock === block.id ? 'opacity-50 scale-98 rotate-0' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, block.id)}
              onDragOver={(e) => handleDragOver(e, block.id)}
              onDragLeave={handleDragLeave}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, block.id)}
            >
              <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                 <div className={`flex items-center space-x-2 p-2 rounded-lg border transition-all duration-300 cursor-move group ${
                   draggedBlock === block.id 
                     ? 'bg-[#FFD447] text-[#1a1a1a] border-[#FFD447]' 
                     : 'bg-[#333] text-gray-400 border-[#555] hover:border-[#FFD447] hover:text-[#FFD447]'
                 }`}>
                   <Move size={16} className="transition-colors" />
                   <span className="text-sm font-medium transition-colors">
                     {draggedBlock === block.id ? 'Arrastrando...' : 'Arrastrar'}
                   </span>
                 </div>
                <span className="text-sm text-gray-400">Bloque {index + 1}</span>
                <span className="px-2 py-1 bg-[#333] text-xs text-gray-300 rounded">
                  {block.type}
                </span>
              </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => moveBlock(block.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Mover arriba"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveBlock(block.id, 'down')}
                    disabled={index === blocks.length - 1}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Mover abajo"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeBlock(block.id)}
                    className="p-1 text-red-400 hover:text-red-300"
                    title="Eliminar bloque"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              {renderBlockInput(block)}
            </div>
          ))}
          {blocks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <div className="bg-gradient-to-r from-[#FFD447]/10 to-[#FFA500]/10 border border-[#FFD447]/20 rounded-lg p-8">
                <FileText size={64} className="mx-auto mb-4 text-[#FFD447]" />
                <h3 className="text-xl font-semibold text-[#FFD447] mb-2">¡Comienza a crear contenido!</h3>
                <p className="text-gray-300 mb-4">No hay bloques de contenido aún. Usa los botones de arriba para agregar tu primer elemento.</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <span>💡</span>
                  <span>Usa los botones de arriba para agregar contenido</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input oculto para carga de archivos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const blockId = e.currentTarget.getAttribute('data-block-id');
          if (blockId) {
            handleImageUpload(e, blockId);
          }
        }}
        className="hidden"
      />

      {/* Modal de Vista Previa */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#333] p-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#FFD700]">Vista Previa del Módulo</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#333] rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {/* Header del módulo */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">{moduleTitle || 'Título del Módulo'}</h1>
                {moduleDescription && (
                  <p className="text-lg text-gray-300 mb-4">{moduleDescription}</p>
                )}
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <span className="px-3 py-1 bg-[#333] rounded-full">
                    {moduleCategory === 'theoretical' ? 'Teórico' : 'Práctico'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <img 
                      src={currentHierarchy.insignia} 
                      alt={currentHierarchy.name}
                      className="w-6 h-6 object-contain"
                    />
                    <span 
                      className="px-3 py-1 rounded-full font-medium"
                      style={{ 
                        backgroundColor: currentHierarchy.bgColor.replace('bg-', '').replace('/20', ''),
                        color: currentHierarchy.color 
                      }}
                    >
                      {currentHierarchy.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenido renderizado */}
              <div className="space-y-6">
                {blocks.map((block) => (
                  <div key={block.id}>
                    {renderPreviewBlock(block)}
                  </div>
                ))}
                {blocks.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <FileText size={48} className="mx-auto mb-4" />
                    <p>No hay contenido para mostrar en la vista previa.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
