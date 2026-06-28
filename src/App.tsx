import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Restaurant } from './pages/Restaurant';
import { Accommodation } from './pages/Accommodation';
import { Contact } from './pages/Contact';
import { AdminPage } from './pages/Admin';
export function App() {
  const { i18n: i18nInstance } = useTranslation();
  useEffect(() => {
    const updateDir = () => {
      const lang = i18nInstance.language?.split('-')[0] || 'fr';
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    };
    updateDir();
    i18nInstance.on('languageChanged', updateDir);
    return () => { i18nInstance.off('languageChanged', updateDir); };
  }, [i18nInstance]);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/hebergement" element={<Accommodation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>);

}