import React from 'react';
import Link from 'next/link'
export default async function Page() {
  const response = await fetch("http://localhost:3000/api/matchlist");
  const data = await response.json(); // Parse JSON data
  const matchlist = data.uniqueMatches; // Access uniqueMatches array

  return (
    <div className='flex flex-col gap-2'>
      {matchlist.map(match => (
        <MatchCard key={match.matchId} match={match} />
      ))}
    </div>
  );
}



function MatchCard({ match }) {
  const gameStartTime = new Date(match.gameStartTimeMillis);

  return (

    <Link href={`/matches/${match.matchId}`}>
      <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100">
        <h3 className="text-xl font-bold">Match ID: {match.matchId}</h3>
        <p className="text-sm text-gray-500">Date: {gameStartTime.toLocaleString()}</p>
        <p>{match.queueId}</p>
      </div>
    </Link>

  );
}
