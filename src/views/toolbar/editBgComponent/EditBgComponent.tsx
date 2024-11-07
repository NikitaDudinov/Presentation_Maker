import imagePenUrl from '../../../assets/pen.svg'
import { Popover } from '../../../components/popover/Popover'
import { Button } from '../../../components/button/Button'
import { useState } from 'react'
import { Toggle } from '../../../components/toggle/Toggle'
import styles from './EditBgComponent.module.css'
import { dispatch } from '../../../store/presentation'
import { changeBackgroundSlide } from '../../../store/changeBackgroundSlide'

type EditBgComponentProps = {
    background?: string
}

const EditBgComponent: React.FC<EditBgComponentProps> = ({ background }) => {
    const [allSlides, setAllSlides] = useState(false)
    const [inputBackground, setInputBackground] = useState(background ? background : '')
    const handleToggleChange = (checked: boolean) => {
        setAllSlides(checked)
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputBackground(newValue)
        dispatch(changeBackgroundSlide, {background: newValue, all: allSlides});
    };

    return (
        <Popover 
        content={
            <div>
                <span className={styles.label}>Все слайды:</span>
                <Toggle initialChecked={allSlides} onToggle={handleToggleChange} />
                <input
                        value={inputBackground}
                        onChange={handleInputChange}
                        className="input-field"
                    />
            </div>
        }
    >
        <Button type={'icon'} onClick={() => {}} iconUrl={imagePenUrl} iconSize={'medium'}/>
    </Popover>
    )

}

export {
    EditBgComponent,
}