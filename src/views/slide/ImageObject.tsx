
import {CSSProperties} from "react";
import { ImageElementType } from "../../store/types";

type ImageObjectProps = {
    imageObject: ImageElementType,
    scale?: number,
    isSelected: boolean,
}

function ImageObject({imageObject, scale = 1, isSelected}: ImageObjectProps) {
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.position.y * scale}px`,
        left: `${imageObject.position.x * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
    }
    if (isSelected) {
        imageObjectStyles.border = '2px solid #0b57d0'
    }
    return (
        <img style={imageObjectStyles} src={imageObject.src} />
    )
}

export {
    ImageObject,
}