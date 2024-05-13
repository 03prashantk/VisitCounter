// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    // render html page 
    try {
        const url = "https://camo.githubusercontent.com/549e995f3c98af291f239a6daa6daceb3217da67d00ff900c159ed19e9448c5b/68747470733a2f2f6b6f6d617265762e636f6d2f67687076632f3f757365726e616d653d30337072617368616e74706b26636f6c6f723d666630303030266c6162656c3d57656c636f6d652c2b506c656173652b436f6d652b496e2b56697369746f72";
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch SVG');
        }
        const svgContent = await response.text();
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>SVG Image</title>
                <script> 
                    // reload window after 5 seconds
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                </script>
            </head>
            <body>
                <div>
                    ${svgContent}
                </div>
            </body>
            </html>
        `);
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }

});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
