import { Button } from '../../components/button/Button'
import styles from './Toolbar.module.css'
import imageStarUrl from '../../assets/star.svg'
import imageThemesUrl from '../../assets/thems.svg'
import { EditBgComponent } from './editBgComponent/EditBgComponent'
import imageAddSlide from '../../assets/add-slide.svg'
import imnageTrash from '../../assets/trash.svg'
import { EditTextComponent } from './editTextComponent/EditTextComponent'
import {EditImageComponent} from './editImageComponent/EditImageComponent'
import { useAppSelector } from '../../store/hooks/useAppSelector'
import { useAppActions } from '../../store/hooks/useAppActions'
import axios from "axios";
import { useRef, useState, useEffect } from 'react'

type UnsplashResult = {
    small: string;
    full: string;
    raw: string;
    regular: string;
    thumb: string;
    small_s3: string;
}

const Toolbar = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [arrayUrls, setArrayUrls] = useState<string[]>([])
    const {addSlide, deleteElement, deleteSelectionElement, addImageElement} = useAppActions();
    const presentation = useAppSelector((state) => state);
    const selectedSlideId = presentation.selection.selectedSlideId;
    const selectedElementId = presentation.selection.elementsId[0]
    const selectedElement = presentation.slides.find(slide => slide.id === selectedSlideId)?.elements.find(element => element.id === selectedElementId)
    const selectedSlideBg = presentation.slides.find(slide => slide.id === selectedSlideId)?.background
    const [isOpenImageService, setIsOpenImageService] = useState(false);
    const [photos, setPhotos] = useState<UnsplashResult[]>([]);
    const [query, setQuery] = useState<string>('');
    const handleClickOutside = (event: MouseEvent) => {
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
            setIsOpenImageService(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getPhotos = async () => {
        const UNSPLASH_API_KEY = 'rGNChDIGHO-O0xXnk43O9N9zsts0sm5t5GZntOmt-Xw';
        try {
            const response = await axios.get("https://api.unsplash.com/photos", {
                params: {
                    client_id: UNSPLASH_API_KEY,
                    per_page: 20,
                }
            })
            const imageUrls = response.data.map((photo: any) => {
                if ('urls' in photo){
                    return photo.urls
                }
            })
            setPhotos(imageUrls)
        } catch (error) {
            console.error("Ошибка при поиске изображений:", error);
        } 
    }

    const handleSearch = async () => {
        if (!query) return;
        const UNSPLASH_API_KEY = 'rGNChDIGHO-O0xXnk43O9N9zsts0sm5t5GZntOmt-Xw';
        try {
            const response = await axios.get("https://api.unsplash.com/search/photos", {
                params: {
                    query: query,
                    client_id: UNSPLASH_API_KEY,
                    per_page: 50,
                }
            })
            const imageUrls = response.data.results.map((photo: any) => {
                if ('urls' in photo){
                    return photo.urls
                }
            })
            setPhotos(imageUrls)
        } catch (error) {
            console.error("Ошибка при поиске изображений:", error);
        } 
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const selectImage = (value: string) => {
        setArrayUrls(prevArr => {
            if (prevArr.includes(value)) {
                return prevArr.filter(url => url !== value);
            } else {
                return [...prevArr, value];
            }
        });
    };

    return (
        <div className={styles.toolbarContainer}>
            <EditTextComponent element={selectedElement} selectedSlideId={selectedSlideId}/>
            <EditImageComponent selectedSlideId={selectedSlideId}/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imageStarUrl} iconSize={'large'}/>
            <Button type={'icon'} onClick={() => {getPhotos(), setIsOpenImageService(!isOpenImageService), setQuery('')}} iconUrl={imageThemesUrl} iconSize={'large'}/>
            <EditBgComponent background={selectedSlideBg} selectedSlideId={selectedSlideId}/>
            <Button type={'icon'} onClick={addSlide} iconUrl={imageAddSlide} iconSize={'large'}/>
            {
                selectedElement && (    
                    <Button 
                        type={'icon'} 
                        onClick={() => {
                            deleteElement();
                            deleteSelectionElement();
                        }} 
                        iconUrl={imnageTrash} iconSize={'large'}
                    />
                )
            }
            {isOpenImageService && 
                <div className={styles.containerPopup}>
                    <div ref={divRef} className={styles.cardImageService}>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter an image"
                            className={styles.searchImage}
                            onKeyDown={handleKeyDown}
                        />
                        { photos 
                        ? 
                          <div className={styles.imageList}>
                            {
                                photos.map(photo => (
                                    <img
                                        style={arrayUrls.includes(photo.full) ? {border: '1px solid blue'} : {}}
                                        className={styles.smallImage} 
                                        key={photo.small} 
                                        src={photo.small_s3} 
                                        alt="image" 
                                        onClick={() => {selectImage(photo.full)}}
                                    />
                                ))
                            }
                          </div>
                        : <div>Her</div>
                        }
                        <Button 
                            type='text' 
                            onClick={() => {
                                arrayUrls.map(photo => {
                                    addImageElement(photo)
                                })
                                setArrayUrls([]);
                                setIsOpenImageService(false);
                            }} 
                            label='Выбрать'
                        >
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}

export {
    Toolbar,
}