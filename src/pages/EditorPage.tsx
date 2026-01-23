import React, { useState, useRef, useEffect } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Image upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  // Word management state
  const [newWordId, setNewWordId] = useState('');
  const [newWordText, setNewWordText] = useState('');
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editingLabelText, setEditingLabelText] = useState('');

  // Load saved coordinates from server or localStorage on mount
  useEffect(() => {
    if (anatomyId) {
      // Try to load from backend server first
      fetch(`http://localhost:5174/api/load/${anatomyId}`)
        .then(response => response.json())
        .then(data => {
          if (data.success && data.data) {
            setLabels(data.data);
          } else {
            // Fallback to localStorage
            const savedData = localStorage.getItem(`anatomy-${anatomyId}`);
            if (savedData) {
              try {
                const parsedData = JSON.parse(savedData);
                setLabels(parsedData);
              } catch (error) {
                console.error('Failed to load saved data:', error);
              }
            }
          }
        })
        .catch(error => {
          console.warn('Backend server not available, checking localStorage:', error);
          // Fallback to localStorage if server is not running
          const savedData = localStorage.getItem(`anatomy-${anatomyId}`);
          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData);
              setLabels(parsedData);
            } catch (error) {
              console.error('Failed to load saved data:', error);
            }
          }
        });
    }
  }, [anatomyId]);

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

  const handleSave = async () => {
    const labelsData = labels.map((l) => ({
      id: l.id,
      text: l.text,
      x: Math.round(l.x),
      y: Math.round(l.y),
    }));

    try {
      // Try to save to backend server
      const response = await fetch(`http://localhost:5174/api/save/${anatomyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(labelsData),
      });

      if (response.ok) {
        // Show success message
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 3000);
        console.log('Data saved to server successfully');
      } else {
        throw new Error('Server response was not ok');
      }
    } catch (error) {
      console.warn('Backend server not available, saving to localStorage instead:', error);
      // Fallback to localStorage if server is not running
      localStorage.setItem(
        `anatomy-${anatomyId}`,
        JSON.stringify(labelsData)
      );
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
    }
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

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new word/label
  const handleAddWord = () => {
    if (!newWordId.trim() || !newWordText.trim()) {
      alert('Please enter both an ID and text for the word');
      return;
    }

    // Check if ID already exists
    if (labels.some((l) => l.id === newWordId)) {
      alert('This ID already exists. Please use a unique ID.');
      return;
    }

    const newLabel: EditLabel = {
      id: newWordId,
      text: newWordText,
      x: 50,
      y: 50,
    };

    setLabels([...labels, newLabel]);
    setNewWordId('');
    setNewWordText('');
  };

  // Remove a word/label
  const handleRemoveWord = (labelId: string) => {
    if (window.confirm('Are you sure you want to remove this word?')) {
      setLabels(labels.filter((l) => l.id !== labelId));
    }
  };

  // Edit a label's text
  const handleEditLabel = (labelId: string) => {
    const label = labels.find((l) => l.id === labelId);
    if (label) {
      setEditingLabelId(labelId);
      setEditingLabelText(label.text);
    }
  };

  // Save edited label text
  const handleSaveEditedLabel = () => {
    if (!editingLabelText.trim()) {
      alert('Text cannot be empty');
      return;
    }

    setLabels(
      labels.map((l) =>
        l.id === editingLabelId ? { ...l, text: editingLabelText } : l
      )
    );
    setEditingLabelId(null);
    setEditingLabelText('');
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingLabelId(null);
    setEditingLabelText('');
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
          <img src={uploadedImage || item.image} alt={item.name} />

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
          {/* Image Upload Section */}
          <div className="section-block">
            <h2>📸 Upload Image</h2>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="upload-btn"
            >
              Choose Image
            </button>
            {uploadedImage && (
              <p className="upload-success">✓ Image uploaded successfully</p>
            )}
          </div>

          {/* Add Word Section */}
          <div className="section-block">
            <h2>➕ Add Word</h2>
            <input
              type="text"
              placeholder="Word ID (e.g., 'heel')"
              value={newWordId}
              onChange={(e) => setNewWordId(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Word text (e.g., 'Heel')"
              value={newWordText}
              onChange={(e) => setNewWordText(e.target.value)}
              className="input-field"
            />
            <button onClick={handleAddWord} className="add-word-btn">
              Add Word
            </button>
          </div>

          <h2>📝 Words List</h2>

          <div className="labels-list">
            {labels.map((label) => (
              <div key={label.id} className="label-entry">
                {editingLabelId === label.id ? (
                  <div className="edit-label-inline">
                    <input
                      type="text"
                      value={editingLabelText}
                      onChange={(e) => setEditingLabelText(e.target.value)}
                      className="inline-input"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveEditedLabel}
                      className="save-inline-btn"
                    >
                      ✓
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="cancel-inline-btn"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="label-info">
                      <span className="label-name">{label.text}</span>
                      <span className="label-coords">
                        x: {Math.round(label.x)}, y: {Math.round(label.y)}
                      </span>
                    </div>
                    <div className="label-actions">
                      <button
                        onClick={() => handleEditLabel(label.id)}
                        className="edit-btn"
                        title="Edit text"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleRemoveWord(label.id)}
                        className="delete-btn"
                        title="Delete word"
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
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
              <li>Use "Add Word" to add new anatomy terms</li>
              <li>Click "✏️" to edit text, "🗑️" to delete words</li>
              <li>Click "Save Positions" to save your changes</li>
              <li>Click "Copy Code" to copy the coordinates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
