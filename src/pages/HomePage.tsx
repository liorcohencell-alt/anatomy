import React from 'react';
import { Link } from 'react-router-dom';
import { anatomyItems } from '../data/anatomyData';
import './HomePage.css';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>אנטומיה - Anatomy Learning</h1>
        <p>בחר נושא כדי ללמוד</p>
      </header>

      <div className="anatomy-grid">
        {anatomyItems.map((item) => (
          <Link
            to={`/learn/${item.id}`}
            key={item.id}
            className="anatomy-card"
          >
            <div className="card-image">
              <img
                src={item.image}
                alt={item.hebName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e0e0e0" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="14"%3EImage Placeholder%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <div className="card-content">
              <h2>{item.hebName}</h2>
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
