const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const url = 'https://mpr-noel.romain-ecarnot.com';
const outputPath = path.join(__dirname, '..', 'maquette', 'qrcode.png');

QRCode.toFile(
  outputPath,
  url,
  {
    width: 2000,
    margin: 4,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    errorCorrectionLevel: 'H' // Haute correction d'erreur
  },
  function (err) {
    if (err) {
      console.error('Erreur lors de la génération du QR code:', err);
      process.exit(1);
    }
    console.log('✅ QR code généré avec succès:', outputPath);
  }
);

