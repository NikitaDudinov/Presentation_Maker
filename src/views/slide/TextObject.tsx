import React, { CSSProperties, useEffect, useState, useRef } from "react";
import { PresentationType, TextElementType, UpdateSizeType } from "../../store/types";
import { useDragAndDrop } from "../../store/hooks/useDragAndDrop";
import { useResize } from "../../store/hooks/useResize";
import { useAppActions } from "../../store/hooks/useAppActions";
import styles from './Slide.module.css';

type TextObjectProps = {
    textObject: TextElementType;
    scale: number;
    isSelected: boolean;
    state: PresentationType;
    isWorkSpace?: boolean;
    isNew?: boolean;
};

type ResizeHandle = {
    type: UpdateSizeType;
    style: {
        bottom?: number | string;
        right?: number | string;
        top?: number | string;
        left?: number | string;
        cursor: string;
    };
};

const TextObject: React.FC<TextObjectProps> = ({ 
    textObject, 
    scale, 
    isWorkSpace = false, 
    isSelected, 
    state,
}) => {
    const { setSelectionElement, updateContentText } = useAppActions();
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const { localPosition, handleMouseDown: dragMouseDown, setLocalPosition } = useDragAndDrop(
        textObject.position,
        textObject.size,
        isSelected,
        () => setSelectionElement(textObject.id),
        scale,
    );

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    useEffect(() => {
        setLocalPosition(textObject.position);
    }, [textObject.position]);

    const { sizeObject, resizeType, handleResizeMouseDown, ref, localPosition: resizePosition } = useResize(
        textObject.size,
        scale,
        state
    );

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            inputRef.current?.blur();
        }
    };

    const textStyles: CSSProperties = {
        fontFamily: `${textObject.fontFamily}, sans-serif`,
        fontSize: `${textObject.fontSize * scale}px`,
        fontWeight: textObject.weight,
        fontStyle: textObject.style,
        textDecoration: textObject.decoration,
        textTransform: textObject.transform,
        color: textObject.color,
    }

    const commonStyles: CSSProperties = {
        position: 'absolute',
        cursor: resizeType ? 
            (resizeType.includes('horizontal') ? 'ew-resize' : 
             resizeType.includes('vertical') ? 'ns-resize' : 'nwse-resize') 
            : isEditing ? 'text' : 'default',
        border: isSelected ? '2px solid #0b57d0' : 'none',
        overflow: 'hidden',
        userSelect: 'none',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        ...textStyles
    };

    const sizeStyles: CSSProperties = isWorkSpace
        ? { width: `${sizeObject.width * scale}px`, height: `${sizeObject.height * scale}px` }
        : { width: `${textObject.size.width * scale}px`, height: `${textObject.size.height * scale}px` };

    const positionStyles = isWorkSpace 
        ? { 
            top: `${(resizeType ? resizePosition.y : localPosition.y) * scale}px`, 
            left: `${(resizeType ? resizePosition.x : localPosition.x) * scale}px` 
          }
        : { 
            top: `${textObject.position.y * scale}px`, 
            left: `${textObject.position.x * scale}px` 
          };
    
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
            onMouseDown={!isEditing ? dragMouseDown : undefined}
            onDoubleClick={handleDoubleClick}
        >
            {isEditing ? (
                <textarea
                    ref={inputRef}
                    value={textObject.content}
                    onChange={(e) => updateContentText(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={styles.textAreaObject}
                    style={{
                        ...textStyles,
                    }}
                />
            ) : (
                <p 
                    className={styles.textObject}
                    style={{ 
                        ...textStyles
                    }}
                >
                    {textObject.content || 'Введите текст...'}
                </p>
            )}
            
            {isSelected && !isEditing && resizeHandles.map(handle => (
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
    );
};

export { TextObject };
