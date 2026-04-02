const PORT = 8080;
const BASE_URL = `http://localhost:${PORT}`;

async function testServer() {

	try {
		console.log('\n--- Тест: Список товаров ---');
		const itemsResponse = await fetch(`${BASE_URL}/items?limit=5`);
		
		if (!itemsResponse.ok) {
			throw new Error(`Ошибка списка: ${itemsResponse.status}`);
		}
		
		const itemsData = await itemsResponse.json();
		console.log('Ответ сервера:', itemsData);
		console.log(`Найдено товаров: ${itemsData.total}`);
		console.table(itemsData.items);

		console.log('\n--- Тест: Получение товара по ID ---');
		const firstItem = itemsData.items[0];
		
		if (firstItem) {
		
			const testId = 1; 
			const itemResponse = await fetch(`${BASE_URL}/items/${testId}`);
			
			if (itemResponse.ok) {
				const item = await itemResponse.json();
				console.log('Данные товара:', item);
			} else {
				console.error(`Товар с ID ${testId} не найден.`);
			}
		}

	} catch (error) {
		console.error('❌ Ошибка при подключении к серверу:');
		console.error((error as Error).message);
		console.log('\nУбедитесь, что сервер запущен командой: set PORT=8080 && npm start');
	}
}

const ITEM_ID = 3;

async function updateItem() {
	const url = `${BASE_URL}/items/${ITEM_ID}`;
	const getResponse = await fetch(url);

	const item = await getResponse.json();
	console.log('CURRENT ITEM:', item);
	console.log('URL:', url);

	const payload = {
		...item,
		price: 333,
		description: "sample description",
	};

	const response = await fetch(url, {
		method: 'PUT',
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	const result = await response.json();

	console.log('STATUS:', response.status);
	console.log('RESULT:', result);
}


testServer();
updateItem();