import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Star, Trash2, Edit3, Save, X, LogOut, DollarSign, MessageSquare,
  Home, Utensils, BarChart3, RefreshCw
} from 'lucide-react';
import { getAdminOverrides, saveAdminOverrides, getComments, deleteComment, applyDescriptionOverrides, type Comment, type AdminOverrides } from '../adminStore';
import i18n from '../i18n.config';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

type Tab = 'dashboard' | 'comments' | 'menu-prices' | 'room-prices' | 'descriptions';

// Menu items with their default prices
const menuItems = [
  { tKey: 'maboke', nameKey: 'menu.maboke.name', defaultPrice: '15,000 RWF' },
  { tKey: 'ngoundja', nameKey: 'menu.ngoundja.name', defaultPrice: '12,000 RWF' },
  { tKey: 'capitaine', nameKey: 'menu.capitaine.name', defaultPrice: '18,000 RWF' },
  { tKey: 'brochettes', nameKey: 'menu.brochettes.name', defaultPrice: '8,000 RWF' },
  { tKey: 'isombe', nameKey: 'menu.isombe.name', defaultPrice: '10,000 RWF' },
  { tKey: 'tilapia', nameKey: 'menu.tilapia.name', defaultPrice: '14,000 RWF' },
];

const roomItems = [
  { key: 'standard', nameKey: 'rooms.standard.name', defaultPrice: '55,000 RWF' },
  { key: 'deluxe', nameKey: 'rooms.deluxe.name', defaultPrice: '85,000 RWF' },
  { key: 'executive', nameKey: 'rooms.executive.name', defaultPrice: '120,000 RWF' },
  { key: 'presidential', nameKey: 'rooms.presidential.name', defaultPrice: '250,000 RWF' },
];

// Editable description keys
const editableDescriptions = [
  { key: 'home.aboutTitle', label: 'Accueil - Titre "À propos"' },
  { key: 'home.aboutP1', label: 'Accueil - Paragraphe 1' },
  { key: 'home.aboutP2', label: 'Accueil - Paragraphe 2' },
  { key: 'home.platsDesc', label: 'Accueil - Description plats vedettes' },
  { key: 'home.chambresDesc', label: 'Accueil - Description chambres' },
  { key: 'restaurant.specialitesDesc', label: 'Restaurant - Description spécialités' },
  { key: 'restaurant.saveursDesc', label: 'Restaurant - Description saveurs' },
  { key: 'hebergement.elegance', label: 'Hébergement - Titre élégance' },
  { key: 'hebergement.detail', label: 'Hébergement - Description détail' },
];

