
const getFromLocalStorage = () => {
    const jsonString = localStorage.getItem('presentation');

    if (jsonString) {
        try {
            return JSON.parse(jsonString);
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