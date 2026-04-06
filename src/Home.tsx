import { useNavigate } from "react-router";
import type { GeneralFacts, LeaderboardEntry, PlayerFighterMatrix, PlayerFighterCell } from "./GameResults";
import { useEffect, useRef, useState } from "react";

export const APP_TITLE = "My UM Life";

type HomeProps = {
    generalFacts: GeneralFacts,
    leaderboard: LeaderboardEntry[],
    fighterLeaderboard: LeaderboardEntry[],
    playerFighterMatrix: PlayerFighterMatrix,
    setTitle: (t: string) => void,
};


export const Home: React.FC<HomeProps> = ({
    generalFacts,
    leaderboard,
    fighterLeaderboard,
    playerFighterMatrix,
    setTitle,
}) => {
    
    useEffect(
        () => setTitle(APP_TITLE),
        [],
    );

    const nav = useNavigate();

    const [selectedCell, setSelectedCell] = useState<PlayerFighterCell | null>(null);
    const heatmapModalRef = useRef<HTMLDialogElement>(null);

    const openHeatmapCell = (cell: PlayerFighterCell) => {
        setSelectedCell(cell);
        heatmapModalRef.current?.showModal();
    };

    // Then return JSX...
    return (
        <>
            <section className="card bg-base-100 border border-base-300 shadow-xl my-2">
                <div className="card-body p-4 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-2">
                            <div className="badge badge-accent badge-outline badge-lg">
                                Companion App
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold">
                                Player & Fighter Win Tracker
                            </h1>
                            <p className="opacity-80 max-w-2xl">
                                Log your un-matches and enjoy some fun-facts forever.
                            </p>
                        </div>

                        <button 
                            className="btn btn-primary btn-lg w-full lg:w-auto"
                            onClick={
                                () => nav('/setup')
                            }
                        >
                            Setup a Game
                        </button>
                    </div>
                </div>
            </section>

            <div className="card bg-base-100 w-full shadow-lg my-5 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 
                        className="card-title text-nowrap ml-3"
                    >
                        General Facts
                    </h2>
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
            <div className="card bg-base-100 w-full shadow-lg my-5 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 
                        className="card-title text-nowrap ml-3"
                    >
                        Player Leaderboard
                    </h2>
                    {
                        leaderboard.length === 0
                            ? <p className="ml-3">N/A</p>
                            : (
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
                                                        <th>
                                                            { x.name }
                                                        </th>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            )
                    }
                </div>
            </div>       
            <div className="card bg-base-100 w-full shadow-lg my-5 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 
                        className="card-title text-nowrap ml-3"
                    >
                        Fighter Leaderboard
                    </h2>
                    {
                        fighterLeaderboard.length === 0
                            ? <p className="ml-3">N/A</p>
                            : (
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>W</th>
                                            <th>L</th>
                                            <th>AVG</th>
                                            <th>FIGHTER</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            fighterLeaderboard.map(
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
                                                        <th>
                                                            { x.name }
                                                        </th>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            )
                    }
                </div>
            </div>       
            <div className="card bg-base-100 w-full shadow-lg my-5">
                <div className="card-body p-2">
                    <h2 className="card-title text-nowrap ml-3">
                        Player × Fighter Frequency
                    </h2>
                    <span className="badge badge-ghost badge-sm font-normal ml-2">Tap cell for details</span>
                    {playerFighterMatrix.players.length === 0 ? (
                        <p className="ml-3">N/A</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table style={{ borderCollapse: 'separate', borderSpacing: '3px' }} className="mx-auto">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {playerFighterMatrix.fighters.map(fighter => (
                                            <th key={fighter} style={{ verticalAlign: 'bottom', padding: '0 0 4px', textAlign: 'center' }}>
                                                <span
                                                    className="text-xs font-medium opacity-60 text-nowrap"
                                                    style={{ display: 'inline-block', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                                >
                                                    {fighter}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {playerFighterMatrix.players.map(player => (
                                        <tr key={player}>
                                            <td className="text-xs font-medium text-right pr-2 text-nowrap opacity-60">
                                                {player}
                                            </td>
                                            {playerFighterMatrix.fighters.map(fighter => {
                                                const cell = playerFighterMatrix.cells.find(
                                                    c => c.player === player && c.fighter === fighter
                                                )!;
                                                const intensity = cell.games > 0
                                                    ? Math.round(25 + (cell.games / playerFighterMatrix.maxGames) * 70)
                                                    : 0;
                                                return (
                                                    <td
                                                        key={fighter}
                                                        className="rounded border border-base-300"
                                                        style={{
                                                            width: '2.5rem',
                                                            height: '2.5rem',
                                                            minWidth: '2.5rem',
                                                            backgroundColor: cell.games > 0
                                                                ? `color-mix(in srgb, var(--color-primary) ${intensity}%, var(--color-base-200))`
                                                                : 'var(--color-base-200)',
                                                            cursor: cell.games > 0 ? 'pointer' : 'default',
                                                        }}
                                                        onClick={() => cell.games > 0 && openHeatmapCell(cell)}
                                                    />
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <dialog ref={heatmapModalRef} className="modal">
                <div className="modal-box">
                    {selectedCell && (
                        <>
                            <h3 className="font-bold text-xl mb-1">{selectedCell.player}</h3>
                            <p className="opacity-60 mb-4 text-sm">
                                playing as{' '}
                                <span className="font-semibold opacity-100 text-base-content">
                                    {selectedCell.fighter}
                                </span>
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-base-200 rounded-xl p-3 text-center">
                                    <div className="text-xs opacity-60 mb-1">Games</div>
                                    <div className="text-2xl font-bold">{selectedCell.games}</div>
                                </div>
                                <div className="bg-base-200 rounded-xl p-3 text-center">
                                    <div className="text-xs opacity-60 mb-1">Wins</div>
                                    <div className="text-2xl font-bold text-primary">{selectedCell.wins}</div>
                                </div>
                                <div className="bg-base-200 rounded-xl p-3 text-center">
                                    <div className="text-xs opacity-60 mb-1">Losses</div>
                                    <div className="text-2xl font-bold">{selectedCell.losses}</div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-primary">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>



        </>
    );
};