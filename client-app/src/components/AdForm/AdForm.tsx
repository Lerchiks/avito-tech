import React, { useEffect, useState } from 'react';
import s from './AdForm.module.css';
import { AutoFields, ElectronicsFields, RealEstateFields } from './FormFields';
import { Input, Select } from 'antd';
import type { Item } from '../../types/types';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch } from '../../store/store';
import { updateAd } from '../../store/slices/adsSlice';
import { useNavigate } from 'react-router-dom';
import { generateDescription, generateMarketPrice } from '../../api/aiApi';
import AiButton from '../AiButton/AiButton';
import { BulbOutlined } from '@ant-design/icons';

interface AdProps { item: Item; }

interface FormState {
    title: string;
    price: number;
    category: 'auto' | 'real_estate' | 'electronics' | '';
    description: string;
    params: Record<string, string | number | boolean | undefined>;
}

const AdForm: React.FC<AdProps>= ({item}) => {
    const isNavigatingAwayCleanly = React.useRef(false);
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData] = useState<FormState>(() => {
        const storageKey = `draft_ad_${item.id}`;
        const saved = localStorage.getItem(storageKey);
        
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Ошибка парсинга", e);
            }
        }
        
        return {
            title: item.title || '',
            price: (item.price as number) || 0,
            category: (item.category as FormState['category']) || '',
            description: item.description || '',
            params: 'params' in item ? item.params : {}
        };
    });

    useEffect(() => {
        if (!isNavigatingAwayCleanly.current) {
            const storageKey = `draft_ad_${item.id}`;
            localStorage.setItem(storageKey, JSON.stringify(formData));
        }
    }, [formData, item.id]);

    useEffect(() => {
        return () => {
            if (!isNavigatingAwayCleanly.current) {
                const storageKey = `draft_ad_${item.id}`;
                const savedData = localStorage.getItem(storageKey);

                if (savedData) {
                    sessionStorage.setItem('show_draft_msg', 'true');
                }
            }
        };
    }, [item.id]);

    const isFormValid = formData.title.trim() !== '' && formData.price > 0;

    const clearError = (name: string) => {
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        isNavigatingAwayCleanly.current = true;
        const storageKey = `draft_ad_${item.id}`;

        localStorage.removeItem(storageKey);

        setFormData({
            title: item.title || '',
            price: (item.price as number) || 0,
            category: (item.category as FormState['category']) || '',
            description: item.description || '',
            params: 'params' in item ? item.params : {}
        });

        localStorage.setItem('ad_notification', JSON.stringify({
            type: 'info',
            text: 'Редактирование отменено'
        }));

        navigate(`/ad/${item.id}`, { replace: true });
        setErrors({});
    };

    const handleCategoryChange = (value: string | null) => {
        setFormData(prev => ({
            ...prev,
            category: (value || '') as FormState['category'],
            params: {} 
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        clearError(name);

        if (name === 'price') {
            const onlyNums = value.replace(/[^0-9]/g, '');
            
            setFormData(prev => ({
                ...prev,
                [name]: onlyNums === '' ? 0 : Number(onlyNums),
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleParamsChange = (name: string, value: string | number | boolean | undefined) => {
        setFormData(prev => ({
            ...prev,
            params: { ...prev.params, [name]: value }
        }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.title.trim()) newErrors.title = 'Название должно быть заполнено';
        if (formData.price <= 0) newErrors.price = 'Цена должна быть заполнена';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [statusMessage, setStatusMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            setIsSubmitting(true);
            setStatusMessage(null);

            const sanitizedParams = { ...formData.params };

            Object.keys(sanitizedParams).forEach(key => {
                const numericFields = [
                    'yearOfManufacture', 'mileage', 'enginePower', 
                    'area', 'floor'
                ];
                if (numericFields.includes(key) && sanitizedParams[key] !== '') {
                    sanitizedParams[key] = Number(sanitizedParams[key]);
                }
                if (sanitizedParams[key] === '') {
                    delete sanitizedParams[key];
                }
            });

            const dataToSubmit = {
                category: formData.category,
                title: formData.title,
                price: Number(formData.price),
                description: formData.description || undefined,
                params: sanitizedParams
            };
            
            const resultAction = await dispatch(updateAd({ 
                id: item.id, 
                data: dataToSubmit as Item 
            }));

            setIsSubmitting(false);

            if (updateAd.fulfilled.match(resultAction)) {
                isNavigatingAwayCleanly.current = true;
                localStorage.removeItem(`draft_ad_${item.id}`);
                localStorage.setItem('ad_notification', JSON.stringify({
                    type: 'success',
                    text: 'Изменения успешно сохранены!'
                }));

                navigate(`/ad/${item.id}`, { replace: true });
            } else {
                setIsSubmitting(false);
                const errorMsg = resultAction.payload as string;
                localStorage.setItem('ad_notification', JSON.stringify({
                    type: 'error',
                    text: `Ошибка: ${errorMsg}`
                }));
                navigate(`/ad/${item.id}`, { replace: true });
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            const target = e.target as HTMLElement;
            if (target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const isValid = validate();

                if (isValid) {
                    if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                    }
                }
            }
        }
    };

    const [isAiLoading, setIsAiLoading] = useState(false);
    const [isPriceLoading, setIsPriceLoading] = useState(false);

    const handleMagicDescription = async () => {
        if (!formData.title) return null;

        setIsAiLoading(true);
        const currentItem = { ...item, title: formData.title, category: formData.category };
        
        try {
            const result = await generateDescription(currentItem as Item);
            return result;
        } catch {
            return "Ошибка при генерации описания";
        } finally {
            setIsAiLoading(false);
        }
    };

    const handleMagicPrice = async () => {
        if (!formData.title) return null;
        setIsPriceLoading(true);
        const currentItem = { ...item, title: formData.title, category: formData.category };
        const result = await generateMarketPrice(currentItem as Item);
        setIsPriceLoading(false);
        return result;
    };

    return (
        <form className={s.form} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>

            <div className={s.field}>
                <label className={s.strongT}>Категория</label>
                <Select
                    className={s.antdSelect}
                    placeholder="Выберите категорию"
                    value={formData.category || undefined}
                    onChange={handleCategoryChange} 
                    options={[
                        { value: 'auto', label: 'Авто' },
                        { value: 'real_estate', label: 'Недвижимость' },
                        { value: 'electronics', label: 'Электроника' },
                    ]}
                />
            </div>

            <hr className={s['divider']}/>

            <div className={s.field}>
                <label className={s.strongT}>
                    <div className={s['requiered-element']}>*</div>
                    Название
                </label>
                <Input 
                    allowClear
                    name="title"
                    className={s.antdInput}
                    maxLength={50}
                    placeholder="Например, iPhone 15"
                    value={formData.title}
                    onChange={handleChange} 
                    status={errors.title ? 'error' : ''} 
                    size="large"
                />
                {errors.title && <span className={s.errorMessage}>{errors.title}</span>}
            </div>

            <hr className={s['divider']}/>

            <div className={s.fiel}>
                    <label className={s.strongT}>
                        <div className={s['requiered-element']}>*</div>
                        Цена (₽)
                    </label>
                <div className={s.fieldAi}>
                    <Input 
                        name="price"
                        placeholder="0"
                        allowClear
                        className={s.antdInput}
                        value={formData.price === 0 ? '' : formData.price.toString()}
                        onChange={handleChange}
                        status={errors.price ? 'error' : ''}
                        size="large"
                        inputMode="numeric" 
                    />
                    <AiButton 
                        label=""
                        buttonText="Узнать рыночную цену"
                        onGenerate={handleMagicPrice}
                        onApply={(text) => {
                            const numericPrice = parseInt(text.replace(/[^0-9]/g, ''), 10);
                            if (!isNaN(numericPrice)) setFormData(prev => ({ ...prev, price: numericPrice }));
                        }}
                        isLoading={isPriceLoading}
                        isDisabled={!formData.title.trim()}
                        icon={<BulbOutlined />}
                    />
                </div>
                {errors.price && <span className={s.errorMessage}>{errors.price}</span>}
            </div>

            <hr className={s['divider']}/>

            {formData.category && (
                <div className={s.detailsSection}>
                    <h3 className={s.strongT}>Характеристики</h3>
                    {formData.category === 'auto' && (
                        <AutoFields values={formData.params} onChange={handleParamsChange} />
                    )}
                    {formData.category === 'real_estate' && (
                        <RealEstateFields values={formData.params} onChange={handleParamsChange} />
                    )}
                    {formData.category === 'electronics' && (
                        <ElectronicsFields values={formData.params} onChange={handleParamsChange} />
                    )}
                </div>
            )}

            <hr className={s['divider']}/>

            <div className={s.field}>
                <label className={s.strongT}>Описание</label>
                <TextArea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Расскажите подробнее..."
                    style={{ resize: 'both', width: '948px', height: '120px' }}
                    className={!formData.description.trim() ? s['warning-input'] : ''}
                />
                <AiButton 
                    label="" 
                    buttonText="Улучшить описание"
                    loadingText="Генерирую..."
                    icon={<BulbOutlined />}
                    onGenerate={handleMagicDescription}
                    onApply={(text) => setFormData(prev => ({ ...prev, description: text }))}
                    isLoading={isAiLoading}
                    isDisabled={!formData.title.trim()}
                />
            </div>
            {statusMessage && (
                <div className={statusMessage.type === 'success' ? s.successAlert : s.errorAlert}>
                    {statusMessage.text}
                </div>
            )}

            <div className={s['btns-wrapper']}>
                <button 
                    type="submit" 
                    disabled={!isFormValid || isSubmitting}
                    className={isFormValid && !isSubmitting ? s.submitBtn : s.unactiveSubmitBtn}
                >
                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </button>
                
                <button 
                    type="button"
                    className={s['cancel-button']}
                    onClick={(e) => handleCancel(e)}
                >
                    Отменить
                </button>
            </div>

        </form>
    );
};

export default AdForm;