import React, { useState } from 'react';
import { X, Download, Share2, Trash2, ZoomIn } from 'lucide-react';

interface Photo {
  id: string;
  imageData: string;
  timestamp: number;
  cameraType: 'front' | 'back';
}

interface PhotoGalleryProps {
  photos: Photo[];
  isOpen: boolean;
  onClose: () => void;
  onDeletePhoto: (id: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  isOpen,
  onClose,
  onDeletePhoto
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (!isOpen) return null;

  const downloadPhoto = (photo: Photo) => {
    const link = document.createElement('a');
    link.download = `ai-vision-pro-${photo.timestamp}.jpg`;
    link.href = photo.imageData;
    link.click();
  };

  const sharePhoto = async (photo: Photo) => {
    if (navigator.share) {
      try {
        // Convert data URL to blob
        const response = await fetch(photo.imageData);
        const blob = await response.blob();
        const file = new File([blob], `ai-vision-pro-${photo.timestamp}.jpg`, { type: 'image/jpeg' });
        
        await navigator.share({
          title: 'AI Vision Pro Photo',
          text: 'صورة من تطبيق AI Vision Pro',
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing photo:', error);
        // Fallback to download
        downloadPhoto(photo);
      }
    } else {
      // Fallback to download
      downloadPhoto(photo);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl w-full max-w-6xl h-full max-h-[90vh] overflow-hidden border border-neon-orange/30">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">معرض الصور</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="p-6 h-full overflow-y-auto">
          {photos.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ZoomIn className="w-12 h-12 text-slate-400" />
                </div>
                <p className="text-slate-400 text-lg">لا توجد صور محفوظة</p>
                <p className="text-slate-500 text-sm mt-2">ابدأ بالتقاط صور جديدة</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.imageData}
                    alt={`Photo ${photo.id}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Camera type indicator */}
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-white text-xs font-medium">
                      {photo.cameraType === 'front' ? 'أمامية' : 'خلفية'}
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sharePhoto(photo);
                      }}
                      className="w-8 h-8 bg-neon-emerald/80 hover:bg-neon-emerald rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePhoto(photo.id);
                      }}
                      className="w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {/* Photo */}
            <img
              src={selectedPhoto.imageData}
              alt={`Photo ${selectedPhoto.id}`}
              className="w-full h-full object-contain rounded-2xl"
            />
            
            {/* Photo info and actions */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">
                    {selectedPhoto.cameraType === 'front' ? 'الكاميرا الأمامية' : 'الكاميرا الخلفية'}
                  </p>
                  <p className="text-slate-300 text-sm">
                    {formatDate(selectedPhoto.timestamp)}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadPhoto(selectedPhoto)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-emerald to-neon-cyan text-white rounded-lg font-medium hover:scale-105 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    تحميل
                  </button>
                  <button
                    onClick={() => sharePhoto(selectedPhoto)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-orange to-neon-gold text-white rounded-lg font-medium hover:scale-105 transition-all duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                    مشاركة
                  </button>
                  <button
                    onClick={() => {
                      onDeletePhoto(selectedPhoto.id);
                      setSelectedPhoto(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:scale-105 transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};