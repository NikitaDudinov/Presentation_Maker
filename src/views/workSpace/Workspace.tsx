import { SlideType } from "../../store/types"
import styles from './Workspace.module.css'
import { Slide } from "../slide/Slide"

type WorkspaceProps = {
    slide: SlideType
}

const Workspace = ({slide}: WorkspaceProps) => (
    <div className={styles.workspace}>
        <Slide slide={slide} isSelected={false}/>
    </div>
)

export {
    Workspace
}