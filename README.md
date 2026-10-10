# ✏️ Drawsite — Sketchpad

> Düşüncelerini **el yazısıyla** hayata geçiren, [Rough.js](https://roughjs.com/) ile çizilmiş el çizimi tarzında tek sayfalık (landing page) bir web deneyimi.

**Drawsite**, not defteri dokusunu ve elle çizilmiş hissi dijital ortama taşıyan, bağımlılığı minimum tutulmuş bir tanıtım sayfasıdır. Tüm görsel dil — dikdörtgenler, oklar, yıldızlar, kart kenarlıkları, sayaçlar — tarayıcıda **çalışma zamanında canvas ve SVG üzerine** Rough.js ile çizilir. Yani ekranda gördüğünüz "el çizimi" öğelerin hiçbiri statik bir görsel değil; hepsi kod ile üretilir.

---

## 📸 Ekran Görüntüsü

> Aşağıdaki yer tutucuyu gerçek ekran görüntüsüyle değiştirin.

```text
docs/screenshot.png   ← (placeholder)
```

<!--
 Eklendiğinde şu satırı kullanın:
 ![Drawsite ana sayfa ekran görüntüsü](./docs/screenshot.png)
-->

---

## ✨ Özellikler

- **Saf el çizimi estetiği** — Rough.js ile üretilen, her yenilemede hafifçe değişen "pürüzlü" (sketchy) çizgi ve şekiller.
- **Dinamik hero illüstrasyonu** — Monitör, kartlar, kalem, yıldız ve altı çizili vurgular tamamen canvas üzerinde kod ile çizilir.
- **SVG ikonlar** — Özellik kartlarındaki ikonlar Rough.js'in SVG modu ile üretilir (pikselleşmez, ölçeklenir).
- **Kaydırmayla ortaya çıkan içerik** — `IntersectionObserver` ile tetiklenen fade-up animasyonları.
- **Animasyonlu sayaçlar** — Görünür olduklarında hedefe doğru sayan istatistikler.
- **Sıcak, not defteri teması** — Mürekkep, kâğıt ve defter çizgisi dokulu, CSS değişkenleriyle temalandırılabilir renk paleti.
- **Tam duyarlı (responsive)** — Masaüstü, tablet ve mobil için uyarlanmış düzen.
- **Erişilebilirlik ve performans** — `prefers-reduced-motion` desteği, klavye odağı, anlamsal HTML ve ertelenmiş (deferred) betik yükleme.

---

## 🧰 Teknolojiler

| Katman | Teknoloji |
| --- | --- |
| Çizim motoru | [Rough.js 4.6.6](https://roughjs.com/) (CDN üzerinden) |
| Yapı | Tek dosya HTML5 + CSS3 + Vanilla JavaScript (ES6+) |
| Yazı tipleri | Caveat, Patrick Hand, Inter (Google Fonts) |
| İkonlar | Satır içi (inline) SVG — Rough.js ile üretilir |
| Bağımlılık yönetimi | Yok — derleme (build) adımı gerekmez |

Proje **sıfır derleme** (zero-build) yaklaşımı ile yazılmıştır: bir `index.html` dosyası, bir tarayıcı ve internet bağlantısı dışında hiçbir şeye ihtiyaç duymaz.

---

## 🚀 Kurulum ve Çalıştırma

Klonlayın ve doğrudan açın:

```bash
git clone https://github.com/nickzsche/drawsite.git
cd drawsite
```

Ardından `index.html` dosyasını tarayıcınızda açabilirsiniz. Yerel bir sunucu ile çalıştırmak (önerilir; dosya yolu yerine `http://` üzerinden çalışır):

```bash
# Python 3 ile
python3 -m http.server 8000
# → http://localhost:8000
```

```bash
# Node.js ile
npx serve .
```

> **Not:** Sayfa Rough.js ve Google Fonts'u CDN üzerinden çektiği için ilk yüklemede internet bağlantısı gerekir.

---

## 📁 Proje Yapısı

```text
drawsite/
├── index.html          # Tüm sayfa: yapı, stil ve çizim mantığı
├── 404.html            # GitHub Pages için özel hata sayfası
├── assets/
│   ├── favicon.svg     # Tarayıcı sekmesi ikonu (el çizimi kalem)
│   └── og-image.png    # Sosyal medya paylaşım görseli (Open Graph)
├── README.md           # Bu dosya
└── .gitignore
```

`index.html` tek dosyadır ve içinde üç bölüm barındırır:

1. **`<style>`** — CSS değişkenleri (`:root`), tüm bileşen stilleri, animasyonlar ve duyarlı düzen kuralları.
2. **`<body>`** — Nav, hero, özellikler, istatistikler, yorumlar, CTA ve footer bölümleri.
3. **`<script>`** — Rough.js ile çizim fonksiyonları, `IntersectionObserver` animasyonları ve sayaç mantığı.

---

## 🎨 Özelleştirme

Renk paletini `index.html` içindeki `:root` bloğundan değiştirebilirsiniz:

```css
:root {
  --bg: #fdf6ec;        /* kâğıt arka planı */
  --ink: #2d2926;       /* mürekkep / ana metin */
  --accent: #e85d40;    /* vurgu (mercan) */
  --accent2: #4a90d9;   /* ikincil vurgu (mavi) */
  --accent3: #5cb85c;   /* üçüncül vurgu (yeşil) */
  --paper: #fff9f0;     /* kart yüzeyi */
}
```

Çizim parametrelerini (`roughness`, `strokeWidth`, `fillStyle` vb.) düzenleyerek el çizimi hissini daha pürüzlü ya da daha temiz hale getirebilirsiniz; dağınık/kusurlu görünüm **`roughness`** değeri ile kontrol edilir.

---

## ♿ Erişilebilirlik ve Performans

- Anlamsal işaretleme: `nav`, `main`, `section`, `footer` ve `aria-label` kullanılır.
- Dekoratif tüm `<canvas>` ve ikonlar ekran okuyuculardan `aria-hidden` ile gizlenir.
- Klavye kullanıcıları için "İçeriğe geç" (skip link) ve görünür odak halkaları.
- `prefers-reduced-motion` tercihine saygı duyulur; hareket azaltıldığında animasyonlar kapatılır.
- Rough.js betiği `defer` ile yüklenir; CDN için önceden bağlantı (preconnect) kurulur.
- Pencere yeniden boyutlandırma, çizimleri tekrar tetiklemeden önce geciktirilir (debounce).

---

## 🗺️ Yol Haritası (Fikirler)

- [ ] Gerçek çizim tuvali (canvas) etkileşimi ve araç seçimi
- [ ] Açık/koyu tema geçişi
- [ ] Çoklu dil desteği (i18n)
- [ ] Çizimleri PNG/SVG olarak dışa aktarma

---

## 🛠️ Geliştirme Notları

- Derleme adımı yoktur; değişiklik yapıp kaydetmek yeterlidir.
- Tarayıcı desteği: modern (ES6+, `IntersectionObserver`, CSS `clamp()`, `aspect-ratio`).
- Katkı sağlamak için bir dal (branch) açın, değişiklikleri anlamlı commit mesajlarıyla işleyin ve pull request gönderin.

---

<p align="center">Rough.js ile ❤️ ve ✏️ kullanılarak yapıldı.</p>
