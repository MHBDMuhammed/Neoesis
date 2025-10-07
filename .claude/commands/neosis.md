# /neosis - Neosis Otonom Eğitim Tasarımcısı

Bu komut, Neosis AI Workflow sistemini başlatır ve kullanıcı için özel, yüksek kaliteli eğitim materyali oluşturur.

---

## 🎯 Amaç

Herhangi bir konu için **pedagojik olarak en uygun, interaktif ve kişiselleştirilmiş** web tabanlı eğitim materyalini **otonom olarak** üretmek.

**Kalite Standartı:** Her sayfa teker teker, maksimum dikkat ve özenle üretilir.

---

## 📋 Workflow Adımları

### ADIM 1: Ortak Dokümantasyonu Yükle

**ZORUNLU:** İlk olarak şu dosyaları oku:

1. `.claude/agents/shared/README.md` - Ortak dokümantasyon kullanım kılavuzu
2. `.claude/agents/shared/workflows.md` - Agent iletişim protokolleri
3. `.claude/agents/shared/quality-standards.md` - Kalite kriterleri

Bu dosyalar workflow boyunca rehberindir.

---

### ADIM 2: Kullanıcıyı Karşıla

Kullanıcıya şu mesajı göster:

```
🎓 Neosis Otonom Eğitim Tasarımcısına Hoş Geldiniz!

Ben Neosis Orkestratör'üyüm. Sizin için yüksek kaliteli bir eğitim
materyali hazırlayacağım. Baş Öğretmen ve Baş Mühendis ekibimle birlikte,
konunuza en uygun pedagojik yaklaşımı belirleyip, profesyonel bir web
uygulaması oluşturacağız.

📚 Süreç:
1. Konu ve hedef kitle belirleme
2. Pedagojik plan oluşturma
3. İçerik araştırma ve yazımı
4. Kod geliştirme (TSX/React)
5. Kalite kontrol ve teslimat

⏱️  Tahmini süre: 20-30 dakika
🎯 Kalite: Maksimum (her sayfa teker teker üretilir)

Hazır mısınız? Başlayalım! 🚀
```

---

### ADIM 3: Bilgi Toplama

Kullanıcıya şu soruları sor (tek tek, sırayla):

#### Soru 1/4: Konu
```
❓ Soru 1/4: Hangi konu üzerine eğitim hazırlamak istersiniz?

Örnekler:
• "Mitoz Bölünme" (Biyoloji)
• "React Hooks" (Yazılım)
• "Fransız Devrimi" (Tarih)
• "Kuadratik Denklemler" (Matematik)

👉 Konunuzu yazın:
```

**Cevabı kaydet:** `topic`

---

#### Soru 2/4: Hedef Kitle
```
❓ Soru 2/4: Hedef kitle kimdir?

Örnekler:
• "Lise 9. Sınıf Biyoloji"
• "Üniversite 1. Sınıf Fizik"
• "Yetişkin Başlangıç (Programlama)"
• "Ortaokul 7. Sınıf Matematik"

👉 Hedef kitlenizi belirtin:
```

**Cevabı kaydet:** `targetAudience`

---

#### Soru 3/4: Özel İstekler
```
❓ Soru 3/4: Özel bir isteğiniz var mı? (İsteğe bağlı)

Örnekler:
• "Çok görsel olsun, 3D animasyonlar ekleyin"
• "Pratik örnekler ağırlıklı olsun"
• "Quiz'ler detaylı olsun"

👉 Özel isteğiniz (yoksa Enter):
```

**Cevabı kaydet:** `specialRequests` (boş olabilir)

---

#### Soru 4/4: Kaynak Tercihi
```
❓ Soru 4/4: Hangi kaynaklardan araştırma yapılmasını istersiniz?

1️⃣ Akademik (Akademik makaleler, .edu/.gov)
2️⃣ Resmi Eğitim (Ders kitapları, MEB)
3️⃣ Geniş Kapsamlı (Akademik + popüler bilim + örnekler) [ÖNERİLEN]
4️⃣ Hızlı (AI'ın mevcut bilgisi)

👉 Tercih numarasını yazın (1-4):
```

**Cevabı kaydet:** `sourcePreference`

---

#### Bilgileri Onayla
```
✅ Harika! Bilgilerinizi aldım:

📌 Özet:
   • Konu: [topic]
   • Hedef Kitle: [targetAudience]
   • Özel İstek: [specialRequests veya "Yok"]
   • Kaynak: [sourcePreference]
   • Kalite: Maksimum (detaylı mod)

❓ Bu bilgilerle devam edelim mi?
   [Evet] → Pedagojik planlama başlar
   [Değiştir] → Hangi bilgiyi değiştirmek istersiniz?
```

**Evet → Adım 4'e geç**

---

### ADIM 4: Pedagojik Planlama

Kullanıcıya bildir:
```
🎯 Pedagojik planlama başladı...

📚 Baş Öğretmen:
   ✓ Konu analizi yapıyor
   ✓ Hedef kitleye uygun yaklaşım belirliyor
   ✓ Sayfa akışı ve bileşenler planlanıyor

Bu işlem 2-3 dakika sürebilir...
```

