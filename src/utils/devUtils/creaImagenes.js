const sharp = require('sharp');
const fs = require('fs').promises;

async function generateImage(text, outputPath) {
    const size = 200; 
    
    const image = sharp({
        create: {
            width: size,
            height: size,
            channels: 4  
        }
    });

    await image
        .png() 
        .composite([{
            input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><text x="25%" y="25%" dominant-baseline="middle" text-anchor="middle" font-size="10" fill="black">${text}</text></svg>`),
            left: 0,
            top: 0
        }])
        .toFile(outputPath); 
}

async function generateProductImages(productIndex) {
    const productImagesDir = 'product_images';
    await fs.mkdir(productImagesDir, { recursive: true });

    for (let i = 0; i < 3; i++) {
        const text = `Imagen ${i + 1} del producto ${productIndex}`;
        const imageName = `producto-prueba_${String(productIndex).padStart(2, '0')}_imagen_${i + 1}.jpg`;
        const outputPath = `${productImagesDir}/${imageName}`;
        await generateImage(text, color, outputPath);
        console.log(`Imagen ${i + 1} del producto ${productIndex} creada.`);
    }
}

async function generateImagesForProducts() {
    for (let i = 1; i <= 10; i++) {
        await generateProductImages(i);
    }
}

generateImagesForProducts()
    .then(() => console.log('¡Imágenes generadas exitosamente!'))
    .catch(err => console.error('Error al generar imágenes:', err));