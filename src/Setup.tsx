import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Player } from "./GameResults";

type SetupProps = {
    setTitle: (t: string) => void;
    previousPlayers: string[];
    previousFighters: string[];
    setCurrentPlayers: (players: Player[]) => void;
};

export const Setup: React.FC<SetupProps> = ({
    setTitle,
    previousPlayers,
    previousFighters,
    setCurrentPlayers,
}) => {

    //
    // React hooks...
    //
    // . local state
    // . effects
    // . navigation
    //
    const [availablePlayers, setAvailablePlayers] = useState(
        previousPlayers.map(
            x => ({
                name: x,
                fighter: "",
                checked: false,
            })
        )
    );

    const [availableFighters, setAvailableFighters] = useState(
        previousFighters.map(
            x => ({
                name: x,
                checked: false,
            })
        )
    );

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [choosingForPlayer, setChoosingForPlayer] = useState("");

    useEffect(
        () => setTitle("Setup"),
        [],
    );

    // Dupe state : - (
    //const [dupePlayerName, setDupePlayerName] = useState(false);

    // We'll write code here...
    const nav = useNavigate();

    const [newPlayerName, setNewPlayerName] = useState("");

    //
    // Derived or calculated state or other code...
    //
    const dupePlayerName = availablePlayers.some(
        x => x.name === newPlayerName
    );

    const twoPlayersChosen = availablePlayers.filter(
        x => x.checked
    ).length === 2;

    //
    // Then return JSX...
    //
    return (
        <div className="drawer drawer-end">
            <input 
                id="fighter-drawer" 
                type="checkbox" 
                className="drawer-toggle" 
                checked={drawerOpen}
                onChange={() => setDrawerOpen(!drawerOpen)}
            />
            <div className="drawer-content">
            <>
            <button 
                className="btn btn-primary btn-lg w-full lg:w-64 mb-4"
                onClick={
                    () => {
                        setCurrentPlayers(
                            availablePlayers
                                .filter(
                                    x => x.checked
                                )
                                .map(
                                    x => ({
                                        name: x.name,
                                        fighter: x.fighter,
                                    })
                                )
                        );
                        nav('/play');
                    }
                }
                disabled={
                    !twoPlayersChosen
                }
            >
                {
                    !twoPlayersChosen
                        ? 'Choose 2 Players'
                        : 'Start Game'
                }
            </button>
            <div className="card bg-base-100 w-full shadow-lg my-2">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title">Add Player</h2>
                    <div className="join w-full mt-2">
                        <input 
                            type="text"
                            className={`input join-item ${dupePlayerName ? 'input-error' : ''}`} 
                            placeholder="New Player Name" 
                            value={newPlayerName}
                            onChange={
                                (e) => setNewPlayerName(
                                    e.target.value
                                )
                            }
                        />
                        <button 
                            className="btn btn-primary join-item rounded-r-full"
                            onClick={
                                () => {
                                    setAvailablePlayers(
                                        [
                                            ...availablePlayers,
                                            {
                                                name: newPlayerName,
                                                fighter: "",
                                                checked: true,
                                            },
                                        ].sort(
                                            (a, b) => a.name.localeCompare(b.name)
                                        )
                                    );

                                    setNewPlayerName(
                                        ""
                                    );
                                }
                            }
                            disabled={
                                newPlayerName.length === 0 || dupePlayerName
                            }
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 w-full shadow-lg my-2">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title">Choose 2 Players</h2>
                    <div className="mt-2">
                        {
                            availablePlayers.map(
                                x => (
                                    <label
                                        key={x.name}
                                        className="block mt-2"
                                    >
                                        <input 
                                            type="checkbox"
                                            className="checkbox mr-2"
                                            checked={x.checked} 
                                            onChange={
                                                () => {
                                                    if (!x.checked) {
                                                        setChoosingForPlayer(x.name);
                                                        setDrawerOpen(true);
                                                    }
                                                    setAvailablePlayers(
                                                        availablePlayers.map(
                                                            y => ({
                                                                name: y.name,
                                                                fighter: y.name === x.name && x.checked
                                                                    ? ""
                                                                    : y.fighter,
                                                                checked: y.name === x.name
                                                                    ? !y.checked
                                                                    : y.checked
                                                                ,
                                                            })
                                                        )
                                                    );
                                                }
                                            }
                                        />
                                        {
                                            `${x.name} (${x.fighter.length > 0 ? x.fighter : "None"})`
                                        }
                                    </label>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
            </div>
            <div className="drawer-side">
                <label htmlFor="fighter-drawer" className="drawer-overlay" onClick={() => setDrawerOpen(false)}></label>
                <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <h2 className="text-lg font-bold mb-4">
                        Choose Fighter for {choosingForPlayer}
                    </h2>
                    {
                        availableFighters.map(
                            x => (
                                <label
                                    key={x.name}
                                    className="block mt-2"
                                >
                                    <input 
                                        type="checkbox"
                                        className="checkbox mr-2"
                                        checked={x.checked}
                                        onChange={
                                            () => {
                                                setAvailablePlayers(
                                                    availablePlayers.map(
                                                        y => ({
                                                            ...y,
                                                            fighter: y.name === choosingForPlayer
                                                                ? x.name
                                                                : y.fighter
                                                            ,
                                                        })
                                                    )
                                                );
                                                setAvailableFighters(
                                                    availableFighters.map(
                                                        y => ({
                                                            name: y.name,
                                                            checked: y.name === x.name,
                                                        })
                                                    )
                                                );
                                                setDrawerOpen(false);
                                            }
                                        }
                                    />
                                    {x.name}
                                </label>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
};