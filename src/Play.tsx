import { useNavigate } from "react-router";
import type { GameResult } from "./GameResults";
import { useState } from "react";

type PlayProps = {
    addNewGameResult: (g: GameResult) => void;
    setTitle: (t: string) => void;
};

export const Play: React.FC<PlayProps> = ({
    addNewGameResult,
    setTitle,
}) => {

    setTitle("Play");

    // We'll write code here...
    const nav = useNavigate();
    const [startTimestamp] = useState(new Date().toISOString());

    // Then return JSX...
    return (
        <section className="app-panel rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
            <div className="max-w-3xl space-y-5">
                <div className="badge badge-primary badge-outline badge-lg">
                    Live session
                </div>
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                    Close out the match when the dust settles.
                </h1>
                <p className="app-kicker text-base sm:text-lg">
                    The primary button keeps the warm highlight tone in both modes so your main action never disappears into the background.
                </p>
                <button
                    className="btn btn-primary btn-lg app-glow w-full sm:w-auto"
                    onClick={
                        () => {
                            addNewGameResult({
                                winner: "Snape",
                                players: [
                                    "Snape",
                                    "Dumbledore",
                                ],
                                start: startTimestamp,
                                end: new Date().toISOString(),
                            });
                            nav(-2);
                        }
                    }
                >
                    Game Over
                </button>
            </div>
        </section>
    );
};