import type React from "react";
import s from './Filter.module.css';
import { Switch, ConfigProvider } from 'antd';


const Filter: React.FC = () => {

	const onChange = (checked: boolean) => {
		console.log(`switch to ${checked}`);
	};

	const categories = [
		'Авто',
		'Электроника',
		'Недвижимость'
	];

	return (
		<div className={s['filter-content']}>
		<div className={s['filters']}>
			<label className={s['filter-label']}> Фильтры </label>

			<div className={s['categories']}>
				Категория
				<ul className={s['categories-list']}>
					{
						categories.map((category, index) => (
							<li key={index}>
								<input type="checkbox" id={`category-${index}`} name={`category-${index}`} value={category} />
								{category}
							</li>
						))
					}
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
					<Switch defaultChecked onChange={onChange} />
				</ConfigProvider>
			</div>
		</div>

		<button className={s['reset-btn']}>Сбросить фильтры</button>
		</div>
	)	
}


export default Filter;