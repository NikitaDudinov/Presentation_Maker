import { SlideType } from "../../store/types";
import { CSSProperties, useRef } from "react";
import { TextObject } from "./TextObject";
import { ImageObject } from "./ImageObject";
import styles from './Slide.module.css';
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { useAppActions } from "../../store/hooks/useAppActions";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../../store/constants";

type SlideProps = {
    slide: SlideType;
    isWorkSpace?: boolean,
    scale: number;
    selectElements?: string[];
    className?: string; 
}

const Slide = ({ 
    slide, 
    isWorkSpace = false, 
    scale, 
    selectElements 
}: SlideProps) => {
    const {setSelectionElement, deleteSelectionElement} = useAppActions();
    const slideRef = useRef<HTMLDivElement>(null);
    const presentation = useAppSelector(state => state)
    const slideStyles: CSSProperties = {
        backgroundColor: slide.background,
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
                    {slideObject.type === "text" ? (
                        <TextObject 
                            state={presentation}
                            textObject={slideObject}
                            isWorkSpace={isWorkSpace} 
                            scale={scale} 
                            isSelected={selectElements?.includes(slideObject.id) ? true : false} 
                        />
                    ) : (
                        <ImageObject 
                            state={presentation}
                            imageObject={slideObject} 
                            scale={scale}
                            isWorkSpace={isWorkSpace} 
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