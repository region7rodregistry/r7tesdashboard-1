// api/saveData.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newData = req.body.data;

        // Define the path to your data.json file
        const filePath = path.join(process.cwd(), 'data.json');

        // Write the new data to the file
        fs.writeFile(filePath, newData, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing to file' });
            }
            res.status(200).json({ message: 'Data modified successfully!' });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
