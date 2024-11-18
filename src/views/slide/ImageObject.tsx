
import {CSSProperties} from "react";
import { ImageElementType } from "../../store/types";
import { useDragAndDrop } from "../../store/hooks/useDragAndDrop";
import { dispatch } from "../../store/presentation";
import { setSelectionElement } from "../../store/setSelectionElement";

type ImageObjectProps = {
    imageObject: ImageElementType,
    scale?: number,
    isSelected: boolean,
}

const ImageObject = ({imageObject, scale = 1, isSelected}: ImageObjectProps) =>  {
    const { localPosition, handleMouseDown } = useDragAndDrop(
        imageObject.position,
        imageObject.size,
        isSelected,
        () => dispatch(setSelectionElement, { selectedItemId: imageObject.id })
    )

    const commonStyles: CSSProperties = {
        position: 'absolute',
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
    }

    const positionStyles = scale === 1 
        ? { top: `${localPosition.y * scale}px`, left: `${localPosition.x * scale}px` }
        : { top: `${imageObject.position.y * scale}px`, left: `${imageObject.position.x * scale}px` };

    const imageObjectStyles: CSSProperties = {
        ...commonStyles,
        ...positionStyles,
    };

    if (isSelected) {
        imageObjectStyles.border = '2px solid #0b57d0'
    }
    return (
        <img
            style={imageObjectStyles} 
            src={imageObject.src} 
            onMouseDown={scale === 1 ? handleMouseDown : undefined}
        />
    )
}

export {
    ImageObject,
}