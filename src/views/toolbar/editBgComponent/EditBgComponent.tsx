import imagePenUrl from '../../../assets/pen.svg'
import { Popover } from '../../../components/popover/Popover'
import { Button } from '../../../components/button/Button'
import { useEffect, useState } from 'react'
import { Toggle } from '../../../components/toggle/Toggle'
import styles from './EditBgComponent.module.css'
import { changeBackgroundSlide } from '../../../store/changeBackgroundSlide'

type EditBgComponentProps = {
    background?: string
}

const EditBgComponent: React.FC<EditBgComponentProps> = ({ background }) => {
    const [allSlides, setAllSlides] = useState(false)
    const [inputBackground, setInputBackground] = useState(background ? background : '')
    const [color, setColor] = useState<string>('#000000');

    useEffect(() => {
        setInputBackground(background ? background : '');
    }, [background]);



    const handleToggleChange = (checked: boolean) => {
        setAllSlides(checked)
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
        // dispatch(changeBackgroundSlide, {background: event.target.value, all: allSlides});
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputBackground(newValue)
        // dispatch(changeBackgroundSlide, {background: newValue, all: allSlides});
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
                <input
                    type="color"
                    id="color-picker"
                    value={color}
                    onChange={handleChange}
                />
            <p style={{ color }}>Выбранный цвет: {color}</p>
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