//
// Exported type definitions...
//
type ConnectFourColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type GameResult = {
    winner: string;
    players: string[];

    start: string;
    end: string;

    firstMove: ConnectFourColumn;
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
        lastPlayed: `${mostRecentlyPlayedInMilliseconds / 1000 / 60 / 60/ 24} days ago`,
        totalGames: games.length,
        shortestGame: `${Math.min(...gameDurationsInMilliseconds) / 1000 / 60} minutes`,
        longestGame: `${Math.max(...gameDurationsInMilliseconds) / 1000 / 60} minutes`,
    };
};

export const getMostPopularFirstMove = (
    games: GameResult[]
): string => {

    if (!games || games.length === 0) {
    return "N/A";
  }

  const groupedMoves = Map.groupBy(games, game => game.firstMove);

  const maxCount = Math.max(...Array.from(groupedMoves.values()).map(g => g.length));
  
  const mostPopularMoves = Array.from(groupedMoves.entries())
    .filter(([_, gamesWithMove]) => gamesWithMove.length === maxCount)
    .sort(([moveA], [moveB]) => moveA - moveB)
    .map(([move, gamesWithMove]) => `Column ${move} (${gamesWithMove.length})`)
    .join(", ");

  return mostPopularMoves;
}

export type GamesPlayedLeaderboardEntry = {
    player: string;
    gamesPlayed: number;
};

export const getGamesPlayedLeaderboard = (games: GameResult[]): GamesPlayedLeaderboardEntry[] => {
    const counts = new Map<string, number>();

    for (const game of games) {
        for (const player of game.players) {
            counts.set(player, (counts.get(player) ?? 0) + 1);
        }
    }

    return Array.from(counts.entries())
        .map(([player, gamesPlayed]) => ({ player, gamesPlayed }))
        .sort((a, b) => b.gamesPlayed - a.gamesPlayed || a.player.localeCompare(b.player));
};

//
// Helper funcs...
//