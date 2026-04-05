import type React from "react"
import { useAdData } from "../hooks/useAdData";
import AdForm from "../components/AdForm/AdForm";
import s from './AdEdit.module.css'
import Loading from "../components/loading/loading";

const AdEdit: React.FC = () => {

	const { item, loading, error } = useAdData();
	
	return (
		<div className={s['container']}>
			{loading && <Loading/>}
			{error && <div>Ошибка: {error}</div>}
			{!item && <div>Объявление не найдено</div>}
			{!loading && !error && item && (
				<>
					<h2>Редактирование объявления</h2>
					<div className={s['form-wrapper']}>
						<AdForm item={item}/>
					</div>
				</>
			)}
		</div>
	)
}

export default AdEdit;