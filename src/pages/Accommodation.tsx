import React, { useState } from 'react';
import { useScreenInit } from '../useScreenInit';
import { HeroSlider } from '../components/HeroSlider';
import { Wifi, Coffee, Wind, Shield, X, Bed, Bath } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getRoomPrice } from '../adminStore';

const roomImages: Record<string, string> = {
  standard: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
  deluxe: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
  executive: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
  presidential: 'https://images.unsplash.com/photo-1582719478250-c894099f72ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
};

const roomGalleries: Record<string, string[]> = {
  standard: [
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
  ],
  deluxe: [
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
  ],
  executive: [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1582719478250-c894099f72ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
  ],
  presidential: [
    'https://images.unsplash.com/photo-1582719478250-c894099f72ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
  ],
};

export function Accommodation() {
  useScreenInit();
  const { t } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Close modal on Escape key
  React.useEffect(() => {
    if (!selectedRoom) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedRoom(null);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [selectedRoom]);

  const amenities = [
  {
    icon: <Wifi size={20} />,
    text: 'Wi-Fi Haut Débit Gratuit'
  },
  {
    icon: <Wind size={20} />,
    text: 'Climatisation'
  },
  {
    icon: <Coffee size={20} />,
    text: 'Petit-déjeuner Inclus'
  },
  {
    icon: <Shield size={20} />,
    text: 'Sécurité 24/7'
  }];

  const heroSlides = [
    { image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    { image: 'https://images.unsplash.com/photo-1582719478250-c894099f72ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    { image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
  ];

  const heroCtas = [
    { label: 'Réserver un séjour', to: '/contact', variant: 'primary' as const },
    { label: 'Découvrir le Menu', to: '/restaurant', variant: 'outline' as const },
  ];

  return (
    <div className="min-h-screen bg-brand-sand">
      <HeroSlider slides={heroSlides} tPrefix="hebergementHero" ctas={heroCtas} />

      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Images */}
          <div className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c894099f72ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Luxury Room"
              className="w-full h-[400px] object-cover rounded-sm shadow-lg" />
            
            <div className="grid grid-cols-2 gap-6">
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Bathroom"
                className="w-full h-[250px] object-cover rounded-sm shadow-md" />
              
              <img
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Room detail"
                className="w-full h-[250px] object-cover rounded-sm shadow-md" />
              
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-serif text-brand-dark mb-6">
              {t('hebergement.elegance')}
            </h2>
            <p className="text-brand-text/80 leading-relaxed mb-8">
              {t('hebergement.detail')}
            </p>

            <h3 className="text-xl font-serif text-brand-dark mb-4">
              {t('hebergement.equipements')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {amenities.map((amenity, idx) =>
              <div
                key={idx}
                className="flex items-center gap-3 text-brand-text/80">
                
                  <span className="text-brand-gold shrink-0">{amenity.icon}</span>
                  <span className="text-sm font-medium">{amenity.text}</span>
                </div>
              )}
            </div>

            <div className="bg-white p-8 border border-brand-dark/10 shadow-sm">
              <h3 className="text-xl font-serif text-brand-dark mb-2">
                {t('hebergement.reserverSejour')}
              </h3>
              <p className="text-sm text-brand-text/60 mb-6">
                {t('hebergement.reserverDesc')}
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:labanguissoise250@gmail.com"
                  className="block w-full text-center bg-brand-dark text-white px-6 py-3 uppercase tracking-wider text-sm hover:bg-brand-primary transition-colors">
                  
                  {t('hebergement.email')}
                </a>
                <a
                  href="tel:+250725415883"
                  className="block w-full text-center border border-brand-dark text-brand-dark px-6 py-3 uppercase tracking-wider text-sm hover:bg-brand-sand transition-colors">
                  
                  {t('hebergement.appeler')}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Room Types Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-6">
              {t('rooms.sectionTitle')}
            </h2>
            <p className="text-brand-text/70 max-w-2xl mx-auto">
              {t('rooms.sectionDesc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {(['standard', 'deluxe', 'executive', 'presidential'] as const).map((key) => {
              return (
                <div
                  key={key}
                  onClick={() => setSelectedRoom(key)}
                  className="group bg-white rounded-sm overflow-hidden shadow-sm border border-brand-dark/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={roomImages[key]}
                      alt={t(`rooms.${key}.name`)}className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
                    {/* Price badge */}
                    <div className="absolute bottom-3 ltr:left-3 rtl:right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                      <span className="text-brand-primary font-bold text-sm">{getRoomPrice(key, t(`rooms.${key}.price`))}</span>
                      <span className="text-brand-text/50 text-[10px] block">{t('rooms.perNight')}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-serif text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                      {t(`rooms.${key}.name`)}
                    </h3>
                    <p className="text-brand-text/70 text-sm leading-relaxed mb-4">
                      {t(`rooms.${key}.desc`)}
                    </p>

                    {/* Features */}
                    <div className="mt-auto pt-4 border-t border-brand-dark/5">
                      <p className="text-xs text-brand-text/60 leading-relaxed mb-4">
                        {t(`rooms.${key}.features`)}
                      </p>
                      <p className="text-[10px] text-brand-gold/60 uppercase tracking-wider mb-3 text-center group-hover:text-brand-gold transition-colors">
                        {t('rooms.clickDetails')} &rarr;
                      </p>
                      <a
                        href="mailto:labanguissoise250@gmail.com"
                        className="block w-full text-center bg-brand-dark text-white py-3 uppercase tracking-wider text-xs font-medium hover:bg-brand-primary transition-colors rounded-sm"
                      >
                        {t('rooms.reserver')}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Room Detail Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-sm shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Image Gallery */}
              <div className="relative">
                <div className="grid grid-cols-3 gap-0.5 h-64 md:h-80">
                  <img
                    src={roomGalleries[selectedRoom][0]}
                    alt={t(`rooms.${selectedRoom}.name`)}
                    className="col-span-2 w-full h-full object-cover"
                  />
                  <div className="grid grid-rows-2 gap-0.5">
                    <img
                      src={roomGalleries[selectedRoom][1]}
                      alt={t(`rooms.${selectedRoom}.name`)}
                      className="w-full h-full object-cover"
                    />
                    <div className="relative">
                      <img
                        src={roomGalleries[selectedRoom][2]}
                        alt={t(`rooms.${selectedRoom}.name`)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="text-white text-xs font-medium uppercase tracking-wider">
                          {t('rooms.sectionTitle')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Room name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-1">
                        {t(`rooms.${selectedRoom}.name`)}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-brand-gold font-bold text-lg">
                          {getRoomPrice(selectedRoom, t(`rooms.${selectedRoom}.price`))}
                        </span>
                        <span className="text-white/60 text-sm">/ {t('rooms.perNight')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRoom(null)}
                  className="absolute top-4 ltr:right-4 rtl:left-4 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                {/* Long Description */}
                <p className="text-brand-text/80 leading-relaxed mb-8">
                  {t(`rooms.${selectedRoom}.longDesc`)}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: <Bed size={20} />, label: 'Confort', sub: t(`rooms.${selectedRoom}.name`) },
                    { icon: <Wifi size={20} />, label: 'Wi-Fi', sub: 'Haut Débit' },
                    { icon: <Wind size={20} />, label: 'Climatisation', sub: 'Réversible' },
                    { icon: <Bath size={20} />, label: 'Salle de bain', sub: 'Privative' },
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-2 p-4 bg-brand-sand rounded-sm border border-brand-dark/5"
                    >
                      <span className="text-brand-gold">{feature.icon}</span>
                      <span className="text-xs text-brand-text/70 text-center leading-tight font-medium">
                        {feature.label}
                      </span>
                      <span className="text-[10px] text-brand-text/50 text-center">
                        {feature.sub}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Full Features List */}
                <div className="bg-brand-sand p-6 rounded-sm border border-brand-dark/5 mb-8">
                  <h4 className="font-serif text-brand-dark text-lg mb-3">
                    {t('hebergement.equipements')}
                  </h4>
                  <p className="text-sm text-brand-text/70 leading-relaxed">
                    {t(`rooms.${selectedRoom}.features`)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:labanguissoise250@gmail.com"
                    className="flex-1 text-center bg-brand-dark text-white px-6 py-3 uppercase tracking-wider text-sm font-medium hover:bg-brand-primary transition-colors rounded-sm"
                  >
                    {t('hebergement.email')}
                  </a>
                  <a
                    href="tel:+250725415883"
                    className="flex-1 text-center border border-brand-dark text-brand-dark px-6 py-3 uppercase tracking-wider text-sm font-medium hover:bg-brand-sand transition-colors rounded-sm"
                  >
                    {t('hebergement.appeler')}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>);

}