import './App.css'
import { 
  HashRouter,
  Routes,
  Route, 
} from 'react-router';
import { APP_TITLE, Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { 
  getGeneralFacts, 
  getFighterLeaderboard,
  getLeaderboard, 
  getPlayerFighterMatrix,
  getPreviousFighters,
  getPreviousPlayers, 
  type GameResult,
  type Player, 
} from './GameResults';
import { useEffect, useState } from 'react';
import localforage from 'localforage';

const DEFAULT_THEME = "light";

const dummyGameResults: GameResult[] = [
    // --- Original 2 ---
    {
        winner: "Harry",
        players: [
            { name: "Harry",    fighter: "T-Rex" },
            { name: "Hermione", fighter: "Ali" },
        ],
        start: "2026-02-01T18:53:59.078Z",
        end:   "2026-02-01T19:27:59.078Z",
    },
    {
        winner: "Hermione",
        players: [
            { name: "Harry",    fighter: "Ali" },
            { name: "Hermione", fighter: "T-Rex" },
        ],
        start: "2026-01-15T22:07:59.078Z",
        end:   "2026-01-15T23:01:59.078Z",
    },
    // --- Ron joins ---
    {
        winner: "Ron",
        players: [
            { name: "Ron",      fighter: "Bigfoot" },
            { name: "Harry",    fighter: "Sinbad" },
        ],
        start: "2026-01-20T14:00:00.000Z",
        end:   "2026-01-20T14:38:00.000Z",
    },
    {
        winner: "Harry",
        players: [
            { name: "Harry",    fighter: "Bigfoot" },
            { name: "Ron",      fighter: "Robin Hood" },
        ],
        start: "2026-01-22T19:00:00.000Z",
        end:   "2026-01-22T19:52:00.000Z",
    },
    {
        winner: "Hermione",
        players: [
            { name: "Hermione", fighter: "Medusa" },
            { name: "Ron",      fighter: "Sinbad" },
        ],
        start: "2026-01-25T16:30:00.000Z",
        end:   "2026-01-25T17:10:00.000Z",
    },
    // --- Luna & Neville join ---
    {
        winner: "Luna",
        players: [
            { name: "Luna",     fighter: "Alice" },
            { name: "Neville",  fighter: "Sherlock" },
        ],
        start: "2026-02-03T20:00:00.000Z",
        end:   "2026-02-03T20:45:00.000Z",
    },
    {
        winner: "Neville",
        players: [
            { name: "Neville",  fighter: "Bigfoot" },
            { name: "Luna",     fighter: "Medusa" },
        ],
        start: "2026-02-04T18:15:00.000Z",
        end:   "2026-02-04T19:00:00.000Z",
    },
    {
        winner: "Ron",
        players: [
            { name: "Ron",      fighter: "T-Rex" },
            { name: "Neville",  fighter: "Alice" },
        ],
        start: "2026-02-06T21:00:00.000Z",
        end:   "2026-02-06T21:33:00.000Z",
    },
    // --- Draco joins, more variety ---
    {
        winner: "Draco",
        players: [
            { name: "Draco",    fighter: "Sinbad" },
            { name: "Harry",    fighter: "Robin Hood" },
        ],
        start: "2026-02-10T17:00:00.000Z",
        end:   "2026-02-10T17:48:00.000Z",
    },
    {
        winner: "Harry",
        players: [
            { name: "Harry",    fighter: "T-Rex" },
            { name: "Draco",    fighter: "Medusa" },
        ],
        start: "2026-02-11T19:00:00.000Z",
        end:   "2026-02-11T19:29:00.000Z",
    },
    {
        winner: "Hermione",
        players: [
            { name: "Hermione", fighter: "Sherlock" },
            { name: "Draco",    fighter: "Prospero" },
        ],
        start: "2026-02-12T20:00:00.000Z",
        end:   "2026-02-12T21:05:00.000Z",
    },
    {
        winner: "Luna",
        players: [
            { name: "Luna",     fighter: "Robin Hood" },
            { name: "Draco",    fighter: "Sinbad" },
        ],
        start: "2026-02-14T15:00:00.000Z",
        end:   "2026-02-14T15:41:00.000Z",
    },
    // --- More repeat combos for heatmap depth ---
    {
        winner: "Harry",
        players: [
            { name: "Harry",    fighter: "T-Rex" },
            { name: "Ron",      fighter: "Bigfoot" },
        ],
        start: "2026-02-17T18:00:00.000Z",
        end:   "2026-02-17T18:55:00.000Z",
    },
    {
        winner: "Ron",
        players: [
            { name: "Ron",      fighter: "Bigfoot" },
            { name: "Hermione", fighter: "Alice" },
        ],
        start: "2026-02-18T19:00:00.000Z",
        end:   "2026-02-18T19:44:00.000Z",
    },
    {
        winner: "Neville",
        players: [
            { name: "Neville",  fighter: "Prospero" },
            { name: "Luna",     fighter: "Sherlock" },
        ],
        start: "2026-02-20T20:30:00.000Z",
        end:   "2026-02-20T21:15:00.000Z",
    },
    {
        winner: "Draco",
        players: [
            { name: "Draco",    fighter: "T-Rex" },
            { name: "Neville",  fighter: "Robin Hood" },
        ],
        start: "2026-02-22T17:00:00.000Z",
        end:   "2026-02-22T17:36:00.000Z",
    },
    {
        winner: "Harry",
        players: [
            { name: "Harry",    fighter: "Sinbad" },
            { name: "Luna",     fighter: "Medusa" },
        ],
        start: "2026-02-24T20:00:00.000Z",
        end:   "2026-02-24T20:50:00.000Z",
    },
    {
        winner: "Hermione",
        players: [
            { name: "Hermione", fighter: "T-Rex" },
            { name: "Ron",      fighter: "Prospero" },
        ],
        start: "2026-02-26T19:00:00.000Z",
        end:   "2026-02-26T19:40:00.000Z",
    },
    {
        winner: "Luna",
        players: [
            { name: "Luna",     fighter: "Alice" },
            { name: "Harry",    fighter: "Sherlock" },
        ],
        start: "2026-03-01T18:00:00.000Z",
        end:   "2026-03-01T18:27:00.000Z",
    },
    {
        winner: "Ron",
        players: [
            { name: "Ron",      fighter: "Ali" },
            { name: "Draco",    fighter: "Bigfoot" },
        ],
        start: "2026-03-03T21:00:00.000Z",
        end:   "2026-03-03T21:58:00.000Z",
    },
    {
        winner: "Harry",
        players: [
            { name: "Harry",    fighter: "T-Rex" },
            { name: "Hermione", fighter: "Prospero" },
        ],
        start: "2026-03-05T17:30:00.000Z",
        end:   "2026-03-05T18:12:00.000Z",
    },
    {
        winner: "Neville",
        players: [
            { name: "Neville",  fighter: "Sinbad" },
            { name: "Ron",      fighter: "Sherlock" },
        ],
        start: "2026-03-07T20:00:00.000Z",
        end:   "2026-03-07T20:43:00.000Z",
    },
    {
        winner: "Draco",
        players: [
            { name: "Draco",    fighter: "Medusa" },
            { name: "Luna",     fighter: "Robin Hood" },
        ],
        start: "2026-03-09T19:00:00.000Z",
        end:   "2026-03-09T19:31:00.000Z",
    },
    {
        winner: "Hermione",
        players: [
            { name: "Hermione", fighter: "Ali" },
            { name: "Neville",  fighter: "Bigfoot" },
        ],
        start: "2026-03-11T18:00:00.000Z",
        end:   "2026-03-11T18:49:00.000Z",
    },
    {
        winner: "Harry",
        players: [
            { name: "Harry",    fighter: "Robin Hood" },
            { name: "Ron",      fighter: "Medusa" },
        ],
        start: "2026-03-13T17:00:00.000Z",
        end:   "2026-03-13T17:38:00.000Z",
    },
    {
        winner: "Luna",
        players: [
            { name: "Luna",     fighter: "Prospero" },
            { name: "Draco",    fighter: "Alice" },
        ],
        start: "2026-03-15T20:30:00.000Z",
        end:   "2026-03-15T21:18:00.000Z",
    },
    {
        winner: "Ron",
        players: [
            { name: "Ron",      fighter: "T-Rex" },
            { name: "Harry",    fighter: "Ali" },
        ],
        start: "2026-03-17T19:00:00.000Z",
        end:   "2026-03-17T19:52:00.000Z",
    },
    {
        winner: "Hermione",
        players: [
            { name: "Hermione", fighter: "Medusa" },
            { name: "Luna",     fighter: "Sinbad" },
        ],
        start: "2026-03-19T18:30:00.000Z",
        end:   "2026-03-19T19:05:00.000Z",
    },
    {
        winner: "Neville",
        players: [
            { name: "Neville",  fighter: "Alice" },
            { name: "Draco",    fighter: "Sherlock" },
        ],
        start: "2026-03-21T20:00:00.000Z",
        end:   "2026-03-21T20:37:00.000Z",
    },
    {
        winner: "Harry",
        players: [
            { name: "Harry",    fighter: "T-Rex" },
            { name: "Neville",  fighter: "Prospero" },
        ],
        start: "2026-03-25T18:00:00.000Z",
        end:   "2026-03-25T18:44:00.000Z",
    },
    {
        winner: "Draco",
        players: [
            { name: "Draco",    fighter: "Robin Hood" },
            { name: "Hermione", fighter: "Bigfoot" },
        ],
        start: "2026-03-26T17:00:00.000Z",
        end:   "2026-03-26T17:29:00.000Z",
    },
    {
        winner: "Ron",
        players: [
            { name: "Ron",      fighter: "Sinbad" },
            { name: "Luna",     fighter: "Ali" },
        ],
        start: "2026-03-27T21:00:00.000Z",
        end:   "2026-03-27T21:41:00.000Z",
    },
];

const App = () => {

  // console.log(dummyGameResults);
  
  //
  // React hooks...
  //
  const [gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const [title, setTitle] = useState(APP_TITLE);

  const [theme, setTheme] = useState(DEFAULT_THEME);

  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);
  // const currentPlayersStateTuple = useState<Player[]>([]);

  useEffect(
    () => {
      const loadTheme = async () => {

        const result = await localforage.getItem<string>("theme") ?? DEFAULT_THEME;

        if (!ignore) {
          setTheme(result);
        }
      }

      let ignore = false;
      loadTheme();

      return () => {
        ignore = true;
      }
    }, 
    [],
  );  

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
    <div
      className='min-h-screen'
      data-theme={ theme }
    >
      <div 
        className="navbar bg-neutral text-neutral-content overflow-x-hidden flex flex-row"
      >
        <p
          className='text-xl font-bold text-nowrap'
        >
          {
            title
          }
        </p>
        <label 
          className="swap swap-rotate ml-auto"
        >
          {/* this hidden checkbox controls the state */}
          <input 
            type="checkbox" 
            checked={
              DEFAULT_THEME !== theme
            }
            onChange={
              async () => {
                const result = await localforage.setItem<string>(
                  'theme',
                  theme === DEFAULT_THEME
                    ? "dark"
                    : DEFAULT_THEME,
                );

                setTheme(
                  result
                );
              }
            }
          />

          {/* sun icon */}
          <svg
            className="swap-on h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      <div 
        className="p-3"
      >
        <HashRouter>
          <Routes>
            <Route 
              path='/'
              element={
                <Home
                  setTitle={setTitle}
                  generalFacts={
                    getGeneralFacts(gameResults)
                  } 
                  leaderboard={
                    getLeaderboard(gameResults)
                  }
                  fighterLeaderboard={
                    getFighterLeaderboard(gameResults)
                  }
                  playerFighterMatrix={
                    getPlayerFighterMatrix(gameResults)
                  }
                />
              }
            />
            <Route 
              path='/setup'
              element={
                <Setup 
                  setTitle={setTitle}
                  previousPlayers={
                    getPreviousPlayers(gameResults)
                  }
                  previousFighters={
                    getPreviousFighters(gameResults)
                  }
                  setCurrentPlayers={setCurrentPlayers}
                />
              }
            />
            <Route 
              path='/play'
              element={
                <Play 
                  setTitle={setTitle}
                  addNewGameResult={
                    addNewGameResult
                  }
                  players={currentPlayers}
                />
              }
            />          
          </Routes>
        </HashRouter>
      </div>
    </div>
  )
}

export default App
