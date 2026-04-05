import React from 'react';
import s from './Ad.module.css';
import { Link } from 'react-router-dom';
import placeholderImg from '../../assets/placeholder.png';
import type { Item } from '../../types/types';

interface AdProps {
	item: Item;
	listView?: boolean;
}

const Ad: React.FC<AdProps> = ({ item, listView }) => {

	const adClass = listView ? s['ad-list'] : s['ad-grid'];

	const setItemCategory = (category: string): string => {
		const categories: Record<string, string> = {
            auto: 'Авто',
            real_estate: 'Недвижимость',
            electronics: 'Электроника'
        };
        return categories[category] || category;
	}

	const truncate = (str: string, n: number) => {
		return str.length > n ? str.slice(0, n) + "..." : str;
	};

	return (
		<Link to={`/ad/${item.id}`} className={s['ad-link']}>
			{
				
					<div className={adClass}>
						<img className={s['placeholder-img']} src={ placeholderImg } alt="placeholder"/>
						{
							!listView && (
								<label className={s['ad-category']}>{setItemCategory(item.category)}</label>	
							)
						}

						<div className={s['ad-info']}>
							{
								listView && (
									<label className={listView ? s['ad-category-list'] : s['ad-category']}>{setItemCategory(item.category)}</label>
								)
							}
							<div className={s['ad-title']}>{truncate(item.title, listView ? 30 : 12)}</div>
							<div className={s['ad-price']}>{item.price?.toString()}₽</div>
							{item.needsRevision && (
								<div className={s.revisionBadge}>
									<div className={s.point}></div>
									<span>Требует доработок</span>
								</div>
							)}
						</div>

					</div>
			}
			
		
		</Link>
	)
}

export default Ad;