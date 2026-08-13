import React, { useEffect } from 'react';
import { Drawer, Form, Input, InputNumber, Button, message, Space } from 'antd';
import { MailOutlined, UserOutlined, ApartmentOutlined, InfoCircleOutlined } from '@ant-design/icons';

export default function QuoteDrawer({ visible, onClose, selectedProduct }) {
  const [form] = Form.useForm();

  // Update default message when drawer visibility or product selection changes
  useEffect(() => {
    if (visible) {
      if (selectedProduct) {
        form.setFieldsValue({
          message: `Hello, I would like to request technical specifications and physical samples for: ${selectedProduct.title} (Material: ${selectedProduct.material}, Sizes: ${selectedProduct.sizes}).`,
        });
      } else {
        form.setFieldsValue({
          message: 'Hello, I am interested in Parth Plastopack primary packaging products and would like to request a catalog and bulk quote.',
        });
      }
    }
  }, [visible, selectedProduct, form]);

  const handleSubmit = (values) => {
    console.log('RFQ Data:', values);
    
    // Simulate API request loader
    const hideLoader = message.loading('Submitting your RFQ request...', 0);
    
    setTimeout(() => {
      hideLoader();
      message.success({
        content: 'Thank you! Your quote request has been received. Our B2B sales division will follow up with technical datasheets within 24 hours.',
        duration: 5,
        style: { marginTop: '10vh' }
      });
      form.resetFields();
      onClose();
    }, 1200);
  };

  return (
    <Drawer
      title={
        <div className="flex flex-col select-none">
          <span className="text-base font-bold text-brand-charcoal">Request Specs & Samples</span>
          {selectedProduct ? (
            <span className="text-xs text-gray-500 font-medium mt-0.5">
              Context: <span className="text-[#744397] font-semibold">{selectedProduct.title}</span>
            </span>
          ) : (
            <span className="text-xs text-gray-500 font-medium mt-0.5">
              Bulk Quote & Custom Packaging Request
            </span>
          )}
        </div>
      }
      placement="right"
      width={460}
      onClose={onClose}
      open={visible}
      className="font-sans"
      extra={
        <Space>
          <Button onClick={onClose} className="rounded-lg text-xs font-semibold">Cancel</Button>
        </Space>
      }
    >
      <div className="space-y-6">
        {selectedProduct && (
          <div className="bg-brand-gray p-4 rounded-xl border border-gray-150 text-xs text-gray-600 space-y-2 select-none">
            <h4 className="font-bold text-brand-charcoal text-[10px] uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <InfoCircleOutlined className="text-[#744397] text-sm" /> Product Specs Overview
            </h4>
            <p><b>Product:</b> {selectedProduct.title}</p>
            <p><b>Material:</b> {selectedProduct.material}</p>
            <p><b>Capacities:</b> {selectedProduct.sizes}</p>
            <p className="text-[11px] text-gray-500 italic"><b>Features:</b> {selectedProduct.features}</p>
          </div>
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
          className="space-y-4"
        >
          {/* Contact Name */}
          <Form.Item
            label={<span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Contact Person</span>}
            name="name"
            rules={[{ required: true, message: 'Please input your full name.' }]}
          >
            <Input 
              prefix={<UserOutlined className="text-gray-400" />} 
              placeholder="e.g. Rahul Sharma" 
              className="rounded-lg py-2 text-sm" 
            />
          </Form.Item>

          {/* Company Name */}
          <Form.Item
            label={<span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Company Name</span>}
            name="company"
            rules={[{ required: true, message: 'Please input your company or formulation brand name.' }]}
          >
            <Input 
              prefix={<ApartmentOutlined className="text-gray-400" />} 
              placeholder="e.g. Zenith LifeSciences Ltd." 
              className="rounded-lg py-2 text-sm" 
            />
          </Form.Item>

          {/* Business Email */}
          <Form.Item
            label={<span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Business Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email address.' },
              { type: 'email', message: 'Please enter a valid email format.' }
            ]}
          >
            <Input 
              prefix={<MailOutlined className="text-gray-400" />} 
              placeholder="e.g. purchase@zenithlife.com" 
              className="rounded-lg py-2 text-sm" 
            />
          </Form.Item>

          {/* Annual Volume */}
          <Form.Item
            label={<span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Estimated Annual Volume (Units)</span>}
            name="annualVolume"
            rules={[{ required: true, message: 'Please select or input estimated yearly volume.' }]}
          >
            <InputNumber
              placeholder="Minimum 10,000 units"
              className="w-full rounded-lg py-1.5 text-sm"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              min={10000}
            />
          </Form.Item>

          {/* Requirements Message */}
          <Form.Item
            label={<span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Custom Specifications</span>}
            name="message"
            rules={[{ required: true, message: 'Please enter details regarding your trial specs or query.' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Mention details like neck sizes, custom color masterbatches, sterility requirements, or immediate physical container quantity requests..."
              className="rounded-lg text-sm"
            />
          </Form.Item>

          {/* Submit CTA */}
          <Form.Item className="pt-4">
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="bg-[#744397] hover:bg-[#623583] border-none rounded-lg h-12 font-bold text-xs md:text-sm tracking-widest uppercase transition-all duration-200"
            >
              Submit B2B RFQ Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
}
