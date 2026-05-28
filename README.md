# ⌨️ Mengetype

<div align="center">

[![React Version](https://img.shields.io/badge/react-v19.2-61dafb?logo=react&logoColor=black&style=flat-squared)](https://react.dev)
[![Vite Version](https://img.shields.io/badge/vite-v8.0-646cff?logo=vite&style=flat-squared)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-v4.0-38bdf8?logo=tailwind-css&style=flat-squared)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-squared)](LICENSE)

**Mengetype** is a minimalist, modern, and highly customizable typing test application built as a Monkeytype clone. It delivers a premium, distraction-free environment to measure and improve your typing speed.

[Features](#-key-features) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Installation](#-getting-started) • [Shortcuts](#-keyboard-shortcuts) • [Themes](#-themes-gallery)

</div>

---

## ✨ Key Features

*   **🎮 Dual Testing Modes**:
    *   **Time Mode**: Race against the clock with customizable intervals (15s, 30s, 60s, 120s).
    *   **Words Mode**: Type a set number of random words at your own pace (10, 25, 50, 100).
*   **🌐 Bilingual Support**: Dynamically switch the entire user interface and word dictionaries between **English** and **Bahasa Indonesia**.
*   **📊 Live Stats & Rich Results**:
    *   Real-time tracker for WPM (Words Per Minute), Accuracy, and countdown timers.
    *   Post-test analysis dashboard detailing WPM, Raw WPM, Accuracy, correct/incorrect character breakdowns, and custom motivational quotes.
    *   **Interactive SVG Performance Chart**: Visualizes your WPM and error logs second-by-second with sleek, theme-colored vector graphs.
*   **💾 Local Stats & History**: Keep track of all your past attempts. View, scroll, or reset your local typing test log database synced seamlessly to `LocalStorage`.
*   **🎨 Premium Theme Engine**: Switch instantly between carefully crafted theme color schemes:
    *   `Carbon` (Default Dark)
    *   `Terminal` (Retro Matrix Green)
    *   `Sakura` (Soft Pastel Pink)
    *   `Nord` (Arctic Clean Blue)
    *   `Cyberpunk` (Neon Indigo & Pink)
    *   `Laserwave` (Vaporwave Purple)
*   **🔊 Simulated Mechanical Keyboard Sounds**: Real-time synthesized mechanical key-click and error sounds generated using the browser's **Web Audio API** (zero audio file dependencies).
*   **✨ Particle Spark Click Effects**: Features the ReactBits `<ClickSpark>` component which shoots particle sparks that dynamically match your active theme's accent color on every mouse click.
*   **🖥️ Desktop-Optimized Mobile Blocker**: A dedicated full-screen overlay gracefully restricts mobile access with a polite Indonesian/English notification, ensuring the typing experience is reserved for physical desktop/laptop keyboards.

---

## 🛠️ Tech Stack

*   **Frontend Library**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite 8](https://vite.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using the official `@tailwindcss/vite` compiler plugin)
*   **Icon Library**: [Lucide React](https://lucide.dev/)
*   **State Management & Persistence**: React Hooks + LocalStorage
*   **Audio Synthesis**: Web Audio API (custom oscillators & gain nodes)

---

## 🚀 Getting Started

Follow these steps to run Mengetype locally on your system:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended) installed.

### 2. Clone the Repository
```bash
git clone https://github.com/opakpakri/mengetixs.git
cd mengetixs
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Build for Production
To generate a highly optimized production build:
```bash
npm run build
```
The output assets will be created in the `/dist` directory.

---

## ⌨️ Keyboard Shortcuts

Speed up your testing workflow without touching the mouse:

| Shortcut | Action |
| :--- | :--- |
| `Tab` | Focuses the restart button |
| `Enter` (when Tab is focused) | Restarts the typing test instantly |
| `Any Key` (on typing page) | Automatically focuses the typing area and begins the test |

---

## 🎨 Themes Gallery

Mengetype comes with several aesthetic presets to match your style. You can toggle them instantly via the theme palette selector in the footer:

*   **Carbon**: Midnight gray background (`#2f343f`) with warm amber accents.
*   **Terminal**: Absolute black (`#111111`) with vibrant hacker-green glow.
*   **Sakura**: Sweet pink canvas (`#f5e6e8`) with soft red wine tones.
*   **Nord**: Frosty navy (`#2e3440`) with serene ice-blue indicators.
*   **Cyberpunk**: Deep dark space (`#181824`) with electric cyan and hot pink.
*   **Laserwave**: Synthwave purple (`#1b103c`) with bright neon yellow keys.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
