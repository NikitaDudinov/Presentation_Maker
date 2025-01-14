import { CSSProperties, useEffect } from "react";
import { FigureElementType, PresentationType } from "../../store/types";
import { useDragAndDrop } from "../../store/hooks/useDragAndDrop";
import { useResize } from "../../store/hooks/useResize";
import { UpdateSizeType } from "../../store/types";
import { useAppActions } from "../../store/hooks/useAppActions";

type FigureObjectProps = {
    figureObject: FigureElementType,
    scale: number,
    isSelected: boolean,
    state: PresentationType,
    isWorkSpace?: boolean,
}

type ResizeHandle = {
    type: UpdateSizeType;
    style: {
        bottom?: number | string;
        right?: number | string;
        top?: number | string;
        left?: number | string;
        cursor: string;
    };
}

const FigureObject = ({ figureObject, scale, isWorkSpace = false, isSelected, state }: FigureObjectProps) => {
    const { setSelectionElement } = useAppActions();

    const { localPosition, handleMouseDown, setLocalPosition } = useDragAndDrop(
        figureObject.position,
        figureObject.size,
        isSelected,
        () => { setSelectionElement(figureObject.id) },
        scale,
    );

    useEffect(() => {
        return (setLocalPosition(figureObject.position))
    }, [figureObject]);

    const { sizeObject, resizeType, handleResizeMouseDown, ref, localPosition: resizePosition } = useResize(
        figureObject.size,
        scale,
        state
    );

    const commonStyles: CSSProperties = {
        position: 'absolute',
        width: `${sizeObject.width * scale}px`,
        height: `${sizeObject.height * scale}px`,
    };

    const sizeStyles: CSSProperties = isWorkSpace
        ? { width: `${sizeObject.width * scale}px`, height: `${sizeObject.height * scale}px` }
        : { width: `${figureObject.size.width * scale}px`, height: `${figureObject.size.height * scale}px` }

    const positionStyles = isWorkSpace
        ? {
            top: `${(resizeType ? resizePosition.y : localPosition.y) * scale}px`,
            left: `${(resizeType ? resizePosition.x : localPosition.x) * scale}px`
        }
        : {
            top: `${figureObject.position.y * scale}px`,
            left: `${figureObject.position.x * scale}px`
        };

    const figureObjectStyles: CSSProperties = {
        ...commonStyles,
        ...positionStyles,
        ...sizeStyles,
    };

    if (isSelected) {
        figureObjectStyles.border = '2px solid #0b57d0';
    }

    const resizeHandles: ResizeHandle[] = [
        { type: 'diagonal-right-bottom', style: { bottom: 0, right: 0, cursor: 'nwse-resize' } },
        { type: 'diagonal-right-top', style: { top: 0, right: 0, cursor: 'nesw-resize' } },
        { type: 'diagonal-left-bottom', style: { bottom: 0, left: 0, cursor: 'nesw-resize' } },
        { type: 'diagonal-left-top', style: { top: 0, left: 0, cursor: 'nwse-resize' } },
        { type: 'horizontal-right', style: { bottom: '50%', right: 0, cursor: 'ew-resize' } },
        { type: 'vertical-bottom', style: { bottom: 0, right: '50%', cursor: 'ns-resize' } },
        { type: 'vertical-top', style: { top: 0, right: '50%', cursor: 'ns-resize' } },
        { type: 'horizontal-left', style: { bottom: '50%', left: 0, cursor: 'ew-resize' } },
    ];

    const renderFigure = () => {
        const commonProps = {
            stroke: figureObject.fill,
            strokeWidth: figureObject.figureType === 'rectangle' ? "8" 
                : figureObject.figureType === 'triangle' ? "3"
                : "4",
            fill: "none"
        };

        switch (figureObject.figureType) {
            case 'rectangle':
                return (
                    <rect
                        width="100%"
                        height="100%"
                        {...commonProps}
                    />
                );
            case 'circle':
                return (
                    <ellipse
                        cx="50%"
                        cy="50%"
                        rx="45%"
                        ry="45%"
                        {...commonProps}
                    />
                );
            case 'triangle':
                return (
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="-2 -2 104 104"
                        preserveAspectRatio="none"
                    >
                        <polygon
                            points="50,0 100,100 0,100"
                            {...commonProps}
                        />
                    </svg>
                );
            case 'line':
                return (
                    <line
                        x1="5%"
                        y1="50%"
                        x2="95%"
                        y2="50%"
                        {...commonProps}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div
            ref={ref}
            onMouseDown={isWorkSpace ? handleMouseDown : undefined}
            style={figureObjectStyles}
        >
            <svg
                width="100%"
                height="100%"
                style={{
                    userSelect: 'none',
                    pointerEvents: 'none'
                }}
            >
                {renderFigure()}
            </svg>
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
    FigureObject,
}
