import React, { useEffect, useState } from 'react';
import s from './AdsList.module.css';
import Ad from '../Ad/Ad';
import { Pagination, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchAds } from '../../store/slices/adsSlice';

const AdsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { 
        items, 
        total, 
        loading, 
        viewMode,
        selectedCategories, 
        selectedQuery, 
        sortColumn, 
        sortDirection,
        needsRevision
    } = useAppSelector((state) => state.ads);

    const [currentPage, setCurrentPage] = useState(1);
    
    const [filtersAtLastRender, setFiltersAtLastRender] = useState({
        selectedCategories,
        selectedQuery,
        needsRevision,
        viewMode
    });

    const pageSize = viewMode === 'grid' ? 10 : 5;

    const filtersChanged = 
        filtersAtLastRender.selectedCategories !== selectedCategories ||
        filtersAtLastRender.selectedQuery !== selectedQuery ||
        filtersAtLastRender.needsRevision !== needsRevision ||
        filtersAtLastRender.viewMode !== viewMode;

    if (filtersChanged) {
        setFiltersAtLastRender({ selectedCategories, selectedQuery, needsRevision, viewMode });
        setCurrentPage(1);
    }

    useEffect(() => {
        const skip = (currentPage - 1) * pageSize;
        
        const promise = dispatch(fetchAds({ 
            limit: pageSize,
            skip: skip, 
            categories: selectedCategories,
            q: selectedQuery,
            sortColumn,
            sortDirection,
            needsRevision
        }));

        return () => {
            if (promise.abort) promise.abort();
        };
    }, [
        dispatch, 
        currentPage, 
        pageSize, 
        selectedCategories, 
        selectedQuery, 
        sortColumn, 
        sortDirection, 
        needsRevision
    ]);

    if (loading || items.length === 0) {
        return <div className={s['ads-loading']}><Spin size="large" /></div>;
    }

    const isListView = viewMode === 'virtual';

    return (
        <div className={s['ads-container']}>
            <div className={isListView ? s['ads-list'] : s['ads-grid']}>
                {items.map((item) => (
                    <Ad
                        key={item.id}
                        item={item}
                        listView={isListView}
                    />
                ))}
                
                {items.length === 0 && !loading && (
                    <div className={s.empty}>Объявлений не найдено</div>
                )}
            </div>

            {total > pageSize && (
                <div className={s['pagination-wrapper']}>
                    <Pagination
                        className={s['my-pagination']}
                        current={currentPage}
                        total={total}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false} 
                    />
                </div>
            )}
        </div>
    );
};

export default AdsList;