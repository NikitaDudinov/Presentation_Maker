import { Button } from '../../components/button/Button'
import styles from './Toolbar.module.css'


import imageStarUrl from '../../assets/star.svg'
import imageThemesUrl from '../../assets/thems.svg'
import { EditBgComponent } from './editBgComponent/EditBgComponent'
import imageAddSlide from '../../assets/add-slide.svg'
import { dispatch } from '../../store/presentation'
import { addSlide } from '../../store/addSlide'
import { EditTextComponent } from './editTextComponent/EditTextComponent'
import { PresentationType } from '../../store/types'
import {EditImageComponent} from './editImageComponent/EditImageComponent'

type ToolbarProps = {
    presentation: PresentationType;
};

const Toolbar: React.FC<ToolbarProps> = ({ presentation }) => {

    const onAddSlide = () => {
        dispatch(addSlide)
    }

    const selectedSlideId = presentation.selection.selectedSlideId
    const selectedElementId = presentation.selection.elementsId[0]
    const selectedElement = presentation.slides.find(slide => slide.id === selectedSlideId)?.elements.find(element => element.id === selectedElementId)
    const selectedSlideBg = presentation.slides.find(slide => slide.id === selectedSlideId)?.background
    return (
        <div className={styles.toolbarContainer}>
            <EditTextComponent element={selectedElement}/>
            <EditImageComponent/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imageStarUrl} iconSize={'large'}/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imageThemesUrl} iconSize={'large'}/>
            <EditBgComponent background={selectedSlideBg}/>
            <Button type={'icon'} onClick={() => {dispatch(addSlide)}} iconUrl={imageAddSlide} iconSize={'large'}/>
        </div>
    )
}

export {
    Toolbar,
}