# 🪁 Makar Sankranti 2026 - Digital Celebration

A cinematic, interactive web experience designed to capture the spirit of Makar Sankranti, the festival of the sun and kites. This project features immersive storytelling, smooth animations, and cultural tributes.

![Makar Sankranti Banner](public/assets/sun_art.png)

## ✨ Key Features

- **Cinematic Scrollytelling**: A seamless blend of vertical and horizontal scrolling powered by `Lenis` and `Framer Motion` to tell the story of the sun moving North (Uttarayan).
- **Paper Kite Wish Generator**: Users can type their name and send a digital "Paper Kite" wish into the virtual sky.
- **Interactive Audio Experience**: A custom music player with "Happy Mode" (Festive beats) and "Peaceful Mode" (Flute/Ambient), complete with fallbacks.
- **Multilingual Greetings**: Animated typography celebrating the tradition with "Tilgud Ghya, God God Bola" in Marathi.
- **Atmospheric Visuals**:
  - Custom Kite Cursor.
  - Floating Particle Effects.
  - Dynamic Day/Night Cycle Backgrounds.
  - Glassmorphism UI Elements.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Directory)
- **Language**: TypeScript
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)
- **Styling**: Tailwind CSS & Modules
- **Icons**: Lucide React

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/makar-sankranti-2026.git
    cd makar-sankranti
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open locally**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router (Pages & Layout)
├── src/
│   ├── components/       # Reusable UI Components (Hero, InfoSection, WishGenerator, etc.)
│   └── assets/           # Images and static assets
├── public/               # Static files served at root
└── next.config.mjs       # Next.js Configuration
```

## 🎨 Cultural Significance

This project highlights the scientific and cultural importance of Makar Sankranti:
- **Scientific**: Marking the sun's entry into Capricorn (Makar) and the start of longer days.
- **Health**: The tradition of flying kites in the morning sun to absorb Vitamin D.
- **Food**: Sesame and Jaggery sweets to keep the body warm.

## ❤️ Credits

Made with ❤️ and Kites by **Daksh Srivastava** & **Prathamesh More**.
_Happy Makar Sankranti!_


      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
