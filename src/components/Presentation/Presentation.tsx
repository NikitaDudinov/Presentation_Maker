import { useState } from "react"
import { TPresentation } from "../../types/types"
import { PresentationContext } from "../../contexts/PresentationContext"
import { Toolbar } from "../Toolbar/Toolbar"
import { SlideBar } from "../SlideBar/SlideBar"
import { CurrentSlide } from "../CurrentSlide/CurrentSlide"
import styles from './Presentation.module.css'
import { maxPresentation, minPresentation} from "../../data/Presentation"

const Presentation = () => {
    const [presentation, setPresenation] = useState<TPresentation>(minPresentation)
    const [currentSlideId, setCurrentSlideId] = useState(
        minPresentation?.slides?.[0]?.id ?? null
      );
    const valueContext = {
        presentation: presentation,
        currentSlideId: currentSlideId,
        changePtresentation: setPresenation,
        changeCurrentSlide: setCurrentSlideId,
    }

    return (
        <PresentationContext.Provider value={valueContext}>
            <Toolbar/>
            <div className={styles.container}>
                <SlideBar/>
                <CurrentSlide/>
            </div>
        </PresentationContext.Provider>

    )
}

export {
    Presentation
}