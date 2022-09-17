import { Favorite } from "store/favorits/favorits.interface";

export interface IFavoriteForm {
    isEdit: Boolean,
    favorite?: Favorite,
    closeModal: () => void,
}

export interface IFavorite { }

export interface IModal {
    show: Boolean,
    title: string,
    closeModal: () => void,
    children: React.ReactNode
}