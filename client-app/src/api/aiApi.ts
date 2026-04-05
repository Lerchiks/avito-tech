import axios from 'axios';
import type { Item } from '../types/types';

const API_URL = 'http://localhost:5001/api/chat';

export const generateDescription = async (item: Item) => {
    const prompt = `
    TASK: Write a creative 2-sentence description for "${item.title}" (${item.category}) - Details: ${JSON.stringify(item.params)}.
    1. Write in English.
    2. Translate to Russian.
    
    FORMAT:
    [EN]: English text
    [RU]: Русский текст
    
    ATTENTION: Do not ask questions. Do not introduce yourself. Write ONLY the format above.
    `.trim();
    
    try {
        const response = await axios.post(API_URL, { prompt });
        const text = response.data.text.trim();
        return text;
    } catch (error) {
        console.error("Ошибка:", error);
        return "Не удалось создать описание.";
    }
};
export const generateMarketPrice = async (item: Item): Promise<string> => {
    const prompt = `
You are a pricing expert for real-world products.

Product:
Title: "${item.title}"
Category: "${item.category}"

Instructions:
- Estimate a REALISTIC market price in Russian Rubles (RUB).
- Assume the item is in GOOD condition.
- Focus on brand and model.
- Ignore small unrelated numbers in title (like "17" in iPhone 17).

Hard constraints:
- Electronics: 5000 - 500000 RUB
- Cars: 200000 - 10000000 RUB
- Real estate: 1000000 - 100000000 RUB

Rules:
- Output ONLY a number.
- No text, no symbols, no spaces.

Examples:
iPhone 15 Pro → 90000
BMW X5 2018 → 3500000
1-room apartment → 7000000

Final answer:`.trim();

    try {
        const response = await axios.post(API_URL, { prompt });

        const text: string = response.data?.text?.trim() || '';

        const match = text.match(/\d{4,}/);
        const isInvalidPrice = (price: number, category: string) => {
            if (category === 'electronics') return price < 3000;
            if (category === 'auto') return price < 100000;
            if (category === 'real_estate') return price < 500000;
            return false;
        };

        let price: number | undefined = match ? Number(match[0]) : undefined;

        if (price !== undefined && isInvalidPrice(price, item.category)) {
            price = undefined;
        }

        if (price === undefined) {
            console.warn('LLM вернул странную цену, используем fallback');

            switch (item.category) {
                case 'electronics':
                    price = 30000;
                    break;
                case 'auto':
                    price = 800000;
                    break;
                case 'real_estate':
                    price = 5000000;
                    break;
                default:
                    price = 10000;
            }
        }

        const formattedPrice = new Intl.NumberFormat('ru-RU').format(price);
        return `${formattedPrice} ₽`;

    } catch (error) {
        console.error('Ошибка оценки цены:', error);
        return 'Ошибка';
    }
};