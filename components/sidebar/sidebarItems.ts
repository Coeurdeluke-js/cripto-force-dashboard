import { Home, User, Settings, BookOpen, BarChart3, MessageCircle, LogOut, Award, Users, TrendingUp, Layers, Star, HelpCircle, Calendar, UserPlus, LineChart, Crown, Shield, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

export const sidebarItems = [
  {
    label: 'Dashboard',
    href: '/dashboard/iniciado',
    icon: Home
  },
  {
    label: 'Módulos',
    href: '/dashboard/iniciado/modules',
    icon: BookOpen
  },
  {
    label: 'Progreso',
    href: '/dashboard/iniciado/progress',
    icon: BarChart3
  },
  {
    label: 'TradingView',
    href: '/dashboard/iniciado/trading',
    icon: LineChart
  },
  {
    label: 'Mi Código de Referido',
    href: '/dashboard/iniciado/referral-code',
    icon: UserPlus
  },
  {
    label: 'Configuración',
    href: '/dashboard/iniciado/settings',
    icon: Settings
  }
];

export const sidebarItemsAcolito = [
  { label: "Inicio", href: "/dashboard/acolito", icon: Home },
  { label: "Explora la Academia", href: "/dashboard/academia", icon: BookOpen },
  { label: "Convertirse en Acólito", href: "/dashboard/acolito/convertirse", icon: Award },
  { label: "Eventos abiertos", href: "/dashboard/acolito/eventos", icon: Calendar },
  { label: "Ajustes básicos", href: "/dashboard/acolito/ajustes", icon: Settings }
];

// Items para Darths (Nivel 5)
export const sidebarItemsDarth = [
  { label: "Dashboard", href: "/dashboard/darth", icon: Home },
  { label: "Cursos", href: "/dashboard/darth/courses", icon: BookOpen },
  { label: "TRIBUNAL IMPERIAL", href: "/dashboard/tribunal-imperial", icon: Crown },
  { label: "Mis Propuestas", href: "/dashboard/tribunal-imperial/propuestas", icon: FileText },
  { label: "Estadísticas", href: "/dashboard/darth/stats", icon: BarChart3 },
  { label: "Configuración", href: "/dashboard/darth/settings", icon: Settings }
];

// Items para Maestros (Nivel 6)
export const sidebarItemsMaestro = [
  { label: "Dashboard", href: "/dashboard/maestro", icon: Home },
  { label: "Cursos", href: "/dashboard/maestro/courses", icon: BookOpen },
  { label: "TRIBUNAL IMPERIAL", href: "/dashboard/tribunal-imperial", icon: Crown },
  { label: "Propuestas Pendientes", href: "/dashboard/tribunal-imperial/propuestas", icon: Clock },
  { label: "Sistema de Votación", href: "/dashboard/tribunal-imperial/votacion", icon: CheckCircle },
  { label: "Contenido Aprobado", href: "/dashboard/tribunal-imperial/aprobados", icon: CheckCircle },
  { label: "Contenido Rechazado", href: "/dashboard/tribunal-imperial/rechazados", icon: XCircle },
  { label: "Estadísticas", href: "/dashboard/maestro/stats", icon: BarChart3 },
  { label: "Configuración", href: "/dashboard/maestro/settings", icon: Settings }
];