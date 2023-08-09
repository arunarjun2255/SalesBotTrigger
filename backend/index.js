const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


// const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());


// const app = express();
app.use(bodyParser.json());

const orchestratorUrl = 'https://cloud.uipath.com'; // Replace with your UiPath Orchestrator URL
const clientId = '8DEv1AMNXczW3y4U15LL3jYf62jK93n5'; // Replace with your Client ID


const startJob = async (accessToken, releaseKey, headers) => {
  try {
    const response = await axios.post(
      "https://cloud.uipath.com/aswatbicxtzp/DefaultTenant/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs",

      // `${orchestratorUrl}/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs`,
      {
        startInfo: {
          ReleaseKey: releaseKey,
          Strategy: 'Specific',
          JobsCount: 1,
          RobotIds: '943323',
          InputArguments: '{\"str_CompanyName\":\"Dular Distribution\",\"str_Month\":\"May\",\"str_Year\":\"2023\",\"str_Type\":\"Sales\",\"str_StorageBucketFile\":\"salesmay24_c6e3533ee22140e68c6f73e24be67fef.zip\"}',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          ...headers,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error starting the job:', error);
    throw error;
  }
};

app.post('/runBot', async (req, res) => {
  try {
    const { accessToken, releaseKey, headers } = req.body;

    // Start the bot job
    const jobResponse = await startJob(accessToken, releaseKey, headers);

    res.json({ success: true, jobResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to start the robot job.' });
  }
});

const PORT = 5000; // Replace with your desired port number
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// This Connect backend Testing

app.get("/", (req, res) => {
  res.json("Backend working")
})