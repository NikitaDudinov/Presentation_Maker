import { dispatch } from "../../store/presentation"
import { renamePresentationTitle } from "../../store/renamePresentationTitle"
import styles from './PresentationTitle.module.css'

type PresentationTitleProps = {
    title: string;
}

const PresentationTitle: React.FC<PresentationTitleProps> = ({ title }) => {
    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value)
    }
    return (
        <input className={styles.presentationTitle} type="text" defaultValue={title} onChange={onTitleChange}/>
    )
}

export {
    PresentationTitle,
}