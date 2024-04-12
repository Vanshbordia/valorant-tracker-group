export const runtime = 'edge';

export const revalidate = 3600;

import grouids from "@/player.json";

export async function GET() {
    const puuidArray = grouids.puuid;
    const allMatches = []; // Array to store all match data

    for (const puuid of puuidArray) {
        const response = await fetch(`https://ap.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}?api_key=${process.env.riotAPI}`, { cache: 'no-store' });
        const matchData = await response.json();

        // Add matches from history to allMatches array
        allMatches.push(...matchData.history);
    }

    // Remove duplicates based on matchId
    const uniqueMatches = allMatches.filter((match, index, self) =>
        index === self.findIndex((m) => (
            m.matchId === match.matchId
        ))
    );

    // Sort uniqueMatches by gameStartTimeMillis in ascending order
    uniqueMatches.sort((b, a) => a.gameStartTimeMillis - b.gameStartTimeMillis);

    return Response.json({ uniqueMatches });
}
