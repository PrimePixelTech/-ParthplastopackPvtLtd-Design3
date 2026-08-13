'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useState } from 'react';
import { createInquiry } from '@/actions/inquiry.actions';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Our Factory',
    details: '11, Swagat Ind. Park-2, Indore-Ahmedabad Highway, Nr. Bhavda Patiya, Kuha, Ahmedabad - 382433',
  },
  { icon: Phone, title: 'Call Us', details: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: Mail, title: 'Email Us', details: 'sales@parthplastopack.com', href: 'mailto:sales@parthplastopack.com' },
  { icon: Clock, title: 'Working Hours', details: 'Mon - Sat: 9:00 AM - 7:00 PM IST' },
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await createInquiry({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        subject: data.subject,
        message: data.message,
        type: 'General Contact'
      });
      
      if (response.success) {
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); reset(); }, 3000);
      } else {
        console.error('Error submitting inquiry:', response.error);
        alert('Failed to send message. Please try again or contact us via phone.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please try again or contact us via phone.');
    }
  };

  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      <div className="section-container">
        <SectionHeading
          badge="Get In Touch"
          title="Let's Build Something Together"
          subtitle="Reach out to our sales team for custom packaging solutions, pricing, and free product samples."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Left: Contact Info + Map */}
          <ScrollReveal variant="slideLeft" className="lg:col-span-2">
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-primary/[0.08] flex items-center justify-center shrink-0 group-hover:bg-primary/[0.12] transition-colors">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-dark">{item.title}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-gray-500 hover:text-primary transition-colors">
                        {item.details}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500 leading-relaxed">{item.details}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210?text=Hello%20Parth%20Plasto%20Pack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 bg-green-50 hover:bg-green-100:bg-green-900/40 rounded-xl border border-green-200 transition-all group"
              >
                <MessageCircle size={20} className="text-green-600" />
                <div>
                  <span className="text-sm font-semibold text-green-700 block">Chat on WhatsApp</span>
                  <span className="text-xs text-green-500">Quick response guaranteed</span>
                </div>
              </a>

              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d72.5!3d23.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAzJzAwLjAiTiA3MsKwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact Form */}
          <ScrollReveal variant="slideRight" className="lg:col-span-3">
            <div className="p-6 md:p-8 rounded-3xl bg-light border border-gray-100 shadow-card">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                  <h4 className="text-xl font-bold text-dark">Message Sent!</h4>
                  <p className="text-gray-500 mt-2">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        {...register('name', { required: true })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                        placeholder="Your name"
                      />
                      {errors.name && <span className="text-xs text-red-500 mt-1">Required</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                        placeholder="you@company.com"
                      />
                      {errors.email && <span className="text-xs text-red-500 mt-1">Valid email required</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                      <input
                        {...register('phone', { required: true })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <span className="text-xs text-red-500 mt-1">Required</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                      <input
                        {...register('company')}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <input
                      {...register('subject')}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400:text-gray-500"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      {...register('message', { required: true })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-gray-400:text-gray-500"
                      placeholder="Tell us about your packaging requirements..."
                    />
                    {errors.message && <span className="text-xs text-red-500 mt-1">Required</span>}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full btn-primary py-3.5 text-sm"
                  >
                    <Send size={16} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
