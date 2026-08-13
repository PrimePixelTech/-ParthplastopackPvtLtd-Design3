import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/shared/BackToTop';
import WhatsAppFloat from '@/components/shared/WhatsAppFloat';
import ContactSection from '@/components/home/ContactSection';
import FAQSection from '@/components/home/FAQSection';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Parth Plasto Pack for custom packaging quotes, free samples, dealer inquiries, and bulk orders. Factory in Ahmedabad, Gujarat.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative bg-gradient-to-br from-primary/5 via-white to-accent/5 py-20 md:py-28">
          <div className="section-container">
            <span className="badge-primary mb-4 inline-block">Contact Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-dark max-w-3xl">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl leading-relaxed">
              Ready to discuss your packaging needs? Our team is here to help with custom quotes, free samples, and expert consultation.
            </p>
          </div>
        </section>

        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </>
  );
}
