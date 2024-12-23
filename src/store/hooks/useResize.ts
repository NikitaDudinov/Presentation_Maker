import { useEffect, useRef, useState } from 'react';
import { PresentationType, UpdateSizeType } from '../types';
import { useAppActions } from './useAppActions';

const useResize = (initialSize: { width: number; height: number }, scale: number, state: PresentationType) => {
    const {updateSizeElement} = useAppActions();
    const [sizeObject, setSizeObject] = useState(initialSize);
    const [resizeType, setResizeType] = useState<UpdateSizeType | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (event: MouseEvent) => {
        if (resizeType && ref.current) {
            const target = ref.current.getBoundingClientRect();
            let newWidth = sizeObject.width;
            let newHeight = sizeObject.height;

            switch (resizeType) {
                case 'diagonal-right-bottom':
                    newWidth = event.clientX - target.left;
                    newHeight = event.clientY - target.top;
                    break;
                case 'diagonal-right-top':
                    newWidth = event.clientX - target.left;
                    newHeight = target.top - event.clientY + sizeObject.height;
                    break;
                case 'diagonal-left-top':
                    newWidth = target.left - event.clientX + sizeObject.width;
                    newHeight = target.top - event.clientY + sizeObject.height;
                    break;    
                case 'diagonal-left-bottom':
                    newWidth = target.left - event.clientX + sizeObject.width;
                    newHeight = event.clientY - target.top;
                    break;      
                case 'horizontal-right':
                    newWidth = event.clientX - target.left;
                    break;
                case 'horizontal-left':
                    newWidth = target.left - event.clientX + sizeObject.width;
                    break;
                case 'vertical-bottom':
                    newHeight = event.clientY - target.top;
                    break;
                case 'vertical-top':
                    newHeight = target.top - event.clientY + sizeObject.height;
                    break;
            }

            setSizeObject({
                width: Math.max(newWidth / scale, 20),
                height: Math.max(newHeight / scale, 20)
            });
        }
    };

    const handleMouseUp = () => {
        if (ref.current) {
            const target = ref.current.getBoundingClientRect();
            if (state.selection.selectedSlideId)
            updateSizeElement(
                {
                width: Math.max((target.right - target.left) / scale, 20),
                height: Math.max((target.bottom - target.top) / scale, 20)
            })
        }
        setResizeType(null);
    };

    const handleResizeMouseDown = (type: UpdateSizeType) => (event: React.MouseEvent) => {
        event.stopPropagation();
        setResizeType(type);
    };

    useEffect(() => {
        if (resizeType) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizeType]);

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