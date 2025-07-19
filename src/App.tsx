import React, { useState, useEffect } from 'react';
import { Camera, SwitchCamera, Image, Settings, Zap } from 'lucide-react';
import { StatsBar } from './components/StatsBar';
import { PhotoModeGrid } from './components/PhotoModeGrid';
import { AdvancedSettings } from './components/AdvancedSettings';
import { AIToolsGrid } from './components/AIToolsGrid';
import { FloatingParticles } from './components/FloatingParticles';
import { NeuralNetwork } from './components/NeuralNetwork';
import { ControlPanel } from './components/ControlPanel';
import { CameraView } from './components/CameraView';
import { PhotoGallery } from './components/PhotoGallery';

interface Photo {
  id: string;
  imageData: string;
  timestamp: number;
  cameraType: 'front' | 'back';
}

function App() {
  const [activeMode, setActiveMode] = useState('auto');
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load photos from localStorage on mount
  useEffect(() => {
    const savedPhotos = localStorage.getItem('ai-vision-pro-photos');
    if (savedPhotos) {
      try {
        setPhotos(JSON.parse(savedPhotos));
      } catch (error) {
        console.error('Error loading photos:', error);
      }
    }
  }, []);

  // Save photos to localStorage whenever photos change
  useEffect(() => {
    localStorage.setItem('ai-vision-pro-photos', JSON.stringify(photos));
  }, [photos]);

  const handleModeSelect = (mode: string) => {
    setActiveMode(mode);
    // Add processing effect
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1500);
  };

  const handleCameraToggle = () => {
    setCameraType(prev => prev === 'front' ? 'back' : 'front');
  };

  const handleCapture = (imageData: string) => {
    const newPhoto: Photo = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      imageData,
      timestamp: Date.now(),
      cameraType
    };
    
    setPhotos(prev => [newPhoto, ...prev]);
    
    // Add capture effect
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 800);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <FloatingParticles />
      <NeuralNetwork />
      
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-neon-orange/20 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 border-4 border-neon-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-medium">معالجة بالذكاء الاصطناعي...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          {/* Camera Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCameraType('back')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                cameraType === 'back'
                  ? 'bg-gradient-to-r from-neon-orange to-neon-gold text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Camera className="w-5 h-5" />
              خلفية
            </button>
            <button
              onClick={() => setCameraType('front')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                cameraType === 'front'
                  ? 'bg-gradient-to-r from-neon-orange to-neon-gold text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <SwitchCamera className="w-5 h-5" />
              أمامية
            </button>
          </div>

          {/* Logo */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-orange via-neon-gold to-neon-emerald bg-clip-text text-transparent">
              🎯 AI Vision Pro
            </h1>
            <p className="text-slate-400 text-sm mt-1">نظام التصوير الذكي المتطور</p>
          </div>

          {/* Camera Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isCameraActive ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
            <span className="text-sm text-slate-400">
              {isCameraActive ? 'الكاميرا مفعلة' : 'الكاميرا متوقفة'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-6">
        {/* Stats Bar */}
        <StatsBar />

        {/* Camera View or Interface */}
        {isCameraActive ? (
          <div className="mb-8">
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-neon-orange/30">
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <CameraView
                  isActive={isCameraActive}
                  cameraType={cameraType}
                  onCapture={handleCapture}
                  onToggleCamera={handleCameraToggle}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Photography Modes */}
            <section className="mb-8">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-neon-orange/30">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🧠</span>
                  أوضاع التصوير الذكي المتطورة
                </h2>
                <PhotoModeGrid activeMode={activeMode} onModeSelect={handleModeSelect} />
              </div>
            </section>

            {/* Settings Panel */}
            {isSettingsOpen && (
              <section className="mb-8">
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-neon-emerald/30">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-3xl">⚙️</span>
                    الإعدادات المتقدمة
                  </h2>
                  <AdvancedSettings />
                </div>
              </section>
            )}

            {/* AI Tools */}
            <section className="mb-8">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-neon-cyan/30">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🚀</span>
                  أدوات الذكاء الاصطناعي المتطورة
                </h2>
                <AIToolsGrid />
              </div>
            </section>
          </>
        )}
      </main>

      {/* Control Panel */}
      <ControlPanel
        onCameraToggle={toggleCamera}
        onGalleryOpen={openGallery}
        onSettingsToggle={toggleSettings}
        isCameraActive={isCameraActive}
        photosCount={photos.length}
      />

      {/* Photo Gallery Modal */}
      <PhotoGallery
        photos={photos}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onDeletePhoto={handleDeletePhoto}
      />
    </div>
  );
}

export default App;