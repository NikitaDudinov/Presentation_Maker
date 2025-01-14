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
import { EditFigureComponent } from './editFigureComponent/EditFigureComponent'
import { EditThemePresentation } from './editThemePresentation/EditThemePresentation'
import { useState } from 'react'



const Toolbar = () => {
    
    const {addSlide, deleteElement, deleteSelectionElement} = useAppActions();
    const presentation = useAppSelector((state) => state);
    const selectedSlideId = presentation.selection.selectedSlideId;
    const selectedElementId = presentation.selection.elementsId[0]
    const selectedElement = presentation.slides.find(slide => slide.id === selectedSlideId)?.elements.find(element => element.id === selectedElementId)
    const selectedSlideBg = presentation.slides.find(slide => slide.id === selectedSlideId)?.background
    
    return (
        <div className={styles.toolbarContainer}>
            <EditTextComponent element={selectedElement} selectedSlideId={selectedSlideId}/>
            <EditImageComponent selectedSlideId={selectedSlideId}/>
            <EditFigureComponent 
                selectedSlideId={selectedSlideId}
                selectedElement={selectedElement}
            />
            <EditThemePresentation selectedSlideId={selectedSlideId}/>
            <EditBgComponent background={selectedSlideBg} selectedSlideId={selectedSlideId}/>
            <Button type={'icon'} onClick={addSlide} iconUrl={imageAddSlide} iconSize={'large'}/>
            {selectedElement && (    
                <Button 
                    type={'icon'} 
                    onClick={() => {
                        deleteElement();
                        deleteSelectionElement();
                    }} 
                    iconUrl={imnageTrash} 
                    iconSize={'large'}
                />
            )}
        </div>
    )
}

export {
    Toolbar,
}