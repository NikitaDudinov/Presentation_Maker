import { Slide } from "../slide/Slide";
import { useAppSelector } from "../../store/hooks/useAppSelector";

type WorkspaceProps = {
    WorkSpaceSlideScale: number;
};

const Workspace = ({ WorkSpaceSlideScale }: WorkspaceProps) => {
    const selectedSlideId = useAppSelector(state => state.selection.selectedSlideId);
    const slides = useAppSelector(state => state.slides);
    const slide = slides.find(slide => slide.id === selectedSlideId) ?? slides[0];
    const selectElements = useAppSelector(state => state.selection.elementsId);
    console.log(slide.background);
    return (
        <Slide 
            key={slide.id}
            isWorkSpace={true}
            slide={slide} 
            selectElements={selectElements}
            scale={WorkSpaceSlideScale}
        />
    );
};

export { 
    Workspace,
};
