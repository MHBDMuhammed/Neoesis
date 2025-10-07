# Ortak Dokümantasyon - Kullanım Kılavuzu

> **Amaç:** Token tasarrufu ve tutarlılık için paylaşılan bilgiler

---

## 📁 Dosya Yapısı

```
.claude/agents/shared/
├── README.md                    (bu dosya - kullanım kılavuzu)
├── content-components.md        (9 bileşenin detaylı dokümantasyonu)
├── quality-standards.md         (kalite kriterleri ve checklist'ler)
└── workflows.md                 (agent iletişim protokolleri)
```

---

## 🎯 Her Agent Ne Zaman Neyi Okur?

### Baş Öğretmen (İçerik Üretimi)

**Her görev başında oku:**
1. `content-components.md` → Hangi bileşenleri kullanabileceğini öğren
2. `quality-standards.md` → İçerik kalite kriterlerini kontrol et

**İlk kez çalışıyorsa oku:**
3. `workflows.md` → Mühendis'e nasıl veri aktaracağını öğren

**Örnek senaryo:**
```
Orkestratör: "Sayfa 2/6 için içerik oluştur - useState Hook"

Baş Öğretmen:
1. content-components.md → CodeBlock, Callout, KeyConcepts kullanmayı hatırla
2. quality-standards.md → Min 300 kelime, 2-3 Callout gerektiğini gör
3. Markdown içeriği yaz
4. workflows.md → Öğretmen→Mühendis JSON formatını kullan
5. Mühendis'e gönder
```

---

### Baş Mühendis (Kod Üretimi)

**Her görev başında oku:**
1. `content-components.md` → Bileşen props'larını ve TSX örneklerini hatırla
2. `quality-standards.md` → TypeScript/ESLint/Performans kriterlerini kontrol et

**İlk kez çalışıyorsa oku:**
3. `workflows.md` → Öğretmen'den gelen veri formatını anla, rapor formatını öğren

**Örnek senaryo:**
```
Öğretmen'den veri geldi:
{
  "markdown_path": "lessons/react-hooks/02-useState.md",
  "components_used": ["Callout", "CodeBlock", "KeyConcepts"]
}

Baş Mühendis:
1. content-components.md → Callout, CodeBlock, KeyConcepts props'larını kontrol et
2. Markdown'ı oku, TSX'e çevir
3. quality-standards.md → TypeScript 0 hata, ESLint 0 uyarı kontrol et
4. workflows.md → Mühendis→Orkestratör rapor formatını kullan
5. Orkestratör'e rapor gönder
```

---

## 📨 İletişim Protokolleri (Özet)

**Detaylar:** `workflows.md` dosyasında

### Öğretmen → Mühendis

```json
{
  "from": "bas-ogretmen",
  "to": "bas-muhendis",
  "task": "convert_markdown_to_tsx",
  "data": {
    "lesson_slug": "react-hooks",
    "page": {
      "order": 2,
      "slug": "useState-hook",
      "markdown_path": "lessons/react-hooks/02-useState-hook.md",
      "components_used": ["Callout", "CodeBlock", "KeyConcepts"]
    }
  }
}
```

### Mühendis → Orkestratör (Başarı)

```json
{
  "from": "bas-muhendis",
  "status": "success",
  "deliverables": {
    "tsx_file": "app/src/lessons/02-useState-hook.tsx"
  },
  "quality_checks": {
    "typescript": { "passed": true, "errors": 0 },
    "eslint": { "passed": true, "warnings": 0 },
    "build": { "passed": true }
  }
}
```

### Mühendis → Orkestratör (Hata)

```json
{
  "from": "bas-muhendis",
  "status": "failed",
  "issues": [
    {
      "type": "type_error",
      "message": "Property 'meta' is missing",
      "suggested_fix": "Add meta export"
    }
  ],
  "next_action": "fix_errors_required"
}
```

---

## ✅ Kalite Kontrol - Hızlı Checklist

**Detaylar:** `quality-standards.md` dosyasında

