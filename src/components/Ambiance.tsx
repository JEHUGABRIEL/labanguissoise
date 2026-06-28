import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Clock, Sparkles, Music, ChefHat } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Ambiance() {
  const { t } = useTranslation();

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
      alt: 'Salle à manger élégante',
      caption: t('ambiance.salle'),
      size: 'large',
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=85',
      alt: 'Table dressée avec raffinement',
      caption: t('ambiance.artTable'),
      size: 'small',
    },
    {
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=85',
      alt: 'Bar et lounge',
      caption: t('ambiance.bar'),
      size: 'small',
    },
    {
      src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=85',
      alt: 'Terrasse extérieure',
      caption: t('ambiance.terrasse'),
      size: 'large',
    },
  ];

  const ambianceHighlights = [
    {
      icon: <Sparkles size={22} />,
      title: t('ambiance.eclairage'),
      desc: t('ambiance.eclairageDesc'),
    },
    {
      icon: <Music size={22} />,
      title: t('ambiance.musique'),
      desc: t('ambiance.musiqueDesc'),
    },
    {
      icon: <ChefHat size={22} />,
      title: t('ambiance.cuisine'),
      desc: t('ambiance.cuisineDesc'),
    },
  ];

  return (
    <section className="bg-brand-dark py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-gold font-medium tracking-widest uppercase text-sm">
            {t('ambiance.header')}
          </span>
          <h2 className="text-4xl font-serif text-white mt-4 mb-6">
            {t('ambiance.title')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            {t('ambiance.desc')}
          </p>
        </motion.div>

        {/* Photo Gallery Grid */}
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20"
        >
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`relative group overflow-hidden rounded-sm ${
                img.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
              }`}
            >
              <div className={`${img.size === 'large' ? 'h-[300px] md:h-[500px]' : 'h-[200px] md:h-[240px]'} w-full`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-medium text-sm tracking-wider uppercase">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Ambiance Highlights */}
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {ambianceHighlights.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="text-center p-8 border border-white/10 rounded-sm hover:border-brand-gold/30 transition-colors duration-500 group"
            >
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-5 text-brand-gold group-hover:bg-brand-gold/10 group-hover:scale-110 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif text-white mb-3">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Reservation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-10 md:p-14"
        >
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
            {t('ambiance.cta')}
          </h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            {t('ambiance.ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+250725415883"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-8 py-4 uppercase tracking-wider text-sm font-medium hover:bg-white transition-colors"
            >
              <Phone size={18} />
              {t('ambiance.ctaBtn')}
            </a>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Clock size={16} />
              <span>{t('ambiance.ctaHoraires')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
