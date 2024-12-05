// URLs to fetch the latest data from ThingSpeak channels
const heartRateURL = 'https://api.thingspeak.com/channels/2771994/fields/1.json?api_key=TAMKF0RXJEQPI6RR&results=1';
const spo2URL = 'https://api.thingspeak.com/channels/2771994/fields/2.json?api_key=TAMKF0RXJEQPI6RR&results=1';
const flowRateURL = 'https://api.thingspeak.com/channels/2771994/fields/3.json?api_key=TAMKF0RXJEQPI6RR&results=1';

// Fetch and update data from ThingSpeak
async function fetchData() {
    try {
        // Fetch data from ThingSpeak for all fields
        const [hrResponse, spo2Response, flowResponse] = await Promise.all([
            fetch(heartRateURL),
            fetch(spo2URL),
            fetch(flowRateURL)
        ]);

        // Convert the responses to JSON
        const hrData = await hrResponse.json();
        const spo2Data = await spo2Response.json();
        const flowData = await flowResponse.json();

        // Check if data is available
        if (hrData.feeds.length > 0 && spo2Data.feeds.length > 0 && flowData.feeds.length > 0) {
            // Extract data from the response
            const heartRate = hrData.feeds[0].field1 || '--';
            const spo2 = spo2Data.feeds[0].field2 || '--';
            const flowRate = flowData.feeds[0].field3 || '--';

            // Update HTML with the fetched data
            document.getElementById('heart-rate').textContent = heartRate;
            document.getElementById('spo2-levels').textContent = spo2;
            document.getElementById('flow-rate').textContent = flowRate;
        } else {
            console.error('No data available from ThingSpeak.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch data every 2 seconds
setInterval(fetchData, 2000);

// Fetch data immediately when the page loads
fetchData();
