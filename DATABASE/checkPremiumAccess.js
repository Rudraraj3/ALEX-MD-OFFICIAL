const axios = require('axios');

// URL of the premium.json file hosted on GitHub
const premiumJsonUrl = 'https://github.com/ALEX-ID-LK/PRIMIUM-ALEX-MD/raw/main/premium.json';


async function checkPremiumAccess(senderNumber) {
    try {
        // Fetch the premium.json file from the URL
        const response = await axios.get(premiumJsonUrl);
        const premiumUsers = response.data; // Assuming the data is a JSON array of premium user numbers

        // Check if the sender's number is in the premium users list
        return premiumUsers.includes(senderNumber);
    } catch (error) {
        console.error('Error fetching premium.json:', error);
        return false; // Return false if there's an error
    }
}

module.exports = checkPremiumAccess;
