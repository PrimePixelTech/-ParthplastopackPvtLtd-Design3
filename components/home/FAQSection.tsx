'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { faqs } from '@/data/faq';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-light relative overflow-hidden">
      <div className="section-container">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our products, services, and manufacturing capabilities."
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="rounded-2xl bg-white border border-gray-100 overflow-hidden hover:border-primary/10 transition-colors duration-300"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      openIndex === i ? 'bg-primary/10' : 'bg-gray-100 group-hover:bg-primary/5'
                    }`}>
                      <HelpCircle size={16} className={`transition-colors duration-300 ${
                        openIndex === i ? 'text-primary' : 'text-gray-400'
                      }`} />
                    </div>
                    <span className={`text-sm md:text-base font-semibold transition-colors duration-300 ${
                      openIndex === i ? 'text-primary' : 'text-dark'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={18} className={`transition-colors duration-300 ${
                      openIndex === i ? 'text-primary' : 'text-gray-400'
                    }`} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pl-[4.25rem]">
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
