# Ortak İş Akışları ve Protokoller

> **Kullanım:** Baş Öğretmen ve Baş Mühendis arasındaki iletişim protokolleri

---

## 🔄 Öğretmen → Mühendis Veri Aktarımı

### Standart Mesaj Formatı

```json
{
  "from": "bas-ogretmen",
  "to": "bas-muhendis",
  "task": "convert_markdown_to_tsx",
  "timestamp": "2025-10-07T12:00:00Z",
  "data": {
    "lesson_slug": "react-hooks",
    "page": {
      "order": 2,
      "slug": "useState-hook",
      "markdown_path": "lessons/react-hooks/02-useState-hook.md",
      "components_used": ["Callout", "CodeBlock", "KeyConcepts", "StepGuide"],
      "special_requirements": ["3D animation", "Interactive quiz"]
    },
    "metadata": {
      "title": "useState Hook",
      "estimatedMinutes": 15,
      "type": "text",
      "objectives": [
        "useState hook'unun ne olduğunu anlamak",
        "State yönetimini öğrenmek",
        "Pratik örnekler yapmak"
      ]
    }
  },
  "quality_requirements": {
    "typescript_strict": true,
    "accessibility": "WCAG_AA",
    "performance_lcp": 1.8,
    "bundle_size_max": 200
  }
}
```

---

## 📤 Mühendis → Orkestratör Rapor Formatı

### Başarılı Teslimat

```json
{
  "from": "bas-muhendis",
  "task_id": "react-hooks-02-useState",
  "timestamp": "2025-10-07T12:15:00Z",
  "status": "success",
  "deliverables": {
    "tsx_file": "app/src/lessons/02-useState-hook.tsx",
    "components_implemented": ["Callout", "CodeBlock", "KeyConcepts"],
    "line_count": 248,
    "bundle_size": 145
  },
  "quality_checks": {
    "typescript": {
      "passed": true,
      "errors": 0
    },
    "eslint": {
      "passed": true,
      "warnings": 0
    },
    "build": {
      "passed": true,
      "time_seconds": 18
    },
    "accessibility": {
      "passed": true,
      "wcag_level": "AA"
    }
  },
  "next_action": "ready_for_next_page"
}
```

### Başarısız/Kısmi Teslimat

```json
{
  "from": "bas-muhendis",
  "task_id": "react-hooks-02-useState",
  "timestamp": "2025-10-07T12:15:00Z",
  "status": "failed",
  "deliverables": {
    "tsx_file": "app/src/lessons/02-useState-hook.tsx",
    "partial_completion": 75
  },
  "quality_checks": {
    "typescript": {
      "passed": false,
      "errors": 2,
      "details": [
        "Property 'meta' is missing in type",
        "Type 'string' is not assignable to type 'number'"
      ]
    },
    "eslint": {
      "passed": true,
      "warnings": 0
    }
  },
  "issues": [
    {
      "type": "type_error",
      "file": "02-useState-hook.tsx",
      "line": 45,
      "message": "Property 'meta' is missing",
      "severity": "error",
      "suggested_fix": "Add meta export to the file"
    }
  ],
  "next_action": "fix_errors_required"
}
```

---

## 🔁 Geri Bildirim Döngüsü

### İçerik Kalite Kontrolü

**Adım 1: Öğretmen İçerik Üretir**
```markdown
Baş Öğretmen markdown dosyasını oluşturur:
lessons/[slug]/[page].md
```

**Adım 2: Otomatik Kalite Kontrolü**
```bash
# Frontmatter kontrolü
✅ slug mevcut
✅ title mevcut
✅ order mevcut

# İçerik kontrolü
✅ Min 3 paragraf var
✅ Min 1 Callout var
✅ Hedef kitleye uygun dil

# SONUÇ: PASS → Mühendise gönder
```

**Adım 3 (Hata Durumu): Geri Bildirim**
```json
{
  "to": "bas-ogretmen",
  "feedback": {
    "status": "revision_needed",
    "issues": [
      {
        "field": "frontmatter.estimatedMinutes",
        "error": "missing",
        "fix": "Tahmini süreyi ekleyin (5-30 dakika arası)"
      },
      {
        "field": "content",
        "error": "too_short",
        "current": "150 kelime",
        "required": "300 kelime",
        "fix": "Daha fazla açıklama ve örnek ekleyin"
      }
    ]
  }
}
```

**Adım 4: Öğretmen Düzeltir**
- Eksiklikleri tamamlar
- Tekrar kalite kontrolüne gönderir
- PASS → Mühendise aktarılır

---

### Kod Kalite Kontrolü

**Adım 1: Mühendis Kod Üretir**
```tsx
// app/src/lessons/02-useState-hook.tsx oluşturulur
```

**Adım 2: Otomatik Testler**
```bash
# TypeScript
pnpm typecheck
→ Result: PASS (0 errors)

# ESLint
pnpm lint
→ Result: PASS (0 warnings)

# Build
pnpm build
→ Result: PASS (18s)
```

**Adım 3 (Hata Durumu): Mühendis Düzeltir**
```json
{
  "iteration": 2,
  "previous_errors": [
    "TypeScript: Property 'meta' missing"
  ],
  "fixes_applied": [
    "Added meta export"
  ],
  "retest": "in_progress"
}
```

**Adım 4: Tüm Testler Geçene Kadar Döngü**
- Max 3 iterasyon
- 3. iterasyonda hala hata varsa → Orkestratör'e bildir

---

## 🚦 Hata Yönetimi Protokolü

### Hata Seviyeleri

