import { describe, it, expect } from 'vitest';
import {
    getGeneralFacts,
    getMostPopularFirstMove,
    getGamesPlayedLeaderboard,
    type GameResult,
} from './GameResults';

const makeGame = (
    overrides: Partial<GameResult> & { start: string; end: string }
): GameResult => ({
    winner: 'Alice',
    players: ['Alice', 'Bob'],
    firstMove: 4,
    ...overrides,
});

//
// getGeneralFacts
//
describe('getGeneralFacts', () => {
    it('returns N/A values for empty games array', () => {
        const result = getGeneralFacts([]);
        expect(result).toEqual({
            lastPlayed: 'N/A',
            totalGames: 0,
            shortestGame: 'N/A',
            longestGame: 'N/A',
        });
    });

    it('returns correct totalGames count', () => {
        const games = [
            makeGame({ start: '2024-01-01T10:00:00Z', end: '2024-01-01T10:05:00Z' }),
            makeGame({ start: '2024-01-01T11:00:00Z', end: '2024-01-01T11:10:00Z' }),
        ];
        expect(getGeneralFacts(games).totalGames).toBe(2);
    });

    it('returns correct shortest and longest game durations', () => {
        const games = [
            makeGame({ start: '2024-01-01T10:00:00Z', end: '2024-01-01T10:05:00Z' }), // 5 min
            makeGame({ start: '2024-01-01T11:00:00Z', end: '2024-01-01T11:20:00Z' }), // 20 min
        ];
        const result = getGeneralFacts(games);
        expect(result.shortestGame).toBe('5 minutes');
        expect(result.longestGame).toBe('20 minutes');
    });

    it('returns same shortest and longest for a single game', () => {
        const games = [
            makeGame({ start: '2024-01-01T10:00:00Z', end: '2024-01-01T10:10:00Z' }), // 10 min
        ];
        const result = getGeneralFacts(games);
        expect(result.shortestGame).toBe('10 minutes');
        expect(result.longestGame).toBe('10 minutes');
    });
});

//
// getMostPopularFirstMove
//
describe('getMostPopularFirstMove', () => {
    it('returns N/A for empty or null input', () => {
        expect(getMostPopularFirstMove([])).toBe('N/A');
    });

    it('returns the single most popular column', () => {
        const games = [
            makeGame({ start: '2024-01-01T10:00:00Z', end: '2024-01-01T10:05:00Z', firstMove: 4 }),
            makeGame({ start: '2024-01-01T11:00:00Z', end: '2024-01-01T11:05:00Z', firstMove: 4 }),
            makeGame({ start: '2024-01-01T12:00:00Z', end: '2024-01-01T12:05:00Z', firstMove: 3 }),
        ];
        expect(getMostPopularFirstMove(games)).toBe('Column 4 (2)');
    });

    it('returns tied columns sorted numerically', () => {
        const games = [
            makeGame({ start: '2024-01-01T10:00:00Z', end: '2024-01-01T10:05:00Z', firstMove: 6 }),
            makeGame({ start: '2024-01-01T11:00:00Z', end: '2024-01-01T11:05:00Z', firstMove: 2 }),
        ];
        expect(getMostPopularFirstMove(games)).toBe('Column 2 (1), Column 6 (1)');
    });

    it('handles a single game', () => {
        const games = [
            makeGame({ start: '2024-01-01T10:00:00Z', end: '2024-01-01T10:05:00Z', firstMove: 1 }),
        ];
        expect(getMostPopularFirstMove(games)).toBe('Column 1 (1)');
    });
});

//
// getGamesPlayedLeaderboard
//
describe('getGamesPlayedLeaderboard', () => {
    it('returns empty array for no games', () => {
        expect(getGamesPlayedLeaderboard([])).toEqual([]);
    });

    it('counts each player across all games', () => {
        const games = [
            makeGame({ start: '2024-01-01T10:00:00Z', end: '2024-01-01T10:05:00Z', players: ['Alice', 'Bob'] }),
            makeGame({ start: '2024-01-01T11:00:00Z', end: '2024-01-01T11:05:00Z', players: ['Alice', 'Charlie'] }),
        ];
        const result = getGamesPlayedLeaderboard(games);
        expect(result).toEqual([
            { player: 'Alice', gp: 2 },
            { player: 'Bob', gp: 1 },
            { player: 'Charlie', gp: 1 },
        ]);
    });

    it('sorts by gp descending, then player name ascending on tie', () => {
        const games = [
            makeGame({ start: '2024-01-01T10:00:00Z', end: '2024-01-01T10:05:00Z', players: ['Zara', 'Alice'] }),
            makeGame({ start: '2024-01-01T11:00:00Z', end: '2024-01-01T11:05:00Z', players: ['Bob', 'Alice'] }),
            makeGame({ start: '2024-01-01T12:00:00Z', end: '2024-01-01T12:05:00Z', players: ['Zara', 'Bob'] }),
        ];
        const result = getGamesPlayedLeaderboard(games);
        expect(result[0]).toEqual({ player: 'Alice', gp: 2 });
        expect(result[1]).toEqual({ player: 'Bob', gp: 2 });   // tie: Bob < Zara
        expect(result[2]).toEqual({ player: 'Zara', gp: 2 });
    });
});
