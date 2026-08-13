import React from 'react';
import { Modal, Button, Badge, Descriptions, Tag } from 'antd';
import { FileTextOutlined, SafetyCertificateOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

export default function ProductDetailsModal({ visible, onClose, product, onRequestQuote }) {
  if (!product) return null;
  const IconComponent = product.icon;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-brand-charcoal text-base md:text-lg font-bold border-b border-gray-100 pb-3 select-none">
          <InfoCircleOutlined className="text-[#744397]" />
          <span>Technical Product Specification Sheet</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} className="rounded-lg text-xs font-semibold">
          Close Specification Sheet
        </Button>,
        <Button
          key="rfq"
          type="primary"
          icon={<FileTextOutlined />}
          onClick={() => {
            onClose();
            onRequestQuote(product);
          }}
          className="bg-[#744397] hover:bg-[#623583] border-none rounded-lg text-xs font-semibold"
        >
          Request Specs & Physical Samples
        </Button>,
      ]}
      width={680} // Restored back to compact 680 width for a clean look
      centered
      className="font-sans"
    >
      <div className="py-4 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Side: Product Image (or fallback vector icon) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center bg-gradient-to-br from-brand-gray to-gray-200/40 border border-gray-150 rounded-2xl p-6 min-h-[220px] select-none">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-28 h-28 object-contain drop-shadow-md mb-4" 
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#744397] mb-4">
              <IconComponent size={32} className="stroke-[1.5]" />
            </div>
          )}
          <Badge 
            count="GMP STANDARDS" 
            style={{ backgroundColor: '#744397', color: '#FFFFFF', fontWeight: 'bold', fontSize: '8px', padding: '0 8px' }} 
          />
          <span className="text-[10px] text-gray-400 mt-4 font-semibold uppercase tracking-widest">
            Pharma Grade Compliant
          </span>
        </div>

        {/* Right Side: Detailed Tech Specs Table */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-brand-charcoal mb-1 tracking-tight">
              {product.title}
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              {product.features}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 select-none">
              Technical Specifications
            </h4>
            <Descriptions column={1} size="small" bordered className="text-xs font-sans">
              <Descriptions.Item label={<span className="font-bold text-gray-500">Polymer Resin</span>}>
                {product.material}
              </Descriptions.Item>
              <Descriptions.Item label={<span className="font-bold text-gray-500">Capacities</span>}>
                {product.sizes}
              </Descriptions.Item>
              <Descriptions.Item label={<span className="font-bold text-gray-500">Manufacture Zone</span>}>
                Class 100,000 Cleanroom (ISO 8 / Schedule M)
              </Descriptions.Item>
              <Descriptions.Item label={<span className="font-bold text-gray-500">US-FDA Registry</span>}>
                Active Drug Master File (DMF #27382)
              </Descriptions.Item>
              <Descriptions.Item label={<span className="font-bold text-gray-500">Quality Standard</span>}>
                ISO 15378:2017 (Primary Pharma Packaging)
              </Descriptions.Item>
              <Descriptions.Item label={<span className="font-bold text-gray-500">Tooling Status</span>}>
                Standard Molds Available (Custom shapes on request)
              </Descriptions.Item>
            </Descriptions>
          </div>

          {/* Quality Badges */}
          <div className="flex gap-2 pt-2 flex-wrap select-none">
            <Tag color="blue" icon={<SafetyCertificateOutlined />} className="rounded-md font-semibold text-[9px] px-2 py-0.5">
              100% Virgin Resins
            </Tag>
            <Tag color="cyan" icon={<CheckCircleOutlined />} className="rounded-md font-semibold text-[9px] px-2 py-0.5">
              Heavy Metal Compliant
            </Tag>
            <Tag color="green" className="rounded-md font-semibold text-[9px] px-2 py-0.5">
              BPA & Phthalate Free
            </Tag>
          </div>
        </div>
        
      </div>
    </Modal>
  );
}
