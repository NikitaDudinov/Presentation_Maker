import { validatePresentation } from "../validate/validatePresentation";

const getFromLocalStorage = () => {
    const jsonString = localStorage.getItem('presentation');

    if (jsonString) {
        try {
            let presentation = JSON.parse(jsonString);
            if(validatePresentation(presentation)){
                return presentation;
            } else{
                alert('Презентация, сохранненая в хранилище не валидна')
            }
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
};

export {
    getFromLocalStorage,
}