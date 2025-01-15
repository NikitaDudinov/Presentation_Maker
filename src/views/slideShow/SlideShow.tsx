import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks/useAppSelector"
import styles from './SlideShow.module.css'
import { Slide } from "../slide/Slide";
import { useNavigate } from "react-router";


const SlideShow = () => {
    const presentation = useAppSelector(presentation => presentation);
    const [indexSlide, setIndexSlide] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                setIndexSlide(prevIndex => (prevIndex + 1) % presentation.slides.length);
            } else if (event.key === 'ArrowLeft') {
                setIndexSlide(prevIndex => (prevIndex - 1 + presentation.slides.length) % presentation.slides.length);
            } else if (event.key === 'Escape') {
                navigate('/');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className={styles.container}>
            <Slide slide={presentation.slides[indexSlide]} scale={1.8}/>
        </div>
    )
}

export {
    SlideShow
}