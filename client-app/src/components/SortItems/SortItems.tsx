import { Select } from 'antd';
import s from './SortItems.module.css'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchAds, setSort } from '../../store/slices/adsSlice';

const SortItems: React.FC = () => {

    const dispatch = useAppDispatch();

    const {
        sortColumn,
        sortDirection,
        selectedCategories,
        needsRevision,
        selectedQuery,
    } = useAppSelector(state => state.ads);

    const handleChange = (value: string) => {

        const [column, direction] = value.split('_') as [string, 'asc' | 'desc'];
        dispatch(setSort({column, direction}));

        dispatch(fetchAds({
            limit: 10,
            skip: 0,
            sortColumn: column,
            sortDirection: direction,
            categories: selectedCategories,
            needsRevision,
            q: selectedQuery,
        }));
    };

    return (
    <div className={s['wrapper']}>
    <Select
        className={s['selector']}
        value={`${sortColumn}_${sortDirection}`}
        onChange={handleChange}
        options={[
            { value: 'title_asc', label: 'По названию (А - Я)' },
            { value: 'title_desc', label: 'По названию (Я - А)' },
            { value: 'createdAt_desc', label: 'По новизне (сначала новые)' },
            { value: 'createdAt_asc', label: 'По новизне (сначала старые)' },
            { value: 'price_asc', label: 'По цене (сначала дешевле)' },
            { value: 'price_desc', label: 'По цене (сначала дороже)' },
        ]}
    />
    </div>
    );
};

export default SortItems;