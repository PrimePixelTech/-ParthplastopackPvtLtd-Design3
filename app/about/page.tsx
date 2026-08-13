import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/shared/BackToTop';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import AboutSection from '@/components/home/AboutSection';
import ProcessSection from '@/components/home/ProcessSection';
import ClientLogos from '@/components/home/ClientLogos';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Parth Plasto Pack Pvt. Ltd. — 25+ years of manufacturing excellence in pharmaceutical and nutraceutical plastic packaging. ISO certified, food grade, export quality.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-primary/5 via-white to-accent/5 py-20 md:py-28">
          <div className="section-container">
            <span className="badge-primary mb-4 inline-block">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-dark max-w-3xl">
              25+ Years of <span className="text-gradient">Manufacturing Excellence</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl leading-relaxed">
              From a small workshop to a state-of-the-art cleanroom facility — our journey of delivering world-class pharmaceutical packaging solutions.
            </p>
          </div>
        </section>

        <AboutSection />
        <ProcessSection />

        {/* Mission & Vision */}
        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                <h3 className="text-2xl font-bold font-display text-dark mb-4">🎯 Our Mission</h3>
                <p className="text-gray-500 leading-relaxed">
                  To be India&apos;s most trusted manufacturer of pharmaceutical-grade plastic packaging, delivering innovative, compliant, and sustainable solutions that protect and preserve health products worldwide.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/10">
                <h3 className="text-2xl font-bold font-display text-dark mb-4">🔭 Our Vision</h3>
                <p className="text-gray-500 leading-relaxed">
                  To become a globally recognized packaging partner, setting industry benchmarks in quality, innovation, and sustainability while expanding our footprint across international markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ClientLogos />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}
