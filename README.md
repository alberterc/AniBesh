# AniBesh
**AniBesh** is a Discord bot to retrieve information around anime, manga, light novel, and more. This bot is made to **access** and **share** anime information easier in your Discord community. Talk about your favorite anime, light novel, characters, voice actors, doujin (*heh*) and more with others!

## Tech Stack
- Built with Node.js v18.18.2
- Data is based on [MyAnimeList.net](https://myanimelist.net/) by using [Jikan API](https://jikan.moe/).
- Uses [discord.js](https://discord.js.org/) v14.14.1 as the [Discord API](https://discord.com/developers/docs/reference) Wrapper.

## Command List
### /anisearch
Search for anime according to below filters.
| title | order_by | sort | genres |
| - | - | - | - |
| {input anime title to search} | title, score, popularity, ... | asc, desc | action, romance, fantasy, ... |