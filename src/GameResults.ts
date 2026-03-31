import { durationFormatter } from 'human-readable';

//
// Exported type definitions...
//
export type Player = {
    name: string,
    fighter: string,
};

export type GameResult = {
    winner: string;
    players: Player[];

    start: string;
    end: string;
};

export type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: string;
    name: string;
};

export type GeneralFacts = {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
};

//
// Exported funcs...
//
export const getGeneralFacts = (games: GameResult[]): GeneralFacts => {

    if (games.length === 0) {
        return {
            lastPlayed: "N/A",
            totalGames: 0,
            shortestGame: "N/A",
            longestGame: "N/A",
        };
    }

    const now = Date.now();

    const gamesLastPlayedAgoInMilliseconds = games.map(
        x => now - Date.parse(x.end)
    );

    const mostRecentlyPlayedInMilliseconds = Math.min(
        ...gamesLastPlayedAgoInMilliseconds
    );

    const gameDurationsInMilliseconds = games.map(
        x => Date.parse(x.end) - Date.parse(x.start)
    );

    // console.log(
    //     gamesLastPlayedAgoInMilliseconds
    // );

    return {
        lastPlayed: `${formatLastPlayed(
            mostRecentlyPlayedInMilliseconds
        )} ago`,
        totalGames: games.length,
        shortestGame: formatGameDuration(
            Math.min(
                ...gameDurationsInMilliseconds
            ),
         ),
        longestGame: formatGameDuration(
            Math.max(
                ...gameDurationsInMilliseconds
            ),
         ),         
    };
};

export const getLeaderboard = (
    games: GameResult[]
): LeaderboardEntry[] => getPreviousPlayers(games)
    .map(
        x => ({
            ...getLeaderboardEntry(
                games,
                x,
            )
        })
    )
    .sort(
        (a, b) => a.avg == b.avg
            ? a.wins == 0 && b.wins == 0
                ? (a.wins + a.losses) - (b.wins + b.losses)
                : (b.wins + b.losses) - (a.wins + a.losses)
            : Number.parseFloat(b.avg) - Number.parseFloat(a.avg)
    )
;

export const getPreviousPlayers = (
    games: GameResult[]
) => games 
    .flatMap(
        x => x.players
    )
    .map(
        x => x.name
    )
    .filter(
        (x, i, a) => i == a.findIndex(
            y => y == x
        )
    )
    .sort(
        (a, b) => a.localeCompare(b)
    )
;

export const getFighterLeaderboard = (
    games: GameResult[]
): LeaderboardEntry[] => getPreviousFighters(games)
    .map(
        x => ({
            ...getFighterLeaderboardEntry(
                games,
                x,
            )
        })
    )
    .sort(
        (a, b) => a.avg == b.avg
            ? a.wins == 0 && b.wins == 0
                ? (a.wins + a.losses) - (b.wins + b.losses)
                : (b.wins + b.losses) - (a.wins + a.losses)
            : Number.parseFloat(b.avg) - Number.parseFloat(a.avg)
    )
;

export const getPreviousFighters = (
    games: GameResult[]
) => games 
    .flatMap(
        x => x.players
    )
    .map(
        x => x.fighter
    )
    .filter(
        (x, i, a) => i == a.findIndex(
            y => y == x
        )
    )
    .sort(
        (a, b) => a.localeCompare(b)
    )
;

export type PlayerFighterCell = {
    player: string;
    fighter: string;
    wins: number;
    losses: number;
    games: number;
};

export type PlayerFighterMatrix = {
    players: string[];
    fighters: string[];
    cells: PlayerFighterCell[];
    maxGames: number;
};

export const getPlayerFighterMatrix = (games: GameResult[]): PlayerFighterMatrix => {
    const allPlayers = getPreviousPlayers(games);
    const allFighters = getPreviousFighters(games);

    const cells: PlayerFighterCell[] = allPlayers.flatMap(player =>
        allFighters.map(fighter => {
            const matching = games.filter(g =>
                g.players.some(p => p.name === player && p.fighter === fighter)
            );
            const wins = matching.filter(g => g.winner === player).length;
            return { player, fighter, wins, losses: matching.length - wins, games: matching.length };
        })
    );

    const maxGames = Math.max(...cells.map(c => c.games), 1);

    return {
        players: [...allPlayers].sort((a, b) => a.localeCompare(b)),
        fighters: [...allFighters].sort((a, b) => a.localeCompare(b)),
        cells,
        maxGames,
    };
};

//
// Helper funcs...
//
const getFighterLeaderboardEntry = (
    games: GameResult[],
    fighter: string,
): LeaderboardEntry => {

    const countOfWins = games.filter(
        x => x.players.some(
            y => y.fighter == fighter && y.name == x.winner
        )
    ).length;

    const totalGames = games.filter(
        x => x.players.some(
            y => y.fighter == fighter
        )
    ).length;

    const avg = totalGames > 0
        ? countOfWins / totalGames
        : 0
    ;

    return {
        wins: countOfWins,
        losses: totalGames - countOfWins,
        avg: `${avg.toFixed(3)}`,
        name: fighter,
    };
};

//
const formatGameDuration = durationFormatter<string>();

const formatLastPlayed = durationFormatter<string>(
    {
        allowMultiples: [
            "y",
            "mo",
            "d",
        ],
    }
);

const getLeaderboardEntry = (
    games: GameResult[],
    player: string,
): LeaderboardEntry => {

    const countOfWins = games.filter(
        x => x.winner == player
    ).length;

    const totalGames = games.filter(
        x => x.players.some(
            y => y.name == player
        )
    ).length;

    const avg = totalGames > 0
        ? countOfWins / totalGames
        : 0
    ;

    return {
        wins: countOfWins,
        losses: totalGames - countOfWins,
        avg: `${avg.toFixed(3)}`,
        name: player

    };
};
