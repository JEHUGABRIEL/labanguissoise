import React, { useState } from 'react';
import { useScreenInit } from '../useScreenInit';
import { HeroSlider } from '../components/HeroSlider';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
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
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-brand-dark mb-4">
            {t('contact.header')}
          </h1>
          <p className="text-brand-text/70 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 shadow-sm border border-brand-dark/5">
              <MapPin className="text-brand-gold w-8 h-8 mb-4" />
              <h3 className="font-serif text-xl text-brand-dark mb-2">
                {t('contact.adresse')}
              </h3>
              <p className="text-brand-text/70 text-sm leading-relaxed">
                KG 169/29, Kisementi Remera
                <br />
                Kigali, Rwanda
                <br />
                <span className="italic mt-2 block text-brand-primary">
                  À quelques pas du Kigali Convention Center
                </span>
              </p>
            </div>

            <div className="bg-white p-8 shadow-sm border border-brand-dark/5">
              <Phone className="text-brand-gold w-8 h-8 mb-4" />
              <h3 className="font-serif text-xl text-brand-dark mb-2">
                {t('contact.telephone')}
              </h3>
              <p className="text-brand-text/70 text-sm">
                <a
                  href="tel:+250725415883"
                  className="hover:text-brand-primary transition-colors">
                  
                  +250 725 415 883
                </a>
              </p>
            </div>

            <div className="bg-white p-8 shadow-sm border border-brand-dark/5">
              <Mail className="text-brand-gold w-8 h-8 mb-4" />
              <h3 className="font-serif text-xl text-brand-dark mb-2">{t('contact.email')}</h3>
              <p className="text-brand-text/70 text-sm">
                <a
                  href="mailto:labanguissoise250@gmail.com"
                  className="hover:text-brand-primary transition-colors">
                  
                  labanguissoise250@gmail.com
                </a>
              </p>
            </div>

            <div className="bg-white p-8 shadow-sm border border-brand-dark/5">
              <Clock className="text-brand-gold w-8 h-8 mb-4" />
              <h3 className="font-serif text-xl text-brand-dark mb-2">
                {t('contact.horaires')}
              </h3>
              <p className="text-brand-text/70 text-sm">
                {t('contact.horairesDetail')}
              </p>
            </div>
          </div>

          {/* Form & Map */}
          <div className="lg:col-span-2 space-y-8">
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
                </form>
              }
            </div>

            {/* Map Placeholder */}
            <div className="h-[400px] bg-gray-200 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Kigali Map Area"
                className="w-full h-full object-cover opacity-60" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 p-4 shadow-lg text-center flex flex-col items-center">
                  <MapPin className="text-brand-primary mb-2" size={32} />
                  <p className="font-serif font-bold text-brand-dark">
                    La Banguissoise
                  </p>
                  <p className="text-xs text-brand-text/70">Kisementi Remera</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}