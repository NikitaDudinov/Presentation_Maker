import { useEffect, useRef, useState } from 'react';
import { PresentationType, UpdateSizeType } from '../types';
import { useAppActions } from './useAppActions';

const useResize = (initialSize: { width: number; height: number }, scale: number, state: PresentationType) => {
    const {updateSizeElement, updatePositionElement} = useAppActions();
    const [sizeObject, setSizeObject] = useState(initialSize);
    const [resizeType, setResizeType] = useState<UpdateSizeType | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);
    const startPositionRef = useRef({ x: 0, y: 0 });
    const startElementPositionRef = useRef({ x: 0, y: 0 });
    const startSizeRef = useRef({ width: 0, height: 0 });

    const handleMouseMove = (event: MouseEvent) => {
        if (resizeType && ref.current && state.selection.selectedSlideId) {
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
                    newWidth = startSizeRef.current.width + deltaX;
                    newHeight = startSizeRef.current.height + deltaY;
                    break;

                case 'diagonal-right-top':
                    newWidth = startSizeRef.current.width + deltaX;
                    newHeight = startSizeRef.current.height - deltaY;
                    newY = startElementPositionRef.current.y + deltaY;
                    break;

                case 'diagonal-left-top':
                    newWidth = startSizeRef.current.width - deltaX;
                    newHeight = startSizeRef.current.height - deltaY;
                    newX = startElementPositionRef.current.x + deltaX;
                    newY = startElementPositionRef.current.y + deltaY;
                    break;

                case 'diagonal-left-bottom':
                    newWidth = startSizeRef.current.width - deltaX;
                    newHeight = startSizeRef.current.height + deltaY;
                    newX = startElementPositionRef.current.x + deltaX;
                    break;

                case 'horizontal-right':
                    newWidth = startSizeRef.current.width + deltaX;
                    break;

                case 'horizontal-left':
                    newWidth = startSizeRef.current.width - deltaX;
                    newX = startElementPositionRef.current.x + deltaX;
                    break;

                case 'vertical-bottom':
                    newHeight = startSizeRef.current.height + deltaY;
                    break;

                case 'vertical-top':
                    newHeight = startSizeRef.current.height - deltaY;
                    newY = startElementPositionRef.current.y + deltaY;
                    break;
            }

            // Ограничиваем минимальные размеры и корректируем позицию
            if (newWidth < 20) {
                const diff = 20 - newWidth;
                newWidth = 20;
                if (resizeType.includes('left')) {
                    newX = startElementPositionRef.current.x + deltaX - diff;
                }
            }

            if (newHeight < 20) {
                const diff = 20 - newHeight;
                newHeight = 20;
                if (resizeType.includes('top')) {
                    newY = startElementPositionRef.current.y + deltaY - diff;
                }
            }

            // Обновляем размер
            setSizeObject({
                width: newWidth,
                height: newHeight
            });

            // Обновляем позицию только если она действительно изменилась
            if (newX !== selectedElement.position.x || newY !== selectedElement.position.y) {
                updatePositionElement({ x: newX, y: newY });
            }
        }
    };

    const handleMouseUp = () => {
        if (resizeType && ref.current) {
            updateSizeElement(sizeObject);
        }
        setResizeType(null);
    };

    const handleResizeMouseDown = (type: UpdateSizeType) => (event: React.MouseEvent) => {
        event.stopPropagation();
        setResizeType(type);

        const selectedElement = state.slides
            .find(slide => slide.id === state.selection.selectedSlideId)
            ?.elements.find(element => element.id === state.selection.elementsId[0]);

        if (selectedElement) {
            // Сохраняем начальную позицию мыши
            startPositionRef.current = {
                x: event.clientX,
                y: event.clientY
            };

            // Сохраняем начальную позицию элемента
            startElementPositionRef.current = {
                x: selectedElement.position.x,
                y: selectedElement.position.y
            };

            // Сохраняем начальные размеры
            startSizeRef.current = {
                width: sizeObject.width,
                height: sizeObject.height
            };
        }
    };

    useEffect(() => {
        if (resizeType) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizeType, sizeObject, state.selection.selectedSlideId]);

    return {
        sizeObject,
        resizeType,
        handleResizeMouseDown,
        ref
    };
};

export {
    useResize,
}