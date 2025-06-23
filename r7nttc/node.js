const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// Use environment variable for the GitHub token
const GITHUB_TOKEN = key.env.GITHUB_TOKEN; // Keep this secure
const repoOwner = 'kanereroma2343'; // Your GitHub username
const repoName = 'r7tesdata'; // Your repository name
const filePath = 'data.json'; // Path to the file in the repo

app.post('/saveData', async (req, res) => {
    const newData = req.body.data;

    // Get the current file's SHA
    const getFileResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}` // Token is now securely passed from environment variable
        }
    });
    const fileData = await getFileResponse.json();
    const sha = fileData.sha;

    // Save the modified data back to the GitHub repository
    const updateResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`, // Token is now securely passed from environment variable
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Update data.json',
            content: Buffer.from(newData).toString('base64'), // Base64 encode the new data
            sha: sha // Include the SHA of the existing file
        })
    });

    if (updateResponse.ok) {
        res.send('Data modified successfully!');
    } else {
        res.status(500).send('Error saving data');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});