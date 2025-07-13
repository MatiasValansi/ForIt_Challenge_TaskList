# ForIt_Challenge_TaskList

## ⚙️ Instrucciones para ejecutar el proyecto localmente

> Requiere tener instalado Node.js

Ejecutar backEnd:
 cd backEnd
 npm install --> Para instalar dependencias
 cp .env.example .env --> Renombra el .env.example en .env para poder correr el proyecto
 npm run app --> Ejecutar la API del BackEnd. Se redirige a la ruta api/tasks para mostrar las tareas que existen.


Ejecutar FrontEnd:
 cd frontEnd
 npm install --> Para instalar depedenciar
 cp .env.example .env --> Renombra el .env.example en .env para poder correr el proyecto
 npm run dev --> Ejecutar el FrontEnd
 



EXTRA:


🛠 Herramientas usadas:
- ESLint (configuración recomendada, como indica el enunciado)
- Biome (formateador moderno, agregado como complemento para mejorar estilo)
- Jest para pruebas unitarias + Babel + dotenv

Linting & Formato
Este proyecto utiliza:

* ESLint, con configuración recomendada para React (.eslintrc.json)

* Biome, como formateador automático


🧪 Ejecutar linter:

npm run lint

🧼 Aplicar formato automático:

npm run format

ESLint se usa como base para cumplir con el enunciado del challenge. Biome se agregó como herramienta opcional para mejorar el estilo de código.
