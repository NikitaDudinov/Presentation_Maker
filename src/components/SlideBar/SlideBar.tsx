import { useContext} from 'react'
import styles from './SlideBar.module.css'
import { PresentationContext } from '../../contexts/PresentationContext'

const SlideBar = () => {
    const valueContext = useContext(PresentationContext);
    const slides = valueContext.presentation.slides;
    return (
        <div className={styles.slideBar}>
            {slides.map(slide => {
                return <div className={styles.minSlide} style={{backgroundColor: slide.background}} key={slide.id} onClick={() => valueContext.changeCurrentSlide(slide.id)}>
                    {
                        slide.elements.map((item) => {
                            if (item.type === 'text') {
                                return (
                                    <p 
                                        key={item.id} 
                                        style={{ 
                                            position: 'absolute', 
                                            top: item.position.y / 4.36, 
                                            left: item.position.x / 4.35, 
                                            fontSize: item.font.size / 2, 
                                            fontFamily: item.font.family, 
                                            width: item.size.width, 
                                            height: item.size.height 
                                        }}
                                    >
                                        {item.content}
                                    </p>
                                );
                            } else if (item.type === 'image') {
                                return (
                                    <img 
                                        key={item.id} 
                                        src={'/public/images/' + item.src} 
                                        style={{ 
                                            position: 'absolute', 
                                            top: item.position.y / 4.36, 
                                            left: item.position.x / 4.35, 
                                            width: item.size.width / 4.36, 
                                            height: item.size.height / 4.35
                                        }} 
                                    />
                                );
                            }
                            return null;
                        })
                    }
                </div>
            })}
        </div>
    )
}

export {
    SlideBar,
}