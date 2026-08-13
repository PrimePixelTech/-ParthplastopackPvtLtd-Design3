import React from 'react';
import { Row, Col, Card, Button, Badge, Empty } from 'antd';
import { FileTextOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Disc, Droplets, Pill, RefreshCw } from 'lucide-react';
import whiteBlackJarsImg from '../../public_html/assets/images/white_black_jars.png';
import amberJarsImg from '../../public_html/assets/images/amber_jars.png';
import bhutaniTubesImg from '../../public_html/assets/images/bhutani_tubes.png';

const mockProducts = [
  {
    id: 1,
    title: 'Securipack Tamper-Evident Closures',
    category: 'caps',
    material: 'PP (Polypropylene)',
    sizes: '28mm, 33mm, 38mm',
    features: 'Push-turn mechanism, tamper-evident security band',
    color: 'from-blue-500/10 to-indigo-500/10',
    icon: Disc,
  },
  {
    id: 2,
    title: 'Pharma Grade PET Amber Bottles',
    category: 'liquid',
    material: 'PET (Polyethylene Terephthalate)',
    sizes: '30ml - 250ml',
    features: 'High UV barrier protection, pharmaceutical grade raw material',
    color: 'from-amber-600/10 to-yellow-600/10',
    icon: Droplets,
    image: amberJarsImg, // Amber / Black double containers photo!
  },
  {
    id: 3,
    title: 'HDPE Wide-Mouth Container Jars',
    category: 'jars',
    material: 'HDPE (High Density Polyethylene)',
    sizes: '30cc - 500cc',
    features: 'Optimal moisture vapor barrier, airtight threaded neck',
    color: 'from-sky-500/10 to-blue-500/10',
    icon: Pill,
    image: whiteBlackJarsImg, // Newly uploaded white & black jars photo!
  },
  {
    id: 4,
    title: 'Effervescent Tablet Tubes',
    category: 'tubes',
    material: 'PP Tube with Desiccant Cap',
    sizes: '10 - 20 tablet capacity',
    features: 'Desiccant silica gel stopper, shock-absorbing spiral spring',
    color: 'from-emerald-500/10 to-teal-500/10',
    icon: RefreshCw,
    image: bhutaniTubesImg, // Newly uploaded labeled Bhutani tubes photo!
  },
  {
    id: 5,
    title: 'Child-Resistant CRC Caps',
    category: 'caps',
    material: 'Double-Wall PP (Outer/Inner)',
    sizes: '22mm, 28mm, 33mm',
    features: 'Strict child safety lock compliance, smooth squeeze-and-turn mechanics',
    color: 'from-violet-500/10 to-purple-500/10',
    icon: Disc,
  },
  {
    id: 6,
    title: 'LDPE Squeeze Dropper Bottles',
    category: 'liquid',
    material: 'LDPE (Low Density Polyethylene)',
    sizes: '5ml - 50ml',
    features: 'Ultra-controlled dispensing droplet tip, soft squeezable body',
    color: 'from-cyan-500/10 to-blue-500/10',
    icon: Droplets,
  },
];

const categoryLabels = {
  all: 'All Catalog',
  caps: 'Caps & Closures',
  liquid: 'Liquid Bottles',
  jars: 'Tablet Jars',
  tubes: 'Effervescent Tubes',
};

export default function ProductGrid({ activeCategory, searchQuery, onRequestProductQuote, onViewDetails }) {
  // Search & Filter Logic
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sizes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.features.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 select-none">
        <div>
          <span className="text-[#744397] font-bold text-xs uppercase tracking-wider">
            Product Catalog
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-charcoal mt-1 tracking-tight">
            Engineered Packaging Solutions
          </h2>
        </div>
        <span className="text-xs md:text-sm text-gray-400 mt-2 md:mt-0 font-medium">
          Showing {filteredProducts.length} premium products in <span className="font-semibold text-gray-600">{categoryLabels[activeCategory]}</span>
        </span>
      </div>

      {filteredProducts.length > 0 ? (
        <Row gutter={[24, 24]}>
          {filteredProducts.map((product) => {
            const IconComponent = product.icon;
            return (
              <Col xs={24} sm={12} md={8} key={product.id} className="product-fade-in">
                {/* 3D Perspective Animation Wrapper - Clicking anywhere triggers view specs sheet details */}
                <div 
                  className="card-3d-container cursor-pointer h-full"
                  onClick={() => onViewDetails(product)}
                >
                  <Card
                    hoverable
                    className="card-3d-inner h-full border border-gray-150 overflow-hidden flex flex-col justify-between"
                    bodyStyle={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
                    cover={
                      /* Transparent background, no bottom border, increased height to h-56 to fit the full bottle */
                      <div className="h-56 w-full bg-transparent flex items-center justify-center relative select-none overflow-hidden">
                        {/* Category Badge overlay */}
                        <div className="absolute top-3 right-3 z-10">
                          <Badge 
                            count={categoryLabels[product.category]} 
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', color: '#212529', fontWeight: '600', fontSize: '9px', border: '1px solid #E2E8F0', padding: '0 8px' }} 
                          />
                        </div>
                        
                        {/* Render full image with minimal padding, or fallback vector icon */}
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.title} 
                            className="card-3d-image-float w-full h-full object-contain p-2" 
                          />
                        ) : (
                          <div className={`card-3d-icon-wrap w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} shadow-md flex items-center justify-center text-[#744397]`}>
                            <IconComponent size={28} className="stroke-[1.5]" />
                          </div>
                        )}
                      </div>
                    }
                  >
                    {/* Card Content */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1 mb-2">
                          <h3 className="text-base md:text-lg font-bold text-brand-charcoal group-hover:text-[#744397] transition-colors duration-250 leading-snug">
                            {product.title}
                          </h3>
                          <InfoCircleOutlined className="text-gray-300 hover:text-[#744397] mt-1 text-sm flex-shrink-0" />
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          <div className="flex items-start text-xs">
                            <span className="font-semibold w-16 flex-shrink-0 text-gray-400 uppercase tracking-wider text-[10px]">Material</span>
                            <span className="text-brand-charcoal font-medium">{product.material}</span>
                          </div>
                          <div className="flex items-start text-xs">
                            <span className="font-semibold w-16 flex-shrink-0 text-gray-400 uppercase tracking-wider text-[10px]">Sizes</span>
                            <span className="text-brand-charcoal font-medium">{product.sizes}</span>
                          </div>
                          <div className="flex items-start text-xs">
                            <span className="font-semibold w-16 flex-shrink-0 text-gray-400 uppercase tracking-wider text-[10px]">Features</span>
                            <span className="text-gray-500 leading-relaxed text-[11px]">{product.features}</span>
                          </div>
                        </div>
                      </div>

                      {/* Primary Button */}
                      <Button
                        type="primary"
                        block
                        icon={<FileTextOutlined />}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card container details modal click
                          onRequestProductQuote(product);
                        }}
                        className="bg-[#744397] hover:bg-[#623583] border-none rounded-lg h-10 font-semibold text-xs md:text-sm tracking-wide transition-all duration-200 flex items-center justify-center mt-auto"
                      >
                        Request Specs & Samples
                      </Button>
                    </div>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div className="py-20 text-center bg-white border border-gray-150 rounded-2xl shadow-sm">
          <Empty
            description={
              <span className="text-gray-400 font-medium text-sm">
                No matching pharmaceutical packaging found. Try adjusting your query or category filters.
              </span>
            }
          />
        </div>
      )}
    </section>
  );
}
