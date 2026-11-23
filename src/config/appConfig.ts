export const appConfig = {
  defaultReturnUrl: '',
  reduceMotionLabel: 'Réduire les effets',
  restoreMotionLabel: 'Activer les effets',
};

export function getReturnUrl(): string {
  const value = new URLSearchParams(window.location.search).get('returnUrl')?.trim() ?? appConfig.defaultReturnUrl;
  if (!value || value.toLowerCase().startsWith('javascript:')) return '';
  if (value.startsWith('/') || value.startsWith('./') || value.startsWith('../')) return value;
  try {
    const parsed = new URL(value, window.location.origin);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '';
  } catch {
    return '';
  }
}
