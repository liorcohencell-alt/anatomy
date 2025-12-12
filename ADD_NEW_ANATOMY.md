# Adding New Anatomy Pages Guide

This guide explains how to add new anatomy learning pages (like Leg, Arm, Spine, etc.) to the Anatomy Learning App.

## Project Structure

```
src/
├── pages/
│   ├── HomePage.tsx          # Home page with anatomy list
│   ├── LearnPage.tsx         # Main game page (drag & drop)
│   ├── EditorPage.tsx        # Editor to adjust label positions
│   ├── LearnPage.css
│   └── EditorPage.css
├── data/
│   └── anatomyData.ts        # All anatomy definitions
└── components/
```

## Step-by-Step: Adding a New Anatomy Item

### Step 1: Prepare Your Image
1. Create a clear image without labels/annotations
2. Name it descriptively (e.g., `legclear.jpg`, `armclear.jpg`)
3. Save it to `public/images/` folder
4. Image format: JPG or PNG (must be clear and high-quality)

### Step 2: Add to anatomyData.ts

Open `src/data/anatomyData.ts` and add a new object to the `anatomyItems` array:

```typescript
{
  id: 'leg',                              // Unique ID (lowercase, no spaces)
  name: 'Leg',                            // English name
  hebName: 'רגל',                         // Hebrew name (or keep same)
  description: 'The leg is the lower limb of the human body.',
  image: '/images/legclear.jpg',          // Path to your image
  labels: [
    // Initial placeholder positions - will be updated in Step 4
    { id: 'femur', text: 'Femur', x: 50, y: 30 },
    { id: 'tibia', text: 'Tibia', x: 50, y: 60 },
    { id: 'fibula', text: 'Fibula', x: 55, y: 65 },
    // ... add all your labels
  ]
},
```

### Step 3: Update HomePage (Optional)

If you want the new anatomy to appear on the home page, you may need to update `src/pages/HomePage.tsx` to display it in the list. The page usually auto-reads from `anatomyData.ts`.

### Step 4: Use the Editor to Position Labels

1. **Start the editor**: Navigate to `http://localhost:5173/editor/leg` (replace "leg" with your anatomy ID)

2. **Drag labels to correct positions**:
   - Each label shows in the right panel
   - Click and drag the circle with its label to the correct position
   - Watch the coordinates display at bottom-left (shows x, y values)
   - Circles turn green when you hover over them

3. **Save positions**:
   - Click "💾 Save Positions" button
   - Coordinates are saved to browser storage

4. **Copy the code**:
   - Click "📋 Copy Code" button
   - This copies the formatted array to your clipboard

5. **Update anatomyData.ts**:
   - Replace the placeholder `labels` array with the copied code
   - Example of final format:
   ```typescript
   labels: [
     { id: 'femur', text: 'Femur', x: 50, y: 28 },
     { id: 'tibia', text: 'Tibia', x: 49, y: 58 },
     { id: 'fibula', text: 'Fibula', x: 58, y: 62 },
     // ... etc
   ]
   ```

### Step 5: Test the Game

1. **Navigate to the game**: `http://localhost:5173/learn/leg`
2. **Test dragging**: Try placing each label
3. **Check score**: Click "Check Score" to verify positions are correct
4. **All circles should turn green** when labels are placed correctly

## Key Concepts

### Label Coordinates
- **x**: Percentage from left (0-100)
- **y**: Percentage from top (0-100)
- Tolerance: ±10% for correct placement (user gets some flexibility)

### Tolerance Margin
- If you set coordinates as `x: 50, y: 30`
- User can place label anywhere within `x: 40-60, y: 20-40` and it counts as correct
- Adjust tolerance in `LearnPage.tsx` if needed (search for `Math.abs(placed.x - correct.x) < 10`)

## URL Patterns

- **Game page**: `http://localhost:5173/learn/{anatomyId}`
  - Example: `http://localhost:5173/learn/hand`
  
- **Editor page**: `http://localhost:5173/editor/{anatomyId}`
  - Example: `http://localhost:5173/editor/leg`

## File Changes Summary

When adding a new anatomy item, you ONLY need to modify:

1. **public/images/**: Add your image file
2. **src/data/anatomyData.ts**: Add anatomy object to the array
3. **src/pages/HomePage.tsx** (optional): If needed to update the list display

That's it! The app will automatically create the routes and functionality.

## Best Practices

### Images
- Use consistent image size/aspect ratio (currently 4:5 ratio)
- Ensure good contrast for visibility
- Remove any existing labels or annotations
- Aim for 600+ pixels wide for clarity

### Labels
- Use clear, scientific English names
- Keep names short (1-3 words typically)
- List related labels together in the array
- Use consistent capitalization

### Coordinates
- Start with rough estimates in anatomyData.ts
- Use the editor to fine-tune positions
- Place labels near the actual anatomical feature they represent
- Think about which side of the feature the label should appear

### Testing
1. Load the editor page
2. Check all labels can be dragged
3. Place each label correctly
4. Click "Check Score" - all should be green
5. Reset and test again
6. Verify word order randomizes (different each time you refresh)

## Example: Adding Anatomy for Leg

### 1. In anatomyData.ts:
```typescript
{
  id: 'leg',
  name: 'Leg',
  hebName: 'רגל',
  description: 'The leg is a lower limb of the human body.',
  image: '/images/legclear.jpg',
  labels: [
    { id: 'femur', text: 'Femur', x: 50, y: 25 },
    { id: 'patella', text: 'Patella', x: 50, y: 48 },
    { id: 'tibia', text: 'Tibia', x: 48, y: 70 },
    { id: 'fibula', text: 'Fibula', x: 58, y: 72 },
    { id: 'tarsals', text: 'Tarsals', x: 50, y: 92 },
  ]
},
```

### 2. Run editor:
```
http://localhost:5173/editor/leg
```

### 3. Drag and position labels

### 4. Copy updated coordinates back to anatomyData.ts

### 5. Test game:
```
http://localhost:5173/learn/leg
```

## Troubleshooting

**Image not showing:**
- Check file name exactly matches in `anatomyData.ts`
- Ensure image is in `public/images/` folder
- Try opening `http://localhost:5173/images/legclear.jpg` directly in browser

**Labels not in right place:**
- Use the editor to reposition
- Double-check coordinates are between 0-100
- Remember Y increases downward (0 = top, 100 = bottom)

**Game not appearing:**
- Check anatomy ID matches in URL, data, and routes
- Refresh the page (clear browser cache if needed)
- Check browser console for errors

## Future Enhancements

Consider adding:
- Multiple difficulty levels
- Timer/speed challenges
- Leaderboard/scoring system
- Different anatomy categories (Bones, Muscles, Organs)
- Language toggle (English/Hebrew)
- Keyboard navigation for accessibility

---

**Last Updated**: December 12, 2025
**App Version**: 1.0.0
