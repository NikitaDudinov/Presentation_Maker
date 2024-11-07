import { Button } from '../../components/button/Button'
import styles from './Toolbar.module.css'

import imageImgUrl from '../../assets/image.svg'
import imageStarUrl from '../../assets/star.svg'
import imageThemesUrl from '../../assets/thems.svg'
import imagePenUrl from '../../assets/pen.svg'
import imageAddObj from '../../assets/add-object.svg'
import imageAddSlide from '../../assets/add-slide.svg'
import { dispatch } from '../../store/presentation'
import { addSlide } from '../../store/addSlide'
import { EditTextComponent } from './editTextComponent/EditTextComponent'
import { PresentationType } from '../../store/types'


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

    return (
        <div className={styles.toolbarContainer}>
            <EditTextComponent element={selectedElement}/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imageImgUrl} iconSize={'large'}/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imageStarUrl} iconSize={'large'}/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imageThemesUrl} iconSize={'large'}/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imagePenUrl} iconSize={'large'}/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imageAddObj} iconSize={'large'}/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imageAddSlide} iconSize={'large'}/>
        </div>
    )
}

export {
    Toolbar,
}