export async function GET() {
    try {
        const response = await fetch(`https://valorant-api.com/v1/maps`);
        const data = await response.json();

        // Constructing an object to hold the desired information
        const result = {};

        data.data.forEach(item => {
            const mapUrlParts = item.mapUrl.split('/');
            const lastName = mapUrlParts[mapUrlParts.length - 1];
          
            // Storing the display name and full map URL for each last name
            result[lastName] = {
                displayName: item.displayName,
                mapUrl: item.mapUrl,
                shortNme: lastName,
                uuid: item.uuid
            };
        });

        // Returning the constructed object as JSON response
        return new Response(JSON.stringify(result), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
    }
}
