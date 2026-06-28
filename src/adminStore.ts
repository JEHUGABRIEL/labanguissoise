const STORAGE_KEY = 'labanguissoise-admin-overrides';

export interface AdminOverrides {
  menuPrices: Record<string, string>;
  roomPrices: Record<string, string>;
  descriptions: Record<string, string>;
}

const defaultOverrides: AdminOverrides = {
  menuPrices: {},
  roomPrices: {},
  descriptions: {},
};

export function getAdminOverrides(): AdminOverrides {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultOverrides, ...JSON.parse(stored) };
    }
  } catch {
    // ignore
  }
  return { ...defaultOverrides };
}

export function saveAdminOverrides(overrides: AdminOverrides): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export function getMenuPrice(tKey: string, defaultPrice: string): string {
  const overrides = getAdminOverrides();
  return overrides.menuPrices[tKey] || defaultPrice;
}

export function getRoomPrice(roomKey: string, defaultPrice: string): string {
  const overrides = getAdminOverrides();
  return overrides.roomPrices[roomKey] || defaultPrice;
}

export function getDescriptionOverride(key: string, defaultValue: string): string {
  const overrides = getAdminOverrides();
  return overrides.descriptions[key] || defaultValue;
}

export function applyDescriptionOverrides(i18nInstance: any): void {
  const overrides = getAdminOverrides();
  const descs = overrides.descriptions;
  const keys = Object.keys(descs);
  if (keys.length === 0) return;

  // Group by language — we only override the current language
  const lang = i18nInstance.language?.split('-')[0] || 'fr';
  const bundle: Record<string, string> = {};
  for (const key of keys) {
    bundle[key] = descs[key];
  }
  i18nInstance.addResourceBundle(lang, 'translation', bundle, true);
}

// Comment management (re-uses the same storage as GuestComments)
const COMMENTS_KEY = 'labanguissoise-comments';

export interface Comment {
  id: number;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
}

export function getComments(): Comment[] {
  try {
    const stored = localStorage.getItem(COMMENTS_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return [];
}

export function saveComments(comments: Comment[]): void {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

export function deleteComment(id: number): Comment[] {
  const comments = getComments();
  const updated = comments.filter((c) => c.id !== id);
  saveComments(updated);
  return updated;
}
