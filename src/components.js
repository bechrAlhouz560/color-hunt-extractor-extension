export function Palette(colors) {
    let paletteCont = document.createElement('div');
    paletteCont.className = "palette";

    for (let color of colors)
    {
        let colorDiv = document.createElement('div');
        colorDiv.className = "color";
        colorDiv.style.backgroundColor = color;


        colorDiv.innerHTML = `<span>${color}</span>`;
        paletteCont.appendChild(colorDiv);
    }
    return paletteCont;
}



export function PaletteContainer (palettes) {
    let palettesCont = document.createElement('div');
    palettesCont.className = 'palettes';


    palettesCont.innerHTML += "<h1>Palette</h1>";


    let colorGroup = document.createElement('div');
    colorGroup.className = "color-group";

    for (let palette of palettes)
    {
        colorGroup.appendChild(palette);
    }

    palettesCont.appendChild(colorGroup)
    return palettesCont;
}