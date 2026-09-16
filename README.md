# ST-SCHON USA LLC - Official Website & Hostinger Deployment Guide

Welcome to the official website repository for **ST-SCHON LLC**, a registered USA business entity and Amazon Seller specializing in modern daily life products.

---

## 🌟 Key Features

1. **Interactive 3D Main Section (Three.js WebGL)**:
   - Real-time 3D rendering of daily life products (Smart Lamp, Thermo Flask, Smart Band, Tech Pad).
   - 360-degree mouse drag & touch rotation.
   - Live color swatch customization (Matte Black, Rose Gold, Titanium Silver, Sage Green).
   - Ambient particle lighting and floating spec cards.

2. **Functional Appointment Booking Engine**:
   - 4-Step interactive scheduling wizard.
   - Real-time calendar date picker & time slot generator (EST).
   - Automatic booking ticket ID generation (`#ST-XXXXXX`).
   - **Downloadable `.ics` Calendar Invite**: Generates iCalendar files compatible with Apple Calendar, Google Calendar, and Microsoft Outlook.
   - LocalStorage persistence allowing visitors to view and manage active bookings.

3. **High-End Motion & Responsive Design**:
   - Glassmorphism dark mode aesthetic custom design system.
   - Seamless mobile, tablet, and desktop layout responsiveness.
   - USA LLC & Amazon Prime verification badges.

---

## 🚀 How to Deploy on Hostinger (Step-by-Step)

Because this website is built with clean HTML5, CSS3, and modern modular WebGL JavaScript, it requires **zero server-side Node building** and can be deployed directly onto **Hostinger Shared Web Hosting, Cloud Hosting, or VPS**!

### Method 1: Upload via Hostinger hPanel File Manager (Recommended - 2 Minutes)

1. **Log in to Hostinger hPanel**:
   - Go to [https://hpanel.hostinger.com](https://hpanel.hostinger.com) and log in.
2. **Open File Manager**:
   - Select your registered domain name.
   - Click on **Files** -> **File Manager** (or **Access files of [your-domain.com]**).
3. **Navigate to `public_html`**:
   - Double-click on the `public_html` directory (this is the root directory for your domain).
   - Delete any default `default.php` or `index.html` file if present.
4. **Upload Project Files**:
   - Upload the entire contents of this project folder (`d:\st-schon`):
     - `index.html`
     - `contact.html`
     - `css/` (folder containing `style.css`, `3d-hero.css`, `booking.css`)
     - `js/` (folder containing `main.js`, `products.js`, `three-hero.js`, `booking.js`)
     - `assets/` (folder containing product images)
5. **Verify HTTPS / SSL**:
   - In Hostinger hPanel, go to **Security** -> **SSL** and make sure SSL is active for your domain.
6. **Visit Your Website**:
   - Open `https://your-domain.com` in your browser. Your 3D website and appointment system will be live!

---

### Method 2: Upload via FTP (FileZilla)

1. In Hostinger hPanel, navigate to **Files** -> **FTP Accounts**.
2. Note your **FTP Host Name**, **FTP Username**, and **Port (21)**.
3. Open **FileZilla** (or Cyberduck), enter your FTP credentials, and connect.
4. Open the remote `public_html` folder.
5. Drag and drop all local project files (`index.html`, `contact.html`, `css/`, `js/`, `assets/`) into `public_html`.

---

## 🛠️ File Structure Overview

```
d:/st-schon/
├── index.html              # Main Home Page with 3D Hero, Daily Products Grid & Trust Cards
├── contact.html            # Contact Page featuring the Interactive Appointment Booking Wizard
├── css/
│   ├── style.css           # Core Design System, Custom Tokens, Dark Glassmorphism
│   ├── 3d-hero.css         # 3D Viewport Controls, Swatches, Spec Cards Layout
│   └── booking.css         # Multi-step Appointment Wizard & Calendar Styling
├── js/
│   ├── three-hero.js       # Three.js 3D WebGL Engine, Lighting, Physics & Controls
│   ├── products.js         # Daily Life Products Catalog Dataset & Quick View Modal
│   ├── booking.js          # Interactive Appointment Wizard, Calendar, .ics Exporter & Storage
│   └── main.js             # General Application Interactions, Mobile Menu & Toast Alerts
├── assets/                 # Generated High-Resolution Product Artwork
└── README.md               # Deployment & Documentation Guide
```

---

## 🔒 License & Copyright
© 2026 ST-SCHON LLC. All Rights Reserved. Registered USA LLC.
