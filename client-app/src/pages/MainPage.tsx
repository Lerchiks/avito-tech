import React from 'react';
import s from './MainPage.module.css'; 
import { useAppSelector } from '../store/store';
import Searcher from '../components/Searcher/Searcher';
import Filter from '../components/Filter/Filter';
import AdsList from '../components/AdsList/AdsList';

const MainPage: React.FC = () => {

  const { total } = useAppSelector((state) => state.ads);
  

  return (
    <div className={s['app-wrapper']}>
      <div className={s['info']}>
        <strong>Мои объявления</strong>
        <div className={s['ads-amount']}>{total} объявления</div>
        </div>

        <Searcher/>

        <div className={s['main-content']}>

          <Filter />
          <AdsList/>
          
        </div>
    </div>
  );
};

export default MainPage;