**1. INFO (Bilgi)**
- Uyarı seviyesi
- İş akışını durdurmaz
- Örnek: "Bundle size yaklaşıyor limiti (180KB/200KB)"

**2. WARNING (Uyarı)**
- Dikkat gerektirir
- İş akışı devam eder
- Örnek: "ESLint warning: Unused variable 'temp'"

**3. ERROR (Hata)**
- İş akışını durdurur
- Düzeltme gerekir
- Örnek: "TypeScript error: Type mismatch"

**4. CRITICAL (Kritik)**
- Tüm workflow durur
- Manuel müdahale gerekir
- Örnek: "Build failed: Out of memory"

### Hata Recovery Stratejisi

**Seviye 1-2: Otomatik Düzeltme**
```
1. Hata tespit edilir
2. Otomatik düzeltme dener
3. Tekrar test edilir
4. PASS → Devam et
```

**Seviye 3: İterasyon**
```
1. Hata tespit edilir
2. Agent'a feedback verilir
3. Agent düzeltir
4. Tekrar test edilir
5. Max 3 iterasyon
```

**Seviye 4: Escalation**
```
1. Kritik hata tespit edilir
2. Orkestratör'e bildir
3. Kullanıcıya rapor et
4. Manuel müdahale bekle
```

---

## 📋 Sayfa Üretim Workflow'u

### Tek Sayfa Döngüsü (Seviye 4 - Detaylı Mod)

```
┌─────────────────────────────────────────────┐
│ BAŞLANGIÇ: Sayfa N/TOTAL                    │
└─────────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 1. ÖĞRETMEN → İçerik Üretimi                │
│    - Markdown dosyası oluştur               │
│    - Pedagojik prensipler uygula            │
│    - Bileşen işaretçilerini ekle            │
└─────────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 2. İÇERİK KALİTE KONTROLÜ                   │
│    ✓ Frontmatter kontrolü                   │
│    ✓ Minimum içerik kontrolü                │
│    ✓ Pedagojik kontrol                      │
│    ✓ Bileşen işaretçileri kontrolü          │
└─────────────────────────────────────────────┘
               ↓
         [PASS?] ─── NO ──→ Öğretmen'e feedback
               ↓                    ↓
              YES              Düzelt ve tekrar
               ↓                    ↓
               ←────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 3. MÜHENDİS → Kod Üretimi                   │
│    - Markdown'ı TSX'e çevir                 │
│    - Bileşenleri implement et               │
│    - Meta objesini oluştur                  │
│    - Registry'e ekle                        │
└─────────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 4. KOD KALİTE KONTROLÜ                      │
│    ✓ TypeScript check                       │
│    ✓ ESLint check                           │
│    ✓ Build test                             │
│    ✓ Erişilebilirlik kontrolü               │
└─────────────────────────────────────────────┘
               ↓
         [PASS?] ─── NO ──→ Mühendis'e feedback
               ↓                    ↓
              YES              Düzelt ve tekrar
               ↓                    ↓
               ←────────────────────┘
               ↓
┌─────────────────────────────────────────────┐
│ 5. İLERLEME RAPORU                          │
│    - Kullanıcıya bilgi ver                  │
│    - State güncelle                         │
│    - Sonraki sayfaya geç                    │
└─────────────────────────────────────────────┘
               ↓
         [Tüm sayfalar tamamlandı mı?]
               ↓                    ↓
              YES                  NO
               ↓                    ↓
         Final Audit        Sonraki sayfa (N+1)
               ↓                    ↓
           Teslimat                 ↑
                                    │
                └───────────────────┘
```

---

## 🎯 Performans Optimizasyonu

### Paralel İşleme (Gelecek Optimizasyon)

**Mevcut (Seri):**
```
Sayfa 1 İçerik → Sayfa 1 Kod → Sayfa 2 İçerik → Sayfa 2 Kod
[5dk]            [3dk]          [5dk]            [3dk]
= 16 dakika
```

**Optimize (Paralel):**
```
Sayfa 1-2-3 İçerik (Birlikte) → Kalite Kontrolü → Sayfa 1-2-3 Kod (Birlikte)
[8dk]                            [2dk]            [6dk]
= 16 dakika → 16 dakika (aynı süre ama hata toleransı daha yüksek)
```

### Caching (Gelecek)

**Cache Edilebilir:**
- Bileşen dokümantasyonu (değişmiyor)
- Kalite standartları (değişmiyor)
- Template'ler (değişmiyor)

**Cache Edilemez:**
- İçerik (her sayfa benzersiz)
- Kod (her sayfa benzersiz)
- Test sonuçları (her seferde yeni)

---

## 📊 İlerleme Tracking

### State Güncellemeleri

**Her sayfa tamamlandığında:**
```json
{
  "completed_pages": [
    {
      "order": 1,
      "slug": "giris",
      "content_generated_at": "2025-10-07T12:00:00Z",
      "code_generated_at": "2025-10-07T12:05:00Z",
      "tests_passed": true,
      "duration_seconds": 300
    }
  ],
  "current_page": {
    "order": 2,
    "slug": "useState",
    "started_at": "2025-10-07T12:05:00Z",
    "status": "content_generation"
  },
  "estimated_completion": "2025-10-07T12:35:00Z"
}
```

**Kullanıcıya Rapor:**
```
✅ Sayfa 1/6 tamamlandı (5 dakika)
⏳ Sayfa 2/6 içerik üretiliyor...
⏸️  Sayfa 3-6 beklemede

Tahmini kalan süre: ~25 dakika
```

---

*Bu workflow'lar tüm Neosis AI sistemi için standart protokollerdir.*
