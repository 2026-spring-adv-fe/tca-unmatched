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
  getLeaderboard,
  type GameResult,
} from './GameResults';
import { useEffect, useState } from 'react';
import localforage from 'localforage';


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
  },
];

const themes = [
    {
        theme: "light",
        dark: false,
    },
    {
        theme: "cupcake",
        dark: false,
    },
    {
        theme: "bumblebee",
        dark: false,
    },
    {
        theme: "emerald",
        dark: false,
    },
    {
        theme: "corporate",
        dark: false,
    },
    {
        theme: "retro",
        dark: false,
    },
    {
        theme: "cyberpunk",
        dark: false,
    },
    {
        theme: "valentine",
        dark: false,
    },
    {
        theme: "garden",
        dark: false,
    },
    {
        theme: "lofi",
        dark: false,
    },
    {
        theme: "pastel",
        dark: false,
    },
    {
        theme: "fantasy",
        dark: false,
    },
    {
        theme: "wireframe",
        dark: false,
    },
    {
        theme: "cmyk",
        dark: false,
    },
    {
        theme: "autumn",
        dark: false,
    },
    {
        theme: "acid",
        dark: false,
    },
    {
        theme: "lemonade",
        dark: false,
    },
    {
        theme: "winter",
        dark: false,
    },
    {
        theme: "nord",
        dark: false,
    },
    {
        theme: "caramellatte",
        dark: false,
    },
    {
        theme: "silk",
        dark: false,
    },
    {
        theme: "dark",
        dark: true,
    },
    {
        theme: "synthwave",
        dark: true,
    },
    {
        theme: "halloween",
        dark: true,
    },
    {
        theme: "forest",
        dark: true,
    },
    {
        theme: "aqua",
        dark: true,
    },
    {
        theme: "black",
        dark: true,
    },
    {
        theme: "luxury",
        dark: true,
    },
    {
        theme: "dracula",
        dark: true,
    },
    {
        theme: "business",
        dark: true,
    },
    {
        theme: "night",
        dark: true,
    },
    {
        theme: "coffee",
        dark: true,
    },
    {
        theme: "dim",
        dark: true,
    },
    {
        theme: "sunset",
        dark: true,
    },
    {
        theme: "abyss",
        dark: true,
    },
];

const getNextThemeInCurrentMode = (currentTheme: string) => {
  const currentThemeData = themes.find(x => x.theme === currentTheme) ?? themes[0];
  const sameModeThemes = themes.filter(x => x.dark === currentThemeData.dark);
  const oppositeModeThemes = themes.filter(x => x.dark !== currentThemeData.dark);
  const currentModeIndex = sameModeThemes.findIndex(x => x.theme === currentThemeData.theme);

  if (currentModeIndex < 0) {
    return sameModeThemes[0]?.theme ?? "light";
  }

  if (currentModeIndex === sameModeThemes.length - 1) {
    return oppositeModeThemes[0]?.theme ?? "light";
  }

  return sameModeThemes[currentModeIndex + 1]?.theme ?? "light";
};

const isDarkTheme = (themeName: string) => {
  return themes.find(x => x.theme === themeName)?.dark ?? false;
};

const App = () => {

  //
  // React hooks...
  //
  const [gameResults, setGameResults] = useState(dummyGameResults);
  // const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const [title, setTitle] = useState(APP_TITLE);
  const [theme, setTheme] = useState("light");
  const nextTheme = getNextThemeInCurrentMode(theme);
  const nextThemeIndex = themes.findIndex(x => x.theme === nextTheme);
  const nextThemeNumber = (nextThemeIndex >= 0 ? nextThemeIndex : 0) + 1;
  const isNextThemeDark = isDarkTheme(nextTheme);
  const nextThemePrefix = isNextThemeDark ? "D" : "L";

  useEffect(
    () => {
      const loadTheme = async () => {

        const result = await localforage.getItem<string>("theme") ?? "light";
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
      data-theme={theme}
    >
      <div
        className="navbar bg-neutral text-neutral-content flex"
      >
        <p
          className="text-xl font-bold"
        >
          {
            title
          }
        </p>
        <label 
          className="swap swap-rotate ml-auto relative mr-3"
        >
          {/* this hidden checkbox controls the state */}
          <input 
            type="checkbox"
            checked={!isNextThemeDark}
            onChange={async () => {
              const savedTheme = await localforage.setItem(
                "theme",
                nextTheme,
              );

              setTheme(
                savedTheme
              );
            }}             
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
          <span
            className="pointer-events-none absolute -bottom-2 -right-2 text-[10px] font-semibold leading-none opacity-80"
            aria-label={`Next theme ${nextThemePrefix}${nextThemeNumber}`}
          >
            {nextThemePrefix}{nextThemeNumber}
          </span>
        </label>
      </div>
      <div
        className="px-3"
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
                />
              }
            />
            <Route
              path='/setup'
              element={
                <Setup
                  setTitle={setTitle}
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
