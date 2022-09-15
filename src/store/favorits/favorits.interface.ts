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
    list: Array<Favorite>
}

export interface IFavorite {}