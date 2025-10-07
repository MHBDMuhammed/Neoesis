'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface ReaderSettingsConfig {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  lineHeight: 'tight' | 'normal' | 'relaxed';
  contentWidth: 'narrow' | 'normal' | 'wide';
  theme: 'light' | 'dark' | 'sepia';
}

interface ReaderSettingsProps {
  onSettingsChange?: (settings: ReaderSettingsConfig) => void;
  className?: string;
}

const DEFAULT_SETTINGS: ReaderSettingsConfig = {
  fontSize: 'base',
  lineHeight: 'normal',
  contentWidth: 'normal',
  theme: 'light',
};

const FONT_SIZE_MAP = {
  sm: 'prose-sm',
  base: 'prose-base',
  lg: 'prose-lg',
  xl: 'prose-xl',
};

const LINE_HEIGHT_MAP = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
};

const CONTENT_WIDTH_MAP = {
  narrow: 'max-w-2xl',
  normal: 'max-w-3xl',
  wide: 'max-w-4xl',
};

/**
 * ReaderSettings - Okuma ayarları paneli
 *
 * Özellikleri:
 * - Font boyutu ayarı (sm, base, lg, xl)
 * - Satır yüksekliği ayarı (tight, normal, relaxed)
 * - İçerik genişliği ayarı (narrow, normal, wide)
 * - Tema ayarı (light, dark, sepia)
 * - Canlı önizleme
 * - Reset butonu
 * - localStorage'da durum saklanır
 * - Dropdown panel (⚙️ ikonu ile açılır)
 */
export function ReaderSettings({ onSettingsChange, className }: ReaderSettingsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [settings, setSettings] = React.useState<ReaderSettingsConfig>(DEFAULT_SETTINGS);

  // localStorage'dan ayarları yükle
  React.useEffect(() => {
    const saved = localStorage.getItem('readerSettings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        onSettingsChange?.(parsed);
      } catch {
        // Hatalı veri varsa varsayılana dön
      }
    }
  }, [onSettingsChange]);

  // Ayar değiştiğinde kaydet ve bildir
  const handleSettingChange = React.useCallback(
    <K extends keyof ReaderSettingsConfig>(
      key: K,
      value: ReaderSettingsConfig[K]
    ) => {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      localStorage.setItem('readerSettings', JSON.stringify(newSettings));
      onSettingsChange?.(newSettings);
    },
    [settings, onSettingsChange]
  );

  // Varsayılana sıfırla
  const handleReset = React.useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem('readerSettings', JSON.stringify(DEFAULT_SETTINGS));
    onSettingsChange?.(DEFAULT_SETTINGS);
  }, [onSettingsChange]);

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
        aria-label="Okuma ayarlarını aç"
        aria-expanded={isOpen}
      >
        <Settings className="size-4" />
        <span className="hidden sm:inline">Okuma Ayarları</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Settings Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute end-0 top-full z-50 mt-2 w-80 rounded-lg border bg-card p-6 shadow-xl"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Okuma Ayarları</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2 text-xs"
                  >
                    <RotateCcw className="size-3" />
                    Sıfırla
                  </Button>
                </div>

                {/* Font Size */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Font Boyutu</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSettingChange('fontSize', size)}
                        className={cn(
                          'rounded-md border-2 px-3 py-2 text-sm font-medium transition-colors',
                          settings.fontSize === size
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {size.toUpperCase()}
                        {settings.fontSize === size && (
                          <Check className="mx-auto mt-1 size-3" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Height */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Satır Aralığı</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['tight', 'normal', 'relaxed'] as const).map((height) => (
                      <button
                        key={height}
                        onClick={() => handleSettingChange('lineHeight', height)}
                        className={cn(
                          'rounded-md border-2 px-3 py-2 text-xs font-medium capitalize transition-colors',
                          settings.lineHeight === height
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {height === 'tight' ? 'Sıkı' : height === 'normal' ? 'Normal' : 'Gevşek'}
                        {settings.lineHeight === height && (
                          <Check className="mx-auto mt-1 size-3" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Width */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">İçerik Genişliği</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['narrow', 'normal', 'wide'] as const).map((width) => (
                      <button
                        key={width}
                        onClick={() => handleSettingChange('contentWidth', width)}
                        className={cn(
                          'rounded-md border-2 px-3 py-2 text-xs font-medium capitalize transition-colors',
                          settings.contentWidth === width
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {width === 'narrow' ? 'Dar' : width === 'normal' ? 'Normal' : 'Geniş'}
                        {settings.contentWidth === width && (
                          <Check className="mx-auto mt-1 size-3" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Tema</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['light', 'dark', 'sepia'] as const).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => handleSettingChange('theme', theme)}
                        className={cn(
                          'rounded-md border-2 px-3 py-2 text-xs font-medium capitalize transition-colors',
                          settings.theme === theme
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {theme === 'light' ? 'Açık' : theme === 'dark' ? 'Koyu' : 'Sepya'}
                        {settings.theme === theme && (
                          <Check className="mx-auto mt-1 size-3" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="rounded-md border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground mb-2">Önizleme:</p>
                  <div
                    className={cn(
                      'rounded bg-background p-3 text-foreground transition-all',
                      FONT_SIZE_MAP[settings.fontSize],
                      LINE_HEIGHT_MAP[settings.lineHeight]
                    )}
                  >
                    Bu, seçtiğiniz ayarlarla görünen örnek bir metin.
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Hook to use reader settings in lesson content
export function useReaderSettings() {
  const [settings, setSettings] = React.useState<ReaderSettingsConfig>(DEFAULT_SETTINGS);

  React.useEffect(() => {
    const saved = localStorage.getItem('readerSettings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {
        // Ignore
      }
    }
  }, []);

  const getProseClasses = React.useCallback(() => {
    return cn(
      FONT_SIZE_MAP[settings.fontSize],
      LINE_HEIGHT_MAP[settings.lineHeight]
    );
  }, [settings]);

  const getContentWidthClass = React.useCallback(() => {
    return CONTENT_WIDTH_MAP[settings.contentWidth];
  }, [settings]);

  return {
    settings,
    getProseClasses,
    getContentWidthClass,
  };
}
