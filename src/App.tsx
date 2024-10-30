import './App.module.css'
import { TopPanel } from './views/topPanel/TopPanel'
import styles from './App.module.css'
import { SlidesList } from './views/slidesList/SlidesList'
import { Workspace } from './views/workSpace/Workspace'
import { PresentationType } from './store/types'

type AppProps = {
  presentation: PresentationType,
}
function App({presentation}: AppProps) {
  const curSlide = presentation.slides.length > 0 
  ? (presentation.slides.find(slide => slide.id == presentation.select.selectedSlideId) || presentation.slides[0]) 
  : null;
  return (
      <>
          <TopPanel title={presentation.title} background={curSlide?.background}></TopPanel>
          <div className={styles.container}>
              <SlidesList slides={presentation.slides} selectSlideId={presentation.select.selectedSlideId}></SlidesList>
              <Workspace slide={curSlide} selectElemnets={presentation.select.elementsId}></Workspace>
          </div>
      </>
  )
}

export default App
