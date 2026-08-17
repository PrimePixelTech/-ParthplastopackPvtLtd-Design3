import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ProductCategories from '@/components/home/ProductCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ProcessSection from '@/components/home/ProcessSection';
import FactorySection from '@/components/home/FactorySection';
import QualitySection from '@/components/home/QualitySection';
import ClientLogos from '@/components/home/ClientLogos';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';
import CTASection from '@/components/home/CTASection';

// Only truly client-only overlay widgets use ssr: false
const BackToTop = dynamic(() => import('@/components/shared/BackToTop'), { ssr: false });
const WhatsAppFloat = dynamic(() => import('@/components/shared/WhatsAppFloat'), { ssr: false });
const ExpoAdModal = dynamic(() => import('@/components/shared/ExpoAdModal'), { ssr: false });

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
      <ExpoAdModal />
    </>
  );
}
