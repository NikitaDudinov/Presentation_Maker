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

const Toolbar = () => {
    const {addSlide} = useAppActions();
    // const presentation = useAppSelector((state) => state);
    // const selectedSlideId = presentation.selection.selectedSlideId
    // const selectedElementId = presentation.selection.elementsId[0]
    // const selectedElement = presentation.slides.find(slide => slide.id === selectedSlideId)?.elements.find(element => element.id === selectedElementId)
    // const selectedSlideBg = presentation.slides.find(slide => slide.id === selectedSlideId)?.background
    
    return (
        <div className={styles.toolbarContainer}>
            {/* <EditTextComponent element={selectedElement}/> */}
            <EditImageComponent/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imageStarUrl} iconSize={'large'}/>
            <Button type={'icon'} onClick={() => {}} iconUrl={imageThemesUrl} iconSize={'large'}/>
            {/* <EditBgComponent background={selectedSlideBg}/> */}
            <Button type={'icon'} onClick={addSlide} iconUrl={imageAddSlide} iconSize={'large'}/>
            {/* {
                selectedElement && (
                    // dispatch(deleteElement)
                    <Button type={'icon'} onClick={() => {}} iconUrl={imnageTrash} iconSize={'large'}/>
                )
            } */}
        </div>
    )
}

export {
    Toolbar,
}