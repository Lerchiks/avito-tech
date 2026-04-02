import React from 'react';
import s from './App.module.css'; 
import Filter from './components/Filter/Filter';
import AdsList from './components/AdsList/AdsList';
import Search from 'antd/es/transfer/search';
import { generateLargeMockData } from './scripts/items.mock';

const App: React.FC = () => {
  const largeDataArray = generateLargeMockData(53);
  return (
  <div className={s['app-wrapper']}>
      <div className={s['info']}>
        <strong>Мои объявления</strong>
        <div className={s['ads-amount']}>{largeDataArray.length} объявления</div>
      </div>

      <div className={s.search}>
        <Search placeholder="Поиск по объявлениям" />
      </div>

      <div className={s['main-content']}>

        <Filter />
        <AdsList largeDataArray={largeDataArray} />
        
      </div>
  </div>
  );
};

export default App;