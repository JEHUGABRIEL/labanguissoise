import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { useScreenInit } from '../useScreenInit';
import { HeroSlider } from '../components/HeroSlider';
import { useTranslation } from 'react-i18next';
export function Contact() {
  useScreenInit();
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success'>(
    'idle');

  const heroSlides = [
    { image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    { image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
  ];

  const heroCtas = [
    { label: 'Découvrir le Menu', to: '/restaurant', variant: 'primary' as const },
    { label: 'Voir la Chambre', to: '/hebergement', variant: 'outline' as const },
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };
  return (
    <div className="min-h-screen bg-brand-sand">
      <HeroSlider slides={heroSlides} tPrefix="contactHero" ctas={heroCtas} />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif text-brand-dark mb-4">
            {t('contact.header')}
          </h1>
          <p className="text-brand-text/70 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Form */}
          <div className="space-y-8">
            <div className="bg-white p-8 md:p-12 shadow-sm border border-brand-dark/5">
              <h2 className="text-3xl font-serif text-brand-dark mb-8">
                {t('contact.messageTitle')}
              </h2>

              {formStatus === 'success' ?
              <div className="bg-brand-light text-brand-primary p-6 rounded-sm text-center">
                  <h3 className="font-serif text-xl mb-2">{t('contact.success')}</h3>
                  <p>{t('contact.successDesc')}</p>
                  <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-4 text-sm underline hover:text-brand-dark">
                  
                    {t('contact.autreMessage')}
                  </button>
                </div> :

              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-2">
                        {t('contact.nomLabel')}
                      </label>
                      <input
                      required
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                      placeholder={t('contact.nomPlaceholder')} />
                    
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-2">
                        {t('contact.emailLabel')}
                      </label>
                      <input
                      required
                      type="email"
                      className="w-full px-4 py-3 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                      placeholder={t('contact.emailPlaceholder')} />
                    
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">
                      {t('contact.sujet')}
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all bg-white">
                      <option>{t('contact.sujetRestaurant')}</option>
                      <option>{t('contact.sujetHebergement')}</option>
                      <option>{t('contact.sujetEvenement')}</option>
                      <option>{t('contact.sujetAutre')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all resize-none"
                    placeholder={t('contact.messagePlaceholder')}>
                  </textarea>
                  </div>

                  <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="bg-brand-dark text-white px-8 py-4 uppercase tracking-wider text-sm font-medium hover:bg-brand-primary transition-colors w-full md:w-auto disabled:opacity-70">
                  
                    {formStatus === 'submitting' ?
                  t('contact.envoi') :
                  t('contact.envoyer')}
                  </button>

                  {/* Quick contact links */}
                  <div className="pt-6 mt-6 border-t border-brand-dark/5">
                    <p className="text-xs text-brand-text/50 uppercase tracking-wider mb-3 text-center">
                      Ou contactez-nous directement
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="tel:+250725415883"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-sand border border-brand-dark/5 text-brand-dark text-sm font-medium hover:bg-brand-primary hover:text-white transition-colors rounded-sm flex-1"
                      >
                        <Phone size={16} />
                        +250 725 415 883
                      </a>
                      <a
                        href="mailto:labanguissoise250@gmail.com"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-sand border border-brand-dark/5 text-brand-dark text-sm font-medium hover:bg-brand-primary hover:text-white transition-colors rounded-sm flex-1"
                      >
                        <Mail size={16} />
                        labanguissoise250@gmail.com
                      </a>
                    </div>
                  </div>
                </form>
              }
            </div>

            {/* Map */}
            <div className="h-[400px] bg-gray-200 relative overflow-hidden rounded-sm shadow-sm border border-brand-dark/5 group">
              <iframe
                title="La Banguissoise - Localisation"
                src="https://www.openstreetmap.org/export/embed.html?bbox=30.0720%2C-1.9480%2C30.0830%2C-1.9380&layer=mapnik&marker=-1.9430%2C30.0775"
                className="w-full h-full border-0 transition-transform duration-700 group-hover:scale-[1.03]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-sm shadow-sm text-xs">
                <span className="font-medium text-brand-dark">KG 169/29, Kisementi Remera</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>);

}