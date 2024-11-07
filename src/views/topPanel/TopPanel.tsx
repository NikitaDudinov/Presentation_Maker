import { Button } from '../../components/button/Button'
import styles from './TopPanel.module.css'
import imageBackUrl from '../../assets/back.png'
import imageAheadUrl from '../../assets/ahead.png'
import imagePlayUrl from '../../assets/play.svg'
import imageDownloadUrl from '../../assets/download.svg'
import { dispatch } from '../../store/presentation'
import { renamePresentationTitle } from '../../store/renamePresentationTitle'
type TopPanelProps = {
    title: string,
}

const TopPanel = ({title}: TopPanelProps) => {
    const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = event.target.value;
        dispatch(renamePresentationTitle, newValue);
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
                value={title}
                onKeyUp={() => "this.style.width = ;"}
                onChange={onTitleChange}
            />
            <div className={styles.actionContainer}>
                <Button type={'icon'} iconUrl={imagePlayUrl} onClick={() => {}} iconSize={'medium'}/>
                <Button type={'icon'} iconUrl={imageDownloadUrl} onClick={() => {}} iconSize={'medium'}/>
            </div>
        </div>
    )
}

export {
    TopPanel,
}