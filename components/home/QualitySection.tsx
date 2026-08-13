'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Award, FlaskConical, FileCheck, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { staggerContainer, staggerItem } from '@/lib/animations';

const certifications = [
  { icon: Shield, title: 'ISO 15378', description: 'Primary Packaging Material Standard', color: 'from-blue-500/10 to-blue-600/10' },
  { icon: Award, title: 'US-FDA', description: 'FDA Compliant Raw Materials', color: 'from-green-500/10 to-green-600/10' },
  { icon: FlaskConical, title: 'Food Grade', description: 'FSSAI Approved for Food Contact', color: 'from-amber-500/10 to-amber-600/10' },
  { icon: FileCheck, title: 'GMP Certified', description: 'Good Manufacturing Practices', color: 'from-purple-500/10 to-purple-600/10' },
];

const qualityMetrics = [
  { label: 'Batch Quality Pass Rate', value: 99.8, color: 'bg-primary' },
  { label: 'Dimensional Accuracy', value: 99.5, color: 'bg-secondary' },
  { label: 'Customer Satisfaction', value: 98.5, color: 'bg-green-500' },
  { label: 'On-Time Delivery', value: 97, color: 'bg-amber-500' },
];

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="font-bold text-dark">{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

export default function QualitySection() {
  return (
    <section className="section-padding bg-light relative overflow-hidden">
      <div className="section-container">
        <SectionHeading
          badge="Quality Assurance"
          title="Uncompromising Quality Standards"
          subtitle="Every product undergoes rigorous multi-point quality testing to ensure pharmaceutical-grade compliance."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Certifications */}
          <ScrollReveal variant="slideLeft">
            <div>
              <h3 className="text-xl font-bold font-display text-dark mb-6">Certifications & Compliance</h3>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-2 gap-3 sm:gap-4"
              >
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.title}
                    variants={staggerItem}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-3 sm:p-5 rounded-2xl bg-white border border-gray-100 hover:border-primary/[0.15] hover:shadow-premium transition-all duration-500 flex flex-col items-center sm:items-start text-center sm:text-left"
                  >
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-2 sm:mb-3 shrink-0`}>
                      <cert.icon size={18} className="text-primary sm:hidden" />
                      <cert.icon size={20} className="text-primary hidden sm:block" />
                    </div>
                    <h4 className="text-[11px] sm:text-base font-bold text-dark leading-tight">{cert.title}</h4>
                    <p className="text-[9px] sm:text-xs text-gray-400 mt-1 line-clamp-2">{cert.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Testing checklist */}
              <div className="mt-6 p-5 rounded-2xl bg-white border border-gray-100">
                <h4 className="text-sm font-semibold text-dark mb-3">Quality Testing Includes:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Dimensional Accuracy', 'Leak Testing', 'Drop Impact Test', 'MVTR Analysis', 'Chemical Compatibility', 'Visual Inspection'].map((test) => (
                    <div key={test} className="flex items-start sm:items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm text-gray-500">
                      <CheckCircle2 size={12} className="text-green-500 shrink-0 mt-0.5 sm:mt-0 sm:w-[14px] sm:h-[14px]" />
                      <span className="leading-tight">{test}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Quality Metrics */}
          <ScrollReveal variant="slideRight">
            <div>
              <h3 className="text-xl font-bold font-display text-dark mb-6">Quality Metrics</h3>
              <div className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-card">
                <div className="space-y-6">
                  {qualityMetrics.map((metric) => (
                    <ProgressBar
                      key={metric.label}
                      label={metric.label}
                      value={metric.value}
                      color={metric.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
