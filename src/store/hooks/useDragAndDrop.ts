import { useEffect, useState } from 'react';
import { PositionType, SizeType } from '../types';
import { useAppActions } from './useAppActions';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../constants';

const useDragAndDrop = (
    initialPosition: PositionType, 
    sizeObject: SizeType,
    isSelected: boolean,
    setSelection: () => void,
    scale: number,
) => {
    const { updatePositionElement } = useAppActions();
    const [localPosition, setLocalPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const deltaX = (e.clientX - dragStart.x) / scale;
            const deltaY = (e.clientY - dragStart.y) / scale;

            const newX = Math.min(Math.max(localPosition.x + deltaX, 0), (SLIDE_WIDTH - sizeObject.width));
            const newY = Math.min(Math.max(localPosition.y + deltaY, 0), (SLIDE_HEIGHT - sizeObject.height));

            setLocalPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        if (isDragging) {
            updatePositionElement(localPosition);
            setIsDragging(false);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        if (!isSelected) {
            setSelection();
        }
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);


    useEffect(() => {
        if (!isDragging) {
            updatePositionElement(localPosition);
        }
    }, [localPosition, isDragging]);

    return { localPosition, handleMouseDown, setLocalPosition };
};

export { useDragAndDrop };
