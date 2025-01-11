import { useEffect, useRef, useState } from "react"
import { Button } from "../../../components/button/Button"
import { Popover } from "../../../components/popover/Popover"
import imageImgUrl from '../../../assets/image.svg'
import styles from './EditImageComponent.module.css'
import { useAppActions } from "../../../store/hooks/useAppActions"
import { Popup } from "../../../components/popup/Popup"
import { ImageDownloader } from "../../imageDownloader/ImageDownloader"

type EditImageComponentProps = {
    selectedSlideId: string | null
}

const EditImageComponent: React.FC<EditImageComponentProps> = ({selectedSlideId}) => {
    const imageServiceRef = useRef<HTMLDivElement>(null);
    const {addImageElement} = useAppActions();
    const [url, setUrl] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [isOpenImageService, setIsOpenImageService] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
        if(event.target.value == ''){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (imageServiceRef.current && !imageServiceRef.current.contains(event.target as Node)) {
                setIsOpenImageService(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(
        <>
            <Popover 
                content={
                    <div>
                        <span className={styles.label}>Добавить картинку с компьютера</span>
                        <Button type='text' onClick={() => setIsOpenImageService(!isOpenImageService)} label="Сервис картинок"/>
                        <span className={styles.label}>Добавить картинку через url</span>
                        <input
                            value={url}
                            onChange={handleInputChange}
                            className="input-field"
                        />
                        <Button type='text' onClick={() => {if(selectedSlideId) addImageElement(url)}} label="Добавить картинку" disabled={disabled}/>
                    </div>
                }
            >
                <Button type={'icon'} onClick={() => {}} iconUrl={imageImgUrl} iconSize={'medium'}/>
            </Popover>
            {isOpenImageService &&
                <Popup
                    ref={imageServiceRef}
                    height={'80%'}
                    width={'60%'}
                    content={
                        <ImageDownloader/>
                    }
                />
            }
        </>
    )
}

export {
    EditImageComponent,
}