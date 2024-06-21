const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/get_cookie', async (req, res) => {
    const { email, password } = req.query;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
    }

    try {
        const response = await axios.get('https://regional-emiline-anxiouston-f7431489.koyeb.app/get_cookie', {
            params: { email, password }
        });

        if (response.data.status === 'success') {
            res.json({ cookie: response.data.cookie, access_token: response.data.access_token });
        } else {
            res.status(400).json({ message: response.data.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
