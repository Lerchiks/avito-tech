import React, { useState } from 'react';
import s from './AdsList.module.css';
import Ad from '../Ad/Ad';
import { Pagination } from 'antd';
import type { Item } from '../../types/types';

//пагинация 

interface AdsListProps {
	largeDataArray: Array<Item>;
}

const AdsList: React.FC<AdsListProps> = ({ largeDataArray }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	const currentData = largeDataArray.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	return (
		<div className={s['ads-container']}>
			<div className={s['ads-grid']}>
				{currentData.map((item) => (
					<Ad
						key={item.id}
						title={item.title}
						price={item.price || 0}
						category={item.category}
					/>
				))}
			</div>

			<div className={s['pagination-wrapper']}>
				<Pagination
					className={s['my-pagination']}
					current={currentPage}
					total={largeDataArray.length}
					pageSize={pageSize}
					onChange={(page) => setCurrentPage(page)}
					showSizeChanger={false} 
				/>
			</div>
		</div>
	);
};

export default AdsList;