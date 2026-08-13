import React from 'react';
import { Button, Menu } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import logoImg from '../../public_html/assets/images/PPPLOGO.webp';

export default function Header({ onRequestQuote }) {
  const menuItems = [
    { key: 'home', label: <a href="#home" className="font-medium text-gray-600 hover:text-[#744397]">Home</a> },
    { key: 'catalog', label: <a href="#catalog" className="font-medium text-gray-600 hover:text-[#744397]">Catalog</a> },
    { key: 'why-choose-us', label: <a href="#why-choose-us" className="font-medium text-gray-600 hover:text-[#744397]">Why Us</a> },
    { key: 'contact', label: <a href="#contact" className="font-medium text-gray-600 hover:text-[#744397]">Contact</a> },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 px-4 md:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Corporate Logo Image & Subtitle */}
        <div className="flex flex-col select-none">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Parth Plasto Pack Logo" className="h-7 md:h-8 object-contain" />
          </div>
          <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1 leading-none">
            Mfg. of Pharma & Nutraceutical Packaging
          </span>
        </div>

        {/* Right Side: Nav menu & Button */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:block">
            <Menu
              mode="horizontal"
              disabledOverflow
              items={menuItems}
              className="bg-transparent border-none text-gray-600 min-w-[280px]"
              style={{ lineHeight: '36px' }}
              selectable={false}
            />
          </div>
          
          <Button
            type="primary"
            size="large"
            icon={<FileTextOutlined />}
            onClick={onRequestQuote}
            className="bg-[#744397] hover:bg-[#623583] border-none rounded-lg font-semibold text-xs md:text-sm tracking-wide shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center"
          >
            Request Bulk Quote
          </Button>
        </div>
      </div>
    </header>
  );
}
