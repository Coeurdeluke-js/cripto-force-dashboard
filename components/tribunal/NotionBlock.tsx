'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  Plus, 
  MoreHorizontal, 
  Type, 
  List, 
  CheckSquare, 
  Image, 
  Video, 
  Link, 
  Code, 
  Quote, 
  Minus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface NotionBlockProps {
  id: string;
  type: 'text' | 'heading' | 'subheading' | 'list' | 'checklist' | 'image' | 'video' | 'link' | 'code' | 'quote' | 'divider';
  content: string;
  metadata?: any;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, content: string, metadata?: any) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
  onTypeChange: (id: string, newType: string) => void;
  onAddBlock: (id: string, type: string) => void;
}

const blockTypeIcons = {
  heading: Type,
  subheading: Type,
  text: Type,
  list: List,
  checklist: CheckSquare,
  image: Image,
  video: Video,
  link: Link,
  code: Code,
  quote: Quote,
  divider: Minus
};

const blockTypeNames = {
  heading: 'Título',
  subheading: 'Subtítulo',
  text: 'Texto',
  list: 'Lista',
  checklist: 'Checklist',
  image: 'Imagen',
  video: 'Video',
  link: 'Enlace',
  code: 'Código',
  quote: 'Cita',
  divider: 'Separador'
};

