import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';

// Dynamically import below-the-fold sections to reduce initial payload
const AboutSection = dynamic(() => import('@/components/home/AboutSection'));
const ProductCategories = dynamic(() => import('@/components/home/ProductCategories'));
const FeaturedProducts = dynamic(() => import('@/components/home/FeaturedProducts'));
const WhyChooseUs = dynamic(() => import('@/components/home/WhyChooseUs'));
const ProcessSection = dynamic(() => import('@/components/home/ProcessSection'));
const FactorySection = dynamic(() => import('@/components/home/FactorySection'));
const QualitySection = dynamic(() => import('@/components/home/QualitySection'));
const ClientLogos = dynamic(() => import('@/components/home/ClientLogos'));
const FAQSection = dynamic(() => import('@/components/home/FAQSection'));
const ContactSection = dynamic(() => import('@/components/home/ContactSection'));
const CTASection = dynamic(() => import('@/components/home/CTASection'));
const BackToTop = dynamic(() => import('@/components/shared/BackToTop'), { ssr: false });
const WhatsAppFloat = dynamic(() => import('@/components/shared/WhatsAppFloat'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductCategories />
        <FeaturedProducts />
        <WhyChooseUs />
        <ProcessSection />
        <FactorySection />
        <QualitySection />
        <ClientLogos />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}
