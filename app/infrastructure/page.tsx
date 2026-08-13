import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/shared/BackToTop';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import FactorySection from '@/components/home/FactorySection';
import ProcessSection from '@/components/home/ProcessSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Infrastructure',
  description: 'Explore our state-of-the-art manufacturing infrastructure — cleanroom facilities, injection moulding machinery, blow moulding, quality testing labs, and warehousing.',
};

export default function InfrastructurePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative bg-gradient-to-br from-primary/5 via-white to-accent/5 py-20 md:py-28">
          <div className="section-container">
            <span className="badge-primary mb-4 inline-block">Our Infrastructure</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-dark max-w-3xl">
              World-Class <span className="text-gradient">Manufacturing Facility</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl leading-relaxed">
              Our ISO-certified cleanroom facility in Ahmedabad is equipped with cutting-edge injection moulding and blow moulding machinery.
            </p>
          </div>
        </section>

        <FactorySection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}
