export const runtime = 'edge';
export async function GET(request, { params }) {
    // Fetch the mapping data from the secondary API
    const mappingDataResponse = await fetch('https://valorant-tracker-group.pages.dev/api/map');
    const mappingData = await mappingDataResponse.json();

    // Find the UUID corresponding to the provided map name
    const mapName = params.id; // Assuming the map name is provided as 'name' parameter
    const uuid = mappingData[mapName]?.uuid; // Using optional chaining in case mapName is not found

    if (!uuid) {
        return new Response("Map not found", { status: 404 });
    }

    // Fetch data for the map using the UUID
    const mapDataResponse = await fetch(`https://valorant-api.com/v1/maps/${uuid}`);
    const mapData = await mapDataResponse.json();

    // Prepare response object
    const mres = {
        "uuid": mapData.data["uuid"],
        "displayName": mapData.data["displayName"],
        "mapUrl": mapData.data["mapUrl"],
        "listViewIconTall": mapData.data["listViewIconTall"],
        "listViewIcon": mapData.data["splash"],
    };

    return new Response(JSON.stringify(mres));
}
