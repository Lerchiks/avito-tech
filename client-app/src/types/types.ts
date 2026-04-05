interface BaseItem {
    id: number;
    title: string;
    description?: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    needsRevision?: boolean;
}

export type Item = 
	BaseItem & (
	 
	| {
		category: 'auto';
		params: AutoItemParams;
		}
	| {
		category: 'real_estate';
		params: RealEstateItemParams;
		}
	| {
		category: 'electronics';
		params: ElectronicsItemParams;
		}
);

export type AutoItemParams = {
	brand?: string;
	model?: string;
	yearOfManufacture?: number;
	transmission?: 'automatic' | 'manual';
	mileage?: number;
	enginePower?: number;
};

export type RealEstateItemParams = {
	type?: 'flat' | 'house' | 'room';
	address?: string;
	area?: number;
	floor?: number;
};

export type ElectronicsItemParams = {
	type?: 'phone' | 'laptop' | 'misc';
	brand?: string;
	model?: string;
	condition?: 'new' | 'used';
	color?: string;
};

export type AdParams = AutoItemParams | RealEstateItemParams | ElectronicsItemParams | Record<string, unknown>;