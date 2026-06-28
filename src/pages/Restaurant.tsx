import React, { useState } from 'react';
import { useScreenInit } from '../useScreenInit';
import { useTranslation } from 'react-i18next';
import { GuestComments } from '../components/GuestComments';
import { getMenuPrice } from '../adminStore';
import { HeroSlider } from '../components/HeroSlider';
import { X, Star, Clock, ChefHat, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  tKey: string;
  price: string;
  image: string;
  badgeKey?: string;
}

const menuCategories: {
  titleKey: string;
  descKey: string;
  items: MenuItem[];
}[] = [
  {
    titleKey: 'restaurant.specialites',
    descKey: 'restaurant.specialitesDesc',
    items: [
    {
      tKey: 'maboke',
      price: '15,000 RWF',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
      badgeKey: 'signature'
    },
    {
      tKey: 'ngoundja',
      price: '12,000 RWF',
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85'
    },
    {
      tKey: 'capitaine',
      price: '18,000 RWF',
      image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
      badgeKey: 'chef'
    }]

  },
  {
    titleKey: 'restaurant.saveurs',
    descKey: 'restaurant.saveursDesc',
    items: [
    {
      tKey: 'brochettes',
      price: '8,000 RWF',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85'
    },
    {
      tKey: 'isombe',
      price: '10,000 RWF',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85'
    },
    {
      tKey: 'tilapia',
      price: '14,000 RWF',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
      badgeKey: 'populaire'
    }]

  }];

export function Restaurant() {
  useScreenInit();
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const heroSlides = [
    { image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    { image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    { image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
  ];

  const heroCtas = [
    { label: 'Nous Contacter', to: '/contact', variant: 'primary' as const },
    { label: 'Voir la Chambre', to: '/hebergement', variant: 'outline' as const },
  ];

  return (
    <div className="min-h-screen bg-brand-sand">
      <HeroSlider slides={heroSlides} tPrefix="restaurantHero" ctas={heroCtas} />

      {/* Menu Section */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-medium tracking-widest uppercase text-sm">
            {t('restaurant.notreCarte')}
          </span>
          <h2 className="text-4xl font-serif text-brand-dark mt-4">
            {t('restaurant.gastronomie')}
          </h2>
        </div>

        {menuCategories.map((category, idx) => (
          <div key={idx} className="mb-24 last:mb-0">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif text-brand-primary mb-2">
                {t(category.titleKey)}
              </h3>
              <p className="text-brand-text/60 italic">
                {t(category.descKey)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, itemIdx) => (
                <motion.div
                  key={itemIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: itemIdx * 0.1 }}
                  onClick={() => setSelectedItem(item)}
                  className="group bg-white rounded-sm overflow-hidden shadow-sm border border-brand-dark/5 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={t(`menu.${item.tKey}.name`)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {item.badgeKey && (
                      <span className="absolute top-3 ltr:right-3 rtl:left-3 bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                        {t(`badge.${item.badgeKey}`)}
                      </span>
                    )}
                    {/* Price overlay on image */}
                    <div className="absolute bottom-3 ltr:left-3 rtl:right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                      <span className="text-brand-primary font-bold text-sm">
                        {getMenuPrice(item.tKey, item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h4 className="text-lg font-serif text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                      {t(`menu.${item.tKey}.name`)}
                    </h4>
                    <p className="text-brand-text/70 text-sm leading-relaxed line-clamp-2">
                      {t(`menu.${item.tKey}.desc`)}
                    </p>
                    <div className="mt-4 pt-4 border-t border-brand-dark/5 flex items-center justify-between">
                      <span className="text-xs text-brand-text/50 flex items-center gap-1">
                        <Utensils size={13} />
                        {t('menu.clickDetails')}
                      </span>
                      <span className="text-brand-gold text-sm font-medium">
                        {getMenuPrice(item.tKey, item.price)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-sm shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Image */}
              <div className="relative h-72 md:h-80">
                <img
                  src={selectedItem.image}
                  alt={t(`menu.${selectedItem.tKey}.name`)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-1">
                    {t(`menu.${selectedItem.tKey}.name`)}
                  </h3>
                  <span className="text-brand-gold font-bold text-lg">
                    {getMenuPrice(selectedItem.tKey, selectedItem.price)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 ltr:right-4 rtl:left-4 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <p className="text-brand-text/80 leading-relaxed mb-6">
                  {t(`menu.${selectedItem.tKey}.longDesc`)}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-brand-text/60">
                    <ChefHat size={17} className="text-brand-gold" />
                    <span>{t('menu.prepArtisanale')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-text/60">
                    <Clock size={17} className="text-brand-gold" />
                    <span>{t('menu.produitsFrais')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-text/60">
                    <Star size={17} className="text-brand-gold" />
                    <span>{t('menu.recetteTraditionnelle')}</span>
                  </div>
                </div>

                <a
                  href="tel:+250725415883"
                  className="inline-block w-full text-center bg-brand-dark text-white px-6 py-3 uppercase tracking-wider text-sm font-medium hover:bg-brand-primary transition-colors rounded-sm"
                >
                  {t('restaurant.appeler')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guest Comments Section */}
      <GuestComments />
    </div>);

}