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
    const {updatePositionElement} = useAppActions()
    const [localPosition, setLocalPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({x: 0, y: 0});

    const handleMouseMove = (e: MouseEvent) => {
        if(isDragging){
            const boundary = {
                minX: 0,
                maxX: (SLIDE_WIDTH - sizeObject.width) * scale,
                minY: 0,
                maxY: (SLIDE_HEIGHT - sizeObject.height) * scale,
            };
            const newX = Math.min(Math.max(localPosition.x + e.clientX - dragStart.x, boundary.minX), boundary.maxX);
            const newY = Math.min(Math.max(localPosition.y + e.clientY - dragStart.y, boundary.minY), boundary.maxY);
            setLocalPosition({x: newX, y: newY})
        }
    }

    const handleMouseUp = (e: MouseEvent) => {
        if(isDragging){
            const boundary = {
                minX: 0,
                maxX: (SLIDE_WIDTH - sizeObject.width) * scale,
                minY: 0,
                maxY: (SLIDE_HEIGHT - sizeObject.height) * scale,
            };
            const newX = Math.min(Math.max((localPosition.x + e.clientX - dragStart.x) * scale, boundary.minX), boundary.maxX);
            const newY = Math.min(Math.max((localPosition.y + e.clientY - dragStart.y) * scale, boundary.minY), boundary.maxY);
            updatePositionElement({x: newX, y: newY})
            setIsDragging(false);
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        if (!isSelected) {
            setSelection()
        }
        setDragStart({x: e.clientX, y: e.clientY})
    }

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

    return { localPosition, handleMouseDown, setLocalPosition };
};

export {
    useDragAndDrop,
}