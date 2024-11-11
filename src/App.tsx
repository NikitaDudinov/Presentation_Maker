import './App.module.css'
import { TopPanel } from './views/topPanel/TopPanel'
import styles from './App.module.css'
import { SlidesList } from './views/slidesList/SlidesList'
import { Workspace } from './views/workSpace/Workspace'
import { PresentationType } from './store/types'
import { Toolbar } from './views/toolbar/Toolbar'

type AppProps = {
  presentation: PresentationType,
}
function App({presentation}: AppProps) {
  const curSlide = presentation.slides.length > 0 
  ? (presentation.slides.find(slide => slide.id == presentation.selection.selectedSlideId) || presentation.slides[0]) 
  : null;
  return (
      <>
          <TopPanel presentation={presentation}></TopPanel>
          <div className={styles.container}>
              <SlidesList slides={presentation.slides} selectSlideId={presentation.selection.selectedSlideId}></SlidesList>
              <div className={styles.workspaceConatiner}>
                <Workspace slide={curSlide} selectElemnets={presentation.selection.elementsId}></Workspace>
                <Toolbar presentation={presentation}/>
              </div>
          </div>
      </>
  )
}


export default App
