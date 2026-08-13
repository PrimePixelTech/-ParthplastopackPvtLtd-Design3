import React from 'react';
import { Button } from 'antd';
import { MapPin, Phone, Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import logoImg from '../../public_html/assets/images/PPPLOGO.webp';

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-charcoal text-gray-400 py-16 px-4 md:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Column 1: Company Profile & Location */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white select-none">
            <img src={logoImg} alt="Parth Plasto Pack Logo" className="h-7 md:h-8 object-contain brightness-0 invert" />
          </div>
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
            Dedicated manufacturers of high-end primary plastic packaging products for global pharmaceutical, healthcare, and nutraceutical brands.
          </p>
          <div className="flex items-start gap-3 mt-4 text-xs md:text-sm">
            <MapPin size={18} className="text-[#744397] mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <span className="block leading-relaxed">
                11, Swagat Ind. Park-2, Indore - Ahmedabad Highway, Nr. Bhavda Patiya, Kuha, Ahmedabad, Gujarat, India.
              </span>
              <a
                href="https://maps.google.com/?q=11,+Swagat+Ind.+Park-2,+Kuha,+Ahmedabad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#744397] hover:text-[#623583] font-semibold transition-colors duration-250 mt-1"
              >
                <span>View Factory on Google Maps</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4 md:pl-12">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider tracking-widest select-none">
            Quick Navigation
          </h3>
          <ul className="space-y-2.5 text-xs md:text-sm">
            <li>
              <a href="#catalog" className="hover:text-white transition-colors duration-200 font-medium">
                Product Catalog
              </a>
            </li>
            <li>
              <a href="#why-choose-us" className="hover:text-white transition-colors duration-200 font-medium">
                Why Choose Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                Compliance & Quality Reports
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200 font-medium">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Direct Actions */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider tracking-widest select-none">
            Contact & Instant RFQ
          </h3>
          <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">
            Reach out to our B2B sales office directly for customized production capacities, toolings, and free physical samples.
          </p>
          <div className="space-y-3 pt-1 text-xs md:text-sm">
            <a
              href="mailto:sales@parthplastopack.com"
              className="flex items-center gap-2.5 hover:text-white transition-colors duration-200 font-medium group"
            >
              <Mail size={16} className="text-[#744397] group-hover:text-white transition-colors duration-200" />
              <span>sales@parthplastopack.com</span>
            </a>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2.5 hover:text-white transition-colors duration-200 font-medium group"
            >
              <Phone size={16} className="text-[#744397] group-hover:text-white transition-colors duration-200" />
              <span>+91 98765 43210</span>
            </a>
          </div>

          <div className="pt-4">
            <Button
              type="default"
              href="https://wa.me/919876543210?text=Hello%20Parth%20Plasto%20Pack,%20we%2520are%2520interested%2520in%2520requesting%2520quotes%2520and%252520samples%2520for%2520pharma%2520packaging."
              target="_blank"
              icon={<MessageSquare size={16} className="mr-1.5" />}
              className="bg-green-600 hover:bg-green-500 text-white border-none rounded-lg h-10 font-bold text-xs tracking-wide transition-colors duration-200 flex items-center justify-center shadow-md w-full sm:w-auto"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center text-xs text-gray-500 font-light select-none">
        <p>© 2026 Parth Plasto Pack. All Rights Reserved. Made with Precision in India.</p>
      </div>
    </footer>
  );
}
