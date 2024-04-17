// const express = require('express');
// const server = express();

// server.all(`/`, (req, res) => {
//     res.send(`
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Kyowa-Bot Smeksa</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f0f0f0;
//             margin: 0;
//             padding: 0;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//             overflow: hidden;
//             position: relative;
//         }
//         .container {
//             text-align: center;
//             z-index: 2;
//         }
//         h1 {
//             color: #f0f0f0;
//         }
//         p {
//             color: #f0f0f0;
//         }
//         .floating-shape {
//             width: 50px;
//             height: 50px;
//             background-color: #3498db;
//             position: absolute;
//             filter: blur(100px); /* Menerapkan efek blur */
//         }
//         @keyframes float {
//             from {
//                 transform: rotate(0deg) translateY(0);
//             }
//             to {
//                 transform: rotate(360deg) translateY(-100vh);
//             }
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <h1>Kyowa-Bot Smeksa Aktif</h1>
//         <p>Selamat datang di Kyowa-Bot Smeksa!</p>
//     </div>
//     <script>
//         const container = document.querySelector('body');

//         // Jumlah objek yang ingin ditampilkan
//         const numberOfShapes = 10;

//         for (let i = 0; i < numberOfShapes; i++) {
//             const shape = document.createElement('div');
//             shape.className = 'floating-shape';
//             shape.style.width = '500px';
//             shape.style.height = '500px';
//             shape.style.backgroundColor = '#3498db';
//             shape.style.position = 'absolute';
//             shape.style.borderRadius = '50%'; // Membuat bentuknya menjadi lingkaran
//             shape.style.left = Math.random() * 100 + 'vw'; // Posisi horizontal acak
//             shape.style.animation = 'float ' + (Math.random() * 5 + 1) + 's infinite linear alternate'; // Durasi animasi acak antara 1 dan 6 detik
//             container.appendChild(shape);
//         }
//     </script>
// </body>
// </html>


//     `);
// });

// function keepAlive() {
//     server.listen(3000, () => {
//         console.log(`24/7 Activation Complete`);
//     });
// }

// module.exports = keepAlive;

//============================

const express = require('express');
const server = express();

server.all(`/`, (req, res) => {
    res.send(`Kyowa Bot Smeksa Aktif`);
});

function keepAlive() {
    server.listen(3000, () => {
        console.log(`24/7 Activation Complete`);
    });
}

module.exports = keepAlive;
