// AI:PROTECTED - Header component logic
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ThemeToggle } from './ThemeToggle';
import { Menu, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { curriculum } from '@/lessons';
import { NeoesisLogo } from '@/components/brand/NeoesisLogo';

// AI:SAFE-EDIT START - Navigation items
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Curriculum', href: '/toc' },
];
// AI:SAFE-EDIT END
// End AI:PROTECTED

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Get first lesson from curriculum
  const firstLesson = curriculum.lessons[0];
  const firstLessonSlug = firstLesson?.meta.slug || 'intro';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* AI:SAFE-EDIT START - Logo and brand name */}
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-bold text-foreground transition-colors hover:text-primary"
        >
          <div className="flex size-8 items-center justify-center text-primary">
            <NeoesisLogo size={32} />
          </div>
          <span className="text-xl">Neoesis</span>
        </Link>
        {/* AI:SAFE-EDIT END */}

        {/* Center: Navigation + Start Learning Button */}
        <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Start Learning Button */}
          <Button asChild size="sm" className="gap-2 shadow-sm">
            <Link href={`/lesson/${firstLessonSlug}`}>
              <PlayCircle className="size-4" />
              <span>Start Learning</span>
            </Link>
          </Button>
        </div>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu */}
          <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Menu</DialogTitle>
              </DialogHeader>
              <nav className="flex flex-col gap-4 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'rounded-md px-4 py-3 text-base font-medium transition-colors hover:bg-muted',
                      pathname === item.href
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Start Learning Button - Mobile */}
                <Button asChild size="default" className="mt-2 gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <Link href={`/lesson/${firstLessonSlug}`}>
                    <PlayCircle className="size-4" />
                    <span>Start Learning</span>
                  </Link>
                </Button>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}
