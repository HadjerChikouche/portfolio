import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns '#ffffff' or '#111110' depending on which gives better contrast
 * against the given background hex color. Uses WCAG relative luminance so a
 * light project cover color still gets dark, readable text.
 */
export function getReadableTextColor(hex: string): '#ffffff' | '#111110' {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;

  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const luminance =
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  // Contrast ratio against white vs. against near-black; pick the larger.
  const contrastWithWhite = 1.05 / (luminance + 0.05);
  const contrastWithDark = (luminance + 0.05) / 0.06;

  return contrastWithWhite >= contrastWithDark ? '#ffffff' : '#111110';
}
