//
// Exported type definitions...
//
export type ConnectFourColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type GameResult = {
    winner: string;
    players: string[];

    start: string;
    end: string;

    firstMoveColumn: ConnectFourColumn;
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

export const getMostPopularFirstMoveColumn = (
  games: GameResult[],
): string => {
  const firstMoveColumns = games.map(x => x.firstMoveColumn);

  const grouped = Map.groupBy(firstMoveColumns, (column) => column);

  if (grouped.size === 0) return "";

  const maxCount = Math.max(...Array.from(grouped.values(), (cols) => cols.length));

  return Array.from(grouped.entries())
    .filter(([, cols]) => cols.length === maxCount)
    .sort(([a], [b]) => a - b)
    .map(([column, cols]) => `Column ${column} (${cols.length})`)
    .join(", ");
}

//
// Helper funcs...
//