import React from 'react';
import { Grid } from 'antd';
import { Layers } from 'lucide-react';
import capsImg from '../../public_html/assets/images/caps_closures.png';
import liquidImg from '../../public_html/assets/images/amber_jars.png';
import jarsImg from '../../public_html/assets/images/white_black_jars.png';
import tubesImg from '../../public_html/assets/images/bhutani_tubes.png';

const { useBreakpoint } = Grid;

const categories = [
  { id: 'all', name: 'All Catalog', icon: Layers },
  { id: 'caps', name: 'Caps & Closures', image: capsImg },
  { id: 'liquid', name: 'Liquid Bottles', image: liquidImg },
  { id: 'jars', name: 'Tablet Jars', image: jarsImg },
  { id: 'tubes', name: 'Effervescent Tubes', image: tubesImg },
];

export default function CategoryFilters({ activeCategory, onSelectCategory }) {
  const screens = useBreakpoint();

  return (
    <div id="catalog" className="w-full bg-white border-b border-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          Browse Categories
        </h2>
        
        {/* Horizontal scrollable row */}
        <div className="flex items-center md:justify-center gap-6 md:gap-10 overflow-x-auto pb-4 px-2 scrollbar-none snap-x">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = activeCategory === cat.id;
            
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center gap-3 focus:outline-none group cursor-pointer snap-center min-w-[90px] flex-shrink-0"
              >
                {/* Circular Icon / Image Container */}
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 border overflow-hidden ${
                    isActive
                      ? cat.image
                        ? 'bg-white border-[#744397] border-2 scale-110 shadow-lg shadow-[#744397]/15'
                        : 'bg-[#744397] border-[#744397] text-white scale-110 shadow-lg shadow-[#744397]/25'
                      : 'bg-brand-gray border-gray-150 text-gray-500 group-hover:bg-white group-hover:border-gray-300 group-hover:text-[#744397] group-hover:scale-105'
                  }`}
                >
                  {cat.image ? (
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className={`w-full h-full object-contain p-2 rounded-full transition-all duration-300 ${
                        isActive ? 'scale-105' : ''
                      }`}
                    />
                  ) : (
                    <IconComponent size={22} className="stroke-[1.75]" />
                  )}
                </div>
                
                {/* Category Name */}
                <span
                  className={`text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-[#744397]'
                      : 'text-gray-500 group-hover:text-brand-charcoal'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
