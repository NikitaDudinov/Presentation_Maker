import './App.module.css'
import { TopPanel } from './views/topPanel/TopPanel'
import styles from './App.module.css'
import { SlidesList } from './views/slidesList/SlidesList'
import { Workspace } from './views/workSpace/Workspace'
import { Toolbar } from './views/toolbar/Toolbar'
import { HistoryType } from './utils/history'
import { HistoryContext } from './store/hooks/historyContext'
import { Buffer } from 'buffer';
import { BrowserRouter, Routes, Route } from 'react-router'
import { SlideShow } from './views/slideShow/SlideShow'

type AppProps = {
  history: HistoryType,
}

function App({history}: AppProps) {
  (window as any).Buffer = Buffer; 

  return (
    <BrowserRouter>
      <Routes>
          <Route 
            path="/" 
            element={
              <HistoryContext.Provider value={history}>
                <TopPanel></TopPanel>
                <div className={styles.container}>
                    <SlidesList></SlidesList>
                    <div className={styles.workspaceConatiner}>
                      <Workspace></Workspace>
                      <Toolbar/>
                    </div>
                </div>
              </HistoryContext.Provider>
            }
          />
          <Route 
            path="slideshow" 
            element={
              <SlideShow/>
            } 
          />
      </Routes>
    </BrowserRouter>  
  )
}


export default App
