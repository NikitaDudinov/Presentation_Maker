import React, { CSSProperties} from "react";
import { dispatch } from "../../store/presentation";
import { TextElementType } from "../../store/types";
import { setSelectionElement } from "../../store/setSelectionElement";
import { useDragAndDrop } from "../../store/hooks/useDragAndDrop";

type TextObjectProps = {
    textObject: TextElementType;
    scale: number;
    isSelected: boolean;
};

const TextObject: React.FC<TextObjectProps> = ({ textObject, scale, isSelected }) => {

    const { localPosition, handleMouseDown}= useDragAndDrop(
        textObject.position,
        textObject.size,
        isSelected,
        () => dispatch(setSelectionElement, { selectedItemId: textObject.id })
    )

    const commonStyles: CSSProperties = {
        position: 'absolute',
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.font.size * scale}px`,
        cursor: textObject.position ? 'grabbing' : 'grab',
        border: isSelected ? '2px solid #0b57d0' : 'none',
    };

    const positionStyles = scale === 1 
        ? { top: `${localPosition.y * scale}px`, left: `${localPosition.x * scale}px` }
        : { top: `${textObject.position.y * scale}px`, left: `${textObject.position.x * scale}px` };

    const textObjectStyles: CSSProperties = {
        ...commonStyles,
        ...positionStyles,
    };

    return (
        <p 
            style={textObjectStyles} 
            onMouseDown={scale === 1 ? handleMouseDown : undefined}
        >
            {textObject.content}
        </p>
    );
};

export { TextObject };