import { Source } from "../types/Source";

const CATEGORIES = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

const NEWS_API_CATEGORIES = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
const THE_GUARDIAN_API_CATEGORIES = ["sport", "money", "science", "technology", "games", "food", "weather"];
const NEW_YORK_TIMES_API_CATEGORIES = ["Business", "Technology", "Science", "Health", "Sports", "Food"];

const SOURCES: Record<Source, string[]> = {
	"News API": NEWS_API_CATEGORIES,
	"The Guardian": THE_GUARDIAN_API_CATEGORIES,
	"New York Times": NEW_YORK_TIMES_API_CATEGORIES
};
const PAGE_SIZE = 10;

const LAST_AVAILABLE_PAGES = 10;

const MAX_TOTAL_PAGES = PAGE_SIZE * LAST_AVAILABLE_PAGES;

export { CATEGORIES, SOURCES, PAGE_SIZE, LAST_AVAILABLE_PAGES, MAX_TOTAL_PAGES };
