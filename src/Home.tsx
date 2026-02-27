import { useNavigate } from "react-router";
import type { GeneralFacts, GamesPlayedLeaderboardEntry } from "./GameResults";

type HomeProps = {
    generalFacts: GeneralFacts;
    popularMove: string;
    leaderboard: GamesPlayedLeaderboardEntry[];
};


export const Home: React.FC<HomeProps> = ({
    generalFacts,
    popularMove,
    leaderboard,
}) => {

    console.log(
        generalFacts
    );

    console.log(
        popularMove
    );
    
    // We'll write code here...
    const nav = useNavigate();

    // Then return JSX...
    return (
        <>
            <h1>
                Home
            </h1>
            <button 
                className="btn btn-primary btn-outline"
                onClick={
                    () => nav('/setup')
                }
            >
                Setup a Game
            </button>

            <div className="card bg-base-100 w-full shadow-lg my-5">
                <div className="card-body p-2">
                    <h2 className="card-title">General Facts</h2>
                    <table className="table table-zebra">
                        <tbody>
                            <tr>
                                <td>Last Played</td>
                                <th>{generalFacts.lastPlayed}</th>
                            </tr>
                            <tr>
                                <td>Total Games</td>
                                <th>{generalFacts.totalGames}</th>
                            </tr>
                            <tr>
                                <td>Shortest Game</td>
                                <th>{generalFacts.shortestGame}</th>
                            </tr>
                            <tr>
                                <td>Longest Game</td>
                                <th>{generalFacts.longestGame}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card bg-base-100 w-full shadow-lg my-5">
                <div className="card-body p-2">
                    <h2 className="card-title">Most Popular First Move</h2>
                    <p>{popularMove}</p>
                </div>
            </div>
            <div className="card bg-base-100 w-full shadow-lg my-5">
                <div className="card-body p-2">
                    <h2 className="card-title">Games Played Leaderboard</h2>
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Games Played</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map(entry => (
                                <tr key={entry.player}>
                                    <td>{entry.player}</td>
                                    <td>{entry.gamesPlayed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};