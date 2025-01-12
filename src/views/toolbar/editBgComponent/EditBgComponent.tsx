import imagePenUrl from '../../../assets/pen.svg'
import { Popover } from '../../../components/popover/Popover'
import { Button } from '../../../components/button/Button'
import { useEffect, useRef, useState } from 'react'
import { Toggle } from '../../../components/toggle/Toggle'
import styles from './EditBgComponent.module.css'
import { useAppActions } from '../../../store/hooks/useAppActions'

type GradientColor = {
    color: string;
    position: number;
}

type EditBgComponentProps = {
    background?: string
    selectedSlideId: string | null
}

const EditBgComponent: React.FC<EditBgComponentProps> = ({ background, selectedSlideId }) => {
    const { updateBackgroundSlide } = useAppActions();
    const [allSlides, setAllSlides] = useState(false);
    const [isGradient, setIsGradient] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [gradientColors, setGradientColors] = useState<GradientColor[]>([
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 }
    ]);
    const [gradientAngle, setGradientAngle] = useState(90);
    const [solidColor, setSolidColor] = useState('#000000');

    useEffect(() => {
        if (background) {
            if (background.includes('gradient')) {
                setIsGradient(true);
                // Улучшенный парсинг градиента
                const matches = background.match(/rgba?\(.*?\)|#[a-f\d]{3,6}/gi);
                const positions = background.match(/\s\d+%/g);
                if (matches) {
                    const newGradientColors = matches.map((color, index) => ({
                        color,
                        position: positions && positions[index] 
                            ? parseInt(positions[index]) 
                            : index === 0 ? 0 : 100
                    }));
                    setGradientColors(newGradientColors);
                    
                    const angleMatch = background.match(/\d+deg/);
                    if (angleMatch) {
                        setGradientAngle(parseInt(angleMatch[0]));
                    }
                }
            } else {
                setIsGradient(false);
                setSolidColor(background);
            }
        }
    }, [background]);

    const handleToggleChange = (checked: boolean) => {
        setAllSlides(checked);
    };

    const handleGradientToggle = () => {
        const newIsGradient = !isGradient;
        setIsGradient(newIsGradient);
        // Немедленно обновляем фон после переключения
        if (selectedSlideId) {
            if (newIsGradient) {
                const gradientString = `linear-gradient(${gradientAngle}deg, ${gradientColors
                    .map(gc => `${gc.color} ${gc.position}%`)
                    .join(', ')})`;
                updateBackgroundSlide(gradientString, allSlides);
            } else {
                updateBackgroundSlide(solidColor, allSlides);
            }
        }
    };

    const handleColorChange = (index: number, newColor: string) => {
        const newColors = [...gradientColors];
        newColors[index] = { ...newColors[index], color: newColor };
        setGradientColors(newColors);
        // Немедленно обновляем фон после изменения цвета
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
        // Немедленно обновляем фон после изменения позиции
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
        // Немедленно обновляем фон после изменения угла
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

        if (isGradient) {
            const gradientString = `linear-gradient(${gradientAngle}deg, ${gradientColors
                .map(gc => `${gc.color} ${gc.position}%`)
                .join(', ')})`;
            updateBackgroundSlide(gradientString, allSlides);
        } else {
            updateBackgroundSlide(solidColor, allSlides);
        }
    };

    const addGradientColor = () => {
        if (gradientColors.length < 5) {
            const newColors = [...gradientColors, { 
                color: '#ffffff', 
                position: Math.min(100, gradientColors[gradientColors.length - 1].position + 25) 
            }];
            setGradientColors(newColors);
            // Немедленно обновляем фон после добавления цвета
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
            // Немедленно обновляем фон после удаления цвета
            if (selectedSlideId) {
                const gradientString = `linear-gradient(${gradientAngle}deg, ${newColors
                    .map(gc => `${gc.color} ${gc.position}%`)
                    .join(', ')})`;
                updateBackgroundSlide(gradientString, allSlides);
            }
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !selectedSlideId) return;

        try {
            // Проверяем, что это изображение
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, выберите файл изображения');
                return;
            }

            // Создаем URL для изображения
            const imageUrl = URL.createObjectURL(file);

            // Создаем изображение для проверки размеров
            const img = new Image();
            img.src = imageUrl;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            // Создаем стиль фона с изображением
            const backgroundStyle = `url(${imageUrl}) center center / cover no-repeat`;
            
            // Обновляем фон слайда
            updateBackgroundSlide(backgroundStyle, allSlides);

        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            alert('Произошла ошибка при загрузке изображения');
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files[0];
        if (!file || !selectedSlideId) return;

        try {
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, перетащите файл изображения');
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            const backgroundStyle = `url(${imageUrl}) center center / cover no-repeat`;
            updateBackgroundSlide(backgroundStyle, allSlides);

        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            alert('Произошла ошибка при загрузке изображения');
        }
    };

    const triggerImageUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <Popover
            content={
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span className={styles.label}>Фон</span>
                        <Toggle
                            initialChecked={allSlides}
                            onToggle={() => setAllSlides(!allSlides)}
                        />
                    </div>
                    <div className={styles.typeSwitch}>
                        <button
                            className={!isGradient ? styles.active : ''}
                            onClick={() => setIsGradient(false)}
                        >
                            Цвет
                        </button>
                        <button
                            className={isGradient ? styles.active : ''}
                            onClick={() => setIsGradient(true)}
                        >
                            Градиент
                        </button>
                    </div>
                    {isGradient ? (
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
                    ) : (
                        <div className={styles.colorControls}>
                            <div className={styles.solidColorControl}>
                                <input
                                    type="color"
                                    value={solidColor}
                                    onChange={handleSolidColorChange}
                                />
                            </div>
                            <div 
                                className={styles.imageUploadArea}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <button 
                                    className={styles.uploadButton}
                                    onClick={triggerImageUpload}
                                >
                                    <img src={imagePenUrl} alt="Upload" />
                                    <span>Загрузить изображение</span>
                                </button>
                                <div className={styles.dragText}>
                                    или перетащите изображение сюда
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            }
        >
            <Button type={'icon'} onClick={() => {}} iconUrl={imagePenUrl} iconSize={'medium'}/>
        </Popover>
    );
};

export {
    EditBgComponent,
};