import { SlideType } from "../../store/types";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import { FigureObject } from "./FigureObject";
import styles from './Slide.module.css';
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { useAppActions } from "../../store/hooks/useAppActions";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../../store/constants";

type SlideProps = {
    isSelected?: boolean;
    slide: SlideType;
    isWorkSpace?: boolean,
    scale: number;
    selectElements?: string[];
    className?: string; 
}

const Slide = ({
    isSelected = false,
    slide, 
    isWorkSpace = false, 
    scale, 
    selectElements 
}: SlideProps) => {
    const {setSelectionElement, deleteSelectionElement} = useAppActions();
    const slideRef = useRef<HTMLDivElement>(null);
    const presentation = useAppSelector(state => state)

    const slideStyles: CSSProperties = {
        border: isSelected && !isWorkSpace ? '1px solid #39FF14' : '1px solid black',
        background: `${slide.background.startsWith('http') || 
            slide.background.startsWith('data:') || 
            slide.background.startsWith('/src')
            ? `url(${slide.background})`
            : slide.background} no-repeat center / cover`,
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    };
    
 

    const onSetSelectionElement = (elementId: string) => {
        setSelectionElement(elementId)
    };

    const onSlideClick = () => {
        if (slideRef.current) {
            deleteSelectionElement();
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
                    onClick={
                        isWorkSpace 
                        ? (e) => {
                            e.stopPropagation();
                            onSetSelectionElement(slideObject.id);
                        } 
                        : undefined
                    }
                >
                    {(() => {
                        switch (slideObject.type) {
                            case 'text':
                                return (
                                    <TextObject 
                                        state={presentation}
                                        textObject={slideObject}
                                        isWorkSpace={isWorkSpace} 
                                        scale={scale} 
                                        isSelected={selectElements?.includes(slideObject.id) ? true : false} 
                                    />
                                );
                            case 'image':
                                return (
                                    <ImageObject 
                                        state={presentation}
                                        imageObject={slideObject} 
                                        scale={scale}
                                        isWorkSpace={isWorkSpace} 
                                        isSelected={selectElements?.includes(slideObject.id) ? true : false} 
                                    />
                                );
                            case 'figure':
                                return (
                                    <FigureObject
                                        state={presentation}
                                        figureObject={slideObject}
                                        scale={scale}
                                        isWorkSpace={isWorkSpace}
                                        isSelected={selectElements?.includes(slideObject.id) ? true : false}
                                    />
                                );
                            default:
                                return null;
                        }
                    })()}
                </div>
            ))}
        </div>
    );
};

export {
    Slide,
}