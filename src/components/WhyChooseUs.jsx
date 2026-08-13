import React from 'react';
import { Collapse } from 'antd';
import { ShieldCheck, Cpu, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const items = [
    {
      key: '1',
      label: (
        <div className="flex items-center gap-3 select-none">
          <ShieldCheck className="text-[#744397] w-5 h-5 flex-shrink-0" />
          <span className="font-bold text-[#212529] text-sm md:text-base tracking-tight">
            Strict Regulatory Compliance
          </span>
        </div>
      ),
      children: (
        <div className="text-gray-500 text-xs md:text-sm leading-relaxed pl-8 pr-4">
          All Parth Plastopack containers and closures are manufactured inside state-of-the-art <b>Class 100,000 cleanrooms</b> using <b>100% virgin food-grade, US-FDA compliant polymers</b> (HDPE, LDPE, PET, PP). We adhere to stringent ISO 15378 guidelines, ensuring comprehensive batch traceability, zero chemical contamination, and absolute safety for global pharmaceutical and nutraceutical markets.
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex items-center gap-3 select-none">
          <Cpu className="text-[#744397] w-5 h-5 flex-shrink-0" />
          <span className="font-bold text-[#212529] text-sm md:text-base tracking-tight">
            Advanced Precision Technology
          </span>
        </div>
      ),
      children: (
        <div className="text-gray-500 text-xs md:text-sm leading-relaxed pl-8 pr-4">
          By utilizing state-of-the-art <b>Injection Blow Molding (IBM)</b> and <b>Extrusion Blow Molding (EBM)</b> machinery, we guarantee zero-defect production runs. This precision-driven technology yields uniform wall thickness, consistent threaded profiling for leak-proof sealing, and excellent mechanical strength crucial for modern automated filling lines.
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className="flex items-center gap-3 select-none">
          <HeartHandshake className="text-[#744397] w-5 h-5 flex-shrink-0" />
          <span className="font-bold text-[#212529] text-sm md:text-base tracking-tight">
            Customer-Centric Customization
          </span>
        </div>
      ),
      children: (
        <div className="text-gray-500 text-xs md:text-sm leading-relaxed pl-8 pr-4">
          We collaborate closely with your packaging and R&D teams to provide <b>tailored color masterbatches</b> (custom opaque or translucent options), fast prototype tooling turnaround times, and <b>free physical sample kits</b> for stability and compatibility trials. Our robust logistics system guarantees reliable high-volume supply chain support.
        </div>
      ),
    },
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-white border-t border-b border-gray-100 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 select-none">
          <span className="text-[#744397] font-bold text-xs uppercase tracking-wider">
            Quality Assurance
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-charcoal mt-1 tracking-tight">
            Why Pharmaceutical Leaders Partner With Us
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-xl mx-auto">
            Engineered compliance, state-of-the-art cleanroom manufacturing, and customizable solutions built over decades of industrial experience.
          </p>
        </div>

        <Collapse
          accordion
          ghost
          items={items}
          expandIconPosition="end"
          className="border border-gray-150 rounded-2xl bg-brand-gray/50 p-3 md:p-6"
        />
      </div>
    </section>
  );
}
