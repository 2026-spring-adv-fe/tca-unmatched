import './App.css'
import { 
  HashRouter,
  Routes,
  Route, 
} from 'react-router';
import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { getGeneralFacts, getMostPopularFirstMoveColumn, type GameResult } from './GameResults';
import { useState } from 'react';


const dummyGameResults: GameResult[] = [
    {
        winner: "Harry",
        players: [
            "Harry",
            "Hermione",
            "Ron",
        ],
        start: "2026-02-01T18:53:59.078Z",
        end: "2026-02-01T19:27:59.078Z",
        firstMoveColumn: 3,
    },
    {
        winner: "Hermione",
        players: [
            "Harry",
            "Hermione",
            "Ron",
        ],
        start: "2026-01-15T22:07:59.078Z",
        end: "2026-01-15T23:01:59.078Z",
        firstMoveColumn: 7,
    },  
];

const App = () => {

  //
  // React hooks...
  //
  const [gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState([]);

  //
  // Calculated state and other funcs...
  //
  const addNewGameResult = (gameResult: GameResult) => setGameResults(
    [
      ...gameResults,
      gameResult,
    ]
  );

  //
  // Return JSX...
  //
  return (
    <HashRouter>
      <div className="min-h-screen bg-base-200">
        <div className="navbar bg-base-100 shadow-sm px-4 md:px-6">
          <div className="flex-1">
            <div className="text-xl font-bold">
              TCA Unmatched
            </div>
          </div>
        </div>
        <main className="mx-auto w-full max-w-5xl px-4 py-6 md:px-6 md:py-8">
          <Routes>
            <Route 
              path='/'
              element={
                <Home
                  generalFacts={
                    getGeneralFacts(gameResults)
                  }
                  mostPopularFirstMove={
                    getMostPopularFirstMoveColumn(gameResults)
                  }
                />
              }
            />
            <Route 
              path='/setup'
              element={
                <Setup />
              }
            />
            <Route 
              path='/play'
              element={
                <Play 
                  addNewGameResult={
                    addNewGameResult
                  }
                />
              }
            />          
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

export default App
