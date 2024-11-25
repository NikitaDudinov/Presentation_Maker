import { PresentationType } from "../types";
import { validatePresentation } from "../validate/validatePresentation";

const getFromFile = (file: File): Promise<PresentationType | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const jsonString = event.target?.result as string;
                const presentation = JSON.parse(jsonString);
                if(validatePresentation(presentation)){
                    resolve(presentation);
                }else{
                    alert('Презентация, сохранённая в файле не валидна');
                    resolve(null)
                }
                
            } catch (error) {
                reject(new Error('Ошибка при чтении файла: '));
            }
        };

        reader.onerror = () => {
            reject(new Error('Ошибка при чтении файла'));
        };

        reader.readAsText(file);
    });
};

export {
    getFromFile,
}