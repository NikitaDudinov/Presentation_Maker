import { changeBackgroundSlide } from '../../store/changeBackgroundSlide'
import { addTextElement } from '../../store/addTextElement'
import { addImageElement } from '../../store/addImageElement'
import { deleteElement } from '../../store/deleteElement'
import { addSlide } from '../../store/addSlide'
import { removeSlide } from '../../store/removeSlide'
import { dispatch } from '../../store/presentation'
import { Button } from '../button/Button'

type ToolbarProps = {
    background?: string;
}

const Toolbar:  React.FC<ToolbarProps> = ({background}) => {
    const onAddSlide = () => {
        dispatch(addSlide)
    }
    const onRemoveSlide = () => {
        dispatch(removeSlide)
    }

    const onBackgroundChange: React.ChangeEventHandler = (event) => {
        dispatch(changeBackgroundSlide, {
            background: (event.target as HTMLInputElement).value,
            all: false
        })
    }
    const onAddTextElement = () => {
        dispatch(addTextElement)
    }
    const onAddImageElement = () => {
        dispatch(addImageElement)
    }
    const onDeleteElement = () => {
        dispatch(deleteElement)
    }
    return (
        <>
            <input type="text" value={background ? background : ''} disabled={background ? false : true} onChange={onBackgroundChange}></input>
            <Button onClick={onAddTextElement} label='Добавить текст'/>    
            <Button onClick={onAddImageElement} label='Добавить изображение'/>   
            <Button onClick={onAddSlide} label='Добавить слайд'/>  
            <Button onClick={onRemoveSlide} label='Удалить слайд'/>  
            <Button onClick={onDeleteElement} label='Удалить элемент'/>  
        </>
    )
}

export {
    Toolbar,
}