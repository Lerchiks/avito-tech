import type { Item } from '../types/types';

export const MOCK_ITEMS: Item[] = [
	{
		id: 1,
		title: "iPhone 15 Pro Max 256GB",
		description: "В отличном состоянии, полный комплект.",
		price: 95000,
		category: "electronics",
		createdAt: "2024-03-20T10:00:00Z",
		updatedAt: "2024-03-21T12:30:00Z",
		params: {
		type: "phone",
		brand: "Apple",
		model: "15 Pro Max",
		color: "Natural Titanium",
		condition: "used"
		}
	},
	{
		id: 2,
		title: "Tesla Model 3 Performance",
		description: "Автопилот, полный привод.",
		price: 4200000,
		category: "auto",
		createdAt: "2024-03-15T08:00:00Z",
		updatedAt: "2024-03-15T08:00:00Z",
		params: {
		brand: "Tesla",
		model: "Model 3",
		yearOfManufacture: 2022,
		mileage: 15000,
		enginePower: 450,
		transmission: "automatic"
		}
	},
	{
		id: 3,
		title: "2-к квартира, 65 м²",
		description: "Видовая квартира с ремонтом.",
		price: 15400000,
		category: "real_estate",
		createdAt: "2024-03-25T14:20:00Z",
		updatedAt: "2024-03-26T09:15:00Z",
		params: {
		type: "flat",
		area: 65,
		floor: 12,
		address: "ул. Пушкина, д. Колотушкина"
		}
	}
];

export const generateLargeMockData = (count: number): Item[] => {
	return Array.from({ length: count }).map((_, i) => {
		const baseItem = MOCK_ITEMS[i % MOCK_ITEMS.length];
		return {
		...baseItem,
		id: i + 1,
		title: `${baseItem.title} #${i + 1}`,
		params: { ...baseItem.params } 
		} as Item;
	});
};