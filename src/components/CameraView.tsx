import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Download, RotateCcw } from 'lucide-react';
import { CameraFilters } from './CameraFilters';

interface CameraViewProps {
  isActive: boolean;
  cameraType: 'front' | 'back';
  onCapture: (imageData: string) => void;
  onToggleCamera: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  isActive,
  cameraType,
  onCapture,
  onToggleCamera
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState('none');

  useEffect(() => {
    const initCamera = async () => {
      try {
        setError('');
        
        // Stop existing stream
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }

        if (!isActive) {
          setIsStreaming(false);
          return;
        }

        const constraints = {
          video: {
            facingMode: cameraType === 'front' ? 'user' : 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          setIsStreaming(true);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('لا يمكن الوصول إلى الكاميرا. تأكد من منح الإذن للتطبيق.');
        setIsStreaming(false);
      }
    };

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isActive, cameraType, stream]);

  const startCamera = async () => {
    try {
      setError('');
      
      // Stop existing stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: cameraType === 'front' ? 'user' : 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('لا يمكن الوصول إلى الكاميرا. تأكد من منح الإذن للتطبيق.');
      setIsStreaming(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsStreaming(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(imageData);
    onCapture(imageData);

    // Add capture effect
    const flash = document.createElement('div');
    flash.className = 'fixed inset-0 bg-white opacity-80 z-50 pointer-events-none';
    document.body.appendChild(flash);
    
    setTimeout(() => {
      document.body.removeChild(flash);
    }, 150);
  };

  const downloadImage = () => {
    if (!capturedImage) return;

    const link = document.createElement('a');
    link.download = `ai-vision-pro-${Date.now()}.jpg`;
    link.href = capturedImage;
    link.click();
  };

  const retakePhoto = () => {
    setCapturedImage('');
  };

  const getFilterStyle = (filterId: string) => {
    const filters: Record<string, string> = {
      none: 'none',
      vintage: 'sepia(0.5) contrast(1.2) brightness(1.1)',
      dramatic: 'contrast(1.5) brightness(0.9) saturate(1.3)',
      cool: 'hue-rotate(180deg) saturate(1.2) brightness(1.1)',
      warm: 'hue-rotate(30deg) saturate(1.3) brightness(1.2)',
      vivid: 'saturate(1.8) contrast(1.3) brightness(1.1)'
    };
    return filters[filterId] || 'none';
  };

  if (!isActive) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <CameraOff className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">الكاميرا غير مفعلة</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-2xl flex items-center justify-center border border-red-500/30">
        <div className="text-center p-6">
          <Camera className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={startCamera}
            className="px-6 py-3 bg-gradient-to-r from-neon-orange to-neon-gold text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (capturedImage) {
    return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <img
          src={capturedImage}
          alt="Captured"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Captured image controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={retakePhoto}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            <RotateCcw className="w-5 h-5" />
            إعادة التقاط
          </button>
          <button
            onClick={downloadImage}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-emerald to-neon-cyan text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            <Download className="w-5 h-5" />
            تحميل
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Video stream */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        style={{ filter: getFilterStyle(activeFilter) }}
        autoPlay
        playsInline
        muted
      />
      
      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Camera overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-white/20" />
          ))}
        </div>
        
        {/* Center focus indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 border-2 border-neon-orange rounded-full animate-pulse" />
          <div className="absolute inset-2 border border-white/50 rounded-full" />
        </div>
        
        {/* Camera info overlay */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
          <p className="text-white text-sm font-medium">
            {cameraType === 'front' ? 'الكاميرا الأمامية' : 'الكاميرا الخلفية'}
          </p>
        </div>
        
        {/* Recording indicator */}
        {isStreaming && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/80 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">مباشر</span>
          </div>
        )}
      </div>
      
      {/* Capture button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <button
          onClick={capturePhoto}
          className="w-20 h-20 bg-gradient-to-r from-neon-orange to-neon-gold rounded-full border-4 border-white/30 hover:scale-110 transition-all duration-300 shadow-2xl"
        >
          <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </button>
      </div>
      
      {/* Camera switch button */}
      <div className="absolute bottom-8 right-8 pointer-events-auto">
        <button
          onClick={onToggleCamera}
          className="w-14 h-14 bg-black/50 backdrop-blur-sm rounded-full border border-white/30 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <RotateCcw className="w-6 h-6 text-white" />
        </button>
      </div>
      
      {/* Camera Filters */}
      <CameraFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
    </div>
  );
};