'use client';

import { useState, useEffect } from 'react';
import { Crown, FileText, CheckCircle, XCircle, Clock, Users, BarChart3, Plus, Eye, Save, Edit, Trash2 } from 'lucide-react';
import { useSafeAuth } from '@/context/AuthContext';
import { canUserAccessTribunal } from '@/lib/tribunal/permissions';
import ContentEditor from '@/components/tribunal/ContentEditor';
import NotionEditor from '@/components/tribunal/NotionEditor';
import BackButton from '@/components/ui/BackButton';
import { ContentBlock } from '@/lib/tribunal/types';
import { useProposals, TribunalProposal } from '@/lib/tribunal/hooks/useProposals';

interface TribunalStats {
  propuestasPendientes: number;
  propuestasAprobadas: number;
  propuestasRechazadas: number;
  maestrosActivos: number;
}

// Componente para mostrar la lista de propuestas
function ProposalsList() {
  const { proposals, deleteProposal, submitProposal, createProposal, clearAllProposals } = useProposals();
  const { userData } = useSafeAuth();

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta propuesta?')) {
      deleteProposal(id);
    }
  };

  const handleSubmit = (id: string) => {
    if (confirm('¿Estás seguro de que quieres enviar esta propuesta para revisión?')) {
      submitProposal(id);
    }
  };

  if (proposals.length === 0) {
    return (
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
        <div className="text-center py-12">
          <FileText size={64} className="text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No hay propuestas</h3>
          <p className="text-gray-500 mb-4">Crea tu primera propuesta para comenzar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <div key={proposal.id} className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-white">{proposal.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  proposal.status === 'draft' ? 'bg-gray-500 text-white' :
                  proposal.status === 'pending' ? 'bg-yellow-500 text-black' :
                  proposal.status === 'approved' ? 'bg-green-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {proposal.status === 'draft' ? 'Borrador' :
                   proposal.status === 'pending' ? 'Pendiente' :
                   proposal.status === 'approved' ? 'Aprobada' :
                   'Rechazada'}
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-2">{proposal.description}</p>
                             <div className="flex items-center space-x-4 text-xs text-gray-400">
                 <span>Autor: {proposal.authorName || 'No especificado'}</span>
                 <span>Categoría: {proposal.category === 'theoretical' ? 'Teórico' : 'Práctico'}</span>
                 <span>Nivel: {proposal.targetHierarchy}</span>
                 <span>Creada: {new Date(proposal.createdAt).toLocaleDateString()}</span>
               </div>
            </div>
            <div className="flex items-center space-x-2">
              {proposal.status === 'draft' && (
                <>
                  <button
                    onClick={() => handleSubmit(proposal.id)}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    title="Enviar para revisión"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(proposal.id)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente para el sistema de votación
function VotingSystem() {
  const { proposals, approveProposal, rejectProposal } = useProposals();
  const { userData } = useSafeAuth();
  
  // Solo mostrar propuestas pendientes para votación
  const pendingProposals = proposals.filter(p => p.status === 'pending');
  
  const handleApprove = (id: string) => {
    if (confirm('¿Estás seguro de que quieres APROBAR esta propuesta?')) {
      approveProposal(id, userData?.id || 'default', userData?.email || 'Maestro');
      alert('Propuesta aprobada. Se requiere aprobación unánime de todos los Maestros.');
    }
  };
  
  const handleReject = (id: string) => {
    const reason = prompt('¿Por qué rechazas esta propuesta? (Motivo obligatorio)');
    if (reason && reason.trim()) {
      rejectProposal(id, userData?.id || 'default', userData?.email || 'Maestro', reason);
      alert('Propuesta rechazada. El autor será notificado del motivo.');
    } else if (reason !== null) {
      alert('Debes proporcionar un motivo para rechazar la propuesta.');
    }
  };
  
  if (pendingProposals.length === 0) {
    return (
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
        <div className="text-center py-12">
          <Users size={64} className="text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No hay propuestas pendientes</h3>
          <p className="text-gray-500 mb-4">Todas las propuestas han sido procesadas o no hay ninguna en espera de votación</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {pendingProposals.map((proposal) => (
        <div key={proposal.id} className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
          <div className="space-y-4">
            {/* Header de la propuesta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-white">{proposal.title}</h3>
                <span className="px-3 py-1 bg-yellow-500 text-black text-sm rounded-full font-medium">
                  Pendiente de Votación
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Propuesta #{proposal.id.slice(-6)}
              </div>
            </div>
            
            {/* Descripción */}
            <p className="text-gray-300 text-lg">{proposal.description}</p>
            
            {/* Metadatos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
              <div>
                <span className="font-medium text-gray-300">Autor:</span>
                <br />
                <span className="text-gray-300">{proposal.authorName || 'No especificado'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-300">Categoría:</span>
                <br />
                {proposal.category === 'theoretical' ? 'Teórico' : 'Práctico'}
              </div>
              <div>
                <span className="font-medium text-gray-300">Nivel Objetivo:</span>
                <br />
                {proposal.targetHierarchy}
              </div>
              <div>
                <span className="font-medium text-gray-300">Enviada:</span>
                <br />
                {new Date(proposal.submittedAt || proposal.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            {/* Contenido de la propuesta */}
            <div className="bg-[#0f0f0f] border border-[#444] rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Contenido de la Propuesta:</h4>
              <div className="space-y-4">
                {proposal.content.map((block, index) => (
                  <div key={index} className="text-sm text-gray-400">
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-500 mt-1">•</span>
                      <div className="flex-1">
                        <div className="text-gray-400 mb-2">
                          <span className="font-medium text-gray-300">Tipo:</span> {block.type}
                        </div>
                        {block.type === 'image' ? (
                          <div className="mt-2">
                            {block.content && block.content.startsWith('data:image') ? (
                              <img 
                                src={block.content} 
                                alt="Imagen de la propuesta"
                                className="max-w-full h-auto rounded-lg border border-[#444]"
                                style={{
                                  maxHeight: '300px',
                                  objectFit: 'contain'
                                }}
                              />
                            ) : (
                              <div className="text-red-400 text-xs">
                                ❌ Imagen no disponible o corrupta
                              </div>
                            )}
                          </div>
                        ) : block.type === 'text' ? (
                          <div className="bg-[#1a1a1a] p-3 rounded border border-[#333]">
                            {block.content}
                          </div>
                        ) : (
                          <div className="bg-[#1a1a1a] p-3 rounded border border-[#333]">
                            {block.content}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Botones de votación */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-[#333]">
              <button
                onClick={() => handleApprove(proposal.id)}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle size={20} />
                <span>APROBAR</span>
              </button>
              
              <button
                onClick={() => handleReject(proposal.id)}
                className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <XCircle size={20} />
                <span>RECHAZAR</span>
              </button>
            </div>
            
            {/* Información de votación */}
            <div className="text-center text-sm text-gray-500">
              <p>Esta propuesta requiere aprobación unánime de todos los Maestros activos</p>
              <p className="mt-1">Tu voto será registrado y visible para otros Maestros</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente para mostrar propuestas aprobadas
function ApprovedProposals() {
  const { proposals } = useProposals();
  const approvedProposals = proposals.filter(p => p.status === 'approved');
  
  if (approvedProposals.length === 0) {
    return (
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
        <div className="text-center py-12">
          <CheckCircle size={64} className="text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No hay propuestas aprobadas</h3>
          <p className="text-gray-500 mb-4">Las propuestas aprobadas aparecerán aquí una vez que sean votadas por unanimidad</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {approvedProposals.map((proposal) => (
        <div key={proposal.id} className="bg-[#1a1a1a] border border-green-500 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-white">{proposal.title}</h3>
                <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full font-medium">
                  Aprobada
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Aprobada el {proposal.approvedAt ? new Date(proposal.approvedAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
            
            <p className="text-gray-300 text-lg">{proposal.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
              <div>
                <span className="font-medium text-gray-300">Autor:</span>
                <br />
                <span className="text-gray-300">{proposal.authorName || 'No especificado'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-300">Categoría:</span>
                <br />
                {proposal.category === 'theoretical' ? 'Teórico' : 'Práctico'}
              </div>
              <div>
                <span className="font-medium text-gray-300">Nivel Objetivo:</span>
                <br />
                {proposal.targetHierarchy}
              </div>
              <div>
                <span className="font-medium text-gray-300">Votos:</span>
                <br />
                {proposal.votes.approvals.length} aprobaciones
              </div>
            </div>
            
            <div className="bg-[#0f0f0f] border border-[#444] rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Contenido Aprobado:</h4>
              <div className="space-y-4">
                {proposal.content.map((block, index) => (
                  <div key={index} className="text-sm text-gray-400">
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-500 mt-1">•</span>
                      <div className="flex-1">
                        <div className="text-gray-400 mb-2">
                          <span className="font-medium text-gray-300">Tipo:</span> {block.type}
                        </div>
                        {block.type === 'image' ? (
                          <div className="mt-2">
                            {block.content && block.content.startsWith('data:image') ? (
                              <img 
                                src={block.content} 
                                alt="Imagen de la propuesta"
                                className="max-w-full h-auto rounded-lg border border-[#444]"
                                style={{
                                  maxHeight: '300px',
                                  objectFit: 'contain'
                                }}
                              />
                            ) : (
                              <div className="text-red-400 text-xs">
                                ❌ Imagen no disponible o corrupta
                              </div>
                            )}
                          </div>
                        ) : block.type === 'text' ? (
                          <div className="bg-[#1a1a1a] p-3 rounded border border-[#333]">
                            {block.content}
                          </div>
                        ) : (
                          <div className="bg-[#1a1a1a] p-3 rounded border border-[#333]">
                            {block.content}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center text-sm text-green-400 bg-green-900/20 border border-green-500/30 rounded-lg p-3">
              <p className="font-medium">✅ Esta propuesta ha sido aprobada por unanimidad</p>
              <p className="mt-1">El contenido será integrado automáticamente en los carruseles correspondientes</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente para mostrar propuestas rechazadas
function RejectedProposals() {
  const { proposals } = useProposals();
  const rejectedProposals = proposals.filter(p => p.status === 'rejected');
  
  if (rejectedProposals.length === 0) {
    return (
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
        <div className="text-center py-12">
          <XCircle size={64} className="text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No hay propuestas rechazadas</h3>
          <p className="text-gray-500 mb-4">Las propuestas rechazadas aparecerán aquí una vez que sean votadas negativamente</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {rejectedProposals.map((proposal) => (
        <div key={proposal.id} className="bg-[#1a1a1a] border border-red-500 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-white">{proposal.title}</h3>
                <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full font-medium">
                  Rechazada
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Rechazada el {proposal.rejectedAt ? new Date(proposal.rejectedAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
            
            <p className="text-gray-300 text-lg">{proposal.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
              <div>
                <span className="font-medium text-gray-300">Autor:</span>
                <br />
                <span className="text-gray-300">{proposal.authorName || 'No especificado'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-300">Categoría:</span>
                <br />
                {proposal.category === 'theoretical' ? 'Teórico' : 'Práctico'}
              </div>
              <div>
                <span className="font-medium text-gray-300">Nivel Objetivo:</span>
                <br />
                {proposal.targetHierarchy}
              </div>
              <div>
                <span className="font-medium text-gray-300">Rechazada por:</span>
                <br />
                {proposal.votes.rejections.length} Maestro(s)
              </div>
            </div>
            
            <div className="bg-[#0f0f0f] border border-[#444] rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Contenido Rechazado:</h4>
              <div className="space-y-4">
                {proposal.content.map((block, index) => (
                  <div key={index} className="text-sm text-gray-400">
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-500 mt-1">•</span>
                      <div className="flex-1">
                        <div className="text-gray-400 mb-2">
                          <span className="font-medium text-gray-300">Tipo:</span> {block.type}
                        </div>
                        {block.type === 'image' ? (
                          <div className="mt-2">
                            {block.content && block.content.startsWith('data:image') ? (
                              <img 
                                src={block.content} 
                                alt="Imagen de la propuesta"
                                className="max-w-full h-auto rounded-lg border border-[#444]"
                                style={{
                                  maxHeight: '300px',
                                  objectFit: 'contain'
                                }}
                              />
                            ) : (
                              <div className="text-red-400 text-xs">
                                ❌ Imagen no disponible o corrupta
                              </div>
                            )}
                          </div>
                        ) : block.type === 'text' ? (
                          <div className="bg-[#1a1a1a] p-3 rounded border border-[#333]">
                            {block.content}
                          </div>
                        ) : (
                          <div className="bg-[#1a1a1a] p-3 rounded border border-[#333]">
                            {block.content}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-red-300 mb-2">Motivo del Rechazo:</h4>
              <p className="text-red-200">{proposal.rejectionReason || 'No se proporcionó motivo'}</p>
            </div>
            
            <div className="text-center text-sm text-red-400">
              <p className="font-medium">❌ Esta propuesta ha sido rechazada</p>
              <p className="mt-1">El autor puede revisar el motivo y crear una nueva versión</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TribunalImperialPage() {
  const { userData, loading, isReady } = useSafeAuth();
  const { proposals, clearAllProposals, createProposal } = useProposals();
  const [activeTab, setActiveTab] = useState<'overview' | 'propuestas' | 'crear' | 'votacion' | 'aprobados' | 'rechazados'>('overview');
  const [stats, setStats] = useState<TribunalStats>({
    propuestasPendientes: 0,
    propuestasAprobadas: 0,
    propuestasRechazadas: 0,
    maestrosActivos: 0
  });

  useEffect(() => {
    if (!isReady || !userData || !canUserAccessTribunal(userData.user_level)) {
      return;
    }

    // Calcular estadísticas reales basadas en las propuestas
    const pendingCount = proposals.filter(p => p.status === 'pending').length;
    const approvedCount = proposals.filter(p => p.status === 'approved').length;
    const rejectedCount = proposals.filter(p => p.status === 'rejected').length;
    
    setStats({
      propuestasPendientes: pendingCount,
      propuestasAprobadas: approvedCount,
      propuestasRechazadas: rejectedCount,
              maestrosActivos: 2 // Solo Darth Luke y Darth Nihilus son Maestros
    });
  }, [userData, isReady, proposals]);

  // Si no tiene acceso, no renderizar nada
  if (!isReady || !userData || !canUserAccessTribunal(userData.user_level)) {
    return null;
  }

  const handleSaveProposal = (content: ContentBlock[]) => {
    console.log('Contenido guardado:', content);
    alert('Propuesta guardada exitosamente. Será enviada al Tribunal para votación.');
    setActiveTab('propuestas');
  };

  const handleProposalCreated = (proposal: TribunalProposal) => {
    console.log('Propuesta creada:', proposal);
    alert('Propuesta creada exitosamente. Ahora puedes verla en la sección de Propuestas.');
    setActiveTab('propuestas');
  };

  const handlePreviewContent = (content: ContentBlock[]) => {
    console.log('Vista previa:', content);
    // La vista previa se maneja internamente en el ContentEditor
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header del Tribunal Imperial */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-[#333] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg">
              <Crown size={32} className="text-[#1a1a1a]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#FFD700]">TRIBUNAL IMPERIAL</h1>
              <p className="text-gray-300">Sistema de Creación y Aprobación de Contenido Educativo</p>
              <p className="text-sm text-gray-400 mt-1">
                Accediendo como: {userData.user_level === 5 ? 'Darth' : 'Maestro'} - {userData.email}
              </p>
            </div>
          </div>
          
          {/* Botones de navegación */}
          <div className="flex items-center space-x-4">
            <BackButton
              href="/dashboard/maestro/courses"
              className="flex items-center space-x-2 px-4 py-2 bg-[#4671D5] text-white rounded-lg hover:bg-[#5a7de0] transition-colors"
            >
              Volver
            </BackButton>
          </div>
        </div>
      </div>

      {/* Navegación Principal - Tabs Consolidados */}
      <div className="bg-[#1a1a1a] border-b border-[#333] p-4">
        <div className="flex space-x-1">
          {[
            { id: 'overview', label: 'Vista General', icon: <BarChart3 size={20} /> },
            { id: 'propuestas', label: 'Propuestas', icon: <FileText size={20} /> },
            { id: 'crear', label: 'Crear', icon: <Plus size={20} /> },
            { id: 'votacion', label: 'Votación', icon: <Users size={20} /> },
            { id: 'aprobados', label: 'Aprobados', icon: <CheckCircle size={20} /> },
            { id: 'rechazados', label: 'Rechazados', icon: <XCircle size={20} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 min-w-[120px] ${
                activeTab === tab.id
                  ? 'bg-[#FFD700] text-[#1a1a1a] font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-[#333]'
              }`}
            >
              <div className="flex items-center justify-center w-5 h-5">
              {tab.icon}
              </div>
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="p-6">
        {/* TAB: Vista General */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Estadísticas del Tribunal */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-[#FFD700] to-[#FFA500] p-6 rounded-lg text-[#1a1a1a]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-80">Propuestas Pendientes</p>
                    <p className="text-3xl font-bold">{stats.propuestasPendientes}</p>
                  </div>
                  <Clock size={32} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#10B981] to-[#059669] p-6 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-80">Aprobadas</p>
                    <p className="text-3xl font-bold">{stats.propuestasAprobadas}</p>
                  </div>
                  <CheckCircle size={32} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] p-6 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-80">Rechazadas</p>
                    <p className="text-3xl font-bold">{stats.propuestasRechazadas}</p>
                  </div>
                  <XCircle size={32} />
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#8a8a8a] to-[#6a6a6a] p-6 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-90">Maestros Activos</p>
                    <p className="text-3xl font-bold">{stats.maestrosActivos}</p>
                  </div>
                  <Users size={32} />
                </div>
              </div>
            </div>

            {/* Información del Sistema */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#FFD700]">¿Cómo Funciona el Tribunal Imperial?</h2>
                <button
                  onClick={() => {
                    if (confirm('¿Estás seguro de que quieres limpiar todas las propuestas? Esto no se puede deshacer.')) {
                      clearAllProposals();
                      alert('Todas las propuestas han sido eliminadas. Empezando de cero.');
                    }
                  }}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  🗑️ Limpiar Todo
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText size={24} className="text-[#1a1a1a]" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Creación de Propuestas</h3>
                  <p className="text-gray-400 text-sm">Darths y Maestros crean contenido educativo usando el editor visual</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users size={24} className="text-[#1a1a1a]" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Votación Unánime</h3>
                  <p className="text-gray-400 text-sm">TODOS los Maestros deben aprobar para que el contenido se publique</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={24} className="text-[#1a1a1a]" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Despliegue Automático</h3>
                  <p className="text-gray-400 text-sm">Una vez aprobado, se genera automáticamente el carrousel en las dashboards</p>
                </div>
              </div>
            </div>

            {/* Acciones Rápidas - Consolidadas */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#FFD700] mb-4">Acciones Rápidas</h2>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActiveTab('crear')}
                  className="px-6 py-3 bg-[#FFD700] text-[#1a1a1a] rounded-lg font-semibold hover:bg-[#FFA500] transition-colors flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Crear Nueva Propuesta</span>
                </button>
                <button 
                  onClick={() => setActiveTab('propuestas')}
                  className="px-6 py-3 bg-[#333] text-white rounded-lg font-semibold hover:bg-[#444] transition-colors flex items-center space-x-2"
                >
                  <FileText size={20} />
                  <span>Ver Propuestas Pendientes</span>
                </button>
                <button 
                  onClick={() => setActiveTab('votacion')}
                  className="px-6 py-3 bg-[#333] text-white rounded-lg font-semibold hover:bg-[#444] transition-colors flex items-center space-x-2"
                >
                  <Users size={20} />
                  <span>Ir a Votación</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Propuestas */}
        {activeTab === 'propuestas' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#FFD700]">Propuestas Pendientes</h2>
              <button 
                onClick={() => setActiveTab('crear')}
                className="px-6 py-3 bg-[#FFD700] text-[#1a1a1a] rounded-lg font-semibold hover:bg-[#FFA500] transition-colors flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Nueva Propuesta</span>
              </button>
            </div>
            
            <ProposalsList />
          </div>
        )}

        {/* TAB: Crear */}
        {activeTab === 'crear' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <BackButton
                onClick={() => setActiveTab('propuestas')}
                className="p-2 text-gray-400 hover:text-white hover:bg-[#333] rounded-lg transition-colors"
              >
                Volver
              </BackButton>
              <h2 className="text-2xl font-bold text-[#FFD700]">Creador de Contenido</h2>
            </div>
            
            {/* Editor de Contenido */}
            <div className="bg-[#121212] rounded-lg p-4">
              <NotionEditor
                onBlocksChange={(blocks) => {
                  console.log('Bloques del editor:', blocks);
                  // Aquí se procesarían los bloques para crear la propuesta
                }}
                onSave={(blocks, metadata) => {
                  console.log('Guardando propuesta con bloques:', blocks);
                  console.log('Metadata de la propuesta:', metadata);
                  
                  // Crear propuesta con los bloques del editor y metadata
                  const proposalData = {
                    id: `proposal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    title: metadata.title,
                    description: metadata.description,
                    content: blocks,
                    category: metadata.category,
                    targetHierarchy: metadata.targetHierarchy,
                    authorId: userData?.user_id || 'default',
                    authorName: userData?.email || 'Usuario',
                    authorLevel: userData?.user_level || 6,
                    status: 'draft',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  };
                  
                  // Guardar la propuesta usando el hook
                  try {
                    createProposal(proposalData);
                    
                    // Mostrar mensaje de éxito estilizado
                    const successMessage = document.createElement('div');
                    successMessage.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
                    successMessage.innerHTML = `
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="font-medium">¡Propuesta guardada exitosamente!</span>
                    `;
                    document.body.appendChild(successMessage);
                    
                    // Remover mensaje después de 3 segundos
                    setTimeout(() => {
                      if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                      }
                    }, 3000);
                    
                    // Redirigir a propuestas
                    setActiveTab('propuestas');
                  } catch (error) {
                    console.error('Error al guardar:', error);
                    
                    // Mostrar mensaje de error estilizado
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
                    errorMessage.innerHTML = `
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="font-medium">Error al guardar la propuesta</span>
                    `;
                    document.body.appendChild(errorMessage);
                    
                    // Remover mensaje después de 3 segundos
                    setTimeout(() => {
                      if (errorMessage.parentNode) {
                        errorMessage.parentNode.removeChild(errorMessage);
                      }
                    }, 3000);
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* TAB: Votación */}
        {activeTab === 'votacion' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#FFD700]">Sistema de Votación Unánime</h2>
              <div className="text-sm text-gray-400">
                Todas las propuestas deben ser aprobadas por TODOS los Maestros
              </div>
            </div>
            
            <VotingSystem />
          </div>
        )}

        {/* TAB: Aprobados */}
        {activeTab === 'aprobados' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#FFD700]">Contenido Aprobado</h2>
              <div className="text-sm text-gray-400">
                Propuestas que han sido aprobadas por unanimidad
              </div>
            </div>
            
            <ApprovedProposals />
          </div>
        )}

        {/* TAB: Rechazados */}
        {activeTab === 'rechazados' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#FFD700]">Contenido Rechazado</h2>
              <div className="text-sm text-gray-400">
                Propuestas que han sido rechazadas por al menos un Maestro
              </div>
            </div>
            
            <RejectedProposals />
          </div>
        )}
      </div>
    </div>
  );
}
