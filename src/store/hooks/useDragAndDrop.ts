import { useEffect, useState } from 'react';
import { PositionType, PresentationType, SizeType } from '../types';
import { useAppActions } from './useAppActions';

const SLIDE_WIDTH = 935;
const SLIDE_HEIGHT = 525;

const useDragAndDrop = (
    initialPosition: PositionType, 
    sizeObject: SizeType,
    isSelected: boolean,
    setSelection: () => void,
    state: PresentationType,
) => {
    const {updatePositionElement} = useAppActions()
    const [localPosition, setLocalPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({x: 0, y: 0});

    const handleMouseMove = (e: MouseEvent) => {
        if(isDragging){
            const boundary = {
                minX: 0,
                maxX: SLIDE_WIDTH - sizeObject.width,
                minY: 0,
                maxY: SLIDE_HEIGHT - sizeObject.height,
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
                maxX: SLIDE_WIDTH - sizeObject.width,
                minY: 0,
                maxY: SLIDE_HEIGHT - sizeObject.height,
            };
            const newX = Math.min(Math.max(localPosition.x + e.clientX - dragStart.x, boundary.minX), boundary.maxX);
            const newY = Math.min(Math.max(localPosition.y + e.clientY - dragStart.y, boundary.minY), boundary.maxY);
            console.log(state.selection.selectedSlideId, state.selection.elementsId[0], {x: newX, y: newY})
            if(state.selection.selectedSlideId)
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