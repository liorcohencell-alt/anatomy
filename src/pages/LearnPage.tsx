import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnatomyItemById } from '../data/anatomyData';
import './LearnPage.css';

interface DraggedLabel {
  id: string;
  text: string;
}

interface ScoreResult {
  totalLabels: number;
  correctLabels: number;
  score: number;
  details: { id: string; text: string; correct: boolean }[];
}

export const LearnPage: React.FC = () => {
  const { anatomyId } = useParams<{ anatomyId: string }>();
  const navigate = useNavigate();
  const item = anatomyId ? getAnatomyItemById(anatomyId) : null;

  // Load saved label positions from localStorage
  const getSavedLabels = () => {
    try {
      const saved = localStorage.getItem(`anatomy-${anatomyId}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved labels:', e);
    }
    return item?.labels || [];
  };

  // Randomize array function
  const randomizeArray = (arr: any[]) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

    const correctLabels = getSavedLabels();

  const [draggedLabel, setDraggedLabel] = useState<DraggedLabel | null>(null);
  const [placedLabels, setPlacedLabels] = useState<
    { id: string; x: number; y: number; text: string }[]
  >([]);
  const [availableLabels, setAvailableLabels] = useState(
    randomizeArray(item?.labels.map((l) => ({ id: l.id, text: l.text })) || [])
  );
  const [draggedLabelId, setDraggedLabelId] = useState<string | null>(null);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number } | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  if (!item) {
    return (
      <div className="learn-page error">
        <p>Item not found</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const handleDragStart = (
    e: React.DragEvent,
    label: { id: string; text: string }
  ) => {
    setDraggedLabel(label);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    if (!draggedLabel || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Check if label is already placed
    const alreadyPlaced = placedLabels.find((p) => p.id === draggedLabel.id);

    if (alreadyPlaced) {
      // Update position
      setPlacedLabels(
        placedLabels.map((p) =>
          p.id === draggedLabel.id ? { ...p, x, y } : p
        )
      );
    } else {
      // Add new placed label
      setPlacedLabels([
        ...placedLabels,
        { id: draggedLabel.id, x, y, text: draggedLabel.text },
      ]);
      setAvailableLabels(
        availableLabels.filter((l) => l.id !== draggedLabel.id)
      );
    }

    setDraggedLabel(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseCoords({ x: Math.round(x), y: Math.round(y) });
  };

  const handleMouseLeave = () => {
    setMouseCoords(null);
  };

  const handleRemoveLabel = (labelId: string) => {
    const label = placedLabels.find((p) => p.id === labelId);
    if (label) {
      setPlacedLabels(placedLabels.filter((p) => p.id !== labelId));
      setAvailableLabels([...availableLabels, { id: label.id, text: label.text }]);
    }
  };

  const handleReset = () => {
    setPlacedLabels([]);
    setAvailableLabels(item.labels.map((l) => ({ id: l.id, text: l.text })));
    setScoreResult(null);
  };

  const handleCheckScore = () => {
    let correctCount = 0;
    const details: { id: string; text: string; correct: boolean }[] = [];

    correctLabels.forEach((correctLabel: any) => {
      const placed = placedLabels.find((p) => p.id === correctLabel.id);
      const isCorrect =
        placed &&
        Math.abs(placed.x - correctLabel.x) < 10 &&
        Math.abs(placed.y - correctLabel.y) < 10;

      if (isCorrect) {
        correctCount++;
      }

      details.push({
        id: correctLabel.id,
        text: correctLabel.text,
        correct: isCorrect || false,
      });
    });

    const score = Math.round((correctCount / correctLabels.length) * 100);

    setScoreResult({
      totalLabels: correctLabels.length,
      correctLabels: correctCount,
      score,
      details,
    });
  };

  return (
    <div className="learn-page">
      <header className="learn-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back
        </button>
        <h1>{item.name}</h1>
        <button onClick={() => navigate(`/editor/${anatomyId}`)} className="editor-btn" title="Edit label positions">
          ✎ Edit
        </button>
        <p>{item.description}</p>
      </header>

      <div className="learn-container">
        <div
          className="image-container"
          ref={imageRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={item.image}
            alt={item.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23f0f0f0" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="16"%3EImage not found - Drag labels here%3C/text%3E%3C/svg%3E';
            }}
          />

          {/* Render target circles for correct positions */}
          {item.labels.map((label) => (
            <div
              key={`target-${label.id}`}
              className="target-circle"
              style={{ left: `${label.x}%`, top: `${label.y}%` }}
              title={label.text}
            ></div>
          ))}

          {/* Render placed labels */}
          {placedLabels.map((label) => (
            <div
              key={label.id}
              className="placed-label"
              style={{ left: `${label.x}%`, top: `${label.y}%` }}
              draggable
              onDragStart={(e) => {
                setDraggedLabel(label);
                e.dataTransfer!.effectAllowed = 'move';
              }}
            >
              <div className="label-pin"></div>
              <div className="label-text">{label.text}</div>
            </div>
          ))}

          {/* Show progress */}
          {placedLabels.length > 0 && !scoreResult && (
            <div className="info-text">
              {placedLabels.length} / {item.labels.length} placed
            </div>
          )}

          {/* Show coordinates */}
          {mouseCoords && (
            <div className="coordinates-display">
              x: {mouseCoords.x}%, y: {mouseCoords.y}%
            </div>
          )}
        </div>

        <div className="labels-panel">
          <h2>Labels to Place</h2>
          <div className="labels-stock">
            {availableLabels.length > 0 ? (
              availableLabels.map((label) => (
                <div
                  key={label.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, label)}
                  className="label-item"
                >
                  {label.text}
                </div>
              ))
            ) : (
              <p className="no-labels">All labels placed!</p>
            )}
          </div>

          <div className="button-group">
            <button onClick={handleCheckScore} className="check-btn" disabled={placedLabels.length === 0}>
              Check Score
            </button>
            <button onClick={handleReset} className="reset-btn">
              Reset
            </button>
          </div>

          {/* Score Result Display */}
          {scoreResult && (
            <div className={`score-result ${scoreResult.score === 100 ? 'perfect' : ''}`}>
              <h3>Results</h3>
              <div className="score-display">
                <div className="score-number">{scoreResult.score}%</div>
                <div className="score-info">
                  {scoreResult.correctLabels} / {scoreResult.totalLabels} correct
                </div>
              </div>

              <div className="score-details">
                <h4>Details:</h4>
                <ul>
                  {scoreResult.details.map((detail) => (
                    <li key={detail.id} className={detail.correct ? 'correct' : 'incorrect'}>
                      <span className="icon">{detail.correct ? '✓' : '✗'}</span>
                      {detail.text}
                    </li>
                  ))}
                </ul>
              </div>

              {scoreResult.score === 100 && (
                <div className="success-message">
                  <p>🎉 Perfect! You got them all correct!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
