# Script para arreglar solo los imports y directivas que fueron escapados incorrectamente
$files = @(
    "app/dashboard/iniciado/Practico/2-introduccion-analisis-tecnico/contenido/page.tsx",
    "app/dashboard/iniciado/Practico/4-fibonacci-medias/contenido/page.tsx",
    "app/dashboard/iniciado/Practico/5-estocastico-bollinger/contenido/page.tsx",
    "app/dashboard/iniciado/Practico/7-analisis-fundamental/contenido/page.tsx",
    "app/dashboard/iniciado/Practico/8-correlaciones-mercados/contenido/page.tsx",
    "app/dashboard/iniciado/Practico/9-gestion-riesgo/contenido/page.tsx",
    "app/dashboard/iniciado/Teorico/1-introduccion-logica-economica/contenido/page.tsx",
    "app/dashboard/iniciado/Teorico/3-accion-gobierno-mercados/contenido/page.tsx",
    "app/dashboard/iniciado/Teorico/4-competencia-perfecta/contenido/page.tsx",
    "app/dashboard/iniciado/Teorico/6-tecnologia-blockchain/contenido/page.tsx",
    "app/dashboard/iniciado/Teorico/7-criptomonedas/contenido/page.tsx",
    "app/dashboard/iniciado/Teorico/8-operaciones-criptomonedas/contenido/page.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Procesando: $file"
        
        # Leer el contenido del archivo
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Reemplazar imports y directivas específicos
        $content = $content -replace "&apos;use client&apos;", "'use client'"
        $content = $content -replace "import React from &apos;react&apos;", "import React from 'react'"
        $content = $content -replace "import React, \{ useState \} from &apos;react&apos;", "import React, { useState } from 'react'"
        $content = $content -replace "import BackButton from &apos;@/components/ui/BackButton&apos;", "import BackButton from '@/components/ui/BackButton'"
        $content = $content -replace "import Link from &apos;next/link&apos;", "import Link from 'next/link'"
        $content = $content -replace "import \{ BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle \} from &apos;lucide-react&apos;", "import { BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'"
        $content = $content -replace "import \{ Droplet, Gem, Hammer, TrendingUp, ChevronDown, ChevronUp, CheckCircle, BarChart3 \} from &apos;lucide-react&apos;", "import { Droplet, Gem, Hammer, TrendingUp, ChevronDown, ChevronUp, CheckCircle, BarChart3 } from 'lucide-react'"
        $content = $content -replace "import \{ DollarSign, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, AlertTriangle \} from &apos;lucide-react&apos;", "import { DollarSign, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, AlertTriangle } from 'lucide-react'"
        $content = $content -replace "import \{ Brain, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, BookOpen \} from &apos;lucide-react&apos;", "import { Brain, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, BookOpen } from 'lucide-react'"
        $content = $content -replace "import \{ BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain \} from &apos;lucide-react&apos;", "import { BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain } from 'lucide-react'"
        $content = $content -replace "import \{ BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign \} from &apos;lucide-react&apos;", "import { BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign } from 'lucide-react'"
        $content = $content -replace "import \{ BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign, AlertTriangle \} from &apos;lucide-react&apos;", "import { BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign, AlertTriangle } from 'lucide-react'"
        $content = $content -replace "import \{ BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign, AlertTriangle, BarChart3 \} from &apos;lucide-react&apos;", "import { BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign, AlertTriangle, BarChart3 } from 'lucide-react'"
        $content = $content -replace "import \{ BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign, AlertTriangle, BarChart3, Droplet \} from &apos;lucide-react&apos;", "import { BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign, AlertTriangle, BarChart3, Droplet } from 'lucide-react'"
        $content = $content -replace "import \{ BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign, AlertTriangle, BarChart3, Droplet, Gem \} from &apos;lucide-react&apos;", "import { BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign, AlertTriangle, BarChart3, Droplet, Gem } from 'lucide-react'"
        $content = $content -replace "import \{ BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign, AlertTriangle, BarChart3, Droplet, Gem, Hammer \} from &apos;lucide-react&apos;", "import { BookOpen, Users, TrendingUp, Shield, Target, Zap, ChevronDown, ChevronUp, CheckCircle, Brain, DollarSign, AlertTriangle, BarChart3, Droplet, Gem, Hammer } from 'lucide-react'"
        
        # Escribir el contenido de vuelta al archivo
        $content | Set-Content $file -Encoding UTF8
        
        Write-Host "Archivo procesado: $file"
    } else {
        Write-Host "Archivo no encontrado: $file"
    }
}

Write-Host "Proceso completado!" 