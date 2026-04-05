//path = '/ad/:id'
import { Link } from "react-router-dom"

import placeholderImg from '../assets/placeholder.png';
import s from './AdDetails.module.css'

import { EditOutlined } from "@ant-design/icons";
import { useAdData } from "../hooks/useAdData";
import { AutoInfo, ElectronicsInfo, RealEstateInfo } from "../components/ItemsInfo/ItemsInfo";
import NeedsCard from "../components/NeedsCard/NeedsCard";
import { message } from "antd";
import { useEffect } from "react";
import Loading from "../components/loading/loading";


const AdDetails: React.FC = () => {

	const { item, loading, error } = useAdData();
    const [messageApi, contextHolder] = message.useMessage();

	useEffect(() => {
		if (loading || !item) return;

		const notificationRaw = localStorage.getItem('ad_notification');
		const shouldShowDraftMsg = sessionStorage.getItem('show_draft_msg');

		if (notificationRaw) {
			if (shouldShowDraftMsg) {
				sessionStorage.removeItem('show_draft_msg');
			}

			try {
				const { type, text } = JSON.parse(notificationRaw);
				setTimeout(() => {
					messageApi[type as 'success' | 'info' | 'error'](text);
				}, 200);
			} catch (e) {
				console.error(e);
			}
			localStorage.removeItem('ad_notification');
		} 
		else if (shouldShowDraftMsg) {
			setTimeout(() => {
				messageApi.warning('Изменения сохранены в черновике');
			}, 200);
			sessionStorage.removeItem('show_draft_msg');
		}

		window.history.replaceState({}, document.title);
	}, [messageApi, item, loading]);
	
	const paramsView = () => {
		if (!item) return null;
        switch (item.category) {
            case "electronics": return <ElectronicsInfo params={item.params}/>;
            case "auto": return <AutoInfo params={item.params}/>;
            case "real_estate": return <RealEstateInfo params={item.params}/>;
            default: return null;
        }
	}

	const formatAdDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('ru-RU', {
			day: 'numeric',
			month: 'long',
			hour: '2-digit',
			minute: '2-digit',
		}).format(date).replace(' в ', ' ');
	};
	
	return (
		<div className={s['container']}>
			{contextHolder}
			{loading && <Loading/>}

            {error && <div className={s.statusCenter}>Ошибка: {error}</div>}
            
			{!loading && item && (
			<>
			<div className={s['detail-header']}>

				<h2 className={s['upper-block']}>
					<div>{item.title}</div>
					<div>{item.price} ₽</div>
				</h2>

				<div className={s['lower-block']}>
					<Link to={`/ad/${item.id}/edit`} className={s['edit-link']}>
					<button 
						className={s['edit-button']}
						>
						<label className={s['btn-label']}>
							Редактировать 
						</label>
						<EditOutlined className={s['edit-btn-icon']}/>
					</button>
					</Link>

					<div className={s['date-info']}>
						<div className={s['item-date']}>
							Опубликовано: {formatAdDate(item.createdAt)}
						</div>
						<div className={s['item-date']}>
							Отредактировано: {formatAdDate(item.updatedAt)}
						</div>
					</div>
				</div>
			</div>

			<hr className={s['divider']}/>

			<div className={s['details']}>

				<div className={s['detail-block']}>
					<div className={s['img-wrapper']}>
						<img 
							src={placeholderImg} 
							alt="image-placeholder"
							className={s['img-plh']}
						/>
					</div>
					{item.needsRevision && (

						<div className={s['needs-content']}>
							<NeedsCard item={item}/>
							<div className={s['characteristics']}>
								<strong className={s['large-emphasized']}>
									Характеристики
								</strong>
								<div>{paramsView()}</div>
							</div>
						</div>
						
					)}

					{!item.needsRevision && (
							<div className={s['characteristics']}>
								<strong className={s['large-emphasized']}>
									Характеристики
								</strong>
								<div>{paramsView()}</div>
							</div>
					)}

					
				</div>

				
				<div className={s['description']}>
					<strong className={s['large-emphasized']}>
						Описание
					</strong>
					<div>
					{
						item.description 
						? item.description
						: 'Описание отсутствует'
					}

					</div>
				</div>

			</div>
			</>)}
		</div>
	)
}

export default AdDetails;
