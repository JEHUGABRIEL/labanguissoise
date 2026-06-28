import React, { useState } from 'react';
import { useScreenInit } from '../useScreenInit';
import { useTranslation } from 'react-i18next';
import { GuestComments } from '../components/GuestComments';
import { HeroSlider } from '../components/HeroSlider';
import { X, Star, Clock, ChefHat, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  desc: string;
  longDesc: string;
  price: string;
  image: string;
  badge?: string;
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
      name: 'Le Maboké Traditionnel',
      desc: "Poisson frais cuit à l'étouffée dans des feuilles de bananier",
      longDesc: "Poisson frais cuit à l'étouffée dans des feuilles de bananier, épices locales, servi avec du manioc ou de la banane plantain. Un voyage gustatif au cœur de la Centrafrique, préparé selon la recette traditionnelle transmise de génération en génération.",
      price: '15,000 RWF',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
      badge: 'Signature'
    },
    {
      name: 'Ngoundja',
      desc: "Feuilles de manioc pilées à la pâte d'arachide",
      longDesc: "Feuilles de manioc pilées, préparées avec de la pâte d'arachide et de la viande de bœuf fumée. Un plat riche en saveurs et en traditions, accompagné de riz parfumé ou de chikwangue.",
      price: '12,000 RWF',
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85'
    },
    {
      name: 'Capitaine Braisé',
      desc: 'Poisson capitaine entier braisé aux épices',
      longDesc: 'Poisson capitaine entier braisé aux épices centrafricaines, accompagné de chikwangue et de légumes frais. Une spécialité incontournable qui ravit les amateurs de poisson grillé.',
      price: '18,000 RWF',
      image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
      badge: 'Chef'
    }]

  },
  {
    titleKey: 'restaurant.saveurs',
    descKey: 'restaurant.saveursDesc',
    items: [
    {
      name: 'Brochettes de Chèvre',
      desc: 'Brochettes rwandaises grillées à la perfection',
      longDesc: 'Les incontournables brochettes rwandaises, grillées à la perfection, servies avec des frites de banane plantain et une sauce piquante maison. Un classique qui fait l\'unanimité.',
      price: '8,000 RWF',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85'
    },
    {
      name: 'Isombe',
      desc: 'Feuilles de manioc au bouillon parfumé',
      longDesc: "Feuilles de manioc au bouillon d'os, épinards et aubergines, un classique réconfortant de la cuisine rwandaise. Servi avec de l'ugali ou du riz.",
      price: '10,000 RWF',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85'
    },
    {
      name: 'Tilapia du Lac Kivu',
      desc: 'Tilapia frais frit ou grillé',
      longDesc: "Tilapia frais frit ou grillé, sauce tomate épicée, servi avec de l'ugali et des légumes de saison. Une spécialité des Grands Lacs qui évoque les saveurs authentiques du Rwanda.",
      price: '14,000 RWF',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=85',
      badge: 'Populaire'
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
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {item.badge && (
                      <span className="absolute top-3 right-3 bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                        {item.badge}
                      </span>
                    )}
                    {/* Price overlay on image */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                      <span className="text-brand-primary font-bold text-sm">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h4 className="text-lg font-serif text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-brand-text/70 text-sm leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="mt-4 pt-4 border-t border-brand-dark/5 flex items-center justify-between">
                      <span className="text-xs text-brand-text/50 flex items-center gap-1">
                        <Utensils size={13} />
                        Cliquez pour détails
                      </span>
                      <span className="text-brand-gold text-sm font-medium">
                        {item.price}
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
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-1">
                    {selectedItem.name}
                  </h3>
                  <span className="text-brand-gold font-bold text-lg">
                    {selectedItem.price}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <p className="text-brand-text/80 leading-relaxed mb-6">
                  {selectedItem.longDesc}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-brand-text/60">
                    <ChefHat size={17} className="text-brand-gold" />
                    <span>Préparation artisanale</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-text/60">
                    <Clock size={17} className="text-brand-gold" />
                    <span>Produits frais</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-text/60">
                    <Star size={17} className="text-brand-gold" />
                    <span>Recette traditionnelle</span>
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