import './App.module.css'
import { TopPanel } from './views/topPanel/TopPanel'
import styles from './App.module.css'
import { SlidesList } from './views/slidesList/SlidesList'
import { Workspace } from './views/workSpace/Workspace'
import { Toolbar } from './views/toolbar/Toolbar'

function App() {
  return (
      <>
          <TopPanel></TopPanel>
          <div className={styles.container}>
              <SlidesList></SlidesList>
              <div className={styles.workspaceConatiner}>
                <Workspace></Workspace>
                <Toolbar/>
              </div>
          </div>
      </>
  )
}


export default App
