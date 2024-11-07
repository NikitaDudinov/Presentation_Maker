import { SlideType} from "../../store/types"
import styles from './Workspace.module.css'
import { Slide } from "../slide/Slide"

type WorkspaceProps = {
    slide: SlideType | null;
    selectElemnets: string[];
}

const Workspace = ({slide, selectElemnets}: WorkspaceProps) => (
    <div className={styles.workspace}>
        {
            (slide && <Slide slide={slide} selectElements={selectElemnets}/>)
        }

    </div>
)

export {
    Workspace
}