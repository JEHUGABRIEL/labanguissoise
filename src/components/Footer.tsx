import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-brand-dark text-white/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark font-serif font-bold text-lg">
                LB
              </div>
              <span className="font-serif text-xl font-semibold tracking-wide text-white">
                La Banguissoise
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              {t('footer.brandDesc')}
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="text-white/60 hover:text-brand-gold transition-colors">
                
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-brand-gold transition-colors">
                
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="text-start">
                  KG 169/29, Kisementi Remera
                  <br />
                  Kigali, Rwanda
                  <br />
                  <span className="text-white/50 text-xs">
                    (Près du Kigali Convention Center)
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>+250 725 415 883</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <a
                  href="mailto:labanguissoise250@gmail.com"
                  className="hover:text-white transition-colors">
                  
                  labanguissoise250@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6">{t('footer.horaires')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <div className="text-start">
                  <p className="text-white font-medium mb-1">{t('footer.restaurant')}</p>
                  <p>{t('footer.tousLesJours')}</p>
                  <p>{t('footer.jusqua23h')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pt-2">
                <Clock
                  size={18}
                  className="text-brand-gold shrink-0 mt-0.5 opacity-0" />
                
                <div>
                  <p className="text-white font-medium mb-1">{t('footer.hebergement')}</p>
                  <p>{t('footer.reception247')}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6">{t('footer.liensRapides')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/restaurant"
                  className="hover:text-brand-gold transition-colors">
                  
                  {t('footer.leRestaurant')}
                </Link>
              </li>
              <li>
                <Link
                  to="/hebergement"
                  className="hover:text-brand-gold transition-colors">
                  
                  {t('footer.laChambre')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-gold transition-colors">
                  
                  {t('footer.reservations')}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-brand-gold transition-colors">
                  {t('footer.mentions')}
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50"
        >
          <p>
            &copy; {new Date().getFullYear()} La Banguissoise. {t('footer.droits')}
          </p>
          <p>{t('footer.ouvertDepuis')}</p>
        </motion.div>
      </div>
    </footer>);

}