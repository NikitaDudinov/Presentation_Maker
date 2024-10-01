import React from "react";
import { TPresentation } from "../types/types";

type PresentationContext  = {
    presentation: TPresentation,
    currentSlideId: string | null;
    changePtresentation: (newPresentation: TPresentation) => void,
    changeCurrentSlide: (slideId: string) => void
}

const basePresentation:PresentationContext = {
    presentation: {
        title: '',
        select: {elementsId: []},
        slides: []
    },
    currentSlideId: '',
    changePtresentation: () => {},
    changeCurrentSlide: () => {},
}

export const PresentationContext = React.createContext(basePresentation);