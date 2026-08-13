import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilters from './components/CategoryFilters';
import ProductGrid from './components/ProductGrid';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import QuoteDrawer from './components/QuoteDrawer';
import ProductDetailsModal from './components/ProductDetailsModal';
import Preloader from './components/Preloader';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Product Details Modal States
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProductForDetails, setSelectedProductForDetails] = useState(null);

  const handleOpenBulkQuote = () => {
    setSelectedProduct(null);
    setIsQuoteOpen(true);
  };

  const handleOpenProductQuote = (product) => {
    setSelectedProduct(product);
    setIsQuoteOpen(true);
  };

  const handleOpenProductDetails = (product) => {
    setSelectedProductForDetails(product);
    setIsDetailsOpen(true);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#744397', // Catalogue Deep Purple
          colorBgContainer: '#FFFFFF', // Stark White
          colorText: '#212529', // Deep Slate/Charcoal text
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          borderRadius: 8,
          colorLink: '#744397',
          colorLinkHover: '#623583',
        },
        components: {
          Button: {
            controlHeight: 40,
            fontWeight: 600,
            borderRadius: 8,
            primaryShadow: '0 4px 6px -1px rgba(0, 82, 204, 0.15), 0 2px 4px -1px rgba(0, 82, 204, 0.1)',
          },
          Input: {
            controlHeight: 40,
            borderRadius: 8,
          },
          Collapse: {
            headerPadding: '14px 16px',
            contentPadding: '12px 16px',
          },
        },
      }}
    >
      <Preloader />
      <div className="min-h-screen bg-brand-gray flex flex-col font-sans antialiased">
        {/* Global Sticky Navigation Header */}
        <Header onRequestQuote={handleOpenBulkQuote} />

        <main className="flex-grow">
          {/* Centered Hero Section with Search Input */}
          <Hero onSearch={handleSearch} />

          {/* Horizontal Product Category Scrollbar */}
          <CategoryFilters 
            activeCategory={activeCategory} 
            onSelectCategory={handleSelectCategory} 
          />

          {/* Product Grid Showcase with state-driven filtering & 3D hover effects */}
          <ProductGrid 
            activeCategory={activeCategory} 
            searchQuery={searchQuery} 
            onRequestProductQuote={handleOpenProductQuote}
            onViewDetails={handleOpenProductDetails}
          />

          {/* Compliance & Packaging Technology Accordion Collapse */}
          <WhyChooseUs />
        </main>

        {/* 3-Column Corporate Contact & Location Footer */}
        <Footer />

        {/* Context-aware RFQ Slide-out Form Drawer */}
        <QuoteDrawer 
          visible={isQuoteOpen} 
          onClose={() => setIsQuoteOpen(false)} 
          selectedProduct={selectedProduct} 
        />

        {/* Technical Specification details Modal */}
        <ProductDetailsModal 
          visible={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          product={selectedProductForDetails}
          onRequestQuote={handleOpenProductQuote}
        />
      </div>
    </ConfigProvider>
  );
}
