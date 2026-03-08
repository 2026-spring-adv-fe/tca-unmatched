import { useNavigate } from "react-router";

export const Setup = () => {

    // We'll write code here...
    const nav = useNavigate();

    // Then return JSX...
    return (
        <div
            className="py-3"
        >
            <button 
                className="btn btn-soft btn-lg w-full lg:w-64"
                onClick={
                    () => nav('/play')
                }
            >
                Start the Game
            </button>
        </div>
    );
};