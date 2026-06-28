import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n.config';

const languages = [
  { code: 'fr', native: 'Français', flag: '🇫🇷' },
  { code: 'en', native: 'English', flag: '🇬🇧' },
  { code: 'es', native: 'Español', flag: '🇪🇸' },
  { code: 'ar', native: 'العربية', flag: '🇸🇦' },
  { code: 'zh', native: '中文', flag: '🇨🇳' },
];

export function Navbar() {
  const { t } = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  const supported = ['fr', 'en', 'es', 'ar', 'zh'];
  const lang = supported.includes(currentLang) ? currentLang : 'fr';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
  { key: 'nav.accueil', path: '/' },
  { key: 'nav.restaurant', path: '/restaurant' },
  { key: 'nav.hebergement', path: '/hebergement' },
  { key: 'nav.contact', path: '/contact' }];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark font-serif font-bold text-xl group-hover:scale-105 transition-transform">
              LB
            </div>
            <span
              className={`font-serif text-2xl font-semibold tracking-wide transition-colors ${isScrolled ? 'text-white' : 'text-white drop-shadow-md'}`}>
              
              La Banguissoise
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
            <Link
              key={link.key}
              to={link.path}
              className={`text-sm font-medium tracking-wider uppercase transition-colors hover:text-brand-gold ${location.pathname === link.path ? 'text-brand-gold border-b border-brand-gold pb-1' : 'text-white/90'}`}>
              
                {t(link.key)}
              </Link>
            )}

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-white/80 hover:text-brand-gold transition-colors px-2 py-1 text-sm"
                aria-label={t('nav.langue')}
              >
                <Globe size={16} />
                <span className="uppercase font-medium">{lang}</span>
              </button>

              {langOpen && (
                <div className="absolute ltr:right-0 rtl:left-0 top-full mt-2 bg-white rounded-sm shadow-xl border border-gray-100 overflow-hidden min-w-[140px] z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { i18n.changeLanguage(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-start transition-colors hover:bg-brand-sand ${lang === l.code ? 'bg-brand-sand font-medium text-brand-dark' : 'text-brand-text/80'}`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.native}</span>
                      <span className="text-[10px] uppercase text-gray-400 ltr:ml-auto rtl:mr-auto">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/contact"
              className="bg-brand-gold text-brand-dark px-5 py-2 rounded-sm font-medium text-sm tracking-wider uppercase hover:bg-white transition-colors">
              
              {t('nav.reserver')}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen &&
      <div className="md:hidden absolute top-full left-0 right-0 bg-brand-dark border-t border-white/10 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) =>
          <Link
            key={link.key}
            to={link.path}
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-4 text-base font-medium tracking-wider uppercase border-b border-white/5 ${location.pathname === link.path ? 'text-brand-gold' : 'text-white/80'}`}>
            
                {t(link.key)}
              </Link>
          )}

            {/* Mobile Language Selector */}
            <div className="px-3 py-4 border-b border-white/5">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-3">{t('nav.langue')}</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { i18n.changeLanguage(l.code); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-sm text-sm transition-colors ${lang === l.code ? 'bg-brand-gold/20 text-brand-gold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.native}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-brand-gold text-brand-dark px-5 py-3 rounded-sm font-medium text-sm tracking-wider uppercase">
              
                {t('nav.reserver')}
              </Link>
            </div>
          </div>
        </div>
      }
    </header>);

}