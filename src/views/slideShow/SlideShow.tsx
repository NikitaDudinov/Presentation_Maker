import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks/useAppSelector"
import styles from './SlideShow.module.css'
import { Slide } from "../slide/Slide";
import { NavLink } from "react-router";
import { Button } from "../../components/button/Button";
import imageBackUrl from '../../assets/back.png'
import imageAheadUrl from '../../assets/ahead.png'

const SlideShow = () => {
    const presentation = useAppSelector(presentation => presentation);
    const [indexSlide, setIndexSlide] = useState(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                setIndexSlide(prevIndex => (prevIndex + 1) % presentation.slides.length);
            } else if (event.key === 'ArrowLeft') {
                setIndexSlide(prevIndex => (prevIndex - 1 + presentation.slides.length) % presentation.slides.length);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.containerLink}>
                <NavLink className={styles.linkToPresentation} to="/">Вернуться к редактированию презентации</NavLink>
            </div>
            <Slide slide={presentation.slides[indexSlide]} scale={1.7}/>
            <div className={styles.containerButtons}>
                <div className={styles.buttons}>
                    <Button 
                        type="icon" 
                        onClick={() => {
                            setIndexSlide(prevIndex => (prevIndex - 1 + presentation.slides.length) % presentation.slides.length)
                        }}
                        iconUrl={imageBackUrl}    
                        iconSize="medium"
                    />
                    <Button 
                        type="icon" 
                        onClick={() => {
                            setIndexSlide(prevIndex => (prevIndex + 1) % presentation.slides.length)
                        }}
                        iconUrl={imageAheadUrl}    
                        iconSize="medium"
                    />
                </div>
            </div>
        </div>
    )
}

export {
    SlideShow
}