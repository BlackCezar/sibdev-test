import {AppDispatch} from "../index";
import {AuthResponse} from "./search.interface";
import axios from 'axios'
import {startSearch, searchFailure, searchSuccess} from "./search.slice";
import { YOUTUBE_URL, YOUTUBE_KEY } from "config/config";


export const fetchVideoSearch = (query: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(startSearch())
        const response = await axios.get<AuthResponse>(`${YOUTUBE_URL}/search`, {
            params: {
                key: YOUTUBE_KEY,
                q: query,
                type: 'video',
                maxResults: 20,
                part: 'snippet'
            }
        })
        dispatch(searchSuccess(response.data))
    } catch (e) {
        dispatch(searchFailure(e))
    }
}
