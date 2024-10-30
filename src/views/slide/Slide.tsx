import { SlideType, Selection } from "../../store/types";
import {CSSProperties} from "react";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css'
import { setSelectionElement } from "../../store/setSelectionElement";
import { dispatch } from "../../store/presentation";

const SLIDE_WIDTH = 935
const SLIDE_HEIGHT = 525

type SlideProps = {
    slide: SlideType,
    scale?: number,
    select?: boolean,
    selectElements?: string[],
    className?: string; 
}

const Slide = ({slide, scale = 1, select, className, selectElements}: SlideProps) => {
    const slideStyles:CSSProperties = {
        backgroundColor: slide.background,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }

    if (select) {
        slideStyles.border = '3px solid #0b57d0'
    }
    const onSetSelectionElement = (itemId: string) => {
        dispatch(setSelectionElement, {selectedItemId: itemId})
    }
    return (
        <div style={slideStyles} className={styles.slide + ' ' + className}>
            {slide.elements.map(slideObject => {
                switch (slideObject.type) {
                    case "text":    
                        return <div key={slideObject.id}  onClick={() => {onSetSelectionElement(slideObject.id)}}><TextObject key={slideObject.id} textObject={slideObject} scale={scale} isSelected={selectElements?.includes(slideObject.id) ? true : false}></TextObject></div>
                    case "image":
                        return <div key={slideObject.id}  onClick={() => {onSetSelectionElement(slideObject.id)}}><ImageObject imageObject={slideObject} scale={scale} isSelected={selectElements?.includes(slideObject.id) ? true : false}></ImageObject></div>
                    default:
                        throw new Error(`Unknown slide type`)
                }
            })}
        </div>
    )
}

export {
    Slide
}