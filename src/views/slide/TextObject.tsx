import React, { CSSProperties, useEffect} from "react";
import { PresentationType, TextElementType, UpdateSizeType } from "../../store/types";
import { useDragAndDrop } from "../../store/hooks/useDragAndDrop";
import { useResize } from "../../store/hooks/useResize";
import { useAppActions } from "../../store/hooks/useAppActions";

type TextObjectProps = {
    textObject: TextElementType;
    scale: number;
    isSelected: boolean;
    state: PresentationType;
};

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

const TextObject: React.FC<TextObjectProps> = ({ textObject, scale, isSelected, state }) => {

    const {setSelectionElement} = useAppActions();

    const { localPosition, handleMouseDown, setLocalPosition } = useDragAndDrop(
        textObject.position,
        textObject.size,
        isSelected,
        () => {setSelectionElement(textObject.id)},
        state,
    );

    useEffect(() => {
        return(setLocalPosition(textObject.position))
    }, [textObject]);

    const { sizeObject, resizeType, handleResizeMouseDown, ref } = useResize(textObject.size, scale, state);

    const commonStyles: CSSProperties = {
        position: 'absolute',
        width: `${sizeObject.width * scale}px`,
        height: `${sizeObject.height * scale}px`,
        fontSize: `${textObject.font.size * scale}px`,
        cursor: resizeType ? 
            (resizeType.includes('horizontal') ? 'ew-resize' : 
             resizeType.includes('vertical') ? 'ns-resize' : 'nwse-resize') 
            : 'grab',
        border: isSelected ? '2px solid #0b57d0' : 'none',
        overflow: 'hidden',
    };

    const positionStyles = scale === 1 
        ? { top: `${localPosition.y * scale}px`, left: `${localPosition.x * scale}px` }
        : { top: `${textObject.position.y * scale}px`, left: `${textObject.position.x * scale}px` };

    const sizeStyles: CSSProperties = scale === 1 
    ? {width: `${sizeObject.width * scale}px`, height: `${sizeObject.height * scale}px`}
    : {width: `${textObject.size.width * scale}px`, height: `${textObject.size.height * scale}px`}
    
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
            style={{ ...commonStyles, ...positionStyles, ...sizeStyles }}
            onMouseDown={scale === 1 ? handleMouseDown : undefined}
        >
            <p style={{ margin: 0 }}>
                {textObject.content}
            </p>
            
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
    );
};


export { TextObject };