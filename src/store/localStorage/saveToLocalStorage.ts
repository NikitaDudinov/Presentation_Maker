import { PresentationType } from "../types";

const saveToLocalStorage = (presentation: PresentationType) => {
    localStorage.setItem('presentation', JSON.stringify(presentation));
}

export {
    saveToLocalStorage,
}