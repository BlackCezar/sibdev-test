import { YouTubeOrder } from "store/favorits/favorits.interface";
import { SearchResource } from "store/search/search.interface";

export interface IHomeProps {

}
export interface Query {
    q: string,
    type: string,
    maxResults: number,
    order: YouTubeOrder,
    part: string
}

export interface LocationState {
        viewType?: string;
        query?: Query;
}

export interface FavoriteAcc {
    addNewFavorite: () => void,
    hidden: Boolean,
    query: string
}

export interface IVideoItem {
    video: SearchResource
}