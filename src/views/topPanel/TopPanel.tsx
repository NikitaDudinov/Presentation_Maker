import { Button } from '../../components/button/Button'
import styles from './TopPanel.module.css'
import imageBackUrl from '../../assets/back.png'
import imageAheadUrl from '../../assets/ahead.png'
import imagePlayUrl from '../../assets/play.svg'
import imageExportUrl from '../../assets/Export.svg'
import imageImportUrl from '../../assets/download.svg'
import { saveToJsonFile } from '../../store/files/saveToJsonFile'
import { getFromFile } from '../../store/files/getFromFile'
import { useRef } from 'react'
import { useAppSelector } from '../../store/hooks/useAppSelector'

const TopPanel = () => {
    const title = useAppSelector((presentation => presentation.title))
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = event.target.value;
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            try {
                // Получаем презентацию из файла
                const presentation = await getFromFile(file);
                
                // Диспатчим новое действие с новой презентацией
                // dispatch(getNewPresentation, { newPresentation: presentation });
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Открываем диалог выбора файла
        }
    };

    return (
        <div className={styles.topPanel}>
            <div className={styles.navigationContainer}>
                <Button type={'icon'} iconUrl={imageBackUrl} onClick={() => {}} iconSize={'small'}/>
                <Button type={'icon'} iconUrl={imageAheadUrl} onClick={() => {}} iconSize={'small'}/>
            </div>
            <input
                className={styles.titleInput}
                type="text"
                defaultValue={title} 
                onKeyUp={() => "this.style.width = ;"}
                onChange={onTitleChange}
            />
            <div className={styles.actionContainer}>
                <Button type={'icon'} iconUrl={imagePlayUrl} onClick={() => {}} iconSize={'medium'}/>
                <div>
                    <Button type={'icon'} iconUrl={imageImportUrl} onClick={handleButtonClick} iconSize={'medium'}/>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }} 
                    />
                </div>
                {/* saveToJsonFile(presentation) */}
                <Button type={'icon'} iconUrl={imageExportUrl} onClick={() => {}} iconSize={'medium'}/>
            </div>
        </div>
    )
}

export {
    TopPanel,
}