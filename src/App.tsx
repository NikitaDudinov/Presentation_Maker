import './App.module.css'
import { TopPanel } from './views/topPanel/TopPanel'
import styles from './App.module.css'
import { SlidesList } from './views/slidesList/SlidesList'
import { maxPresentation } from './store/data'
import { Workspace } from './views/workSpace/Workspace'

function App() {

  return (
    <>
      <TopPanel title='hello'/>
      <div className={styles.container}>
          <SlidesList slides={maxPresentation.slides} selection={maxPresentation.select}/>
          <Workspace slide={maxPresentation.slides[0]}/>
      </div>
    </>
  )
}

export default App
