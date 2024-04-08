export const runtime = 'edge';

import React from 'react';
import StatsPlayerRow from '@/components/StatsPlayerRow';


async function ParentComponent({ params }) {

    const matchResponse = await fetch(`https://ap.api.riotgames.com/val/match/v1/matches/${params.id}?api_key=${process.env.riotAPI}`);
    const matchData = await matchResponse.json();

    return (
        <div>
            {matchData && <StatsPlayerRow matchData={matchData} />}
        </div>
    );
}

export default ParentComponent;
