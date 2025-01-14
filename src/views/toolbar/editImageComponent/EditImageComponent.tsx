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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {addImageElement} = useAppActions();
    const [url, setUrl] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [isOpenImageService, setIsOpenImageService] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
        setDisabled(event.target.value === '');
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !selectedSlideId) return;

        try {
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, выберите файл изображения');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                addImageElement(imageUrl);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            alert('Произошла ошибка при загрузке изображения');
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const handleAddImage = () => {
        if (selectedSlideId && !disabled) {
            addImageElement(url);
            setUrl('');
            setDisabled(true);
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
                    <div className={styles.container}>
                        <div className={styles.section}>
                            <span className={styles.label}>Загрузить с компьютера</span>
                            <div className={styles.buttonWrapper}>
                                <Button 
                                    type='text' 
                                    onClick={openFileDialog} 
                                    label="Выбрать файл"
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.section}>
                            <span className={styles.label}>Выбрать из галереи</span>
                            <div className={styles.buttonWrapper}>
                                <Button 
                                    type='text' 
                                    onClick={() => setIsOpenImageService(true)} 
                                    label="Открыть галерею"
                                />
                            </div>
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.section}>
                            <span className={styles.label}>Вставить ссылку</span>
                            <div className={styles.urlInput}>
                                <input
                                    value={url}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder="Введите URL изображения"
                                />
                                <div className={styles.buttonWrapper}>
                                    <Button 
                                        type='text' 
                                        onClick={handleAddImage}
                                        label="Добавить"
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            >
                <Button type={'icon'} onClick={() => {}} iconUrl={imageImgUrl} iconSize={'medium'}/>
            </Popover>
            {isOpenImageService && (
                <Popup
                    ref={imageServiceRef}
                    height={'80%'}
                    width={'60%'}
                    content={<ImageDownloader/>}
                />
            )}
        </>
    )
}

export {
    EditImageComponent,
}