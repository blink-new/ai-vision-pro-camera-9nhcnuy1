import React, { useState } from 'react';
import { Palette, Sun, Moon, Contrast, Sparkles } from 'lucide-react';

interface Filter {
  id: string;
  name: string;
  icon: React.ReactNode;
  cssFilter: string;
  gradient?: string;
}

interface CameraFiltersProps {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

export const CameraFilters: React.FC<CameraFiltersProps> = ({
  onFilterChange,
  activeFilter
}) => {
  const filters: Filter[] = [
    {
      id: 'none',
      name: 'طبيعي',
      icon: <Sun className="w-4 h-4" />,
      cssFilter: 'none'
    },
    {
      id: 'vintage',
      name: 'كلاسيكي',
      icon: <Palette className="w-4 h-4" />,
      cssFilter: 'sepia(0.5) contrast(1.2) brightness(1.1)',
      gradient: 'from-amber-500/20 to-orange-500/20'
    },
    {
      id: 'dramatic',
      name: 'درامي',
      icon: <Contrast className="w-4 h-4" />,
      cssFilter: 'contrast(1.5) brightness(0.9) saturate(1.3)',
      gradient: 'from-slate-500/20 to-slate-700/20'
    },
    {
      id: 'cool',
      name: 'بارد',
      icon: <Moon className="w-4 h-4" />,
      cssFilter: 'hue-rotate(180deg) saturate(1.2) brightness(1.1)',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'warm',
      name: 'دافئ',
      icon: <Sun className="w-4 h-4" />,
      cssFilter: 'hue-rotate(30deg) saturate(1.3) brightness(1.2)',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      id: 'vivid',
      name: 'حيوي',
      icon: <Sparkles className="w-4 h-4" />,
      cssFilter: 'saturate(1.8) contrast(1.3) brightness(1.1)',
      gradient: 'from-pink-500/20 to-purple-500/20'
    }
  ];

  return (
    <div className="absolute bottom-20 left-4 right-4 pointer-events-auto">
      <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
        <h3 className="text-white text-sm font-medium mb-3 text-center">الفلاتر</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 min-w-[70px] ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-neon-orange to-neon-gold text-white scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {filter.icon}
              </div>
              <span className="text-xs font-medium">{filter.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};