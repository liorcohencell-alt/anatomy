# Anatomy Learning Web Application

A Hebrew language interactive web application for learning human anatomy through drag-and-drop label placement.

## Features

- **Interactive Homepage**: Browse and select different anatomical topics
- **Drag-and-Drop Learning**: Place anatomical labels on images
- **Real-time Feedback**: Get instant feedback on label placement accuracy
- **Hebrew Support**: Fully right-to-left Hebrew language interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Topics Covered

- כף יד (Hand)
- כף רגל (Foot)
- צלעות (Ribs)
- עמוד השדרה (Spine)
- אגן (Pelvis)
- שכמה (Shoulder)
- שרירי הגב (Back Muscles)
- שרירי החזה (Chest Muscles)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── pages/
│   ├── HomePage.tsx       # Main landing page with anatomy list
│   ├── LearnPage.tsx      # Interactive learning page with drag-drop
│   └── *.css              # Component styles
├── data/
│   └── anatomyData.ts     # Anatomy items and label data
├── App.tsx                # Main app component with routing
└── main.tsx               # Application entry point
```

## How to Use

1. Start the application
2. Select an anatomical topic from the homepage
3. Drag labels from the right panel onto the image to place them
4. Click on placed labels to remove them and reposition
5. Use "Reset" to clear all placements
6. Continue learning with other topics

## Adding Custom Content

Edit `src/data/anatomyData.ts` to:
- Add new anatomical topics
- Update label positions (x, y percentages)
- Change descriptions and images

## Notes

- Images are currently placeholders; replace with actual SVG or PNG files in the `public/images/` folder
- Label positioning uses percentage coordinates (0-100) for responsive scaling
- The app automatically detects when all labels are placed correctly

## Future Enhancements

- Add image upload functionality
- Implement scoring system
- Add different difficulty levels
- Support for multiple languages
- Progress tracking and statistics
