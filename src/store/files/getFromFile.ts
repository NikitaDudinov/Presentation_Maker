const getFromFile = (
    payload: { file: File }
): Promise<object> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const result = e.target?.result;
            const jsonData = JSON.parse(result as string); // Прямое парсирование
            resolve(jsonData);
        };

        reader.onerror = () => {
            reject('Ошибка при чтении файла');
        };

        reader.readAsText(payload.file); // Читаем файл как текст
    });
};

export {
    getFromFile,
};