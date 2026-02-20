'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

import { THEME } from '@/config/constants';
import { useThemeStore } from '@/store/themeStore';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useThemeStore();
  const toasterTheme = theme === THEME.SYSTEM ? 'system' : theme;

  return (
    <Sonner
      theme={toasterTheme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
