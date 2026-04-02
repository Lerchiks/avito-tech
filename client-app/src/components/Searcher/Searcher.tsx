import s from './Searcher.module.css';

const Searcher: React.FC = () => {
	return (
	<div className={s['searcher']}>
		<input 
			type="text" 
			placeholder="Поиск по объявлениям" 
			className={s['search-input']}
		/>
	</div>
	);

}

export default Searcher;