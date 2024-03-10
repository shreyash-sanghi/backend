async function getDistance(lat1, lon1, lat2, lon2) {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            const distance = data.rows[0].elements[0].distance.text;
            return distance;
        } else {
            throw new Error('Failed to retrieve distance');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
