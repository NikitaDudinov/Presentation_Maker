import { useEffect, useState } from "react";
import axios from "axios";
import { Preloader } from "../../components/preloader/Preloader";
import { Button } from "../../components/button/Button";
import styles from './ImageDownloader.module.css';
import { useAppActions } from "../../store/hooks/useAppActions";

type UnsplashResult = {
    small: string;
    full: string;
    raw: string;
    regular: string;
    thumb: string;
    small_s3: string;
}

const ImageDownloader = () => {
    const [photos, setPhotos] = useState<UnsplashResult[]>([]);
    const [arrayUrls, setArrayUrls] = useState<string[]>([]);
    const [query, setQuery] = useState<string>('');
    const {addImageElement} = useAppActions();
    
    const getPhotos = async () => {
        const UNSPLASH_API_KEY = 'rGNChDIGHO-O0xXnk43O9N9zsts0sm5t5GZntOmt-Xw';
        try {
            const response = await axios.get("https://api.unsplash.com/photos", {
                params: {
                    client_id: UNSPLASH_API_KEY,
                    per_page: 20,
                }
            });
            const imageUrls = response.data.map((photo: any) => photo.urls).filter(Boolean);
            setPhotos(imageUrls);
        } catch (error) {
            console.error("Ошибка при загрузке изображений:", error);
        } 
    };

    useEffect(() => {
        setQuery('');
        getPhotos();
    }, []);

    const handleSearch = async () => {
        if (!query) return;
        const UNSPLASH_API_KEY = 'rGNChDIGHO-O0xXnk43O9N9zsts0sm5t5GZntOmt-Xw';
        try {
            const response = await axios.get("https://api.unsplash.com/search/photos", {
                params: {
                    query: query,
                    client_id: UNSPLASH_API_KEY,
                    per_page: 25,
                }
            });
            const imageUrls = response.data.results.map((photo: any) => photo.urls).filter(Boolean);
            setPhotos(imageUrls);
        } catch (error) {
            console.error("Ошибка при поиске изображений:", error);
        } 
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const selectImage = (value: string) => {
        setArrayUrls(prevArr => (
            prevArr.includes(value) ? prevArr.filter(url => url !== value) : [...prevArr, value]
        ));
    };

    return (
        <div style={{maxHeight: '100%'}}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter an image"
                className={styles.searchImage}
                onKeyDown={handleKeyDown}
            />
            <div className={styles.imageList}>
                {photos.length > 0 ? (
                    <div className={styles.imageList}>
                        {photos.map(photo => (
                            <img
                                style={arrayUrls.includes(photo.full) ? { border: '1px solid blue' } : {}}
                                className={styles.smallImage} 
                                key={photo.small} 
                                src={photo.small_s3} 
                                alt="image" 
                                onClick={() => selectImage(photo.full)}
                            />
                        ))}
                    </div>
                ) : (
                    <Preloader />
                )}
            </div>   
            <Button 
                type='text' 
                onClick={() => {
                    arrayUrls.forEach(photo => {
                        addImageElement(photo)
                    });
                    setArrayUrls([]);
                }} 
                label='Выбрать'
            /> 
        </div>
    );
};

export {
    ImageDownloader,
};
