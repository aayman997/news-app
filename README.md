<h1 align="center" id="title">News App</h1>

<p id="description">a news aggregator website that pulls articles from various sources and displays them in a clean easy-to-read format</p>



<h2>🧐 Features</h2>

Here are some of the project's best features:

* Personalized news feed
* Article search and filtering
* Mobile-responsive design

<h2>🌐 Data sources used</h2>

Here is the api used in this project:

* [NewsAPI.org](https://newsapi.org/)
* [New York Times](https://developer.nytimes.com/apis)
* [The Guardian](https://open-platform.theguardian.com/)

<h2>🛠️ Installation Steps:</h2>

<p>1. Use the .env.example to create your .env. based on the environment you will run .env.production.local || .env.development.local and put your own api keys</p>


_Some time the APIs requestes Exceed the limit, so if this happens, please contact me or create your own API keys_

<p>2. Run using docker "Development"</p>

```
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build
```

<p>3. Run using docker "Production"</p>

```
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build
```

<p>4. Local development server "vite"</p>

```
npm run dev
```

<p>5. Local production preview server "vite"</p>

```
npm run build
npm run preview
```

<h2>💻 Built with</h2>

Technologies used in the project:

* React.js
* react-router-dom
* tailwindcss
* tanstack/react-query
* react-hook-form
* react-icons
* react-js-pagination
* react-router-dom
* typescript
* vite
