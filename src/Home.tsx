import { useNavigate } from "react-router";
import type { GeneralFacts } from "./GameResults";

type HomeProps = {
    generalFacts: GeneralFacts;
    popularMove: string;
};


export const Home: React.FC<HomeProps> = ({
    generalFacts,
    popularMove
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
        </>
    );
};