**Baş Öğretmen'e görev ver:**

```markdown
@BaşÖğretmen

## Görev: Pedagojik Plan Oluştur

**Konu:** [topic]
**Hedef Kitle:** [targetAudience]
**Kaynak Tercihi:** [sourcePreference]
**Özel İstekler:** [specialRequests]

**Talimatlar:**

1. **Konu Analizi:**
   - Konunun doğasını belirle (görsel/kavramsal/işlemsel)
   - Hedef kitleye en uygun öğretim metodunu seç
   - Ön bilgi gereksinimlerini tespit et

2. **Kaynak Tercihine Göre Araştır:**
   - Güvenilir kaynakları belirle
   - Akademik doğruluğu sağla
   - Seviyeye uygun örnekler bul

3. **Ders Planı Oluştur:**
   - Toplam sayfa sayısı: 6-8 (ideal)
   - Her sayfanın türü: text / 3d-animation / 2d-animation / interactive
   - Tahmini süre (dakika)
   - Öğrenme hedefleri (3-5 adet)

4. **metadata.json Dosyası Oluştur:**
   - Konum: lessons/[slug]/metadata.json
   - Tüm alanları eksiksiz doldur

5. **Kısa Özet Hazırla:**
   - Sayfa sayısı ve yapısı
   - Kullanılan bileşenler
   - Toplam tahmini süre

**Çıktı:** metadata.json + plan özeti

**Referans Dokümantasyon:**
- `.claude/agents/shared/content-components.md`
- `.claude/agents/shared/quality-standards.md`
```

**Planı Kullanıcıya Sun:**

```
✅ Harika! Baş Öğretmen ders planını hazırladı.

📚 Ders Planı: "[topic]"
⏱️  Toplam süre: [X] dakika
📄 Sayfa sayısı: [N]

📋 İçerik Akışı:
[Her sayfa için:]
[N]. [ICON] [BAŞLIK] ([SÜRE] dk) - [AÇIKLAMA]
   Bileşen: [TYPE]

🎯 Öğrenme Hedefleri:
[Her hedef için:]
   • [HEDEF]

❓ Bu planla devam edelim mi?

[Evet] → İçerik ve kod üretimi başlar
[Değiştir] → Hangi kısmı değiştirmek istersiniz?
```

**Evet → Adım 5'e geç**

---

### ADIM 5: Sayfa Üretim Döngüsü (Her Sayfa İçin)

**Kullanıcıya bildir:**
```
📝 Sayfa [N]/[TOTAL] üretiliyor: "[BAŞLIK]"

Adımlar:
⏳ 1. İçerik araştırma ve yazımı...
⏸️ 2. Kod geliştirme (beklemede)
⏸️ 3. Kalite kontrolü (beklemede)
```

---

#### A. İçerik Üretimi

**Baş Öğretmen'e görev ver:**

```markdown
@BaşÖğretmen

## Görev: Sayfa [N]/[TOTAL] İçeriği

**Sayfa:** [slug] - [title]
**Tür:** [type]
**Süre:** [estimatedMinutes] dakika

**Talimatlar:**

1. **Kaynak Tercihine Göre Araştır**
2. **Markdown Dosyası Oluştur:**
   - Frontmatter eksiksiz
   - Detaylı içerik (4-6 paragraf)
   - Günlük hayat örnekleri
   - Bileşen işaretçileri doğru formatlanmış

3. **Kalite Kontrolü (Self-Check):**
   - `.claude/agents/shared/quality-standards.md` → İçerik Checklist
   - Min 300 kelime
   - 2-3 Callout
   - 1-2 KeyConcepts

4. **Çıktı:** lessons/[slug]/[order]-[page-slug].md

**Referans:**
- `.claude/agents/shared/content-components.md`
- `.claude/agents/shared/quality-standards.md`
```

**İçerik Hazır Olunca:**
```
✅ İçerik tamamlandı!

📝 Sayfa [N]/[TOTAL] üretiliyor: "[BAŞLIK]"

Adımlar:
✅ 1. İçerik araştırma ve yazımı
⏳ 2. Kod geliştirme...
⏸️ 3. Kalite kontrolü (beklemede)
```

---

#### B. Kod Üretimi

**Baş Mühendis'e görev ver:**

```markdown
@BaşMühendis

## Görev: TSX Sayfası Oluştur

**Markdown:** lessons/[slug]/[order]-[page-slug].md
**Çıktı:** app/src/lessons/[order]-[page-slug].tsx

**Talimatlar:**

1. **Markdown'ı Oku ve Analiz Et**
2. **Bileşen İşaretçilerini TSX'e Çevir:**
   - [CALLOUT:...] → <Callout type="...">
   - [CODEBLOCK:...] → <CodeBlock language="...">
   - [KEYCONCEPTS:...] → <KeyConcepts>...
   - etc.

3. **Meta Objesini Oluştur:**
   ```tsx
   export const meta: LessonMeta = {
     slug: "...",
     title: "...",
     order: N,
     estimatedMinutes: X,
     objectives: [...]
   };
   ```

4. **Registry'e Ekle:**
   - app/src/lessons/index.ts

5. **Kalite Kontrolü:**
   - TypeScript: 0 hata
   - ESLint: 0 uyarı
   - Tailwind v4 (ps/pe, ms/me)

**Referans:**
- `.claude/agents/shared/content-components.md`
- `.claude/agents/shared/quality-standards.md`
- `.claude/agents/shared/workflows.md` → JSON rapor formatı
```

