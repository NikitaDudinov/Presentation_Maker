import { SlideType } from "../../store/types";
import { CSSProperties, useRef } from "react";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css';
import { setSelectionElement } from "../../store/setSelectionElement";
import { dispatch } from "../../store/presentation";
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

const Slide = ({ slide, scale = 1, select, className, selectElements }: SlideProps) => {
    const slideRef = useRef<HTMLDivElement>(null);

    const slideStyles: CSSProperties = {
        backgroundColor: slide.background,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    };

    if (select) {
        slideStyles.border = '3px solid #20AB25';
    }

    const onSetSelectionElement = (slideId: string) => {
        dispatch(setSelectionElement, { selectedItemId: slideId });
    };

    const onSlideClick = () => {
        if (slideRef.current) {
            dispatch(deleteSelectionElement);
        }
    };

    return (
        <div 
            ref={slideRef} 
            style={slideStyles} 
            className={`${styles.slide} ${className}`} 
            onClick={onSlideClick}
            onMouseDown={handleMouseDown}
        >
            {slide.elements.map(slideObject => {
                switch (slideObject.type) {
                    case "text":
                        return (
                            <div 
                                key={slideObject.id} 
                                className={styles.element} 
                                onClick={(e) => {
                                    e.stopPropagation(); // Останавливаем всплытие события
                                    onSetSelectionElement(slideObject.id);
                                }}
                            >
                                <TextObject 
                                    textObject={slideObject} 
                                    scale={scale} 
                                    isSelected={selectElements?.includes(slideObject.id) ? true : false} 
                                />
                            </div>
                        );
                    case "image":
                        return (
                            <div 
                                key={slideObject.id} 
                                className={styles.element} 
                                onClick={(e) => {
                                    e.stopPropagation(); // Останавливаем всплытие события
                                    onSetSelectionElement(slideObject.id);
                                }}
                            >
                                <ImageObject 
                                    imageObject={slideObject} 
                                    scale={scale} 
                                    isSelected={selectElements?.includes(slideObject.id) ? true : false} 
                                />
                            </div>
                        );
                    default:
                        throw new Error(`Unknown slide type`);
                }
            })}
        </div>
    );
}

export {
    Slide,
}