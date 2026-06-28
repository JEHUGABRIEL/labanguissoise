import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ArrowRight,
  MapPin,
  ChevronDown,
  Phone,
  Mail,
  Clock } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScreenInit } from '../useScreenInit';
import { useTranslation } from 'react-i18next';
import { Ambiance } from '../components/Ambiance';
import { ReviewSlider } from '../components/ReviewSlider';
const heroSlides = [
{ id: 1, image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
{ id: 2, image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
{ id: 3, image: 'https://images.unsplash.com/photo-1582719478250-c894099f72ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' }];

const featuredDishes = [
{
  name: 'Le Maboké Traditionnel',
  description:
  "Poisson frais cuit à l'étouffée dans des feuilles de bananier, épices locales.",
  image:
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  price: '15,000 RWF'
},
{
  name: 'Brochettes de Chèvre',
  description:
  'Les incontournables brochettes rwandaises, grillées à la perfection.',
  image:
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  price: '8,000 RWF'
},
{
  name: 'Capitaine Braisé',
  description: 'Poisson capitaine entier braisé aux épices centrafricaines.',
  image:
  'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  price: '18,000 RWF'
}];

const bestRooms = [
{
  name: 'Suite Exécutive',
  description:
  "Idéale pour les voyageurs d'affaires, avec espace bureau et lit King size.",
  image:
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
},
{
  name: 'Chambre Deluxe',
  description:
  'Confort absolu et décoration raffinée pour un séjour relaxant.',
  image:
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}];

export function Home() {
  useScreenInit();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  const scrollToNext = () => {
    const hero = document.querySelector('#hero-section');
    if (hero) {
      const next = hero.nextElementSibling;
      if (next) {
        next.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{
              opacity: 0,
              scale: 1.08
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.96
            }}
            transition={{
              duration: 1.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="absolute inset-0 z-0">
            
            <img
              src={heroSlides[currentSlide].image}
              alt={t(`hero.title${currentSlide + 1}`)}
              className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-brand-dark/60"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -30
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.25, 0.1, 0.25, 1]
              }}>
              
              <p className="text-brand-gold font-medium tracking-[0.2em] uppercase text-sm mb-6">
                {t(`hero.subtitle${currentSlide + 1}`)}
              </p>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
                {t(`hero.title${currentSlide + 1}`)} <br />
                <span className="italic text-brand-gold">
                  {t(`hero.highlight${currentSlide + 1}`)}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                {t(`hero.desc${currentSlide + 1}`)}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/restaurant"
              className="bg-brand-gold text-brand-dark px-8 py-4 rounded-sm font-medium tracking-wider uppercase hover:bg-white transition-colors">
              
              {t('hero.decouvrir')}
            </Link>
            <Link
              to="/hebergement"
              className="bg-transparent border border-white text-white px-8 py-4 rounded-sm font-medium tracking-wider uppercase hover:bg-white hover:text-brand-dark transition-colors">
              
              {t('hero.voirChambre')}
            </Link>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, idx) =>
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === idx ? 'bg-brand-gold w-8' : 'bg-white/50 hover:bg-white/80'}`} />

          )}
        </div>

        {/* Scroll Down Arrow */}
        <button
          onClick={scrollToNext}
          aria-label="Défiler vers le bas"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/60 hover:text-brand-gold transition-colors">
          <ChevronDown size={36} strokeWidth={1.5} />
        </button>
      </section>

      {/* Intro / About Section */}
      <section className="py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Chef preparing food"
                className="w-full h-[600px] object-cover rounded-sm shadow-2xl" />
              
              <div className="absolute -bottom-8 -right-8 bg-brand-primary p-8 text-white max-w-xs hidden md:block">
                <div className="flex gap-1 text-brand-gold mb-3">
                  {[...Array(5)].map((_, i) =>
                  <Star key={i} size={20} fill="currentColor" />
                  )}
                </div>
                <p className="font-serif text-xl mb-2">
                  "Une expérience inoubliable"
                </p>
                <p className="text-sm text-white/80">Note Google : 5.0/5</p>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-serif text-brand-dark mb-6">
                {t('home.aboutTitle')}
              </h2>
              <p className="text-brand-text/80 mb-6 leading-relaxed">
                {t('home.aboutP1')}
              </p>
              <p className="text-brand-text/80 mb-8 leading-relaxed">
                {t('home.aboutP2')}
              </p>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <h3 className="font-serif text-xl text-brand-dark mb-2">
                    {t('home.restaurantLabel')}
                  </h3>
                  <p className="text-sm text-brand-text/70">
                    {t('home.restaurantDesc')}
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-brand-dark mb-2">
                    {t('home.hebergementLabel')}
                  </h3>
                  <p className="text-sm text-brand-text/70">
                    {t('home.hebergementDesc')}
                  </p>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-brand-primary font-medium hover:text-brand-gold transition-colors group">
                
                {t('home.visite')}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform" />
                
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-medium tracking-widest uppercase text-sm">
              {t('home.cuisine')}
            </span>
            <h2 className="text-4xl font-serif text-brand-dark mt-4 mb-6">
              {t('home.platsVedettes')}
            </h2>
            <p className="text-brand-text/70 max-w-2xl mx-auto">
              {t('home.platsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredDishes.map((dish, idx) =>
            <div key={idx} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-sm mb-6 h-64">
                  <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                  <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif text-brand-dark group-hover:text-brand-primary transition-colors">
                    {dish.name}
                  </h3>
                  <span className="text-brand-gold font-medium">
                    {dish.price}
                  </span>
                </div>
                <p className="text-brand-text/70 text-sm leading-relaxed">
                  {dish.description}
                </p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              to="/restaurant"
              className="inline-flex items-center justify-center bg-brand-primary text-white px-8 py-4 rounded-sm font-medium tracking-wider uppercase hover:bg-brand-dark transition-colors">
              
              {t('home.consulterMenu')}
            </Link>
          </div>
        </div>
      </section>

      {/* Best Rooms Section */}
      <section className="py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-medium tracking-widest uppercase text-sm">
              {t('home.hebergementLabel')}
            </span>
            <h2 className="text-4xl font-serif text-brand-dark mt-4 mb-6">
              {t('home.meilleuresChambres')}
            </h2>
            <p className="text-brand-text/70 max-w-2xl mx-auto">
              {t('home.chambresDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {bestRooms.map((room, idx) =>
            <div
              key={idx}
              className="bg-white rounded-sm overflow-hidden shadow-sm border border-brand-dark/5 group">
              
                <div className="relative h-80 overflow-hidden">
                  <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-serif text-brand-dark mb-4">
                    {room.name}
                  </h3>
                  <p className="text-brand-text/70 mb-6">{room.description}</p>
                  <Link
                  to="/hebergement"
                  className="inline-flex items-center gap-2 text-brand-gold font-medium hover:text-brand-primary transition-colors">
                  
                    {t('home.voirDetails')} <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              to="/hebergement"
              className="inline-flex items-center justify-center border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-sm font-medium tracking-wider uppercase hover:bg-brand-primary hover:text-white transition-colors">
              
              {t('home.decouvrirChambres')}
            </Link>
          </div>
        </div>
      </section>

      {/* Location Banner */}
      <section className="bg-brand-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MapPin size={40} className="text-brand-gold mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-white mb-4">
            {t('home.idealement')}
          </h2>
          <p className="text-white/80 mb-8">
            {t('home.adresse')}
            <br />{t('home.aProposKCC')}
          </p>
          <Link
            to="/contact"
            className="text-brand-gold hover:text-white transition-colors underline underline-offset-4">
            
            {t('home.voirCarte')}
          </Link>
        </div>
      </section>

      {/* Ambiance Section */}
      <Ambiance />

      {/* Reviews Slider */}
      <ReviewSlider />

      {/* Contact Section */}
      <section className="bg-brand-dark py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal" data-reveal="up">
            <span className="text-brand-gold font-medium tracking-widest uppercase text-sm">
              {t('contact.header')}
            </span>
            <h2 className="text-4xl font-serif text-white mt-4 mb-6">
              {t('contact.messageTitle')}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto font-light">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 flex items-start gap-4 group hover:border-brand-gold/30 transition-colors">
                <div className="w-11 h-11 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">{t('contact.adresse')}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">KG 169/29, Kisementi Remera<br />Kigali, Rwanda</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 flex items-start gap-4 group hover:border-brand-gold/30 transition-colors">
                <div className="w-11 h-11 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">{t('contact.telephone')}</h3>
                  <a href="tel:+250725415883" className="text-white/90 text-sm hover:text-brand-gold transition-colors">+250 725 415 883</a>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 flex items-start gap-4 group hover:border-brand-gold/30 transition-colors">
                <div className="w-11 h-11 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">{t('contact.email')}</h3>
                  <a href="mailto:labanguissoise250@gmail.com" className="text-white/90 text-sm hover:text-brand-gold transition-colors">labanguissoise250@gmail.com</a>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 flex items-start gap-4 group hover:border-brand-gold/30 transition-colors">
                <div className="w-11 h-11 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-1">{t('contact.horaires')}</h3>
                  <p className="text-white/90 text-sm">{t('contact.horairesDetail')}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8 md:p-10">
                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-2">{t('contact.success')}</h3>
                    <p className="text-white/60 mb-6">{t('contact.successDesc')}</p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="text-brand-gold hover:text-white transition-colors underline underline-offset-4 text-sm"
                    >
                      {t('contact.autreMessage')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">{t('contact.nomLabel')}</label>
                        <input
                          required
                          type="text"
                          className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-sm text-white placeholder-white/30 outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                          placeholder={t('contact.nomPlaceholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">{t('contact.emailLabel')}</label>
                        <input
                          required
                          type="email"
                          className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-sm text-white placeholder-white/30 outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                          placeholder={t('contact.emailPlaceholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">{t('contact.sujet')}</label>
                      <select className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-sm text-white outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all">
                        <option value="" className="bg-brand-dark">{t('contact.sujetRestaurant')}</option>
                        <option value="hebergement" className="bg-brand-dark">{t('contact.sujetHebergement')}</option>
                        <option value="evenement" className="bg-brand-dark">{t('contact.sujetEvenement')}</option>
                        <option value="autre" className="bg-brand-dark">{t('contact.sujetAutre')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">{t('contact.message')}</label>
                      <textarea
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-sm text-white placeholder-white/30 outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all resize-none"
                        placeholder={t('contact.messagePlaceholder')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-brand-gold text-brand-dark px-8 py-4 uppercase tracking-wider text-sm font-medium hover:bg-white transition-colors disabled:opacity-70 rounded-sm"
                    >
                      {formStatus === 'submitting' ? t('contact.envoi') : t('contact.envoyer')}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>);

}