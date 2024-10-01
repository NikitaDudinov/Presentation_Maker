import { useContext } from "react"
import { PresentationContext } from "../../contexts/PresentationContext"
import { addSlides } from "../../models/presentationModel";
import { TSlide } from "../../types/types";
const minSlide: TSlide = {
    id: String(Date.now()),
    background: '#FFFFFF',
    elements: []
}

const SlideCreator = () => {
    const valueContext = useContext(PresentationContext);
    const changePtresentation = valueContext.changePtresentation;
    const presentation = valueContext.presentation
    return (
        <button onClick={() => {changePtresentation(addSlides(minSlide, presentation))}}>Создать слайд</button>
    ) 
}

export {
    SlideCreator
}