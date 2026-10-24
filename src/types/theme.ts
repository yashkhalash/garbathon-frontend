export type ThemeMode = 'system' | 'light' | 'dark' | 'senior';

export interface ThemeConfig {
  mode: ThemeMode;
  fontSize: 'standard' | 'large' | 'extra-large';
  highContrast: boolean;
}
