import { useNavigate } from "react-router";
import type { GeneralFacts, LeaderboardEntry } from "./GameResults";

export const APP_TITLE = "UM Companion";

type HomeProps = {
    generalFacts: GeneralFacts,
    leaderboard: LeaderboardEntry[],
    setTitle: (t: string) => void,
};


export const Home: React.FC<HomeProps> = ({
    generalFacts,
    leaderboard,
    setTitle,
}) => {
    
    setTitle(APP_TITLE);

    // We'll write code here...
    const nav = useNavigate();

    // Then return JSX...
    return (
        <div className="space-y-6">
            <section className="app-panel rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-3">
                        <div className="badge badge-accent badge-outline badge-lg">
                            Unmatched companion
                        </div>
                        <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                            Keep match nights tidy without losing the drama.
                        </h1>
                        <p className="app-kicker max-w-2xl text-base sm:text-lg">
                            A brighter board for daytime play, a richer glow after dark, and the same DaisyUI core underneath both.
                        </p>
                    </div>

                    <button
                        className="btn btn-primary btn-lg app-glow w-full lg:w-auto"
                        onClick={
                            () => nav('/setup')
                        }
                    >
                        Setup a Game
                    </button>
                </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-2">
                <div className="app-panel card overflow-hidden">
                    <div className="card-body p-4 sm:p-6">
                        <h2 className="card-title text-nowrap text-2xl font-black">
                            General Facts
                        </h2>
                        <div className="overflow-x-auto">
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
                </div>

                <div className="app-panel card overflow-hidden">
                    <div className="card-body p-4 sm:p-6">
                        <h2 className="card-title text-nowrap text-2xl font-black">
                            Player Leaderboard
                        </h2>
                        {
                            leaderboard.length === 0
                                ? <p className="app-kicker">No games recorded yet.</p>
                                : (
                                    <div className="overflow-x-auto">
                                        <table className="table table-zebra">
                                            <thead>
                                                <tr>
                                                    <th>W</th>
                                                    <th>L</th>
                                                    <th>AVG</th>
                                                    <th>PLAYER</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    leaderboard.map(
                                                        x => (
                                                            <tr
                                                                key={x.name}
                                                            >
                                                                <td>
                                                                    { x.wins }
                                                                </td>
                                                                <td>
                                                                    { x.losses }
                                                                </td>
                                                                <td>
                                                                    { x.avg }
                                                                </td>
                                                                <td className="font-semibold tracking-wide">
                                                                    { x.name }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};