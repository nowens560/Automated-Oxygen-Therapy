// These URLs will fetch the latest data from ThingSpeak channels for heart rate, SpO2, and flow rate
const heartRateURL = 'https://api.thingspeak.com/channels/2771994/fields/1.json?api_key=TAMKF0RXJEQPI6RR&results=1';
const spo2URL = 'https://api.thingspeak.com/channels/2771994/fields/2.json?api_key=TAMKF0RXJEQPI6RR&results=1';
const flowRateURL = 'https://api.thingspeak.com/channels/2771994/fields/3.json?api_key=TAMKF0RXJEQPI6RR&results=1';

// Function to get and update live data from ThingSpeak
async function fetchData() {
    try {
        // Send asynchronous requests to ThingSpeak for each data field
        const [hrResponse, spo2Response, flowResponse] = await Promise.all([
            fetch(heartRateURL),  // Fetch heart rate data
            fetch(spo2URL),        // Fetch SpO2 data
            fetch(flowRateURL)     // Fetch flow rate data
        ]);

        // Convert the API responses to JSON format
        const hrData = await hrResponse.json();    // Heart rate data
        const spo2Data = await spo2Response.json(); // SpO2 data
        const flowData = await flowResponse.json(); // Flow rate data

        // Extract the latest values from the response or set to '--' if data is unavailable
        const heartRate = hrData.feeds[0].field1 || '--'; // Get heart rate or fallback to '--'
        const spo2 = spo2Data.feeds[0].field2 || '--';   // Get SpO2 level or fallback to '--'
        const flowRate = flowData.feeds[0].field3 || '--'; // Get flow rate or fallback to '--'

        // Update the DOM with the fetched data to display on the webpage
        document.getElementById('heart-rate').textContent = heartRate;  // Update heart rate on webpage
        document.getElementById('spo2-levels').textContent = spo2;      // Update SpO2 level on webpage
        document.getElementById('flow-rate').textContent = flowRate;    // Update flow rate on webpage
    } catch (error) {
        // If there's an error with the fetch or data processing, log the error
        console.error('Error fetching data:', error);
    }
}

// Set an interval to fetch data every 2 seconds (2000 milliseconds)
setInterval(fetchData, 2000);

// Call fetchData function initially to get the first set of data when the page loads
fetchData();
