import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
};

export const Setup: React.FC<SetupProps> = ({
    setTitle,
}) => {

    setTitle("Choose players & fighters");

    // We'll write code here...
    const nav = useNavigate();


    // Then return JSX...
    return (
        <section className="app-panel rounded-[2rem] px-6 py-7 sm:px-8 sm:py-8">
            <div className="max-w-3xl space-y-5">
                <div className="badge badge-secondary badge-outline badge-lg">
                    Table setup
                </div>
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                    Get the next match ready.
                </h1>
                <p className="app-kicker text-base sm:text-lg">
                    This screen now shares the same light and dark mood as the dashboard, with the accent colors carried through the primary actions.
                </p>
                <button
                    className="btn btn-primary btn-lg app-glow w-full sm:w-auto"
                    onClick={
                        () => nav('/play')
                    }
                >
                    Start the Game
                </button>
            </div>
        </section>
    );
};