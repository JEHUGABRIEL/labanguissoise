import React from 'react';
import { useScreenInit } from '../useScreenInit';
import { HeroSlider } from '../components/HeroSlider';
import { Wifi, Coffee, Wind, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const roomImages: Record<string, string> = {
  standard: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
  deluxe: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
  executive: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
  presidential: 'https://images.unsplash.com/photo-1582719478250-c894099f72ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
};

export function Accommodation() {
  useScreenInit();
  const { t } = useTranslation();
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
        </div>
      </div>

      {/* Room Types Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-brand-dark mb-6">
              {t('rooms.sectionTitle')}
            </h2>
            <p className="text-brand-text/70 max-w-2xl mx-auto">
              {t('rooms.sectionDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(['standard', 'deluxe', 'executive', 'presidential'] as const).map((key) => {
              return (
                <div
                  key={key}
                  className="group bg-white rounded-sm overflow-hidden shadow-sm border border-brand-dark/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={roomImages[key]}
                      alt={t(`rooms.${key}.name`)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
                    {/* Price badge */}
                    <div className="absolute bottom-3 ltr:left-3 rtl:right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                      <span className="text-brand-primary font-bold text-sm">{t(`rooms.${key}.price`)}</span>
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
          </div>
        </div>
      </section>
    </div>);

}