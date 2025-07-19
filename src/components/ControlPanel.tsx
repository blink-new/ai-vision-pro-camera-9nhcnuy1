import React from 'react';
import { Camera, CameraOff, Image, Settings, Zap } from 'lucide-react';

interface ControlPanelProps {
  onCameraToggle: () => void;
  onGalleryOpen: () => void;
  onSettingsToggle: () => void;
  isCameraActive: boolean;
  photosCount: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onCameraToggle,
  onGalleryOpen,
  onSettingsToggle,
  isCameraActive,
  photosCount
}) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-30">
      {/* Settings Button */}
      <button
        onClick={onSettingsToggle}
        className="w-14 h-14 bg-gradient-to-r from-neon-cyan to-neon-emerald rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-2xl backdrop-blur-sm"
        title="الإعدادات"
      >
        <Settings className="w-6 h-6 text-white" />
      </button>

      {/* Gallery Button */}
      <button
        onClick={onGalleryOpen}
        className="relative w-14 h-14 bg-gradient-to-r from-neon-magenta to-neon-orange rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-2xl backdrop-blur-sm"
        title="معرض الصور"
      >
        <Image className="w-6 h-6 text-white" />
        {photosCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
            {photosCount > 99 ? '99+' : photosCount}
          </div>
        )}
      </button>

      {/* AI Processing Button */}
      <button
        className="w-14 h-14 bg-gradient-to-r from-neon-emerald to-neon-cyan rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-2xl backdrop-blur-sm"
        title="معالجة بالذكاء الاصطناعي"
      >
        <Zap className="w-6 h-6 text-white animate-pulse" />
      </button>

      {/* Main Camera Button */}
      <button
        onClick={onCameraToggle}
        className={`w-20 h-20 rounded-full border-4 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-2xl backdrop-blur-sm ${
          isCameraActive
            ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse'
            : 'bg-gradient-to-r from-neon-orange to-neon-gold'
        }`}
        title={isCameraActive ? 'إيقاف الكاميرا' : 'تشغيل الكاميرا'}
      >
        {isCameraActive ? (
          <CameraOff className="w-10 h-10 text-white" />
        ) : (
          <Camera className="w-10 h-10 text-white" />
        )}
      </button>
    </div>
  );
};