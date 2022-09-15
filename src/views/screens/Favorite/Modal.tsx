import InputField, { InputTypes, SelectItem } from "views/ui/InputField"

interface IModal {
    isEdit: Boolean,
    query?: string
}

const Modal: React.FC<IModal> = ({ isEdit, query }) => {
    const items: Array<SelectItem> = []

    return <div className="modal-wrapper">
        <div className="favorite modal">
            <div className="modal-title">
                {isEdit ? 'Изменить запрос' : 'Сохранить запрос'}
            </div>
            <form onSubmit={ev => ev.preventDefault()}>
                <InputField label="Запрос" placeholder={query} type={InputTypes.Text} disabled />
                <InputField label="Название" required placeholder="Укажите название" type={InputTypes.Text} />
                <InputField label="Сортировать по" items={items} type={InputTypes.Select} />
                <InputField label="Максимальное количество" type={InputTypes.Range} />
                <div className="btns-row">
                    <button type="reset">Не изменять</button>
                    <button>Изменить</button>
                </div>
            </form>
        </div>
    </div>
}

export default Modal