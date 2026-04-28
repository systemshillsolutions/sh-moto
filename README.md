# RACK CFMOTO — Landing Page

Pre-launch validační landing page pro top case rack na CF Moto 800MT-X.

## Než spustíš

### 1. Přidej fotky do složky `images/`

Zkopíruj fotky ze složky `../PHOTOS/` a přejmenuj je takto:

| Název souboru    | Zdroj (z PHOTOS/)                        | Poznámka |
|-----------------|------------------------------------------|----------|
| `hero.jpg`      | `Image 8.jpg`                            | Martin na kurzu, motion blur |
| `rack-clean.jpg`| `IMG_2664.jpeg` nebo blurred verze (111–117) | Čistý bílý rack bez brašen |
| `rack-loaded.jpg`| `IMG_2660.jpeg` nebo blurred verze (111–117) | Naložený s Mosko Moto brašnami |
| `rack-mount.jpg`| `IMG_2617.jpeg`                          | Top-down záběr montáže |
| `builder.jpg`   | `Image 4.jpg`                            | Martin na kurzu |
| `log-1.jpg`     | `IMG_2614.jpeg`                          | Dílna + výkresy |
| `log-2.jpg`     | `IMG_2622.JPG`                           | First fit, česká krajina |
| `log-3.jpg`     | `Image 8.jpg` nebo `IMG_2664.jpeg` (blurred) | Hotový rack, kurz |

**Důležité:** Soubory 111.jpg–117.jpg jsou verze s rozmazanými SPZ — hotové k publikaci.
Použij je pro `rack-clean.jpg`, `rack-loaded.jpg` a `log-3.jpg`.

### 2. Připrav email integraci (Mailchimp nebo Brevo)

Viz komentáře v `script.js` (sekce "Email Signup Handler").

**Mailchimp (doporučeno pro začátek):**
1. Založ účet na mailchimp.com (free)
2. Audience → Signup forms → Embedded forms
3. Zkopíruj `action` URL z formuláře
4. V `script.js` nahraď simulaci skutečným fetch voláním

### 3. Přidej analytics (optional, ale doporučeno)

Google Analytics 4 nebo Plausible. Do `<head>` v `index.html` vlož tracking snippet.

---

## Spuštění lokálně

Otevři `index.html` přímo v prohlížeči, nebo použij jednoduchý server:

```bash
# Python (pokud máš Python 3 nainstalovaný)
cd web
python3 -m http.server 3000
# → otevři http://localhost:3000
```

---

## Deploy na Vercel

1. Dej projekt na GitHub (nové repo, nebo do existujícího)
2. Na vercel.com → New Project → Import z GitHubu
3. Framework: "Other" (plain HTML)
4. Deploy → dostaneš URL

Alternativa: Netlify (drag & drop celou složku `web/` na netlify.com/drop)

---

## Checklist před zveřejněním

- [ ] Fotky přidány a správně pojmenovány
- [ ] SPZ rozmazány na všech publikovaných fotkách
- [ ] Email integrace otestována (pošli si testovací email)
- [ ] Analytics nainstalovány
- [ ] Cena potvrzena s Martinem ← **ještě otevřeno**
- [ ] Martin schválil stránku před zveřejněním
- [ ] Doména zakoupena (korbelmoto.cz?)
- [ ] Instagram/Facebook linky v footeru doplněny
