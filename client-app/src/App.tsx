import React from 'react';
import s from './App.module.css'; 
import Filter from './components/Filter/Filter';
import Ad from './components/Ad/Ad';

const App: React.FC = () => {
  return (
  <div className={s['app-wrapper']}>
      <div>
				<strong>Мои объявления</strong>
        <br />
				42 объявления
			</div>

			<div className={s.search}>
				поиск по объявлениям
			</div>

      <div className={s['main-content']}>
        <Filter />

        <div className={s['ads-wrapper']}>

          <div className={s['ads-block']}>
            {
              Array(20).fill(0).map((_, index) => (
                <Ad 
                  key={index} 
                  title={`Объявление ${index + 1}`}
                  price={1000 + index * 100}
                  category="Электроника"
                />
              ))
            }
          </div>

        </div>
        
      </div>
  </div>
  );
};

export default App;