import { useEffect, useState } from "react"
import { Favorite, YouTubeOrder } from "store/favorits/favorits.interface"
import { addFavoritToList, editFavoriteFromList } from "store/favorits/favorits.slice"
import { useAppDispatch } from "store/hook"
import InputField, { InputTypes, SelectItem } from "views/ui/InputField"
import { IFavoriteForm } from "./favorite.interface"



const FavoriteForm: React.FC<IFavoriteForm> = ({isEdit, favorite, closeModal}) => {
    const youTubeOrderTranslate = {
        date: 'Дате',
        rating:'Рейтингу',
        relevance: 'Актуальность',
        videoCount: 'Кол-во видиео в канале',
        viewCount: 'Кол-во просмотров',
        title: 'Названию'
    }
    const items: Array<SelectItem> = Object.entries(YouTubeOrder).map(([key, value]) => ({ label: youTubeOrderTranslate[value], value: key }))
    const [formValues, setFormValues] = useState<Favorite>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (favorite) {
            setFormValues({...favorite})
        }
    }, [favorite])

    const changeForm = (val: string, type: string) => {
        if (formValues && val) {
            let newFavorite: Favorite = formValues
            if (type === 'input-favorite') newFavorite.query = val
            if (type === 'input-name') newFavorite.name =val
            if (type === 'select-sort') newFavorite.sortBy = val
            if (type === 'input-maxcount') newFavorite.maxCount = Number(val)
            setFormValues(newFavorite)
        }
    }

    const createFavorite = () => {
        isEdit ? dispatch(editFavoriteFromList(formValues as Favorite)): 
            dispatch(addFavoritToList(formValues as Favorite))
        closeModal()
    }

    return <div className="favorite-form">
    <InputField label="Запрос"
        change={changeForm} 
        disabled={!isEdit}
        defaultValue={favorite?.query}
        name="input-favorite"
        placeholder={favorite?.query} 
        type={InputTypes.Text} />
    <InputField label="Название" 
        required 
        name="input-name"
        defaultValue={favorite?.name}
        change={changeForm}
        placeholder="Укажите название" 
        type={InputTypes.Text} />
    <InputField label="Сортировать по" 
        items={items} 
        defaultValue={favorite?.sortBy}
        name="select-sort"
        change={changeForm}
        type={InputTypes.Select} />
    <InputField label="Максимальное количество" 
        change={changeForm}
        name="input-maxcount"
        defaultValue={favorite?.maxCount}
        max={50}
        type={InputTypes.Range} />
    <div className="btns-row">
        <button onClick={closeModal} type="reset">{isEdit ? 'Не изменять' : 'Не сохранять'}</button>
        <button onClick={createFavorite}>{isEdit ? 'Изменить' : 'Сохранить'}</button>
    </div>
</div>
}

export default FavoriteForm;