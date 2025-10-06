// AI:PROTECTED - Footer component logic
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';
import { curriculum } from '@/lessons';
import { NeoesisLogo } from '@/components/brand/NeoesisLogo';

// AI:SAFE-EDIT START - Footer links and social
const footerLinks = {
  product: [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Müfredat', href: '/toc' },
  ],
  resources: [
    { name: 'Dokümantasyon', href: '#' },
    { name: 'Destek', href: '#' },
    { name: 'Gizlilik Politikası', href: '#' },
    { name: 'Hizmet Koşulları', href: '#' },
  ],
  social: [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Email', href: 'mailto:hello@neoesis.dev', icon: Mail },
  ],
};
// AI:SAFE-EDIT END
// End AI:PROTECTED

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Get first lesson from curriculum
  const firstLesson = curriculum.lessons[0];
  const firstLessonSlug = firstLesson?.meta.slug || 'intro';

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* AI:SAFE-EDIT START - Brand and tagline */}
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex size-10 items-center justify-center text-primary">
                <NeoesisLogo size={40} />
              </div>
              <span className="text-2xl font-bold text-foreground">Neoesis</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Size uyum sağlayan akıllı bir öğrenme platformu. Bilgiyi anlayarak kalıcı içgörüye dönüştürün.
            </p>
            {/* AI:SAFE-EDIT END */}
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {footerLinks.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={item.name}
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Ürün</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {/* Lessons link - First lesson */}
              <li>
                <Link
                  href={`/lesson/${firstLessonSlug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dersler
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Kaynaklar</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI:SAFE-EDIT START - Copyright and credits */}
        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Neoesis. Tüm hakları saklıdır.
            </p>
            <p className="text-sm text-muted-foreground">
              Next.js, TypeScript ve Tailwind CSS ile geliştirilmiştir
            </p>
          </div>
        </div>
        {/* AI:SAFE-EDIT END */}
      </div>
    </footer>
  );
}
