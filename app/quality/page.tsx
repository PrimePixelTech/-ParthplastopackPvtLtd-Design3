import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/shared/BackToTop';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import QualitySection from '@/components/home/QualitySection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Quality Assurance',
  description: 'ISO 15378 certified manufacturing with FDA-compliant materials. Rigorous quality testing including leak tests, drop tests, MVTR analysis, and dimensional accuracy checks.',
};

export default function QualityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative bg-gradient-to-br from-primary/5 via-white to-accent/5 py-20 md:py-28">
          <div className="section-container">
            <span className="badge-primary mb-4 inline-block">Quality Assurance</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-dark max-w-3xl">
              Uncompromising <span className="text-gradient">Quality Standards</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl leading-relaxed">
              Every product undergoes rigorous multi-point quality testing to ensure pharmaceutical-grade compliance and zero defects.
            </p>
          </div>
        </section>

        <QualitySection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}
