
import {CSSProperties} from "react";
import { ImageElementType } from "../../store/types";
import { useDragAndDrop } from "../../store/hooks/useDragAndDrop";
import { dispatch } from "../../store/presentation";
import { setSelectionElement } from "../../store/setSelectionElement";
import { useResize } from "../../store/hooks/useResize";
import { UpdateSizeType } from "../../store/types";

type ImageObjectProps = {
    imageObject: ImageElementType,
    scale?: number,
    isSelected: boolean,
}

type ResizeHandle  = {
    type: UpdateSizeType;
    style: {
        bottom?: number | string;
        right?: number | string;
        top?: number | string;
        left?: number | string;
        cursor: string;
    };
}

const ImageObject = ({ imageObject, scale = 1, isSelected }: ImageObjectProps) => {
    const { localPosition, handleMouseDown } = useDragAndDrop(
        imageObject.position,
        imageObject.size,
        isSelected,
        () => dispatch(setSelectionElement, { selectedItemId: imageObject.id})
    );

    const { sizeObject, resizeType, handleResizeMouseDown, ref } = useResize(imageObject.size, scale);

    const commonStyles: CSSProperties = {
        position: 'absolute',
        width: `${sizeObject.width * scale}px`,
        height: `${sizeObject.height * scale}px`,
    };

    const sizeStyles: CSSProperties = scale === 1 
    ? {width: `${sizeObject.width * scale}px`, height: `${sizeObject.height * scale}px`}
    : {width: `${imageObject.size.width * scale}px`, height: `${imageObject.size.height * scale}px`}

    const positionStyles = scale === 1 
        ? { top: `${localPosition.y * scale}px`, left: `${localPosition.x * scale}px` }
        : { top: `${imageObject.position.y * scale}px`, left: `${imageObject.position.x * scale}px` };

    const imageObjectStyles: CSSProperties = {
        ...commonStyles,
        ...positionStyles,
        ...sizeStyles,
    };

    if (isSelected) {
        imageObjectStyles.border = '2px solid #0b57d0';
    }

    const resizeHandles: ResizeHandle[] = [
        { type: 'diagonal-right-bottom', style: { bottom: 0, right: 0, cursor: 'nwse-resize' } },
        { type: 'diagonal-right-top', style: { top: 0, right: 0, cursor: 'nesw-resize' }},
        { type: 'diagonal-left-bottom', style: { bottom: 0, left: 0, cursor: 'nesw-resize' }},
        { type: 'diagonal-left-top', style: { top: 0, left: 0, cursor: 'nwse-resize' }},
        { type: 'horizontal-right', style: { bottom: '50%', right: 0, cursor: 'ew-resize' }},
        { type: 'vertical-bottom', style: { bottom: 0, right: '50%', cursor: 'ns-resize' }},
        { type: 'vertical-top', style: { top: 0, right: '50%', cursor: 'ns-resize' }},
        { type: 'horizontal-left', style: { bottom: '50%', left: 0, cursor: 'ew-resize' }},
    ];

    return (
        <div ref={ref} onMouseDown={!resizeType ? handleMouseDown : undefined} style={imageObjectStyles}>
            <img
            style={{
                width: '100%',
                height: '100%'
            }}
                src={imageObject.src}
                onMouseDown={scale === 1 ? handleMouseDown : undefined}
            />
            <div>
            {isSelected && resizeHandles.map(handle => (
                <div
                    key={handle.type}
                    onMouseDown={handleResizeMouseDown(handle.type)}
                    style={{
                        position: 'absolute',
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'red',
                        ...handle.style,
                    }}
                />
            ))}
            </div>

        </div>
    );
};

export {
    ImageObject,
}