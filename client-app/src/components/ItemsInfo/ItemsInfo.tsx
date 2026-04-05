import type { 

	AutoItemParams,
	RealEstateItemParams,
	ElectronicsItemParams

} from "../../types/types";

import s from './ItemsInfo.module.css';

export const AutoInfo = ({params} : {params: AutoItemParams}) => (
    <div className={s['container']}>
        { params.brand &&
            <div className={s['line']}> 
                <label>Бренд</label>
                <div>{params.brand}</div>
            </div>
        }
        { params.model && 
            <div className={s['line']}> 
                <label>Модель</label> 
                <div>{params.model}</div>
            </div>
        }
        { params.yearOfManufacture && 
            <div className={s['line']}> 
                <label>Год выпуска</label>
                <div>{params.yearOfManufacture} г.</div>
            </div>
        }
        { params.transmission && 
            <div className={s['line']}> 
                <label>Трансмиссия</label>
                <div>
                    { params.transmission === 'automatic' 
                    ? ' Автомат' 
                    : ' Механика'}
                </div>
            </div>
        }
        { params.mileage && 
            <div className={s['line']}>   
                <label>Пробег</label>
                <div>{params.mileage} км</div>
            </div>
        }
        { params.enginePower && 
            <div className={s['line']}> 
                <label>Мощность двигателя</label>
                <div>{params.enginePower} л.с.</div>
            </div>
        }
    </div>
)

export const RealEstateInfo = ({ params }: { params: RealEstateItemParams }) => {
    const typeLabel: Record<string, string> = {
        flat: 'Квартира',
        house: 'Дом',
        room: 'Комната',
    };

    return (
        <div className={s['container']}>
            {params.type && (
                <div className={s['line']}>
                    <label>Тип недвижимости</label>
                    <div>{typeLabel[params.type] || params.type}</div>
                </div>
            )}
            {params.address && (
                <div className={s['line']}>
                    <label>Адрес</label>
                    <div>{params.address}</div>
                </div>
            )}
            {params.area && (
                <div className={s['line']}>
                    <label>Площадь</label>
                    <div>{params.area} м²</div>
                </div>
            )}
            {params.floor && (
                <div className={s['line']}>
                    <label>Этаж</label>
                    <div>{params.floor}</div>
                </div>
            )}
        </div>
    );
};

export const ElectronicsInfo = ({ params }: { params: ElectronicsItemParams }) => {
    const typeLabel: Record<string, string> = {
        phone: 'Телефон',
        laptop: 'Ноутбук',
        misc: 'Разное',
    };

    return (
        <div className={s['container']}>
            {params.type && (
                <div className={s['line']}>
                    <label>Тип</label>
                    <div>{typeLabel[params.type] || params.type}</div>
                </div>
            )}
            {params.brand && (
                <div className={s['line']}>
                    <label>Бренд</label>
                    <div>{params.brand}</div>
                </div>
            )}
            {params.model && (
                <div className={s['line']}>
                    <label>Модель</label>
                    <div>{params.model}</div>
                </div>
            )}
            {params.condition && (
                <div className={s['line']}>
                    <label>Состояние</label>
                    <div>{params.condition === 'new' ? 'Новый' : 'Б/У'}</div>
                </div>
            )}
            {params.color && (
                <div className={s['line']}>
                    <label>Цвет</label>
                    <div>{params.color}</div>
                </div>
            )}
        </div>
    );
};