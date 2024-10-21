
import {CSSProperties} from "react";
import { ImageElement } from "../../store/types";

type ImageObjectProps = {
    imageObject: ImageElement,
    scale?: number,
}

function ImageObject({imageObject, scale = 1}: ImageObjectProps) {
    const imageObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${imageObject.position.y * scale}px`,
        left: `${imageObject.position.x * scale}px`,
        width: `${imageObject.size.width * scale}px`,
        height: `${imageObject.size.height * scale}px`,
    }
    return (
        <img style={imageObjectStyles} src={'/images/' + imageObject.src} />
    )
}

export {
    ImageObject,
}