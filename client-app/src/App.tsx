import { Routes, Route, Link } from 'react-router-dom';

import { Home } from './pages/Home';
import { Ads } from './pages/Ads';

const App = () => {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '10px' }}>
        <Link to="/">Главная</Link>
        <Link to="/ads">Объявления</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads" element={<Ads />} />

        {/* Обработка несуществующих страниц (404) */}
        <Route path="*" element={<h2>Страница не найдена</h2>} />
      </Routes>
    </div>
  );
};

export default App;