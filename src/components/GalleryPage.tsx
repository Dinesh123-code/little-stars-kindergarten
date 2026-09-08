import React, { useState } from 'react';
import { GalleryItem, PageView } from '../types';
import { INITIAL_GALLERY } from '../data/initialData';
import { SafeImage } from './SafeImage';
import { Sparkles, Image, Maximize2, X, ArrowRight } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageView) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus', 'Classroom', 'Activities', 'Events'];

  const filteredItems = INITIAL_GALLERY.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-[#8B3FB0] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Moments</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black text-[#1F2A66] tracking-tight">
            Little Stars Photo Gallery
          </h1>

          <p className="text-base sm:text-lg text-[#5B6178] leading-relaxed">
            Glimpse the joy, curiosity, vibrant friendships, and proud milestones experienced every day on our campus.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1F2A66] text-white shadow-md'
                  : 'bg-slate-100 text-[#5B6178] hover:bg-slate-200 hover:text-[#1F2A66]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-100 border border-line shadow-xs cursor-pointer aspect-[4/3]"
            >
              <SafeImage
                src={item.image}
                alt={item.title}
                focalPosition="center"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A66]/90 via-[#1F2A66]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] uppercase tracking-wider text-[#FFC42E] font-bold">
                  {item.category}
                </span>
                <h4 className="font-display font-bold text-lg leading-snug text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#FFC42E]">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightview */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-[16/10] bg-black">
                <SafeImage
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-pink-100 text-[#ED2E84] text-xs font-bold">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="text-xl font-display font-black text-[#1F2A66]">
                    {selectedPhoto.title}
                  </h3>
                </div>
                <p className="text-sm text-[#5B6178]">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
