// URLs to fetch the latest data from ThingSpeak channels
const heartRateURL = 'https://api.thingspeak.com/channels/2771994/fields/1.json?api_key=TAMKF0RXJEQPI6RR&results=1';
const spo2URL = 'https://api.thingspeak.com/channels/2771994/fields/2.json?api_key=TAMKF0RXJEQPI6RR&results=1';
const flowRateURL = 'https://api.thingspeak.com/channels/2771994/fields/3.json?api_key=TAMKF0RXJEQPI6RR&results=1';

// Function to fetch and update live data from ThingSpeak
async function fetchData() {
    try {
        // Send asynchronous requests to ThingSpeak for each data field
        const [hrResponse, spo2Response, flowResponse] = await Promise.all([
            fetch(heartRateURL), // Fetch heart rate data
            fetch(spo2URL),      // Fetch SpO2 data
            fetch(flowRateURL)   // Fetch flow rate data
        ]);

        // Convert responses to JSON
        const hrData = await hrResponse.json();
        const spo2Data = await spo2Response.json();
        const flowData = await flowResponse.json();

        // Extract the latest values or fallback to '--'
        const heartRate = hrData.feeds.length ? hrData.feeds[0].field1 || '--' : '--';
        const spo2 = spo2Data.feeds.length ? spo2Data.feeds[0].field2 || '--' : '--';
        const flowRate = flowData.feeds.length ? flowData.feeds[0].field3 || '--' : '--';

        // Update the webpage with the fetched data
        document.getElementById('heart-rate').textContent = heartRate;
        document.getElementById('spo2-levels').textContent = spo2;
        document.getElementById('flow-rate').textContent = flowRate;
    } catch (error) {
        // Log errors if any occur during data fetch
        console.error('Error fetching data:', error);
    }
}

// Fetch data every 2 seconds
setInterval(fetchData, 2000);

// Fetch data immediately when the page loads
fetchData();
