import { Home, User, Settings, BookOpen, BarChart2, MessageCircle, LogOut, Award, Users, TrendingUp, Layers, Star, HelpCircle, Calendar, UserPlus } from 'lucide-react';

export const sidebarItems = [
  { label: "Panel General", href: "/dashboard", icon: Home },
  { label: "Mensaje de bienvenida", href: "/dashboard/mensaje", icon: MessageCircle },
  { label: "Explora la Academia", href: "/dashboard/iniciado/cursos", icon: BookOpen },
  { label: "Sistema de Referidos", href: "/login/referidos", icon: UserPlus },
  { label: "Ajustes básicos", href: "/dashboard/iniciado/ajustes-basicos", icon: Settings }
];

export const sidebarItemsAcolito = [
  { label: "Inicio", href: "/dashboard/acolito", icon: Home },
  { label: "Explora la Academia", href: "/dashboard/academia", icon: BookOpen },
  { label: "Convertirse en Acólito", href: "/dashboard/acolito/convertirse", icon: Award },
  { label: "Eventos abiertos", href: "/dashboard/acolito/eventos", icon: Calendar },
  { label: "Ajustes básicos", href: "/dashboard/acolito/ajustes", icon: Settings }
];