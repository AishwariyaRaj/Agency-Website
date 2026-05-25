# Luminary Studio — Premium Creative Design Agency

Luminary Studio is a premium, production-ready, motion-driven SaaS creative agency website. Designed with rich modern aesthetics, hardware-accelerated animations, and absolute responsiveness.

---

## ✨ Features

- **🌓 Dynamic Light & Dark Theme**: Full theme-switching system (defaults to dark theme) with smooth transitions, customized gradients, and high contrast variables.
- **🎬 Advanced Animations (Framer Motion)**:
  - Aurora animated background blobs in the Hero section.
  - Interactive 3D tilt and spotlight-tracking cards in the Portfolio and Services sections.
  - Word-by-word staggered reveal animations on Hero headlines.
  - Fluid indicator slide animations on navigation links.
- **📐 Grid Layouts**: 8 custom-curated service offerings and 8 showcase projects arranged in responsive 2x4 configurations.
- **📱 Fully Responsive**: Pixel-perfect layout optimization across Mobile, Tablet, and Desktop displays.
- **✉️ Interactive Contact Form**: Complete client-side validation, error handling, loading states, and dynamic confirmation overlays.
- **🖼️ Optimized Assets**: Native `next/image` layout integrations for zero-layout-shift and responsive asset loading.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4 & CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Inter (Google Fonts)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/AishwariyaRaj/Agency-Website.git

# Navigate into the project folder
cd agency-website

# Install packages
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production

```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```bash
├── app/
│   ├── globals.css      # Core tailwind setup & custom theme variables
│   ├── layout.js        # Root HTML metadata and structural styling
│   └── page.js          # Homepage container organizing sections
├── components/
│   ├── ui/
│   │   ├── Button.js       # Reusable button with theme variants
│   │   └── SectionTitle.js # Adaptive section title standard
│   ├── About.js         # Stat counter metrics with live counter animation
│   ├── Contact.js       # Validated form and email pathways
│   ├── Footer.js        # Social linkages and sublinks structure
│   ├── Hero.js          # Aurora backdrop, staggered badges, magnetic button actions
│   ├── Navbar.js        # Sticky header with active underline layout indicators & theme switcher
│   ├── Portfolio.js     # 3D Tilt grid & custom full-view modals
│   └── Services.js      # Spotlight mouse-following responsive grid
└── public/              # High-definition images and visual assets
```
