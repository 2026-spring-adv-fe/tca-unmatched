import { useNavigate } from "react-router";

export const Setup = () => {

    // We'll write code here...
    const nav = useNavigate();

    // Then return JSX...
    return (
        <>
            <button 
                className="btn btn-lg btn-soft w-full lg:w-64"
                onClick={
                    () => nav('/play')
                }
            >
                Start the Game
            </button>
        </>
    );
};