### İçerik (Öğretmen)
- [ ] Frontmatter eksiksiz (slug, title, order, estimatedMinutes)
- [ ] Min 3 paragraf veya 300 kelime
- [ ] 2-3 Callout kullanılmış
- [ ] 1-2 KeyConcepts var
- [ ] Hedef kitleye uygun dil

### Kod (Mühendis)
- [ ] TypeScript: 0 hata
- [ ] ESLint: 0 uyarı
- [ ] Build: Başarılı
- [ ] Tailwind v4 (ps/pe, ms/me, logical properties)
- [ ] Erişilebilirlik (ARIA labels, semantic HTML)

---

## 🔄 Workflow Döngüsü

```
┌─────────────────────────────────────┐
│ ORKESTRATÖR                         │
│ "Sayfa 2/6 için üretim başlasın"   │
└─────────────────────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ BAŞ ÖĞRETMEN                        │
│ 1. Ortak docs oku                   │
│ 2. Markdown içerik yaz              │
│ 3. Kalite kontrol (self-check)      │
│ 4. JSON formatında Mühendis'e gönder│
└─────────────────────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ KALITE KONTROLÜ (Otomatik)          │
│ - Frontmatter var mı?               │
│ - Min içerik var mı?                │
│ - Bileşen işaretçileri doğru mu?    │
└─────────────────────────────────────┘
          ↓ PASS              ↓ FAIL
          ↓                   └──→ Öğretmen'e feedback
          ↓
┌─────────────────────────────────────┐
│ BAŞ MÜHENDİS                        │
│ 1. Ortak docs oku                   │
│ 2. Markdown → TSX çevir             │
│ 3. Bileşenleri implement et         │
│ 4. Testleri çalıştır                │
│ 5. JSON rapor Orkestratör'e gönder  │
└─────────────────────────────────────┘
               ↓
┌─────────────────────────────────────┐
│ OTOMATIK TESTLER                    │
│ - TypeScript check                  │
│ - ESLint check                      │
│ - Build test                        │
└─────────────────────────────────────┘
          ↓ PASS              ↓ FAIL
          ↓                   └──→ Mühendis'e feedback (max 3 iterasyon)
          ↓
┌─────────────────────────────────────┐
│ ORKESTRATÖR                         │
│ ✅ Sayfa 2/6 tamamlandı             │
│ → Sayfa 3/6'ya geç                  │
└─────────────────────────────────────┘
```

---

## 🎯 En İyi Pratikler

### 1. Dokümantasyonu Önce Oku
- ❌ **Yanlış:** Direkt kod yazmaya başla
- ✅ **Doğru:** İlgili shared dosyasını oku, sonra çalış

### 2. JSON Formatlarına Uy
- ❌ **Yanlış:** Rastgele mesaj formatı kullan
- ✅ **Doğru:** `workflows.md`'deki JSON şablonunu kullan

### 3. Kalite Kriterlerini Uygula
- ❌ **Yanlış:** Direkt teslim et
- ✅ **Doğru:** quality-standards.md checklist'ini kontrol et

### 4. Hata Durumunda Protokolü Takip Et
- ❌ **Yanlış:** Orkestratör'e "hata var" de, bekle
- ✅ **Doğru:** workflows.md'deki hata recovery protokolünü uygula

---

## 📊 Beklenen Faydalar

| Fayda | Açıklama |
|-------|----------|
| **Token Tasarrufu** | Tekrar eden bilgiler sadece 1 yerde |
| **Tutarlılık** | Tüm agent'lar aynı standartları kullanır |
| **Hata Azaltma** | Net protokoller, daha az hata |
| **Bakım Kolaylığı** | Değişiklik sadece 1 yerde yapılır |
| **Hız Artışı** | Agent'lar ne yapacağını biliyor |

---

## 🔗 Hızlı Linkler

- **Bileşenler:** [content-components.md](./content-components.md)
- **Kalite:** [quality-standards.md](./quality-standards.md)
- **Workflow:** [workflows.md](./workflows.md)

---

*Son güncelleme: 2025-10-07*
*Versiyon: 1.0*
