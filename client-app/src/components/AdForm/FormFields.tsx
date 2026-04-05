import { Input, Select } from 'antd';
import s from './AdForm.module.css';
import formStyle from './FormFields.module.css'

const getFieldClass = (value: string | number | boolean | undefined) => {
    return !value || value === 0 ? s['warning-input'] : '';
};

interface FieldProps {
    values: Record<string, string | number | boolean | undefined>;
    onChange: (name: string, value: string | number | boolean | undefined) => void;
}

export const AutoFields: React.FC<FieldProps> = ({ values, onChange })=> (
    <div className={formStyle.fieldsGroup}>
        <div className={s.field}>
            <label className={s.label}>Марка</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.brand)} ${s.antdInput}`}
                placeholder="Например, BMW"
                value={values.brand as string || ''} 
                onChange={(e) => onChange('brand', e.target.value)} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Модель</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.model)} ${s.antdInput}`}
                placeholder="Например, X5"
                value={values.model as string || ''} 
                onChange={(e) => onChange('model', e.target.value)} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Год выпуска</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.yearOfManufacture)} ${s.antdInput}`}
                placeholder="2023"
                inputMode="numeric"
                value={values.yearOfManufacture as string|| ''} 
                onChange={(e) => onChange('yearOfManufacture', e.target.value.replace(/[^0-9]/g, ''))} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Коробка передач</label>
            <Select 
                className={`${s.antdSelect} ${getFieldClass(values.transmission)}`}
                placeholder="Выберите тип"
                value={values.transmission || undefined}
                onChange={(val) => onChange('transmission', val)}
                options={[
                    { value: 'automatic', label: 'Автомат' }, 
                    { value: 'manual', label: 'Механика' }
                ]} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Пробег (км)</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.mileage)} ${s.antdInput}`}
                placeholder="0"
                inputMode="numeric"
                value={values.mileage as string || ''} 
                onChange={(e) => onChange('mileage', e.target.value.replace(/[^0-9]/g, ''))} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Мощность (л.с.)</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.enginePower)} ${s.antdInput}`}
                placeholder="150"
                inputMode="numeric"
                value={values.enginePower as string || ''} 
                onChange={(e) => onChange('enginePower', e.target.value.replace(/[^0-9]/g, ''))} 
            />
        </div>
    </div>
);

export const RealEstateFields: React.FC<FieldProps> = ({ values, onChange }) => (
    <div className={formStyle.fieldsGroup}>
        <div className={s.field}>
            <label className={s.label}>Тип</label>
            <Select 
                className={`${s.antdSelect} ${getFieldClass(values.type)}`}
                placeholder="Выберите тип"
                value={values.type || undefined}
                onChange={(val) => onChange('type', val)}
                options={[
                    { value: 'flat', label: 'Квартира' }, 
                    { value: 'house', label: 'Дом' }, 
                    { value: 'room', label: 'Комната' }
                ]} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Адрес</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.address)} ${s.antdInput}`}
                placeholder="Город, улица, дом"
                value={values.address as string|| ''} 
                onChange={(e) => onChange('address', e.target.value)} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Площадь (м²)</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.area)} ${s.antdInput}`}
                placeholder="0"
                inputMode="numeric"
                value={values.area as string || ''} 
                onChange={(e) => onChange('area', e.target.value.replace(/[^0-9]/g, ''))} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Этаж</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.floor)} ${s.antdInput}`}
                placeholder="1"
                inputMode="numeric"
                value={values.floor as string || ''} 
                onChange={(e) => onChange('floor', e.target.value.replace(/[^0-9]/g, ''))} 
            />
        </div>
    </div>
);

export const ElectronicsFields: React.FC<FieldProps> = ({ values, onChange }) => (
    <div className={formStyle.fieldsGroup}>
        <div className={s.field}>
            <label className={s.label}>Тип</label>
            <Select 
                className={`${s.antdSelect} ${getFieldClass(values.type)}`}
                placeholder="Выберите тип"
                value={values.type || undefined}
                onChange={(val) => onChange('type', val)}
                options={[
                    { value: 'phone', label: 'Телефон' }, 
                    { value: 'laptop', label: 'Ноутбук' }, 
                    { value: 'misc', label: 'Разное' }
                ]} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Бренд</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.brand)} ${s.antdInput}`}
                placeholder="Например, Apple"
                value={values.brand as string || ''} 
                onChange={(e) => onChange('brand', e.target.value)} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Модель</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.model)} ${s.antdInput}`}
                placeholder="Например, iPhone 15"
                value={values.model as string || ''} 
                onChange={(e) => onChange('model', e.target.value)} 
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Состояние</label>
            <Select 
                className={`${s.antdSelect} ${getFieldClass(values.condition)}`}
                placeholder="Выберите состояние"
                value={values.condition || undefined}
                onChange={(val) => onChange('condition', val)}
                options={[
                    { label: 'Новый', value: 'new' }, 
                    { label: 'Б/У', value: 'used' }
                ]}
            />
        </div>

        <div className={s.field}>
            <label className={s.label}>Цвет</label>
            <Input 
                allowClear
                className={`${getFieldClass(values.color)} ${s.antdInput}`}
                placeholder="Черный"
                value={values.color as string|| ''} 
                onChange={(e) => onChange('color', e.target.value)} 
            />
        </div>
    </div>
);