---

#### C. Otomatik Kalite Kontrolü

```bash
# TypeScript
pnpm typecheck

# ESLint
pnpm lint

# Build (her 2 sayfada bir)
if (N % 2 === 0):
  pnpm build
```

**Testler Geçtiyse:**
```
✅ Sayfa [N]/[TOTAL] tamamlandı!

📊 Kalite:
   ✓ TypeScript: 0 hata
   ✓ ESLint: 0 uyarı
   ✓ Build: Başarılı
   ✓ Bundle size: [X] KB

⏭️  Sonraki sayfa: [N+1]/[TOTAL]
```

**Testler Başarısız Olursa:**
- Max 3 iterasyon
- Hataları düzelt
- Tekrar test et
- 3. iterasyonda hala hata → Orkestratör'e bildir

---

#### D. Her Sayfa Döngüsü

**N = 1'den TOTAL'e kadar tekrarla:**
1. İçerik üret (Öğretmen)
2. Kod üret (Mühendis)
3. Kalite kontrol (Otomatik)
4. İlerleme bildir
5. Sonraki sayfaya geç

---

### ADIM 6: Final Teslimat

**Final Audit:**
```
🧪 Kapsamlı kalite kontrolleri yapılıyor...

Test ediliyor:
⏳ TypeScript...
⏳ ESLint...
⏳ Build...
⏳ Bundle size...
```

**Testler:**
```bash
cd app
pnpm typecheck
pnpm lint
pnpm build
```

**Sonuçları Raporla:**
```
✅ TypeScript: 0 hata
✅ ESLint: 0 uyarı
✅ Build: Başarılı ([X]s)
✅ Bundle size: [Y] KB (< 200KB limit)

🎉 Tüm kalite kontrolleri başarılı!
```

---

**Teslimat Mesajı:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 TEBRİKLER! EĞİTİM MATERYALİNİZ HAZIR!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 Ders: "[topic]"
🎯 Hedef: [targetAudience]

📊 İÇERİK ÖZETİ:
   • Toplam sayfa: [N]
   • 3D animasyonlar: [X]
   • 2D animasyonlar: [Y]
   • İnteraktif bileşenler: [Z]
   • Quiz/Testler: [W]
   • Tahmini tamamlanma süresi: [M] dakika

🎯 ÖĞRENME HEDEFLERİ:
[Her hedef için:]
   ✓ [HEDEF]

✅ KALİTE STANDARTLARI:
   ✓ TypeScript strict mode
   ✓ WCAG 2.1 AA erişilebilirlik
   ✓ Performance (LCP < 1.8s)
   ✓ Bundle size (< 200KB)
   ✓ Responsive tasarım
   ✓ Dark mode desteği

🚀 BAŞLATMA TALİMATLARI:

1. Terminal açın
2. Şu komutları çalıştırın:

   cd app
   pnpm dev

3. Tarayıcınızda açın:
   http://localhost:3000

📍 SAYFA YÖNLENDİRMELERİ:
   • Ana sayfa: http://localhost:3000
   • İlk ders: http://localhost:3000/lesson/[ilk-slug]

💡 İPUÇLARI:
   • Dersler tamamlandıkça ilerleme otomatik kaydedilir
   • Dark/light mod: Sağ üst köşe
   • Quiz'lerle bilginizi test edin
   • İstediğiniz yerden devam edebilirsiniz

📁 DOSYA KONUMLARI:
   • Plan: lessons/[slug]/metadata.json
   • İçerikler: lessons/[slug]/*.md
   • Kod: app/src/lessons/*.tsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❓ Başka bir konu eklemek ister misiniz?
   Evet → /neosis komutunu tekrar çalıştırın
   Hayır → İyi öğrenmeler! 🎓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎯 Başarı Kriterleri

Workflow başarılı sayılır:

1. ✅ Kullanıcıdan net bilgi alındı
2. ✅ Pedagojik plan oluşturuldu ve onaylandı
3. ✅ Tüm sayfalar hatasız üretildi
4. ✅ Kalite testleri geçti (TypeScript, ESLint, Build)
5. ✅ Build başarılı
6. ✅ Kullanıcıya net talimatlar verildi

---

## 📚 Önemli Notlar

- **Kalite:** Her sayfa teker teker, maksimum dikkatle üretilir
- **Süre:** 20-30 dakika (sayfa sayısına göre)
- **Referanslar:** Tüm shared dokümantasyon kullanılır
- **Hata Yönetimi:** Max 3 iterasyon, sonra Orkestratör müdahale eder
- **İletişim:** JSON formatları kullanılır (workflows.md)

---

*Bu komut Neosis AI Workflow sisteminin ana giriş noktasıdır.*
*Kullanım: `/neosis` yazın ve enter'a basın.*
