import { FavoritsState, Favorite } from './favorits.interface';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: FavoritsState = {
    isLoading: false,
    error: '',
    list: [],
}

const FavoritsSlice = createSlice({
    name: 'favorits',
    initialState,
    reducers: {
        addFavoritToList(state, action: PayloadAction<Favorite>) {
            state.list.push(action.payload)
            state.isLoading = true
        },
        removeFavoriteFromList(state, {payload}: PayloadAction<number>) {
            state.list = state.list.filter(fav => fav.id !== payload)
            state.isLoading = false
        },
        editFavoriteFromList(state, action: PayloadAction<Favorite>) {
            state.list = state.list.map(item => {
                if (item.id === action.payload.id) {
                    item.query === action.payload.query
                }
                return item
            })
        }
    }
})

export const {addFavoritToList, removeFavoriteFromList, editFavoriteFromList} = FavoritsSlice.actions
export default FavoritsSlice