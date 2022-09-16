import { useMemo, useReducer, useState } from "react"
import { Favorite, YouTubeOrder } from "store/favorits/favorits.interface"
import { addFavoritToList, editFavoriteFromList } from "store/favorits/favorits.slice"
import { useAppDispatch } from "store/hook"
import InputField, { InputTypes, SelectItem } from "views/ui/InputField"

interface IModal {
    isEdit: Boolean,
    query: Favorite,
    show: Boolean,
    closeModal: () => void
}

const Modal: React.FC<IModal> = ({ isEdit, query, show, closeModal }) => {
    const items: Array<SelectItem> = Object.entries(YouTubeOrder).map(([key, value]) => ({ label: value, value: key }))
    const [formValues, setFormValues] = useState<Favorite>(query)
    const dispatch = useAppDispatch()

    if (!show) {
        return null
    }

    const changeForm = (val: string, type: string) => {
        if (type === 'input-query' && val) setFormValues({...formValues, query: val})
        if (!formValues.query) setFormValues({...formValues, query: query.query})
        if (type === 'input-name' && val) setFormValues({...formValues, name: val})
        if (type === 'select-sort' && val) {
            let item = items.find(el => el.label === val) as SelectItem
            if (!item) item = items.find(el => el.value === val) as SelectItem
            if (item) setFormValues({...formValues, sortBy: item.value})
        }
        if (type === 'input-maxcount' && val) setFormValues({...formValues, maxCount: Number(val)})
    }

    const createQuery = () => {
        isEdit ? dispatch(editFavoriteFromList(formValues as Favorite)): 
            dispatch(addFavoritToList(formValues as Favorite))
        closeModal()
    }

    return <div className="modal-wrapper">
        <div className="favorite-modal modal">
            <div className="modal-title">
                {isEdit ? 'Изменить запрос' : 'Сохранить запрос'}
            </div>
            <div className="favorite-form">
                <InputField label="Запрос"
                    change={changeForm} 
                    disabled
                    defaultValue={query?.query}
                    name="input-query"
                    placeholder={query?.query} 
                    type={InputTypes.Text} />
                <InputField label="Название" 
                    required 
                    name="input-name"
                    defaultValue={query?.name}
                    change={changeForm}
                    placeholder="Укажите название" 
                    type={InputTypes.Text} />
                <InputField label="Сортировать по" 
                    items={items} 
                    defaultValue={query?.sortBy}
                    name="select-sort"
                    change={changeForm}
                    type={InputTypes.Select} />
                <InputField label="Максимальное количество" 
                    change={changeForm}
                    name="input-maxcount"
                    defaultValue={query?.maxCount}
                    max={50}
                    type={InputTypes.Range} />
                <div className="btns-row">
                    <button onClick={closeModal} type="reset">{isEdit ? 'Не изменять' : 'Не сохранять'}</button>
                    <button onClick={createQuery}>{isEdit ? 'Изменить' : 'Сохранить'}</button>
                </div>
            </div>
        </div>
    </div>
}

export default Modal