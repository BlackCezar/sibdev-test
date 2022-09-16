export type Favorite = {
    id: number,
    query: string,
    name: string,
    sortBy: string,
    maxCount: number
}

export type FavoritsState = {
    isLoading: Boolean,
    error: string,
    lastIndex: number,
    list: Array<Favorite>
}

export enum YouTubeOrder {
    date = 'Дате',
    rating = 'Рейтингу',
    relevance = 'Актуальность',
    videoCount = 'Кол-во видиео в канале',
    viewCount = 'Кол-во просмотров',
    title = 'Названию'
}

export interface IFavorite {}