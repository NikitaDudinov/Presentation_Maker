import styles from './TopPanel.module.css'

type TopPanelProps = {
    title: string,
}

const TopPanel = ({title}: TopPanelProps) => {
    return (
        <div className={styles.topPanel}>
            <p className={styles.presentationTitle}>{title}</p>
            <p className={styles.topPanelDescription}>В будущем тут будут инструменты для работы</p>
        </div>
    )
}

export {
    TopPanel,
}