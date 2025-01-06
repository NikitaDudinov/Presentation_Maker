import './App.module.css';
import { TopPanel } from './views/topPanel/TopPanel';
import styles from './App.module.css';
import { SlidesList } from './views/slidesList/SlidesList';
import { Workspace } from './views/workSpace/Workspace';
import { Toolbar } from './views/toolbar/Toolbar';
import { HistoryType } from './utils/history';
import { HistoryContext } from './store/hooks/historyContext';
import { BrowserRouter, Routes, Route } from 'react-router'; // Исправлено на react-router-dom
import { SlideShow } from './views/slideShow/SlideShow';
import { useRef, useState, useEffect } from 'react';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from './store/constants';
import { Preloader } from './components/preloader/Preloader';

type AppProps = {
  history: HistoryType;
};

function App({ history }: AppProps) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [scaleSlideList, setScaleSlideList] = useState<number>(0.3);
  const [scaleWorkSpace, setScaleWorkSpace] = useState<number>(1);

  const slideListRef = useRef<HTMLDivElement>(null);
  const workSpaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (slideListRef.current && workSpaceRef.current) {
        setScaleSlideList(slideListRef.current.clientWidth / SLIDE_WIDTH);
        setScaleWorkSpace(Math.min(
          workSpaceRef.current.clientHeight / SLIDE_HEIGHT,
          workSpaceRef.current.clientWidth / SLIDE_WIDTH
        ));
        setIsReady(true);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 500);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <HistoryContext.Provider value={history}>
              <TopPanel />
              <div className={styles.container}>
                <div ref={slideListRef} className={styles.slideListContainer}>
                  {!showPreloader && isReady && (
                    <SlidesList slidePreviewScale={scaleSlideList} />
                  )}
                </div>
                <div className={styles.workspaceToolbarContainer}>
                  <div ref={workSpaceRef} className={styles.workspaceContainer}>
                    {!showPreloader && isReady && (
                      <Workspace WorkSpaceSlideScale={scaleWorkSpace} />
                    )}
                  </div>
                  <Toolbar />
                </div>
              </div>
              {(showPreloader || !isReady) && (
                <div className={styles.preloaderContainer}>
                  <Preloader />
                </div>
              )}
            </HistoryContext.Provider>
          }
        />
        <Route 
          path="slideshow" 
          element={<SlideShow />} 
        />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
