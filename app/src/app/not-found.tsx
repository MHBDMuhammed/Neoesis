import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-background px-4"
    >
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="space-y-8 p-8 text-center sm:p-12">
          {/* 404 Visual */}
          <div className="space-y-4">
            <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-muted">
              <Search className="size-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
                404
              </h1>
              <p className="text-xl font-semibold text-foreground">
                Page Not Found
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-muted-foreground">
              If you're looking for a specific lesson, try browsing the
              curriculum or using the search feature.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="size-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/toc">
                <BookOpen className="size-4" />
                Return to Table of Contents
              </Link>
            </Button>
          </div>

          {/* Helpful tip */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="font-medium text-foreground">Tip:</strong> Use
              the navigation menu to explore available lessons, or start from
              the beginning to build your knowledge step by step.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
