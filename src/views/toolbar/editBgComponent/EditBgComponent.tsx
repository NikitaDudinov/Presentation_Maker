import imagePenUrl from '../../../assets/Brush.svg'
import { Popover } from '../../../components/popover/Popover'
import { Button } from '../../../components/button/Button'
import { useEffect, useRef, useState } from 'react'
import { Toggle } from '../../../components/toggle/Toggle'
import styles from './EditBgComponent.module.css'
import { useAppActions } from '../../../store/hooks/useAppActions'
import { Popup } from '../../../components/popup/Popup'
import { ImageDownloader } from '../../imageDownloader/ImageDownloader'

type BackgroundType = 'color' | 'gradient' | 'image';

type EditBgComponentProps = {
    selectedSlideId: string | null
}

interface GradientColor {
    color: string;
    position: number;
}

const EditBgComponent: React.FC<EditBgComponentProps> = ({selectedSlideId}) => {
    const { updateBackgroundSlide } = useAppActions();
    const [allSlides, setAllSlides] = useState(false);
    const [activeType, setActiveType] = useState<BackgroundType>('color');
    const [isImageServiceOpen, setIsImageServiceOpen] = useState(false);
    const imageServiceRef = useRef<HTMLDivElement>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [gradientColors, setGradientColors] = useState<GradientColor[]>([
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 }
    ]);
    const [gradientAngle, setGradientAngle] = useState(90);
    const [solidColor, setSolidColor] = useState('#000000');

    const handleColorChange = (index: number, newColor: string) => {
        const newColors = [...gradientColors];
        newColors[index] = { ...newColors[index], color: newColor };
        setGradientColors(newColors);
        if (selectedSlideId) {
            const gradientString = `linear-gradient(${gradientAngle}deg, ${newColors
                .map(gc => `${gc.color} ${gc.position}%`)
                .join(', ')})`;
            updateBackgroundSlide(gradientString, allSlides);
        }
    };

    const handlePositionChange = (index: number, newPosition: number) => {
        const newColors = [...gradientColors];
        newColors[index] = { ...newColors[index], position: newPosition };
        setGradientColors(newColors);
        if (selectedSlideId) {
            const gradientString = `linear-gradient(${gradientAngle}deg, ${newColors
                .map(gc => `${gc.color} ${gc.position}%`)
                .join(', ')})`;
            updateBackgroundSlide(gradientString, allSlides);
        }
    };

    const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAngle = Number(e.target.value);
        setGradientAngle(newAngle);
        if (selectedSlideId) {
            const gradientString = `linear-gradient(${newAngle}deg, ${gradientColors
                .map(gc => `${gc.color} ${gc.position}%`)
                .join(', ')})`;
            updateBackgroundSlide(gradientString, allSlides);
        }
    };

    const handleSolidColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSolidColor(e.target.value);
        updateBackground();
    };

    const updateBackground = () => {
        if (!selectedSlideId) return;
        updateBackgroundSlide(solidColor, allSlides);
    };

    const addGradientColor = () => {
        if (gradientColors.length < 5) {
            const newColors = [...gradientColors, { 
                color: '#ffffff', 
                position: Math.min(100, gradientColors[gradientColors.length - 1].position + 25) 
            }];
            setGradientColors(newColors);
            if (selectedSlideId) {
                const gradientString = `linear-gradient(${gradientAngle}deg, ${newColors
                    .map(gc => `${gc.color} ${gc.position}%`)
                    .join(', ')})`;
                updateBackgroundSlide(gradientString, allSlides);
            }
        }
    };

    const removeGradientColor = (index: number) => {
        if (gradientColors.length > 2) {
            const newColors = gradientColors.filter((_, i) => i !== index);
            setGradientColors(newColors);
            if (selectedSlideId) {
                const gradientString = `linear-gradient(${gradientAngle}deg, ${newColors
                    .map(gc => `${gc.color} ${gc.position}%`)
                    .join(', ')})`;
                updateBackgroundSlide(gradientString, allSlides);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (imageServiceRef.current && !imageServiceRef.current.contains(event.target as Node)) {
                setIsImageServiceOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(event.target.value);
    };

    const handleAddImageByUrl = () => {
        if (imageUrl && selectedSlideId) {
            updateBackgroundSlide(imageUrl, allSlides);
            setImageUrl('');
        }
    };

    return (
        <>
            <Popover
                content={
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className={styles.label}>Все слайды</span>
                            <Toggle
                                initialChecked={allSlides}
                                onToggle={() => setAllSlides(!allSlides)}
                            />
                        </div>
                        <div className={styles.typeSwitch}>
                            <button
                                className={activeType === 'color' ? styles.active : ''}
                                onClick={() => setActiveType('color')}
                            >
                                Цвет
                            </button>
                            <button
                                className={activeType === 'gradient' ? styles.active : ''}
                                onClick={() => setActiveType('gradient')}
                            >
                                Градиент
                            </button>
                            <button
                                className={activeType === 'image' ? styles.active : ''}
                                onClick={() => setActiveType('image')}
                            >
                                Картинка
                            </button>
                        </div>

                        {activeType === 'color' && (
                            <div className={styles.colorControls}>
                                <div className={styles.solidColorControl}>
                                    <input
                                        type="color"
                                        value={solidColor}
                                        onChange={handleSolidColorChange}
                                    />
                                </div>
                            </div>
                        )}

                        {activeType === 'gradient' && (
                            <div className={styles.gradientControls}>
                                <div className={styles.gradientPreview} style={{
                                    background: `linear-gradient(${gradientAngle}deg, ${gradientColors
                                        .map(gc => `${gc.color} ${gc.position}%`)
                                        .join(', ')})`
                                }} />
                                
                                <div className={styles.angleControl}>
                                    <label>Угол:</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={gradientAngle}
                                        onChange={handleAngleChange}
                                    />
                                    <span>{gradientAngle}°</span>
                                </div>

                                <div className={styles.colorStops}>
                                    {gradientColors.map((gc, index) => (
                                        <div key={index} className={styles.colorStop}>
                                            <input
                                                type="color"
                                                value={gc.color}
                                                onChange={(e) => handleColorChange(index, e.target.value)}
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={gc.position}
                                                onChange={(e) => handlePositionChange(index, Number(e.target.value))}
                                            />
                                            {gradientColors.length > 2 && (
                                                <button 
                                                    className={styles.removeColor}
                                                    onClick={() => removeGradientColor(index)}
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {gradientColors.length < 5 && (
                                        <button 
                                            className={styles.addColor}
                                            onClick={addGradientColor}
                                        >
                                            + Добавить цвет
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeType === 'image' && (
                            <div className={styles.imageControls}>
                                <div className={styles.imageSection}>
                                    <span className={styles.subLabel}>Сервис картинок</span>
                                    <Button 
                                        type='text'
                                        onClick={() => setIsImageServiceOpen(true)}
                                        label="Открыть сервис картинок"
                                    />
                                </div>

                                <div className={styles.divider} />

                                <div className={styles.imageSection}>
                                    <span className={styles.subLabel}>Вставить ссылку</span>
                                    <div className={styles.urlInput}>
                                        <input
                                            value={imageUrl}
                                            onChange={handleImageUrlChange}
                                            className={styles.input}
                                            placeholder="Введите URL изображения"
                                        />
                                        <Button 
                                            type='text'
                                            onClick={handleAddImageByUrl}
                                            label="Добавить"
                                            disabled={!imageUrl}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
            >
                <Button 
                    type="icon" 
                    onClick={() => {}} 
                    iconUrl={imagePenUrl} 
                    iconSize="medium"
                    aria-label="Редактировать фон"
                />
            </Popover>
            {isImageServiceOpen && (
                <Popup
                    ref={imageServiceRef}
                    height="80%"
                    width="60%"
                    content={<ImageDownloader type={'changeBackground'} all={allSlides}/>}
                />
            )}
        </>
    );
};

export {
    EditBgComponent,
};