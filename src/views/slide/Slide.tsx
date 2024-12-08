import { SlideType } from "../../store/types";
import { CSSProperties, useRef, useState, useEffect} from "react";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css';
import { setSelectionElement } from "../../store/setSelectionElement";
import { deleteSelectionElement } from "../../store/deleteSelectionElement";

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

type SlideProps = {
    slide: SlideType;
    scale?: number;
    select?: boolean;
    selectElements?: string[];
    className?: string; 
}

const Slide = ({ slide, scale = 1, select, selectElements }: SlideProps) => {
    const slideRef = useRef<HTMLDivElement>(null);

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    };

    if (select) {
        slideStyles.border = '3px solid #20AB25';
    }

    const onSetSelectionElement = (elementId: string) => {
        // dispatch(setSelectionElement, { selectedItemId: elementId });
    };

    const onSlideClick = () => {
        if (slideRef.current) {
            // dispatch(deleteSelectionElement);
        }
    };

    return (
        <div
            ref={slideRef}
            style={slideStyles}
            className={styles.slide}
            onClick={onSlideClick}
        >
            {slide.elements.map(slideObject => (
                <div 
                    key={slideObject.id} 
                    className={styles.element} 
                    onClick={scale === 1 ? (e) => {
                        e.stopPropagation();
                        onSetSelectionElement(slideObject.id);
                    } : undefined}
                >
                    {slideObject.type === "text" ? (
                        <TextObject 
                            textObject={slideObject} 
                            scale={scale} 
                            isSelected={selectElements?.includes(slideObject.id) ? true : false} 
                        />
                    ) : (
                        <ImageObject 
                            imageObject={slideObject} 
                            scale={scale} 
                            isSelected={selectElements?.includes(slideObject.id) ? true : false} 
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export {
    Slide,
}