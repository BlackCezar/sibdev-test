import {AppDispatch} from "../index";
import {AdvancedSearchResult, AuthResponse, AuthStatisticsResponse, SearchResource} from "./search.interface";
import axios from 'axios'
import {startSearch, searchFailure, searchSuccess} from "./search.slice";
import { YOUTUBE_URL, YOUTUBE_KEY } from "config/config";
import { Query } from "views/screens/Home/Home.interface";


export const fetchVideoSearch = (query: Query) => async (dispatch: AppDispatch) => {
    try {
        dispatch(startSearch())
        const response = await axios.get<AuthResponse>(`${YOUTUBE_URL}/search`, {
            params: {
                key: YOUTUBE_KEY,
                ...query
            }
        })
        const videoId: string = response.data.items?.map((item: SearchResource) => item.id.videoId).join(',')
        const statistics = await axios.get<AuthStatisticsResponse>(`${YOUTUBE_URL}/videos`, {
            params: {
                key: YOUTUBE_KEY,
                part: 'statistics',
                id: videoId
            }
        })
        const advancedSearchResult: AdvancedSearchResult = {
            list: response.data.items,
            pageInfo: response.data.pageInfo,
            statistics: statistics.data.items,
            query: query.q
        }
        dispatch(searchSuccess(advancedSearchResult))
    } catch (e) {
        dispatch(searchFailure(e))
    }
}
