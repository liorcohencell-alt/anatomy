import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { EditorPage } from './pages/EditorPage';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/anatomy">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn/:anatomyId" element={<LearnPage />} />
        <Route path="/editor/:anatomyId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
