import { useState } from "react"
import { Button } from "../../../components/button/Button"
import { Popover } from "../../../components/popover/Popover"
import imageImgUrl from '../../../assets/image.svg'
import styles from './EditImageComponent.module.css'
import { dispatch } from "../../../store/presentation"
import { addImageElement } from "../../../store/addImageElement"

const EditImageComponent = () => {

    const [url, setUrl] = useState('')
    const [disabled, setDisabled] = useState(true)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
        if(event.target.value == ''){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
    };

    return(
        <Popover 
            content={
                <div>
                    <span className={styles.label}>Добавить картинку с компьютера</span>
                    <Button type='text' onClick={() => dispatch(addImageElement)} label="Добавить картинку"/>
                    <span className={styles.label}>Добавить картинку через url</span>
                    <input
                        value={url}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                    <Button type='text' onClick={() => dispatch(addImageElement, { value: url})} label="Добавить картинку" disabled={disabled}/>
                </div>
            }
        >
            <Button type={'icon'} onClick={() => {}} iconUrl={imageImgUrl} iconSize={'medium'}/>
        </Popover>
    )
}

export {
    EditImageComponent,
}