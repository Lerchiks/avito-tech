import type { Item } from '../../types/types';
import s from './NeedsCard.module.css'
import {ExclamationCircleFilled} from '@ant-design/icons';


interface CardProps {
    item: Item;
}

const NeedsCard: React.FC<CardProps> = ({item}) => {

    const getMissingFields = () => {

        const missing: string[] = [];

        if (item.category === 'auto') {
            if (!item.params.brand) missing.push('Марка');
            if (!item.params.yearOfManufacture) missing.push('Год выпуска');
            if (!item.params.model) missing.push('Модель');
            if (!item.params.transmission) missing.push('Коробка передач');
            if (!item.params.mileage) missing.push('Пробег');
            if (!item.params.enginePower) missing.push('Мощность двигателя');
        }

        if (item.category === 'real_estate') {
            if (!item.params.type) missing.push('Тип недвижимости');
            if (!item.params.address) missing.push('Адрес');
            if (!item.params.area) missing.push('Площадь');
            if (!item.params.floor) missing.push('Этаж');
        }

        if (item.category === 'electronics') {
            if (!item.params.type) missing.push('Тип устройства');
            if (!item.params.brand) missing.push('Бренд');
            if (!item.params.model) missing.push('Модель');
            if (!item.params.condition) missing.push('Состояние');
            if (!item.params.color) missing.push('Цвет');
        }

        if (!item.description) { missing.push('Описание'); }
        
        return missing;
    };

    const missingFields = getMissingFields();

    return (
        <div className={s.needs}>
            <div className={s['alert-content']}>
                <div className={s['icon-wrapper']}>
                    <ExclamationCircleFilled className={s.customIcon} />
                </div>
                
                <div className={s['text-content']}>
                    <div className={s['title-alert']}>Требуются доработки</div>
                    <div className={s['info-text']}>
                        У объявления не заполнены поля:
                        <ul className={s['missing-fields-list']}>
                            {missingFields.map((field, index) => (
                                <li key={index}>{field}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NeedsCard;