import {CSSProperties, useEffect} from "react";
import { ImageElementType, PresentationType } from "../../store/types";
import { useDragAndDrop } from "../../store/hooks/useDragAndDrop";
import { useResize } from "../../store/hooks/useResize";
import { UpdateSizeType } from "../../store/types";
import { useAppActions } from "../../store/hooks/useAppActions";

type ImageObjectProps = {
    imageObject: ImageElementType,
    scale: number,
    isSelected: boolean,
    state: PresentationType,
    isWorkSpace?: boolean,
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

const ImageObject = ({ imageObject, scale, isWorkSpace=false, isSelected, state }: ImageObjectProps) => {
    const {setSelectionElement} = useAppActions();

    const { localPosition, handleMouseDown, setLocalPosition} = useDragAndDrop(
        imageObject.position,
        imageObject.size,
        isSelected,
        () => {setSelectionElement(imageObject.id)},
        scale,
    );

    useEffect(() => {
        return(setLocalPosition(imageObject.position))
    }, [imageObject]);

    const { sizeObject, resizeType, handleResizeMouseDown, ref, localPosition: resizePosition } = useResize(
        imageObject.size,
        scale,
        state
    );

    const commonStyles: CSSProperties = {
        position: 'absolute',
        width: `${sizeObject.width * scale}px`,
        height: `${sizeObject.height * scale}px`,
    };

    const sizeStyles: CSSProperties = isWorkSpace 
        ? {width: `${sizeObject.width * scale}px`, height: `${sizeObject.height * scale}px`}
        : {width: `${imageObject.size.width * scale}px`, height: `${imageObject.size.height * scale}px`}

    const positionStyles = isWorkSpace 
        ? { 
            top: `${(resizeType ? resizePosition.y : localPosition.y) * scale}px`, 
            left: `${(resizeType ? resizePosition.x : localPosition.x) * scale}px` 
        }
        : { 
            top: `${imageObject.position.y * scale}px`, 
            left: `${imageObject.position.x * scale}px` 
        };

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
        <div 
            ref={ref} 
            onMouseDown={isWorkSpace ? handleMouseDown : undefined} 
            style={imageObjectStyles}
        >
            <img
                style={{
                    width: '100%',
                    height: '100%',
                    userSelect: 'none',
                    pointerEvents: 'none'
                }}
                src={imageObject.src}
                draggable={false}
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
                            backgroundColor: '#0b57d0',
                            ...handle.style,
                            userSelect: 'none',
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