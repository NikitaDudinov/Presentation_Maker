import { PresentationType } from "../types";

const saveToJsonFile = (presentation: PresentationType) => {
    const jsonString = JSON.stringify(presentation);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${presentation.title}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export {
    saveToJsonFile,
}