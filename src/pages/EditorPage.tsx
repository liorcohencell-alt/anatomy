import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnatomyItemById } from '../data/anatomyData';
import './EditorPage.css';

interface EditLabel {
  id: string;
  text: string;
  x: number;
  y: number;
}

export const EditorPage: React.FC = () => {
  const { anatomyId } = useParams<{ anatomyId: string }>();
  const navigate = useNavigate();
  const item = anatomyId ? getAnatomyItemById(anatomyId) : null;

  const [labels, setLabels] = useState<EditLabel[]>(
    item?.labels.map((l) => ({ ...l })) || []
  );
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number } | null>(null);
  const [savedMessage, setSavedMessage] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  if (!item) {
    return (
      <div className="editor-page error">
        <p>Item not found</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const handleMouseDown = (
    e: React.MouseEvent,
    labelId: string
  ) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const label = labels.find((l) => l.id === labelId);

    if (label) {
      const labelPixelX = (label.x / 100) * rect.width;
      const labelPixelY = (label.y / 100) * rect.height;

      setOffset({
        x: e.clientX - (rect.left + labelPixelX),
        y: e.clientY - (rect.top + labelPixelY),
      });
      setDraggingId(labelId);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - offset.x) / rect.width) * 100;
    const y = ((e.clientY - rect.top - offset.y) / rect.height) * 100;

    setMouseCoords({
      x: Math.max(0, Math.min(100, Math.round(x))),
      y: Math.max(0, Math.min(100, Math.round(y))),
    });

    if (draggingId) {
      setLabels(
        labels.map((label) =>
          label.id === draggingId
            ? {
                ...label,
                x: Math.max(0, Math.min(100, x)),
                y: Math.max(0, Math.min(100, y)),
              }
            : label
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleMouseLeave = () => {
    setMouseCoords(null);
    setDraggingId(null);
  };

  const handleSave = () => {
    const labelsData = labels.map((l) => ({
      id: l.id,
      text: l.text,
      x: Math.round(l.x),
      y: Math.round(l.y),
    }));

    // Save to localStorage
    localStorage.setItem(
      `anatomy-${anatomyId}`,
      JSON.stringify(labelsData)
    );

    // Show success message
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all positions?')) {
      setLabels(item.labels.map((l) => ({ ...l })));
    }
  };

  const handleExport = () => {
    const code = labels
      .map((l) => `      { id: '${l.id}', text: '${l.text}', x: ${Math.round(l.x)}, y: ${Math.round(l.y)} },`)
      .join('\n');

    const fullCode = `labels: [\n${code}\n    ]`;

    const textarea = document.createElement('textarea');
    textarea.value = fullCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    alert('Code copied to clipboard!\n\n' + fullCode);
  };

  return (
    <div className="editor-page">
      <header className="editor-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back
        </button>
        <h1>Label Editor - {item.name}</h1>
        <p>Drag the circles to the correct position on the image</p>
      </header>

      <div className="editor-container">
        <div
          className="image-container"
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <img src={item.image} alt={item.name} />

          {/* Render draggable labels */}
          {labels.map((label) => (
            <div
              key={label.id}
              className={`edit-label ${draggingId === label.id ? 'dragging' : ''}`}
              style={{ left: `${label.x}%`, top: `${label.y}%` }}
              onMouseDown={(e) => handleMouseDown(e, label.id)}
            >
              <div className="edit-label-pin"></div>
              <div className="edit-label-text">{label.text}</div>
            </div>
          ))}

          {/* Coordinates display */}
          {mouseCoords && (
            <div className="coordinates-display">
              x: {mouseCoords.x}, y: {mouseCoords.y}
            </div>
          )}
        </div>

        <div className="editor-panel">
          <h2>Positions</h2>

          <div className="labels-list">
            {labels.map((label) => (
              <div key={label.id} className="label-entry">
                <span className="label-name">{label.text}</span>
                <span className="label-coords">
                  x: {Math.round(label.x)}, y: {Math.round(label.y)}
                </span>
              </div>
            ))}
          </div>

          <div className="button-group">
            <button onClick={handleSave} className="save-btn">
              💾 Save Positions
            </button>
            <button onClick={handleExport} className="export-btn">
              📋 Copy Code
            </button>
            <button onClick={handleReset} className="reset-btn">
              🔄 Reset
            </button>
          </div>

          {savedMessage && (
            <div className="save-message">
              ✓ Positions saved successfully!
            </div>
          )}

          <div className="info-box">
            <h3>Instructions:</h3>
            <ul>
              <li>Click and drag each circle to the correct position</li>
              <li>Watch the coordinates update as you drag</li>
              <li>Click "Save Positions" to save your changes</li>
              <li>Click "Copy Code" to copy the coordinates to use in the game</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
