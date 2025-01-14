import { Button } from "../../../components/button/Button"
import { Popover } from "../../../components/popover/Popover"
import themeImgUrl from '../../../assets/thems.svg'
import styles from './EditThemePresentation.module.css'
import theme1Img from '../../../assets/themes/blue-notes-isolated-grey.jpg';
import theme2Img from '../../../assets/themes/gradient-background-geometric-colorful_361591-3927.avif';
import theme3Img from '../../../assets/themes/images.jpeg';
import theme4Img from '../../../assets/themes/minimal.jpg';
import theme5Img from '../../../assets/themes/rie7.jpg';
import theme6Img from '../../../assets/themes/rm141-nunny-10b.jpg';
import { useAppActions } from "../../../store/hooks/useAppActions";

type EditThemePresentationProps = {
    selectedSlideId: string | null
}

const EditThemePresentation: React.FC<EditThemePresentationProps> = ({selectedSlideId}) => {
    const {updateBackgroundSlide} = useAppActions();

    const themeTemplates = [
        theme1Img,
        theme2Img,
        theme3Img,
        theme4Img,
        theme5Img,
        theme6Img
    ];

    const handleThemeSelect = (themeUrl: string) => {
        if (selectedSlideId) {
            console.log(themeUrl);
            updateBackgroundSlide(themeUrl, true);
        }
    };

    return(
        <Popover 
            content={
                <div className={styles.container}>
                    <div className={styles.themesContainer}>
                        <div className={styles.themesGrid}>
                            {themeTemplates.map((imageUrl, index) => (
                                <img
                                    onClick={() => handleThemeSelect(imageUrl)}
                                    key={index}
                                    src={imageUrl} 
                                    alt={imageUrl}
                                    className={styles.themeImage}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
        >
            <Button 
                type={'icon'} 
                onClick={() => {}} 
                iconUrl={themeImgUrl} 
                iconSize={'medium'}
            />
        </Popover>
    )
}

export {
    EditThemePresentation,
}
