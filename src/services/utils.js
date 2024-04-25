export const containsArray = (parentArray, subArray) => {
    return parentArray.some(arr =>
      arr.length === subArray.length && arr.every((value, index) => value === subArray[index])
    );
}

export const imgToMapMatrix = (img) => {
    const colorMap = {
        '255,0,0': 'B',       // Rot    - Base
        '255,180,130': 'E',   // braun  - Empty Ground
        '0,0,255': 'A',       // Blau   - Water
        '255,255,0': 'G',     // Gelb   - Gold
        '0,255,0': 'W',       // Grün   - Wood Wald
        '160,160,160': 'I'    // Grau   - Iron
    };

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    canvas.style.display = 'none';
    return convertToMatrix(ctx, img.width, img.height, colorMap);
}

function convertToMatrix(ctx, width, height, colorMap) {
    const imageData = ctx.getImageData(0, 0, width, height).data;
    const matrix = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const r = imageData[index];
            const g = imageData[index + 1];
            const b = imageData[index + 2];
            const colorKey = `${r},${g},${b}`;
            const letter = colorMap[colorKey] || '?';
            row.push(letter);
        }
        matrix.push(row);
    }
    return matrix;
}

export const isElementInViewport = (el) => {
    var rect = el.getBoundingClientRect();
    let bufferZone = 300
    return (
        rect.top >= -bufferZone &&
        rect.left >= -bufferZone &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + bufferZone &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + bufferZone
    );
}