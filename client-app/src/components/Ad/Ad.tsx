import React from 'react';
import s from './Ad.module.css';
import placeholderImg from '../../assets/placeholder.png';

interface AdProps {
	title: string;
	price: number;
	category: string;
	image?: string;
}

const Ad: React.FC<AdProps> = ({ title, price, category, image }) => {
	return (
		<div className={s['ad-wrapper']}>
			<img className={s['placeholder-img']} src={image || placeholderImg} alt="placeholder" />
			<label className={s['ad-category']}>{category}</label>

			<div className={s['ad-info']}>
				<div className={s['ad-title']}>{title}</div>
				<div className={s['ad-price']}>{price.toString()}₽</div>
			</div>
		</div>
	)
}

export default Ad;