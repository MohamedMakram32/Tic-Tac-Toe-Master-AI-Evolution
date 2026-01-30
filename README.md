# Tic-Tac-Toe Master: AI Evolution

Tic Tac Toe Master: AI Evolution upgrades the classic game with a 10-level AI, sleek glassmorphism design, a reactive talking robot, 20 languages, and dynamic scoring. A smart, modern challenge for strategic minds.

## ✨ Features

### 🎮 Game Modes
- **VS Computer**: Challenge an AI opponent with 10 difficulty levels
- **VS Two Players**: Play against a friend on the same device

### 🤖 AI Difficulty Levels
- **Levels 1-4 (Easy)**: Perfect for beginners - AI makes random moves with occasional smart decisions
- **Levels 5-8 (Medium)**: Balanced gameplay - Mix of strategic and random moves
- **Levels 9-10 (Very Hard/Impossible)**: Ultimate challenge - AI uses minimax algorithm for perfect play

### 🌍 Multi-Language Support (20 Languages)
- English, Arabic (العربية), Spanish (Español), French (Français)
- German (Deutsch), Italian (Italiano), Portuguese (Português)
- Russian (Русский), Chinese (中文), Japanese (日本語)
- Korean (한국어), Hindi (हिन्दी), Turkish (Türkçe)
- Dutch (Nederlands), Polish (Polski), Swedish (Svenska)
- Norwegian (Norsk), Danish (Dansk), Finnish (Suomi)
- Greek (Ελληνικά)

### 🤖 Animated Robot Character
- **Expressions**: Happy, sad, thinking, neutral - changes based on game state
- **Speech Bubbles**: Robot talks with multiple phrases in selected language
- **Dynamic Reactions**: 
  - Greeting phrases when game starts
  - Thinking phrases during AI turn
  - Winning/losing reactions based on position
  - Draw game comments

### 🎨 Modern Design
- **Glassmorphism UI**: Beautiful frosted glass effect with backdrop blur
- **Gradient Backgrounds**: Animated purple gradient with radial overlays
- **Smooth Animations**: Fade-in, slide-up, bounce, and rotation effects
- **Color-Coded Difficulty**: Green (Easy), Orange (Medium), Red (Hard)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🎉 Celebrations & Effects
- **Fireworks**: Colorful firework explosions on victory
- **Confetti**: Animated confetti falling from top on win
- **Win Animations**: Glowing effect on winning cells
- **Score Tracking**: Persistent wins, losses, and draws counter

### 📊 Score System
- **+1 Point**: For each win
- **-1 Point**: For each loss
- **Draws Tracked**: Separate counter for tie games
- **Local Storage**: Scores persist across sessions

## 🚀 How to Play

1. **Select Language**: Choose from 20 available languages
2. **Choose Mode**: Select VS Computer or VS Two Players
3. **Pick Difficulty** (if VS Computer): Choose from 10 levels (1=easiest, 10=impossible)
4. **Play**: Click cells to place your mark (X)
5. **Win**: Get three in a row (horizontally, vertically, or diagonally)

## 🛠️ Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Glassmorphism, animations, gradients
- **Vanilla JavaScript**: No frameworks - pure JS for performance
- **LocalStorage**: For persistent scores and language preference
- **Canvas API**: For confetti effects

## 📦 Files Structure

```
├── index.html          # Main HTML structure
├── style.css           # Glassmorphism design and animations
├── game.js             # Game logic, AI, and interactions
├── translations.js     # 20 language translations
└── README.md          # Documentation
```

## 🎯 AI Algorithm

The computer opponent uses the **Minimax algorithm** for optimal play at higher difficulty levels:
- Evaluates all possible future moves
- Chooses the move that maximizes its chances of winning
- At lower difficulties, intentionally makes suboptimal moves for fairness

## 🎨 Design Highlights

- **Glassmorphism**: Frosted glass effect with `backdrop-filter: blur()`
- **Gradient Animations**: Smooth color transitions
- **Robot Animations**: Floating effect, blinking eyes, moving pupils
- **Cell Animations**: Scale and rotation effects on placement
- **Winning Cells**: Pulsing glow effect

## 📱 Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Setup

Simply open `index.html` in a web browser. No build process or dependencies required!

```bash
# Option 1: Direct open
open index.html

# Option 2: Local server (recommended)
python -m http.server 8080
# Then visit http://localhost:8080
```

## 🎮 Game Controls

- **Click/Tap**: Place your mark on the board
- **New Game Button**: Start a fresh game
- **Back Button**: Return to previous screen

## 🌟 Highlights

✅ 10 AI difficulty levels from beginner to unbeatable
✅ 20 languages with full translation support
✅ Animated robot with expressions and speech
✅ Beautiful glassmorphism design
✅ Fireworks and confetti celebrations
✅ Persistent score tracking
✅ Fully responsive
✅ No dependencies - pure vanilla JS
✅ Smooth animations throughout
✅ Perfect minimax AI implementation

---

Made with ❤️ for Tic-Tac-Toe enthusiasts worldwide! 🌍
