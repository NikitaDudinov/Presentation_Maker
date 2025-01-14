import { Button } from "../../../components/button/Button"
import { Popover } from "../../../components/popover/Popover"
import imageStarUrl from '../../../assets/star.svg'
import styles from './EditFigureComponent.module.css'
import { useAppActions } from "../../../store/hooks/useAppActions"
import { FigureType, FigureElementType, ImageElementType, TextElementType } from "../../../store/types"

type EditFigureComponentProps = {
    selectedSlideId: string | null,
    selectedElement: FigureElementType | TextElementType | ImageElementType | undefined
}

const EditFigureComponent: React.FC<EditFigureComponentProps> = ({
    selectedSlideId,
    selectedElement
}) => {
    const { addFigureElement, updateFillElement } = useAppActions();

    const handleAddFigure = (figureType: FigureType) => {
        if (!selectedSlideId) return;
        addFigureElement(figureType);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedElement) return;
        updateFillElement(event.target.value);
    };

    const renderContent = () => {
        if (selectedElement && selectedElement.type === 'figure') {
            return (
                <div className={styles.container}>
                    <div className={styles.section}>
                        <div className={styles.colorPickerContainer}>
                            <span className={styles.label}>Цвет фигуры</span>
                            <input
                                type="color"
                                className={styles.colorPicker}
                                value={selectedElement.fill}
                                onChange={handleColorChange}
                                title="Выберите цвет"
                            />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.container}>
                <div className={styles.section}>
                    <span className={styles.label}>Выберите фигуру</span>
                    <div className={styles.figuresGrid}>
                        <button 
                            className={styles.figureButton}
                            onClick={() => handleAddFigure('rectangle')}
                        >
                            <svg className={styles.figureIcon} viewBox="0 0 24 24">
                                <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor"/>
                            </svg>
                            <span className={styles.figureLabel}>Прямоугольник</span>
                        </button>
                        <button 
                            className={styles.figureButton}
                            onClick={() => handleAddFigure('circle')}
                        >
                            <svg className={styles.figureIcon} viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="8" fill="currentColor"/>
                            </svg>
                            <span className={styles.figureLabel}>Круг</span>
                        </button>
                        <button 
                            className={styles.figureButton}
                            onClick={() => handleAddFigure('triangle')}
                        >
                            <svg className={styles.figureIcon} viewBox="0 0 24 24">
                                <path d="M12 4L20 19H4L12 4Z" fill="currentColor"/>
                            </svg>
                            <span className={styles.figureLabel}>Треугольник</span>
                        </button>
                        <button 
                            className={styles.figureButton}
                            onClick={() => handleAddFigure('line')}
                        >
                            <svg className={styles.figureIcon} viewBox="0 0 24 24">
                                <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span className={styles.figureLabel}>Линия</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Popover content={renderContent()}>
            <Button 
                type="icon" 
                onClick={() => {}} 
                iconUrl={imageStarUrl} 
                iconSize="medium"
                aria-label="Добавить фигуру"
            />
        </Popover>
    );
}

export {
    EditFigureComponent,
}
