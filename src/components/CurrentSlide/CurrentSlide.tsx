import { useContext} from "react"
import { PresentationContext } from "../../contexts/PresentationContext"
import styles from './CurrentSlide.module.css'
const CurrentSlide = () => {

    const valueContext = useContext(PresentationContext);
    const slide = valueContext.presentation.slides.find(slide => slide.id === valueContext.currentSlideId)
    if (slide) {
        const elements = slide.elements;

        return (
            <div 
                className={styles.slide} 
                style={{ backgroundColor: slide.background }} 
            >
                {
                    elements.map((item) => {
                        if (item.type === 'text') {
                            return (
                                <p 
                                    key={item.id} 
                                    style={{ 
                                        position: 'absolute', 
                                        top: item.position.y, 
                                        left: item.position.x, 
                                        fontSize: item.font.size, 
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
                                    src={'/images/' + item.src} 
                                    style={{ 
                                        position: 'absolute', 
                                        top: item.position.y, 
                                        left: item.position.x, 
                                        width: item.size.width, 
                                        height: item.size.height 
                                    }} 
                                />
                            );
                        }
                        return null;
                    })
                }
            </div>
        );
    }else {
        return null;
    }
    
};

export {
    CurrentSlide,
}