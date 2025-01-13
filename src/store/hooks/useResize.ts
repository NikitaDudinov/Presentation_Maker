import { useEffect, useRef, useState, useCallback } from 'react';
import { PresentationType, UpdateSizeType } from '../types';
import { useAppActions } from './useAppActions';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../constants';

const useResize = (initialSize: { width: number; height: number }, scale: number, state: PresentationType) => {
    const { updateSizeElement, updatePositionElement } = useAppActions();
    const [sizeObject, setSizeObject] = useState(initialSize);
    const [localPosition, setLocalPosition] = useState({ x: 0, y: 0 });
    const [resizeType, setResizeType] = useState<UpdateSizeType | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);
    const startPositionRef = useRef({ x: 0, y: 0 });
    const startElementPositionRef = useRef({ x: 0, y: 0 });
    const startSizeRef = useRef({ width: 0, height: 0 });
    const rafRef = useRef<number>();

    useEffect(() => {
        const selectedElement = state.slides
            .find(slide => slide.id === state.selection.selectedSlideId)
            ?.elements.find(element => element.id === state.selection.elementsId[0]);

        if (selectedElement) {
            setLocalPosition(selectedElement.position);
        }
    }, [state.selection.selectedSlideId, state.selection.elementsId, state.slides]);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (resizeType && ref.current && state.selection.selectedSlideId) {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            rafRef.current = requestAnimationFrame(() => {
                const selectedElement = state.slides
                    .find(slide => slide.id === state.selection.selectedSlideId)
                    ?.elements.find(element => element.id === state.selection.elementsId[0]);

                if (!selectedElement) return;

                const deltaX = (event.clientX - startPositionRef.current.x) / scale;
                const deltaY = (event.clientY - startPositionRef.current.y) / scale;

                let newWidth = startSizeRef.current.width;
                let newHeight = startSizeRef.current.height;
                let newX = startElementPositionRef.current.x;
                let newY = startElementPositionRef.current.y;

                switch (resizeType) {
                    case 'diagonal-right-bottom':
                        newWidth += deltaX;
                        newHeight += deltaY;
                        break;
                    case 'diagonal-right-top':
                        newWidth += deltaX;
                        newHeight -= deltaY;
                        newY += deltaY;
                        break;
                    case 'diagonal-left-top':
                        newWidth -= deltaX;
                        newHeight -= deltaY;
                        newX += deltaX;
                        newY += deltaY;
                        break;
                    case 'diagonal-left-bottom':
                        newWidth -= deltaX;
                        newHeight += deltaY;
                        newX += deltaX;
                        break;
                    case 'horizontal-right':
                        newWidth += deltaX;
                        break;
                    case 'horizontal-left':
                        newWidth -= deltaX;
                        newX += deltaX;
                        break;
                    case 'vertical-bottom':
                        newHeight += deltaY;
                        break;
                    case 'vertical-top':
                        newHeight -= deltaY;
                        newY += deltaY;
                        break;
                }

                if (newWidth < 20) {
                    const diff = 20 - newWidth;
                    newWidth = 20;
                    if (resizeType.includes('left')) {
                        newX -= diff;
                    }
                }

                if (newHeight < 20) {
                    const diff = 20 - newHeight;
                    newHeight = 20;
                    if (resizeType.includes('top')) {
                        newY -= diff;
                    }
                }

                const maxWidth = SLIDE_WIDTH - newX;
                const maxHeight = SLIDE_HEIGHT - newY;

                if (newWidth > maxWidth) {
                    newWidth = maxWidth;
                }

                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                }

                if (newX < 0) {
                    const diff = -newX;
                    newX = 0;
                    if (resizeType.includes('left')) {
                        newWidth -= diff;
                    }
                }

                if (newY < 0) {
                    const diff = -newY;
                    newY = 0;
                    if (resizeType.includes('top')) {
                        newHeight -= diff;
                    }
                }

                setSizeObject({ width: newWidth, height: newHeight });
                setLocalPosition({ x: newX, y: newY });
            });
        }
    }, [resizeType, scale, state.selection.selectedSlideId, state.slides]);

    const handleMouseUp = useCallback(() => {
        if (resizeType && ref.current) {
            updateSizeElement(sizeObject);
            updatePositionElement(localPosition);
        }
        setResizeType(null);
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
    }, [resizeType, sizeObject, localPosition, updateSizeElement, updatePositionElement]);

    const handleResizeMouseDown = useCallback((type: UpdateSizeType) => (event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        setResizeType(type);

        const selectedElement = state.slides
            .find(slide => slide.id === state.selection.selectedSlideId)
            ?.elements.find(element => element.id === state.selection.elementsId[0]);

        if (selectedElement) {
            startPositionRef.current = { x: event.clientX, y: event.clientY };
            startElementPositionRef.current = { x: selectedElement.position.x, y: selectedElement.position.y };
            startSizeRef.current = { width: sizeObject.width, height: sizeObject.height };
            setLocalPosition(selectedElement.position);
        }
    }, [state.selection.selectedSlideId, state.slides, sizeObject]);

    useEffect(() => {
        if (resizeType) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [resizeType, handleMouseMove, handleMouseUp]);

    return { 
        sizeObject, 
        resizeType, 
        handleResizeMouseDown, 
        ref,
        localPosition
    };
};

export { useResize };
