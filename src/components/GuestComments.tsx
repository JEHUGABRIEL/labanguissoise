import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, User, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Comment {
  id: number;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
}

const STORAGE_KEY = 'labanguissoise-comments';

export function GuestComments() {
  const { t } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setComments(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const saveComments = (updated: Comment[]) => {
    setComments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || rating === 0) return;

    setIsSubmitting(true);

    const newComment: Comment = {
      id: Date.now(),
      name: name.trim(),
      rating,
      message: message.trim(),
      createdAt: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    // Simulate a brief submission delay
    setTimeout(() => {
      saveComments([newComment, ...comments]);
      setName('');
      setRating(0);
      setMessage('');
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 500);
  };

  const displayedComments = showAll ? comments : comments.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold font-medium tracking-widest uppercase text-sm">
            {t('comments.header')}
          </span>
          <h2 className="text-4xl font-serif text-brand-dark mt-4 mb-6">
            {t('comments.title')}
          </h2>
          <p className="text-brand-text/70 max-w-xl mx-auto">
            {t('comments.desc')}
          </p>
        </div>

        {/* Submit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="bg-brand-sand p-8 md:p-10 rounded-sm mb-16 border border-brand-dark/5"
        >
          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-brand-primary" size={32} fill="currentColor" />
              </div>
              <h3 className="text-xl font-serif text-brand-dark mb-2">
                {t('comments.merci')}
              </h3>
              <p className="text-brand-text/70 text-sm">
                {t('comments.merciDesc')}
              </p>
            </motion.div>
          ) : (
            <>
              <h3 className="text-xl font-serif text-brand-dark mb-6 text-center">
                {t('comments.laissezAvis')}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">
                    {t('comments.nom')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('comments.nomPlaceholder')}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm"
                  />
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">
                    {t('comments.note')}
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="p-0.5 transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={
                            star <= (hoveredStar || rating)
                              ? 'text-brand-gold fill-brand-gold'
                              : 'text-gray-300'
                          }
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-3 text-sm text-brand-text/60 self-center">
                        {rating === 1 && t('rating.1')}
                        {rating === 2 && t('rating.2')}
                        {rating === 3 && t('rating.3')}
                        {rating === 4 && t('rating.4')}
                        {rating === 5 && t('rating.5')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">
                    {t('comments.avis')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('comments.avisPlaceholder')}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="bg-brand-dark text-white px-8 py-3 uppercase tracking-wider text-sm font-medium hover:bg-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  {isSubmitting ? t('comments.envoi') : t('comments.publier')}
                </button>
              </form>
            </>
          )}
        </motion.div>

        {/* Comments List */}
        {comments.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-brand-text/60">
                {comments.length} {t('comments.avisLabel')}
              </p>
            </div>

            <AnimatePresence mode="popLayout">
              {displayedComments.map((comment) => (
                <motion.div
                  key={comment.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="bg-brand-sand p-6 md:p-8 border border-brand-dark/5 rounded-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-brand-dark text-sm">
                          {comment.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-brand-text/50">
                          <CalendarDays size={12} />
                          <span>{comment.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= comment.rating
                              ? 'text-brand-gold fill-brand-gold'
                              : 'text-gray-200'
                          }
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-brand-text/80 text-sm leading-relaxed">
                    {comment.message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Show more / less toggle */}
            {comments.length > 3 && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-gold transition-colors font-medium text-sm"
                >
                  {showAll
                    ? t('comments.voirMoins')
                    : `${t('comments.voirTous')} (${comments.length})`}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      showAll ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {comments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 border-2 border-dashed border-gray-200 rounded-sm"
          >
            <Star className="text-gray-300 mx-auto mb-4" size={40} />
            <p className="text-brand-text/50 text-sm">
              {t('comments.aucun')}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
