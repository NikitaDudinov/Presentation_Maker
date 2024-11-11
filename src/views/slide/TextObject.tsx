import React, { CSSProperties, useState, useEffect, useRef, useLayoutEffect } from "react";
import { dispatch } from "../../store/presentation";
import { TextElementType } from "../../store/types";
import { updatePositionElement } from "../../store/updatePositionElement";
import { setSelectionElement } from "../../store/setSelectionElement";

type TextObjectProps = {
    textObject: TextElementType;
    scale?: number;
    isSelected: boolean;
};

const TextObject: React.FC<TextObjectProps> = ({ textObject, scale = 1, isSelected }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [localPosition, setLocalPosition] = useState(textObject.position);
    const textRef = useRef<HTMLParagraphElement>(null);

    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${localPosition.y * scale}px`,
        left: `${localPosition.x * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.font.size * scale}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        border: isSelected ? '2px solid #0b57d0' : 'none',
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ 
            x: e.clientX - localPosition.x, 
            y: e.clientY - localPosition.y 
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const newX = (e.clientX - dragStart.x) / scale;
            const newY = (e.clientY - dragStart.y) / scale;
            setLocalPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            dispatch(updatePositionElement, { position: localPosition });
        }
    };

    useLayoutEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <p 
            ref={textRef}
            style={textObjectStyles} 
            onMouseDown={handleMouseDown}
        >
            {textObject.content}
        </p>
    );
};

export { TextObject };