export default function NotionBlock({
  id,
  type,
  content,
  metadata,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onMove,
  onTypeChange,
  onAddBlock
}: NotionBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [showMenu, setShowMenu] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    setEditContent(content);
  }, [content]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowTypeMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editContent !== content) {
      onUpdate(id, editContent, metadata);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
      onAddBlock(id, 'text');
    } else if (e.key === 'Escape') {
      setEditContent(content);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  const renderContent = () => {
    switch (type) {
      case 'heading':
        return (
          <div className="text-3xl font-bold text-white">
            {isEditing ? (
              <input
                ref={contentRef}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-3xl font-bold text-white"
                placeholder="Título principal..."
                autoFocus
              />
            ) : (
              <span onClick={handleClick} className="cursor-text hover:bg-[#333]/30 px-2 py-1 rounded transition-colors">
                {editContent || 'Título principal...'}
              </span>
            )}
          </div>
        );

      case 'subheading':
        return (
          <div className="text-xl font-semibold text-white">
            {isEditing ? (
              <input
                ref={contentRef}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-xl font-semibold text-white"
                placeholder="Subtítulo..."
                autoFocus
              />
            ) : (
              <span onClick={handleClick} className="cursor-text hover:bg-[#333]/30 px-2 py-1 rounded transition-colors">
                {editContent || 'Subtítulo...'}
              </span>
            )}
          </div>
        );

      case 'list':
        return (
          <div className="flex items-start space-x-3">
            <span className="text-[#FFD447] mt-1">•</span>
            <div className="flex-1">
              {isEditing ? (
                <input
                  ref={contentRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-white"
                  placeholder="Elemento de lista..."
                />
              ) : (
                <span onClick={handleClick} className="cursor-text hover:bg-[#333]/30 px-2 py-1 rounded transition-colors">
                  {editContent || 'Elemento de lista...'}
                </span>
              )}
            </div>
          </div>
        );

      case 'checklist':
        return (
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={metadata?.checked || false}
              onChange={(e) => onUpdate(id, content, { ...metadata, checked: e.target.checked })}
              className="mt-1 w-4 h-4 text-[#FFD447] bg-[#2a2a2a] border-[#444] rounded focus:ring-[#FFD447] focus:ring-2"
            />
            <div className="flex-1">
              {isEditing ? (
                <input
                  ref={contentRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  className={`w-full bg-transparent border-none outline-none text-white ${
                    metadata?.checked ? 'line-through text-gray-400' : ''
                  }`}
                  placeholder="Tarea..."
                />
              ) : (
                <span 
                  onClick={handleClick}
                  className={`cursor-text hover:bg-[#333]/30 px-2 py-1 rounded transition-colors ${
                    metadata?.checked ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {editContent || 'Tarea...'}
                </span>
              )}
            </div>
          </div>
        );

      case 'divider':
        return (
          <div className="w-full h-px bg-[#444] my-4" />
        );

      case 'image':
        return (
          <div className="text-white">
            {isEditing ? (
              <div className="space-y-3">
                {/* Input para URL */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">URL de imagen:</label>
                  <input
                    ref={contentRef}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white text-sm"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    autoFocus
                  />
                </div>
                
                {/* Separador */}
                <div className="text-center text-gray-500 text-xs">- O -</div>
                
                {/* Carga local */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Cargar desde tu computadora:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const result = event.target?.result as string;
                          setEditContent(result);
                          onUpdate(id, result, metadata);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white text-sm cursor-pointer"
                    style={{
                      backgroundImage: 'none',
                      background: '#2a2a2a'
                    }}
                  />
                </div>
                
                <div className="text-xs text-gray-400">
                  💡 Puedes usar una URL o cargar una imagen desde tu computadora
                </div>
              </div>
            ) : (
              <div onClick={handleClick} className="cursor-pointer">
                {editContent ? (
                  <img 
                    src={editContent} 
                    alt="Imagen" 
                    className="max-w-full rounded-lg border border-[#444]"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                ) : (
                  <div className="text-gray-400 italic">Imagen no especificada</div>
                )}
              </div>
            )}
          </div>
        );

      case 'code':
        return (
          <div className="text-white">
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  ref={contentRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-[#1a1a1a] border border-[#444] rounded p-3 text-white font-mono resize-none"
                  placeholder="Escribe tu código HTML o CSS aquí..."
                  rows={Math.max(3, editContent.split('\n').length)}
                  autoFocus
                />
                <div className="text-xs text-gray-400">
                  💡 El código se renderizará automáticamente en tiempo real
                </div>
              </div>
            ) : (
              <div onClick={handleClick} className="cursor-pointer">
                {editContent ? (
                  <div className="space-y-4">
                    {/* Código fuente */}
                    <div className="bg-[#1a1a1a] border border-[#444] rounded-lg p-4">
                      <div className="text-xs text-[#FFD447] font-medium mb-2">💻 Código Fuente:</div>
                      <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                        <code>{editContent}</code>
                      </pre>
                    </div>
                    
                    {/* Renderizado en vivo */}
                    <div className="bg-white text-black p-4 rounded-lg border border-[#444]">
                      <div className="text-xs text-[#FFD447] font-medium mb-2">👁️ Vista Previa:</div>
                      <div 
                        className="min-h-[100px]"
                        dangerouslySetInnerHTML={{ __html: editContent }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 italic">Código no especificado</div>
                )}
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="text-white">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">URL del video (YouTube, Vimeo, etc.):</label>
                  <input
                    ref={contentRef}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white text-sm"
                    placeholder="https://www.youtube.com/watch?v=..."
                    autoFocus
                  />
                </div>
                
                <div className="text-xs text-gray-400">
                  💡 El video se reproducirá directamente en la plataforma
                </div>
              </div>
            ) : (
              <div onClick={handleClick} className="cursor-pointer">
                {editContent ? (
                  <div className="space-y-4">
                    {/* Video embebido */}
                    <div className="bg-[#1a1a1a] border border-[#444] rounded-lg p-4">
                      <div className="text-xs text-[#FFD447] font-medium mb-2">🎥 Video:</div>
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          src={editContent.includes('youtube.com') ? 
                            editContent.replace('watch?v=', 'embed/') :
                            editContent.includes('youtu.be') ?
                            editContent.replace('youtu.be/', 'youtube.com/embed/') :
                            editContent
                          }
                          title="Video"
                          className="absolute top-0 left-0 w-full h-full rounded border border-[#444]"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    
                    {/* URL del video */}
                    <div className="text-xs text-gray-400 break-all">
                      📍 {editContent}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 italic">Video no especificado</div>
                )}
              </div>
            )}
          </div>
        );

            case 'link':
        return (
          <div className="text-white">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  ref={contentRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white text-sm"
                  placeholder="https://ejemplo.com"
                  autoFocus
                />
                <div className="text-xs text-gray-400">
                  💡 Inserta la URL del enlace
                </div>
              </div>
            ) : (
              <div onClick={handleClick} className="cursor-pointer">
                {editContent ? (
                  <a 
                    href={editContent} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#FFD447] hover:text-[#FFC437] underline break-all"
                  >
                    🔗 {editContent}
                  </a>
                ) : (
                  <div className="text-gray-400 italic">Enlace no especificado</div>
                )}
              </div>
            )}
          </div>
        );

      case 'quote':
        return (
          <div className="text-white">
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  ref={contentRef}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-[#2a2a2a] border-l-4 border-[#FFD447] rounded px-3 py-2 text-white resize-none"
                  placeholder="Escribe tu cita aquí..."
                  rows={Math.max(2, editContent.split('\n').length)}
                  autoFocus
                />
                <div className="text-xs text-gray-400">
                  💡 Las citas se mostrarán con un borde dorado especial
                </div>
              </div>
            ) : (
              <div onClick={handleClick} className="cursor-pointer">
                {editContent ? (
                  <blockquote className="border-l-4 border-[#FFD447] pl-4 py-2 bg-[#2a2a2a]/50 rounded-r">
                    <p className="text-gray-300 italic">"{editContent}"</p>
                  </blockquote>
                ) : (
                  <div className="text-gray-400 italic">Cita no especificada</div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-white">
            {isEditing ? (
              <textarea
                ref={contentRef}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-white resize-none min-h-[24px]"
                placeholder="Escribe aquí..."
                rows={Math.max(1, editContent.split('\n').length)}
                autoFocus
              />
            ) : (
              <div 
                onClick={handleClick}
                className="cursor-text hover:bg-[#333]/30 px-2 py-1 rounded transition-colors"
              >
                {editContent || 'Escribe aquí...'}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative min-h-[24px] py-1 px-2 rounded-lg transition-all duration-200 ${
        isSelected ? 'bg-[#FFD447]/10 border border-[#FFD447]/30' : 'hover:bg-[#2a2a2a]/50'
      }`}
      onClick={() => onSelect(id)}
    >
      {/* Handle de Drag & Drop */}
      <div
        {...attributes}
        {...listeners}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing ${
          isDragging ? 'opacity-100' : ''
        }`}
      >
        <GripVertical size={16} className="text-gray-400 hover:text-[#FFD447]" />
      </div>

      {/* Botón de menú del bloque */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 rounded hover:bg-[#333] transition-colors"
        >
          <MoreHorizontal size={16} className="text-gray-400 hover:text-white" />
        </button>
      </div>

      {/* Menú contextual del bloque */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-1 bg-[#1a1a1a] border border-[#444] rounded-lg shadow-xl z-50 min-w-[200px]"
        >
          <div className="p-2">
            <button
              onClick={() => {
                setShowTypeMenu(!showTypeMenu);
                setShowMenu(false);
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#333] rounded transition-colors"
            >
              <Type size={14} />
              <span>Cambiar tipo</span>
            </button>
            
            <button
              onClick={() => onDuplicate(id)}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#333] rounded transition-colors"
            >
              <Copy size={14} />
              <span>Duplicar</span>
            </button>
            
            <button
              onClick={() => onMove(id, 'up')}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#333] rounded transition-colors"
            >
              <ArrowUp size={14} />
              <span>Mover arriba</span>
            </button>
            
            <button
              onClick={() => onMove(id, 'down')}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#333] rounded transition-colors"
            >
              <ArrowDown size={14} />
              <span>Mover abajo</span>
            </button>
            
            <div className="border-t border-[#444] my-1" />
            
            <button
              onClick={() => onDelete(id)}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded transition-colors"
            >
              <Trash2 size={14} />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      )}

      {/* Menú de tipos de bloque */}
      {showTypeMenu && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-1 bg-[#1a1a1a] border border-[#444] rounded-lg shadow-xl z-50 min-w-[180px]"
        >
          <div className="p-2">
            {Object.entries(blockTypeNames).map(([blockType, blockName]) => {
              const IconComponent = blockTypeIcons[blockType as keyof typeof blockTypeIcons];
              return (
                <button
                  key={blockType}
                  onClick={() => {
                    onTypeChange(id, blockType);
                    setShowTypeMenu(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded transition-colors ${
                    type === blockType
                      ? 'bg-[#FFD447]/20 text-[#FFD447]'
                      : 'text-gray-300 hover:bg-[#333]'
                  }`}
                >
                  <IconComponent size={14} />
                  <span>{blockName}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Botón de agregar bloque */}
      <div className="absolute left-1/2 top-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onAddBlock(id, 'text')}
          className="p-1 rounded-full bg-[#2a2a2a] border border-[#444] hover:bg-[#FFD447] hover:border-[#FFD447] transition-all duration-200"
        >
          <Plus size={16} className="text-gray-400 group-hover:text-[#1a1a1a]" />
        </button>
      </div>

      {/* Contenido del bloque */}
      <div className="pl-6 pr-8">
        {renderContent()}
      </div>
    </div>
  );
}
