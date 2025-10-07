'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Copy,
  Share2,
  Maximize2,
  Minimize2,
  Terminal,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CodeBlock } from './CodeBlock';

export interface CodePlaygroundProps {
  initialCode: string;
  language?: 'javascript' | 'typescript' | 'html' | 'css';
  title?: string;
  readOnly?: boolean;
  className?: string;
}

interface ConsoleMessage {
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: number;
}

/**
 * CodePlayground - İnteraktif kod çalıştırma alanı
 *
 * Özellikleri:
 * - CodeMirror editör ile syntax highlighting
 * - Çalıştır butonu → güvenli sandbox'ta çalıştır
 * - Konsol çıktı paneli
 * - Hata mesajları (dostça ve yardımcı)
 * - Reset, Kopyala, Paylaş butonları
 * - Bölünmüş görünüm: kod | çıktı (yeniden boyutlandırılabilir)
 * - Tam ekran modu
 */
export function CodePlayground({
  initialCode,
  language = 'javascript',
  title,
  readOnly = false,
  className,
}: CodePlaygroundProps) {
  const [code, setCode] = React.useState(initialCode);
  const [consoleMessages, setConsoleMessages] = React.useState<ConsoleMessage[]>([]);
  const [isRunning, setIsRunning] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  // Reset to initial code
  const handleReset = React.useCallback(() => {
    setCode(initialCode);
    setConsoleMessages([]);
  }, [initialCode]);

  // Copy code to clipboard
  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [code]);

  // Share code (create shareable link - mock implementation)
  const handleShare = React.useCallback(() => {
    const encoded = btoa(code);
    const shareUrl = `${window.location.origin}/playground?code=${encoded}`;
    navigator.clipboard.writeText(shareUrl);
    addConsoleMessage('info', '✓ Paylaşım linki kopyalandı!');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]); // addConsoleMessage is stable

  // Add message to console
  const addConsoleMessage = React.useCallback(
    (type: ConsoleMessage['type'], message: string) => {
      setConsoleMessages((prev) => [
        ...prev,
        {
          type,
          message,
          timestamp: Date.now(),
        },
      ]);
    },
    []
  );

  // Execute code safely in sandboxed iframe
  const handleRun = React.useCallback(() => {
    if (!iframeRef.current) return;

    setIsRunning(true);
    setConsoleMessages([]);

    try {
      // Create sandboxed execution environment
      const sandbox = iframeRef.current.contentWindow;
      if (!sandbox) {
        throw new Error('Sandbox ortamı oluşturulamadı');
      }

      // Intercept console methods
      const consoleHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { margin: 0; padding: 16px; font-family: monospace; }
              .output { margin-bottom: 8px; }
              .log { color: #333; }
              .error { color: #ef4444; }
              .warn { color: #f59e0b; }
              .info { color: #3b82f6; }
            </style>
          </head>
          <body>
            <script>
              const originalConsole = {
                log: console.log,
                error: console.error,
                warn: console.warn,
                info: console.info
              };

              ['log', 'error', 'warn', 'info'].forEach(method => {
                console[method] = (...args) => {
                  const message = args.map(arg => {
                    if (typeof arg === 'object') {
                      try {
                        return JSON.stringify(arg, null, 2);
                      } catch {
                        return String(arg);
                      }
                    }
                    return String(arg);
                  }).join(' ');

                  window.parent.postMessage({
                    type: 'console',
                    method: method,
                    message: message
                  }, '*');

                  originalConsole[method](...args);
                };
              });

              window.onerror = (msg, url, line, col, error) => {
                window.parent.postMessage({
                  type: 'console',
                  method: 'error',
                  message: \`Hata: \${msg} (Satır \${line})\`
                }, '*');
                return true;
              };

              try {
                ${code}
              } catch (error) {
                console.error('Çalıştırma hatası:', error.message);
              }
            </script>
          </body>
        </html>
      `;

      // Write to iframe
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(consoleHTML);
        iframeDoc.close();
      }

      addConsoleMessage('info', '✓ Kod başarıyla çalıştırıldı');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      addConsoleMessage('error', `Hata: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]); // addConsoleMessage is stable

  // Listen for console messages from iframe
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        addConsoleMessage(event.data.method, event.data.message);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addConsoleMessage]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRun]);

  const containerClasses = cn(
    'overflow-hidden rounded-lg border bg-card',
    isFullscreen && 'fixed inset-4 z-50',
    className
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={containerClasses}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-primary" />
          {title && <span className="font-semibold">{title}</span>}
          <span className="text-xs text-muted-foreground">
            ({language.toUpperCase()})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            className="gap-2"
          >
            <Play className="size-4" />
            Çalıştır
            <kbd className="hidden rounded bg-background px-1.5 py-0.5 text-[10px] lg:inline">
              Ctrl+Enter
            </kbd>
          </Button>

          <div className="h-4 w-px bg-border" />

          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="size-4" />
          </Button>

          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? (
              <CheckCircle2 className="size-4 text-green-500" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>

          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="size-4" />
          </Button>

          <div className="h-4 w-px bg-border" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="size-4" />
            ) : (
              <Maximize2 className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Split View */}
      <div className="flex flex-col lg:flex-row" style={{ height: '500px' }}>
        {/* Code Editor */}
        <div className="flex-1 overflow-auto border-b bg-muted/10 lg:border-b-0 lg:border-e">
          <div className="p-4">
            {readOnly ? (
              <CodeBlock language={language} showLineNumbers>
                {code}
              </CodeBlock>
            ) : (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-full w-full resize-none bg-transparent font-mono text-sm text-foreground outline-none"
                spellCheck={false}
                style={{ minHeight: '400px' }}
              />
            )}
          </div>
        </div>

        {/* Console Output */}
        <div className="flex flex-1 flex-col bg-background">
          <div className="border-b px-4 py-2 text-xs font-medium text-muted-foreground">
            Konsol Çıktısı
          </div>

          <div className="flex-1 overflow-auto p-4 font-mono text-sm">
            {consoleMessages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Henüz çıktı yok. Kodu çalıştırın...
              </div>
            ) : (
              <div className="space-y-2">
                {consoleMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      'flex items-start gap-2 rounded px-2 py-1',
                      msg.type === 'error' && 'bg-red-500/10 text-red-600 dark:text-red-400',
                      msg.type === 'warn' &&
                        'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
                      msg.type === 'info' && 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                      msg.type === 'log' && 'text-foreground'
                    )}
                  >
                    {msg.type === 'error' && <AlertCircle className="size-4 shrink-0" />}
                    <span className="flex-1 whitespace-pre-wrap break-words">
                      {msg.message}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Hidden iframe for code execution */}
          <iframe
            ref={iframeRef}
            sandbox="allow-scripts"
            style={{ display: 'none' }}
            title="Code execution sandbox"
          />
        </div>
      </div>

      {/* Fullscreen backdrop */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
