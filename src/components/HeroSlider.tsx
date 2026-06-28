import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Slide {
  image: string;
}

interface CTA {
  label: string;
  to?: string;
  href?: string;
  variant: 'primary' | 'outline';
}

interface HeroSliderProps {
  slides: Slide[];
  tPrefix: string;
  ctas?: CTA[];
  interval?: number;
}

export function HeroSlider({ slides, tPrefix, ctas, interval = 6000 }: HeroSliderProps) {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const scrollToNext = useCallback(() => {
    const hero = document.querySelector('#hero-section');
    if (hero) {
      const next = hero.nextElementSibling;
      if (next) {
        next.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-brand-gold font-medium tracking-[0.2em] uppercase text-sm mb-6">
              {t(`${tPrefix}.subtitle${currentSlide + 1}`)}
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
              {t(`${tPrefix}.title${currentSlide + 1}`)} <br />
              <span className="italic text-brand-gold">
                {t(`${tPrefix}.highlight${currentSlide + 1}`)}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {t(`${tPrefix}.desc${currentSlide + 1}`)}
            </p>
          </motion.div>
        </AnimatePresence>

        {ctas && ctas.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctas.map((cta, idx) => {
              const baseClasses = "px-8 py-4 rounded-sm font-medium tracking-wider uppercase transition-colors";
              if (cta.variant === 'primary') {
                const content = (
                  <span className={`${baseClasses} bg-brand-gold text-brand-dark hover:bg-white inline-block`}>
                    {cta.label}
                  </span>
                );
                if (cta.href) return <a key={idx} href={cta.href}>{content}</a>;
                if (cta.to) return <Link key={idx} to={cta.to}>{content}</Link>;
                return <React.Fragment key={idx}>{content}</React.Fragment>;
              }
              const content = (
                <span className={`${baseClasses} bg-transparent border border-white text-white hover:bg-white hover:text-brand-dark inline-block`}>
                  {cta.label}
                </span>
              );
              if (cta.href) return <a key={idx} href={cta.href}>{content}</a>;
              if (cta.to) return <Link key={idx} to={cta.to}>{content}</Link>;
              return <React.Fragment key={idx}>{content}</React.Fragment>;
            })}
          </div>
        )}
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentSlide === idx ? 'bg-brand-gold w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Arrow */}
      <button
        onClick={scrollToNext}
        aria-label="Défiler vers le bas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/60 hover:text-brand-gold transition-colors"
      >
        <ChevronDown size={36} strokeWidth={1.5} />
      </button>
    </section>
  );
}
