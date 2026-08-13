import React from 'react';
import { Input } from 'antd';

export default function Hero({ onSearch }) {
  return (
    <section id="home" className="bg-[#F8F9FA] py-16 md:py-24 px-4 text-center border-b border-gray-100">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Regulatory Badge */}
        <span className="bg-[#744397]/10 text-[#744397] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-6 select-none">
          ISO 15378 & GMP Standard Cleanroom Facilities
        </span>

        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#212529] mb-6 leading-tight max-w-3xl">
          Your Trusted Manufacturing Partner for Specialized Pharma Closures & Containers.
        </h1>

        {/* Sub-headline */}
        <p className="text-base md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed font-light">
          High-quality, sterile, and compliant plastic packaging engineered for global pharmaceutical and nutraceutical standards.
        </p>

        {/* Input Block */}
        <div className="w-full max-w-xl shadow-lg rounded-2xl overflow-hidden bg-white p-1 border border-gray-150 transition-all duration-300 hover:shadow-xl">
          <Input.Search
            placeholder="Search bottles, sizes, capacities, or caps..."
            allowClear
            enterButton="Search Catalog"
            size="large"
            onSearch={onSearch}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full border-none"
          />
        </div>

        {/* Search Helper Tags */}
        <div className="mt-4 text-xs text-gray-400 flex items-center justify-center gap-3 flex-wrap">
          <span>Popular: <span className="text-[#744397] cursor-pointer hover:underline" onClick={() => onSearch('HDPE')}>HDPE Bottles</span></span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span><span className="text-[#744397] cursor-pointer hover:underline" onClick={() => onSearch('Effervescent')}>Effervescent Tubes</span></span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span><span className="text-[#744397] cursor-pointer hover:underline" onClick={() => onSearch('Securipack')}>Securipack Caps</span></span>
        </div>
      </div>
    </section>
  );
}
