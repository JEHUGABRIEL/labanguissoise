import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
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

export function ReviewSlider() {
  const { t } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Comment[] = JSON.parse(stored);
        setComments(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % comments.length);
  const prev = () => setCurrent((prev) => (prev - 1 + comments.length) % comments.length);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (comments.length < 2) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [comments.length]);

  // Reset index when comments change
  useEffect(() => {
    setCurrent(0);
  }, [comments.length]);

  if (comments.length === 0) return null;

  const comment = comments[current];

  return (
    <section className="py-24 bg-brand-sand">
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-brand-gold font-medium tracking-widest uppercase text-sm">
            {t('comments.title')}
          </span>
          <h2 className="text-4xl font-serif text-brand-dark mt-4">
            {t('comments.header')}
          </h2>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full"
              >
                <div className="bg-white p-10 md:p-12 rounded-sm shadow-sm border border-brand-dark/5">
                  <Quote className="text-brand-gold/30 mx-auto mb-6" size={40} />
                  <p className="text-brand-text/80 text-lg leading-relaxed italic mb-8 max-w-xl mx-auto">
                    &ldquo;{comment.message}&rdquo;
                  </p>
                  <div className="flex justify-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={
                          star <= comment.rating
                            ? 'text-brand-gold fill-brand-gold'
                            : 'text-gray-200'
                        }
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <p className="font-serif text-brand-dark font-medium">
                    — {comment.name}
                  </p>
                  <p className="text-xs text-brand-text/50 mt-1">{comment.createdAt}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {comments.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={prev}
                className="p-2 text-brand-text/50 hover:text-brand-primary transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft size={28} strokeWidth={1.5} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {comments.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === current
                        ? 'bg-brand-gold w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 text-brand-text/50 hover:text-brand-primary transition-colors"
                aria-label="Next review"
              >
                <ChevronRight size={28} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
