'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { processSteps } from '@/data/process';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function ProcessSection() {
  return (
    <section className="section-padding bg-light relative overflow-hidden">
      <div className="section-container">
        <SectionHeading
          badge="Our Process"
          title="From Concept to Delivery"
          subtitle="A streamlined 6-step manufacturing process ensuring quality at every stage."
        />

        {/* Desktop: Horizontal Steps with Connecting Line */}
        <div className="hidden lg:block">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Connecting Line */}
            <div className="absolute top-12 left-[8%] right-[8%] h-0.5 bg-gray-200 z-0">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-primary to-secondary origin-left"
              />
            </div>

            <div className="grid grid-cols-6 gap-4 relative z-10">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  variants={staggerItem}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Circle */}
                  <motion.div
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="w-24 h-24 rounded-full bg-white border-2 border-gray-200 group-hover:border-primary shadow-card group-hover:shadow-glow-primary flex items-center justify-center mb-4 transition-all duration-500"
                  >
                    <span className="text-3xl">{step.icon}</span>
                  </motion.div>

                  {/* Step number */}
                  <span className="text-xs font-bold text-primary/50 mb-1 tracking-wider">
                    STEP {step.step}
                  </span>

                  {/* Title */}
                  <h4 className="text-sm font-semibold text-dark mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed px-2">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile: Grid Steps */}
        <div className="lg:hidden mt-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {processSteps.map((step) => (
              <motion.div key={step.id} variants={staggerItem} className="glass-card rounded-xl p-4 flex flex-col items-center text-center border border-gray-100 bg-white shadow-sm">
                <div className="text-2xl mb-2 text-primary w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">{step.icon}</div>
                <span className="text-[10px] font-bold text-primary/60 tracking-wider mb-1">STEP {step.step}</span>
                <h4 className="text-xs sm:text-sm font-semibold text-dark mb-1">{step.title}</h4>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed line-clamp-3">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
