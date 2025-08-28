'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Play, Check, BookOpen, Eye } from 'lucide-react';
import Link from 'next/link';

// Usar la interfaz del hook useProposals que es la que realmente se guarda
interface TribunalProposal {
  id: string;
  title: string;
  description: string;
  category: 'theoretical' | 'practical';
  targetHierarchy: number;
  content: any[];
  authorId: string;
  authorName: string;
  authorLevel: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  votes: {
    maestros: string[];
    approvals: string[];
    rejections: string[];
  };
}

export default function ModuloPage() {
  const params = useParams();
  const router = useRouter();
  const [module, setModule] = useState<TribunalProposal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModule = () => {
      try {
        setIsLoading(true);
        setError(null);

        const moduleId = params.id as string;
        const storedProposals = localStorage.getItem('tribunal_proposals');
        
        if (!storedProposals) {
          setError('No se encontró el módulo');
          setIsLoading(false);
          return;
        }

        const allProposals: TribunalProposal[] = JSON.parse(storedProposals);
        const foundModule = allProposals.find(proposal => proposal.id === moduleId);

        if (!foundModule) {
          setError('Módulo no encontrado');
          setIsLoading(false);
          return;
        }

        if (foundModule.status !== 'approved') {
          setError('Este módulo no está disponible');
          setIsLoading(false);
          return;
        }

        setModule(foundModule);
      } catch (err) {
        console.error('Error al cargar el módulo:', err);
        setError('Error al cargar el módulo');
      } finally {
        setIsLoading(false);
      }
    };

    loadModule();
  }, [params.id]);

  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
             case 'text':
         return (
           <div key={index} className="mb-6">
             <div 
               className="text-white leading-relaxed text-lg"
               style={{
                 fontSize: block.metadata?.fontSize || '1.125rem',
                 fontWeight: block.metadata?.isBold ? 'bold' : 'normal',
                 fontStyle: block.metadata?.isItalic ? 'italic' : 'normal',
                 textDecoration: block.metadata?.isUnderlined ? 'underline' : 'none',
                 lineHeight: '1.7',
                 textAlign: block.metadata?.textAlign || 'left'
               }}
               dangerouslySetInnerHTML={{ __html: block.content }}
             />
           </div>
         );
      
             case 'image':
         return (
           <div key={index} className="mb-6">
             <div className="flex justify-center">
               <img 
                 src={block.content} 
                 alt={block.metadata?.alt || 'Imagen del módulo'}
                 className="max-w-full h-auto rounded-lg shadow-lg border border-[#232323]"
                 style={{
                   width: block.metadata?.width || 'auto',
                   height: block.metadata?.height || 'auto',
                   maxWidth: '100%',
                   objectFit: 'contain'
                 }}
               />
             </div>
             {block.metadata?.caption && (
               <p className="text-sm text-gray-400 mt-2 text-center italic">{block.metadata.caption}</p>
             )}
           </div>
         );
      
             case 'video':
         return (
           <div key={index} className="mb-6">
             <div className="bg-[#1a1a1a] border border-[#232323] rounded-lg p-4">
               {block.content.includes('youtube.com') || block.content.includes('youtu.be') ? (
                 <div className="aspect-video bg-[#2a2a2a] rounded-lg border border-[#444] flex items-center justify-center">
                   <iframe
                     src={block.content.replace('watch?v=', 'embed/')}
                     title="Video de YouTube"
                     className="w-full h-full rounded-lg"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   />
                 </div>
               ) : (
                 <video 
                   controls 
                   className="w-full rounded-lg"
                   src={block.content}
                   poster={block.metadata?.poster}
                 >
                   Tu navegador no soporta el elemento de video.
                 </video>
               )}
               {block.metadata?.caption && (
                 <p className="text-sm text-gray-400 mt-2 text-center italic">{block.metadata.caption}</p>
               )}
             </div>
           </div>
         );
      
             case 'link':
         return (
           <div key={index} className="mb-6">
             <a 
               href={block.content} 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center space-x-2 text-[#FFD447] hover:text-[#FFC437] underline break-all bg-[#FFD447]/10 hover:bg-[#FFD447]/20 px-3 py-2 rounded-lg transition-all duration-200"
             >
               <span>{block.metadata?.text || block.content}</span>
               <span className="text-xs">↗</span>
             </a>
           </div>
         );
      
             case 'code':
         return (
           <div key={index} className="mb-6">
             <div className="bg-[#1a1a1a] border border-[#444] rounded-lg p-4">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-sm text-[#FFD447] font-mono">
                   {block.metadata?.language || 'text'}
                 </span>
                 {block.metadata?.language === 'html' && (
                   <button
                     onClick={() => {
                       const newWindow = window.open('', '_blank');
                       if (newWindow) {
                         newWindow.document.write(`
                           <!DOCTYPE html>
                           <html>
                           <head>
                             <title>Preview - ${module?.title}</title>
                             <style>
                               body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                             </style>
                           </head>
                           <body>
                             ${block.content}
                           </body>
                           </html>
                         `);
                         newWindow.document.close();
                       }
                     }}
                     className="text-xs bg-[#FFD447] text-gray-900 px-2 py-1 rounded hover:bg-[#FFC437] transition-colors"
                   >
                     Ver Preview
                   </button>
                 )}
               </div>
               <pre className="text-sm text-white font-mono overflow-x-auto">
                 <code>{block.content}</code>
               </pre>
             </div>
           </div>
         );
      
             case 'quote':
         return (
           <div key={index} className="mb-6">
             <blockquote className="border-l-4 border-[#FFD447] pl-6 italic text-white bg-[#1a1a1a]/50 rounded-r-lg p-4">
               <p className="text-xl mb-3 text-[#fafafa] leading-relaxed">"{block.content}"</p>
               {block.metadata?.author && (
                 <footer className="text-sm text-[#FFD447] font-medium">— {block.metadata.author}</footer>
               )}
             </blockquote>
           </div>
         );
      
             case 'checklist':
         return (
           <div key={index} className="mb-6">
             <div className="bg-[#1a1a1a] border border-[#232323] rounded-lg p-4">
               <div className="space-y-3">
                 {block.content.split('\n').filter((item: string) => item.trim()).map((item: string, itemIndex: number) => {
                   const isCompleted = item.trim().startsWith('✓');
                   return (
                     <div key={itemIndex} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                       <Check 
                         size={20} 
                         className={`flex-shrink-0 ${isCompleted ? 'text-green-500' : 'text-[#FFD447]'}`} 
                       />
                       <span className={`text-white ${isCompleted ? 'line-through text-gray-400' : ''}`}>
                         {item.trim().replace(/^✓\s*/, '')}
                       </span>
                     </div>
                   );
                 })}
               </div>
             </div>
           </div>
         );
       
       case 'divider':
         return (
           <div key={index} className="my-8">
             <div className="flex items-center">
               <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FFD447] to-transparent"></div>
               <div className="px-4">
                 <span className="text-[#FFD447] text-sm font-medium">
                   {block.content || '✧ ✧ ✧'}
                 </span>
               </div>
               <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FFD447] to-transparent"></div>
             </div>
           </div>
         );
       
       default:
         return (
           <div key={index} className="mb-6">
             <p className="text-gray-400">Tipo de contenido no soportado: {block.type}</p>
           </div>
         );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD447]"></div>
        </div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
              <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
              <p className="text-gray-400 mb-6">{error || 'Módulo no encontrado'}</p>
              <Link
                href="/dashboard/acolito"
                className="inline-flex items-center space-x-2 bg-[#FFD447] text-gray-900 px-4 py-2 rounded-lg hover:bg-[#FFC437] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0f0f0f] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#232323] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/acolito"
                className="flex items-center space-x-2 text-[#FFD447] hover:text-[#FFC437] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver</span>
              </Link>
              <div className="h-6 w-px bg-[#333]" />
                             <div>
                 <h1 className="text-xl font-semibold text-white">{module.title}</h1>
                 <p className="text-sm text-gray-400">
                   Por: {module.authorName} • 
                   <span className={module.authorLevel === 5 ? 'text-[#ec4d58] font-semibold' : 'text-gray-400'}>
                     {module.authorLevel === 5 ? 'Darth' : module.authorLevel === 6 ? 'Maestro' : 'Acólito'}
                   </span>
                 </p>
               </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-[#FFD447] bg-[#FFD447]/10 px-2 py-1 rounded-full">
                {module.category === 'theoretical' ? 'Teórico' : 'Práctico'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Module Header */}
        <div className="bg-[#1a1a1a] border border-[#232323] rounded-lg p-6 mb-8">
                     <div className="flex items-start justify-between mb-4">
             <div>
               <h2 className="text-2xl font-bold text-white mb-2">{module.title}</h2>
               <p className="text-gray-300 mb-4">{module.description}</p>
             </div>
           </div>
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Autor: {module.authorName}</span>
            <span>Aprobado: {new Date(module.approvedAt || module.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Module Content */}
        <div className="bg-[#1a1a1a] border border-[#232323] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#FFD447] mb-6">Contenido del Módulo</h3>
          
          {module.content && module.content.length > 0 ? (
            <div className="space-y-6">
              {module.content.map((block, index) => renderContentBlock(block, index))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No hay contenido disponible para este módulo</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/dashboard/acolito"
            className="inline-flex items-center space-x-2 bg-[#FFD447] text-gray-900 px-6 py-3 rounded-lg hover:bg-[#FFC437] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al Dashboard</span>
          </Link>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Módulo ID: {module.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
