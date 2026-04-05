import type React from "react";
import s from './Filter.module.css';
import { Switch, ConfigProvider } from 'antd';
import { Checkbox } from 'antd';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { toggleCategory, resetCategory, setNeedsRevision } from "../../store/slices/adsSlice";


const categoryOptions = [
    { label: 'Авто', value: 'auto' },
    { label: 'Недвижимость', value: 'real_estate' },
    { label: 'Электроника', value: 'electronics' },
];

const Filter: React.FC = () => {

	const dispatch = useAppDispatch();
	
	const { selectedCategories, needsRevision } = useAppSelector(state => state.ads);

	const handleChangeCategory = (category: string) => {
        dispatch(toggleCategory(category));
    };

	const handleRevisionChange = (checked: boolean) => {
        dispatch(setNeedsRevision(checked));
    };

	const handleReset = () => {
        dispatch(resetCategory());
    };


	return (
		<div className={s['filter-content']}>
		<div className={s['filters']}>
			<label className={s['filter-label']}> Фильтры </label>

			<div className={s['categories']}>
				Категория
				<ul className={s['categories-list']}>
					{categoryOptions.map((cat) => (
						<li key={cat.value}>
							<Checkbox 
								checked={selectedCategories.includes(cat.value)}
								onChange={() => handleChangeCategory(cat.value)}
							>
								<span className={s['category-text']}>{cat.label}</span>
							</Checkbox>
						</li>
					))}
				</ul>
			</div>

				<hr/>
			<div className={s['category-filter']}>
				Только требующие доработок 
				<ConfigProvider
					theme={{
						components: {
							Switch: {
								trackHeight: 22,
								trackMinWidth: 44,
								handleSize: 18,
							}
						}
					}}
				>
					<Switch 
					onChange={handleRevisionChange} 
					checked={needsRevision}
					/>
				</ConfigProvider>
			</div>
		</div>

		<button 
			className={s['reset-btn']}
			onClick={handleReset}
		>
		
			Сбросить фильтры
		</button>
		</div>
	)	
}


export default Filter;

