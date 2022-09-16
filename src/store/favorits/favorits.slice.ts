import { FavoritsState, Favorite } from './favorits.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: FavoritsState = {
    isLoading: false,
    error: '',
    lastIndex: 0,
    list: [],
}

const FavoritsSlice = createSlice({
    name: 'favorits',
    initialState,
    reducers: {
        addFavoritToList(state, action: PayloadAction<Favorite>) {
            console.log(action)
            state.lastIndex++;
            state.list.push({
                ...action.payload,
                id: state.lastIndex
            })
            state.isLoading = false
        },
        removeFavoriteFromList(state, action: PayloadAction<number>) {
            state.list = state.list.filter(fav => fav.id !== action.payload)
            state.isLoading = false
        },
        editFavoriteFromList(state, action: PayloadAction<Favorite>) {
            const index = state.list.findIndex(item => item.id === action.payload.id);
            state.list[index].query = action.payload.query ;
        },
    }
})

export const {addFavoritToList, removeFavoriteFromList, editFavoriteFromList} = FavoritsSlice.actions
export default FavoritsSlice.reducer