'use client';

import Image from 'next/image';
import InfiniteMarquee from '@/components/shared/InfiniteMarquee';
import ScrollReveal from '@/components/shared/ScrollReveal';

// Using product images as placeholder client logos
const clientLogos = [
  { name: 'MedPharm Industries', src: '/images/products/jar1.webp' },
  { name: 'NutriPro Supplements', src: '/images/products/jar2.webp' },
  { name: 'HerbaCure Naturals', src: '/images/products/jar3.webp' },
  { name: 'FitBody Nutrition', src: '/images/products/jar4.webp' },
  { name: 'PharmaTech Solutions', src: '/images/products/jar5.webp' },
  { name: 'WellnessFirst Ltd.', src: '/images/products/tube1.webp' },
  { name: 'AyurVeda Corp', src: '/images/products/medium_j_1.webp' },
  { name: 'LifeScience Pharma', src: '/images/products/Large_j_1.webp' },
];

export default function ClientLogos() {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-gray-100 overflow-hidden">
      <div className="section-container mb-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="badge-primary text-[10px]">Trusted By Industry Leaders</span>
            <h3 className="mt-3 text-xl md:text-2xl font-bold font-display text-dark">
              1000+ Brands Trust Our Packaging
            </h3>
          </div>
        </ScrollReveal>
      </div>

      {/* Row 1: Left to Right */}
      <div className="mb-4">
        <InfiniteMarquee speed="slow" direction="left">
          {clientLogos.map((client, i) => (
            <div
              key={`r1-${i}`}
              className="flex items-center gap-3 px-6 py-3 mx-2 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-300 shrink-0"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={32}
                height={32}
                className="w-8 h-8 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              />
              <span className="text-sm font-medium text-gray-400 whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </InfiniteMarquee>
      </div>

      {/* Row 2: Right to Left */}
      <div>
        <InfiniteMarquee speed="slow" direction="right">
          {[...clientLogos].reverse().map((client, i) => (
            <div
              key={`r2-${i}`}
              className="flex items-center gap-3 px-6 py-3 mx-2 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all duration-300 shrink-0"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={32}
                height={32}
                className="w-8 h-8 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              />
              <span className="text-sm font-medium text-gray-400 whitespace-nowrap">{client.name}</span>
            </div>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
}
