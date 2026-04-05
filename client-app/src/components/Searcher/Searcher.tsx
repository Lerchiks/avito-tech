import { fetchAds, setSelectedQuery } from '../../store/slices/adsSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import ItemsLayout from '../ItemsLayout/ItemsLayout';
import SortItems from '../SortItems/SortItems';
import s from './Searcher.module.css';
import { ConfigProvider, Input } from 'antd';

const { Search } = Input;

const Searcher: React.FC = () => {

	const dispatch = useAppDispatch();

	const { 
		selectedCategories, 
		needsRevision,  
		sortColumn,
		sortDirection,
		selectedQuery
	} = useAppSelector(state => state.ads)


	const onSearch = (value: string) => {
		dispatch(setSelectedQuery(value));
		dispatch(fetchAds({
			limit: 10,
			skip: 0,
			q: value,
			categories: selectedCategories,
            needsRevision,
            sortColumn,
            sortDirection
		}))
	}

	return (
	<div className={s['searcher-wrapper']}>
		<div className={s['searcher']}>
			<ConfigProvider
				theme={{
					components: {
						Input: {
							colorBgContainer: '#f6f6f8',
							colorBorder: 'transparent',
							colorPrimaryHover: 'transparent',
							activeBorderColor: 'transparent',
							activeShadow: 'none'
						},
						Button: {
							colorBgContainer: '#f6f6f8',
                            colorBorder: 'transparent',
                            colorText: '#8c8c8c',
                            defaultActiveBg: '#f6f6f8',
                            defaultActiveBorderColor: 'transparent',
                            defaultHoverBg: '#f6f6f8',
                            defaultHoverBorderColor: 'transparent',
							boxShadow: 'none'
						}
					}
				}}			
			>
				<Search 
				onSearch={onSearch}
				allowClear
				placeholder="Поиск по объявлениям" 
				value={selectedQuery}
				onChange={(e) => dispatch(setSelectedQuery(e.target.value))}
				/>
			</ConfigProvider>
		</div>
		<ItemsLayout/>
		<SortItems/>
	</div>
	);
}

export default Searcher;