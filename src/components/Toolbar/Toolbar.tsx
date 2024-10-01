import { useContext } from 'react'
import styles from './Toolbar.module.css'
import { PresentationContext } from '../../contexts/PresentationContext'
import { SlideCreator } from '../SlideCreator/SlideCreator'

const Toolbar = () => {
    const valueContext = useContext(PresentationContext)
    const title = valueContext.presentation.title
    return (
        <div className={styles.toolbar}>
            <p className={styles.presentationTitle}>{title}</p>
            <SlideCreator/>
            <p className={styles.toolbarDescription}>В будущем тут будут инструменты для работы</p>
        </div>
    )
}

export {
    Toolbar,
}