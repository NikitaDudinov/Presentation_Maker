
import styles from './TopPanel.module.css'

import { PresentationTitle} from '../../components/titlePresentation/PresentationTitle'
import { Toolbar } from '../../components/toolbar/Toolbar'
type TopPanelProps = {
    title: string,
    background?: string,
}

const TopPanel = ({title, background}: TopPanelProps) => {
    return (
        <div className={styles.topPanel}>
            <PresentationTitle title={title}/>
            <Toolbar background={background}/>

        </div>
    )
}

export {
    TopPanel,
}