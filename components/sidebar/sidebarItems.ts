import { Home, User, Settings, BookOpen, BarChart3, MessageCircle, LogOut, Award, Users, TrendingUp, Layers, Star, HelpCircle, Calendar, UserPlus, LineChart } from 'lucide-react';

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