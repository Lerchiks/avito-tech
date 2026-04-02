Изменения:
	Был переустановлен package-lock.json для server, так как зависимости не устанавливались.
	wind:
	"
		del package-lock.json
		rd /s /q node_modules
		npm config set registry https://registry.npmjs.org/
		npm install
	"
	
	macOS:
	"
		rm package-lock.json
		rm -rf node_modules
		npm install
	"

	запуск сервера:
	"set PORT=8080 && npm start"