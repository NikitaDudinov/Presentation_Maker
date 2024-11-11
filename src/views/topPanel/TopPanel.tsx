import { Button } from '../../components/button/Button'
import styles from './TopPanel.module.css'
import imageBackUrl from '../../assets/back.png'
import imageAheadUrl from '../../assets/ahead.png'
import imagePlayUrl from '../../assets/play.svg'
import imageExportUrl from '../../assets/Export.svg'
import { dispatch } from '../../store/presentation'
import { renamePresentationTitle } from '../../store/renamePresentationTitle'
import { saveToJsonFile } from '../../store/files/saveToJsonFile'
import { PresentationType } from '../../store/types'
import { getFromFile } from '../../store/files/getFromFile'

type TopPanelProps = {
    presentation: PresentationType,
}

const TopPanel = ({presentation}: TopPanelProps) => {
    const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = event.target.value;
        dispatch(renamePresentationTitle, newValue);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Получаем первый файл из списка
        if (file) {
            try {
                dispatch(getFromFile, {file: file})
            } catch (error) {
                console.error(error); // Обработка ошибок
            }
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
                value={presentation.title}
                onKeyUp={() => "this.style.width = ;"}
                onChange={onTitleChange}
            />
            <div className={styles.actionContainer}>
                <Button type={'icon'} iconUrl={imagePlayUrl} onClick={() => {}} iconSize={'medium'}/>
                <Button type={'icon'} iconUrl={imageExportUrl} onClick={() => saveToJsonFile(presentation)} iconSize={'medium'}/>
            </div>
        </div>
    )
}

export {
    TopPanel,
}