export function AdminPage() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [overrides, setOverrides] = useState<AdminOverrides>(getAdminOverrides());
  const [comments, setComments] = useState<Comment[]>(getComments());
  const [saveMsg, setSaveMsg] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  // Reload overrides and comments when tab changes
  useEffect(() => {
    if (isAuthenticated) {
      setOverrides(getAdminOverrides());
      setComments(getComments());
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
      // Apply any saved description overrides
      applyDescriptionOverrides(i18n);
    } else {
      setLoginError('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setActiveTab('dashboard');
  };

  const handleSaveOverrides = () => {
    saveAdminOverrides(overrides);
    applyDescriptionOverrides(i18n);
    setSaveMsg('Modifications enregistrées ✓');
    setUnsavedChanges(false);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const updateMenuPrice = (tKey: string, value: string) => {
    const newOverrides = {
      ...overrides,
      menuPrices: { ...overrides.menuPrices, [tKey]: value },
    };
    setOverrides(newOverrides);
    setUnsavedChanges(true);
  };

  const updateRoomPrice = (key: string, value: string) => {
    const newOverrides = {
      ...overrides,
      roomPrices: { ...overrides.roomPrices, [key]: value },
    };
    setOverrides(newOverrides);
    setUnsavedChanges(true);
  };

  const updateDescription = (key: string, value: string) => {
    const newDescs = { ...overrides.descriptions };
    if (value.trim()) {
      newDescs[key] = value;
    } else {
      delete newDescs[key];
    }
    const newOverrides = { ...overrides, descriptions: newDescs };
    setOverrides(newOverrides);
    setUnsavedChanges(true);
  };

  const handleDeleteComment = (id: number) => {
    const updated = deleteComment(id);
    setComments(updated);
    setShowDeleteModal(null);
  };

  // Stats
  const avgRating = comments.length > 0
    ? (comments.reduce((s, c) => s + c.rating, 0) / comments.length).toFixed(1)
    : '—';

  // ---------- Login Screen ----------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-sm shadow-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-serif text-brand-dark">Administration</h1>
              <p className="text-brand-text/60 text-sm mt-1">La Banguissoise</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">
                  Mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                  placeholder="Entrez le mot de passe"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm"
                  autoFocus
                />
              </div>

              {loginError && (
                <p className="text-red-500 text-sm flex items-center gap-1.5">
                  <X size={14} /> {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-brand-dark text-white px-6 py-3 uppercase tracking-wider text-sm font-medium hover:bg-brand-primary transition-colors"
              >
                Connexion
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Admin Dashboard ----------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark font-bold text-sm">
                LB
              </div>
              <h1 className="font-serif text-lg text-brand-dark">Admin</h1>
            </div>

            <div className="flex items-center gap-4">
              {unsavedChanges && (
                <span className="text-amber-600 text-xs flex items-center gap-1">
                  <Edit3 size={12} /> Modifications non sauvegardées
                </span>
              )}
              {saveMsg && (
                <span className="text-emerald-600 text-xs flex items-center gap-1">
                  <Save size={12} /> {saveMsg}
                </span>
              )}
              <button
                onClick={handleSaveOverrides}
                disabled={!unsavedChanges}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-dark text-white text-xs uppercase tracking-wider rounded-sm hover:bg-brand-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Save size={14} />
                Sauvegarder
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 text-gray-500 text-xs hover:text-red-500 transition-colors"
              >
                <LogOut size={14} />
                Quitter
              </button>
            </div>
          </div>

          {/* Tab Nav */}
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {[
              { id: 'dashboard' as Tab, icon: BarChart3, label: 'Tableau de bord' },
              { id: 'comments' as Tab, icon: MessageSquare, label: 'Avis', count: comments.length },
              { id: 'menu-prices' as Tab, icon: Utensils, label: 'Prix du menu' },
              { id: 'room-prices' as Tab, icon: Home, label: 'Prix chambres' },
              { id: 'descriptions' as Tab, icon: Edit3, label: 'Textes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-gold text-brand-dark font-medium'
                    : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
                {'count' in tab && tab.count !== undefined && (
                  <span className="ml-1 bg-brand-gold/10 text-brand-dark text-[10px] px-1.5 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-serif text-brand-dark mb-6">Tableau de bord</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white rounded-sm p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <MessageSquare size={20} />
                  </div>
                  <p className="text-sm text-gray-500">Avis clients</p>
                </div>
                <p className="text-3xl font-bold text-brand-dark">{comments.length}</p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <p className="text-sm text-gray-500">Note moyenne</p>
                </div>
                <p className="text-3xl font-bold text-brand-dark">{avgRating}</p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <Utensils size={20} />
                  </div>
                  <p className="text-sm text-gray-500">Plats au menu</p>
                </div>
                <p className="text-3xl font-bold text-brand-dark">{menuItems.length}</p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <Home size={20} />
                  </div>
                  <p className="text-sm text-gray-500">Types de chambres</p>
                </div>
                <p className="text-3xl font-bold text-brand-dark">{roomItems.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-sm p-6 border border-gray-100 shadow-sm">
              <h3 className="font-serif text-lg text-brand-dark mb-4">Actions rapides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('comments')}
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-brand-sand rounded-sm transition-colors text-left"
                >
                  <MessageSquare size={20} className="text-brand-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-brand-dark">Gérer les avis</p>
                    <p className="text-xs text-gray-500">{comments.length} avis reçus</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('menu-prices')}
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-brand-sand rounded-sm transition-colors text-left"
                >
                  <DollarSign size={20} className="text-brand-gold shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-brand-dark">Prix du menu</p>
                    <p className="text-xs text-gray-500">{menuItems.length} plats</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('descriptions')}
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-brand-sand rounded-sm transition-colors text-left"
                >
                  <Edit3 size={20} className="text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-brand-dark">Modifier les textes</p>
                    <p className="text-xs text-gray-500">{editableDescriptions.length} textes</p>
                  </div>
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-8">
              Les modifications sont stockées dans votre navigateur (localStorage).
              Pour des changements permanents, modifiez les fichiers de traduction JSON.
            </p>
          </div>
        )}

        {/* Comments Management */}
        {activeTab === 'comments' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-serif text-brand-dark">Gestion des avis</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {comments.length} avis au total
                </p>
              </div>
              <button
                onClick={() => { setComments(getComments()); }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-500 hover:text-brand-dark transition-colors"
              >
                <RefreshCw size={14} />
                Actualiser
              </button>
            </div>

            {comments.length === 0 ? (
              <div className="bg-white rounded-sm p-12 border border-gray-100 text-center">
                <MessageSquare size={40} className="text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Aucun avis pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white rounded-sm p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-medium text-sm">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-brand-dark text-sm">{comment.name}</p>
                          <p className="text-xs text-gray-400">{comment.createdAt}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowDeleteModal(comment.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex gap-0.5 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= comment.rating ? 'text-brand-gold fill-brand-gold' : 'text-gray-200'}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">{comment.message}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowDeleteModal(null)}>
                <div className="bg-white rounded-sm p-8 max-w-sm w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-serif text-brand-dark mb-3">Supprimer cet avis ?</h3>
                  <p className="text-sm text-gray-500 mb-6">Cette action est irréversible.</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteModal(null)}
                      className="flex-1 px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors rounded-sm"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => handleDeleteComment(showDeleteModal)}
                      className="flex-1 px-4 py-2.5 bg-red-500 text-white text-sm hover:bg-red-600 transition-colors rounded-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Menu Prices */}
        {activeTab === 'menu-prices' && (
          <div>
            <h2 className="text-2xl font-serif text-brand-dark mb-2">Prix du menu</h2>
            <p className="text-sm text-gray-500 mb-6">
              Modifiez les prix des plats affichés sur le site.
            </p>

            <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Plat</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Prix actuel</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Nouveau prix</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => {
                    const currentPrice = overrides.menuPrices[item.tKey] || item.defaultPrice;
                    return (
                      <tr key={item.tKey} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-brand-dark">
                          {t(item.nameKey)}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {item.defaultPrice}
                          {overrides.menuPrices[item.tKey] && (
                            <span className="ml-2 text-amber-500 text-[10px] uppercase">(modifié)</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={currentPrice}
                            onChange={(e) => updateMenuPrice(item.tKey, e.target.value)}
                            className="w-full max-w-[200px] px-3 py-2 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Room Prices */}
        {activeTab === 'room-prices' && (
          <div>
            <h2 className="text-2xl font-serif text-brand-dark mb-2">Prix des chambres</h2>
            <p className="text-sm text-gray-500 mb-6">
              Modifiez les prix des chambres affichés sur le site.
            </p>

            <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Chambre</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Prix actuel</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-500">Nouveau prix</th>
                  </tr>
                </thead>
                <tbody>
                  {roomItems.map((item) => {
                    const currentPrice = overrides.roomPrices[item.key] || item.defaultPrice;
                    return (
                      <tr key={item.key} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-brand-dark">
                          {t(item.nameKey)}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {item.defaultPrice}
                          {overrides.roomPrices[item.key] && (
                            <span className="ml-2 text-amber-500 text-[10px] uppercase">(modifié)</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={currentPrice}
                            onChange={(e) => updateRoomPrice(item.key, e.target.value)}
                            className="w-full max-w-[200px] px-3 py-2 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Descriptions */}
        {activeTab === 'descriptions' && (
          <div>
            <h2 className="text-2xl font-serif text-brand-dark mb-2">Textes & descriptions</h2>
            <p className="text-sm text-gray-500 mb-6">
              Modifiez les textes affichés sur le site. Les champs vides réutiliseront les textes par défaut.
            </p>

            <div className="space-y-4">
              {editableDescriptions.map((desc) => {
                const currentValue = overrides.descriptions[desc.key] || '';
                return (
                  <div key={desc.key} className="bg-white rounded-sm p-6 border border-gray-100 shadow-sm">
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      {desc.label}
                      <span className="ml-2 text-[10px] text-gray-300 font-mono">{desc.key}</span>
                    </label>
                    <textarea
                      rows={3}
                      value={currentValue}
                      onChange={(e) => updateDescription(desc.key, e.target.value)}
                      placeholder="Utiliser le texte par défaut"
                      className="w-full px-4 py-3 border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm resize-y"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
