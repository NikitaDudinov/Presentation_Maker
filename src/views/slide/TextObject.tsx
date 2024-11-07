import { TextElementType } from "../../store/types";
import {CSSProperties} from "react";

type TextObjectProps = {
    textObject: TextElementType,
    scale?: number,
    isSelected: boolean,
}
function TextObject({textObject, scale = 1, isSelected}: TextObjectProps) {
    const textObjectStyles: CSSProperties = {
        position: 'absolute',
        top: `${textObject.position.y * scale}px`,
        left: `${textObject.position.x * scale}px`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        fontSize: `${textObject.font.size * scale}px`
    }
    if (isSelected) {
        textObjectStyles.border = '2px solid #0b57d0'
    }
    return (
        <p style={textObjectStyles}>{textObject.content}</p>
    )
}

export {
    TextObject,
}