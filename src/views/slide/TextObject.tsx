import { TextElement } from "../../store/types";
import {CSSProperties} from "react";

type TextObjectProps = {
    textObject: TextElement,
    scale?: number,
}
function TextObject({textObject, scale = 1}: TextObjectProps) {
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.position.y * scale}px`,
        left: `${textObject.position.x * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.font.size * scale}px`
    }
    return (
        <p style={textObjectStyles}>{textObject.content}</p>
    )
}

export {
    TextObject,
}