"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import valorantplayergroup from '@/player.json'
export default function StatsPlayerRow({ matchData }) {
    const sortedPlayers = matchData.players.sort((a, b) => b.stats.score - a.stats.score);
    const ourplayer = sortedPlayers.filter(player => valorantplayergroup.puuid.includes(player.puuid));
    const ourteam = ourplayer[0].teamId;
    let didWin;
    if (ourteam === "Red") {
        didWin = matchData.teams[0].won;
    } else if (ourteam === "Blue") {
        didWin = matchData.teams[1].won;
    } else {
        didWin = false;
    }
    console.log(didWin)
    const mapUrlParts = matchData.matchInfo.mapId.split('/');
    const lastName = mapUrlParts[mapUrlParts.length - 1];

    const titles = [' ', 'Game Name', 'Rank', 'Score', 'KDA'];
    return (
        <>
            <div className="w-full h-56 text-5xl font-bold flex flex-row align-middle justify-center relative bg-black">
                <img src={GetMap(lastName)} className="absolute inset-0 w-full h-full object-cover opacity-50 bg-black" />
                <div className="absolute inset-0 flex items-center justify-center text-white  flex-col gap-2">
                    {ourteam === "Blue" ? (
                        <p>{matchData.teams[1].roundsWon}:{matchData.teams[0].roundsWon}</p>
                    ) : (
                        <p>{matchData.teams[0].roundsWon}:{matchData.teams[1].roundsWon}</p>
                    )}
                    {didWin ? (
                        <p className='text-base'>Won</p>
                    ) : (
                        <p className='text-base'>Lost</p>
                    )}
                </div>
            </div>


            <table className="divide-gray-200 overflow-scroll w-full">
                <thead>
                    <tr>
                        {/* Render titles */}
                        {titles.map((title, index) => (
                            <th key={index} className="px-4 py-2 bg-gray-100 font-semibold text-gray-800 ">
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Render player stats */}
                    {sortedPlayers.map((player, index) => (
                        <tr key={index} className={player.teamId === 'Blue' ? 'bg-green-100' : 'bg-red-100'}>
                            <td className="px-1 py-2 border-t "><img src={GetImage(player.characterId)} className="w-10 h-10 aspect-square min-w-fit" alt="" /></td>
                            <td className="px-2 py-2 border-t  ">{player.gameName}</td>
                            <td className="px-1 py-2 border-t text-center">{MapCompetitiveTierToRank(player.competitiveTier)}</td>
                            <td className="px-1 py-2 border-t text-center">{player.stats.score}</td>
                            <td className="px-1 py-2 border-t  text-center">{player.stats.kills} / {player.stats.deaths} / {player.stats.assists} </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <table className="divide-gray-200 overflow-scroll">
                <thead>
                    <tr>
                        {/* Render titles */}
                        {titles.map((title, index) => (
                            <th key={index} className="px-4 py-2 bg-gray-100 font-semibold text-gray-800">
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Render player stats */}
                    {ourplayer.map((player, index) => (
                        <tr key={index} className={player.teamId === 'Blue' ? 'bg-green-100' : 'bg-red-100'}>
                            <td className="px-1 py-2 border-t border-l border-gray-200"><img src={GetImage(player.characterId)} className="w-10 h-10 aspect-square min-w-fit" alt="" /></td>
                            <td className="px-2 py-2 border-t border-l border-gray-200">{player.gameName}</td>
                            <td className="px-1 py-2 border-t text-center">{MapCompetitiveTierToRank(player.competitiveTier)}</td>
                            <td className="px-1 py-2 border-t border-l border-gray-200">{player.stats.score}</td>
                            <td className="px-1 py-2 border-t border-l border-gray-200">{player.stats.kills} / {player.stats.deaths} / {player.stats.assists}</td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='flex flex-col gap-2'>
                <p>Top Fragger: <span>{ourplayer[0].gameName}</span></p>
                <p>Bottom Fragger: <span>{ourplayer[ourplayer.length - 1].gameName}</span></p>
            </div>
        </>
    )
}

function MapCompetitiveTierToRank(tier) {
    const rankRanges = {
        0: "Unranked",
        1: "Unranked",
        2: "Unranked",
        3: "Iron 1",
        4: "Iron 2",
        5: "Iron 3",
        6: "Bronze 1",
        7: "Bronze 2",
        8: "Bronze 3",
        9: "Silver 1",
        10: "Silver 2",
        11: "Silver 3",
        12: "Gold 1",
        13: "Gold 2",
        14: "Gold 3",
        15: "Platinum 1",
        16: "Platinum 2",
        17: "Platinum 3",
        18: "Diamond 1",
        19: "Diamond 2",
        20: "Diamond 3",
        21: "Diamond 3", // Ascendant rank
        22: "Diamond 2", // Ascendant rank
        23: "Diamond 1", // Ascendant rank
        24: "Immortal 1",
        25: "Immortal 2",
        26: "Immortal 3",
        27: "Radiant",
    };

    return rankRanges[tier] || "Unknown Rank";
}

export function GetImage(characterId) {
    const [agentData, setAgentData] = useState(null);
    useEffect(() => {
        fetch(`https://valorant-api.com/v1/agents/${characterId}`)
            .then(response => response.json())
            .then(data => {

                setAgentData(data.data.displayIcon);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (agentData)
}


export function GetMap(mapid) {
    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        fetch(`https://valorant-tracker-group.pages.dev/api/map/${mapid}`)
            .then(response => response.json())
            .then(data => {
                setMapData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [mapid]); // Dependency array ensures the effect runs when mapid changes

    // Return mapData['listViewIcon'] if mapData is not null, otherwise return null
    return mapData ? mapData['listViewIcon'] : null;
}