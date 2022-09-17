export type Favorite = {
    id: number,
    query: string,
    name: string,
    sortBy: string,
    maxCount: number,
    viewType: string,
    author?: number
}

export type FavoritsState = {
    isLoading: Boolean,
    error: string,
    lastIndex: number,
    list: Array<Favorite>
}

export enum YouTubeOrder {
    date = 'date',
    rating = 'rating',
    relevance = 'relevance',
    videoCount = 'videoCount',
    viewCount = 'viewCount',
    title = 'title'
}

export interface IFavorite {}