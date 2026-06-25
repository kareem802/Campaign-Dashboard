import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for intelligently merging Tailwind CSS classes.
// Handles conditional classes and overrides conflicting styles.

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
