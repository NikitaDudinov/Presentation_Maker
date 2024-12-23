import styles from './Workspace.module.css'
import { Slide } from "../slide/Slide"
import { useAppSelector } from "../../store/hooks/useAppSelector"

const Workspace = () => {
    const selectedSlideId = useAppSelector(state => state.selection.selectedSlideId)
    const slides = useAppSelector(state => state.slides)
    const slide = slides.find(slide => slide.id === selectedSlideId);
    const selectElemnets =  useAppSelector(state => state.selection.elementsId);
    return (
        <div className={styles.workspace}>
            {
                (slide && <Slide key={slide.id} slide={slide} selectElements={selectElemnets}/>)
            }
        </div>
    )
}

export {
    Workspace
}