import { PalettesManager } from ".";


export const COLOR_HUNT_URL = new URL('https://colorhunt.co/');




// convert rgb to hex 
export function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
export function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



// checker whether the url equals the color hunt base url 
export function checkTab (url) {
    try {
        url  = new URL(url);
        return COLOR_HUNT_URL.origin === url.origin
    } catch (error) {
        console.log(error)
        return false;
    }
}
// extract all the loaded pallets from the current page  
export function extractPalletes () {
    // NOTE: componentToHex and rgbToHex are added to the page to be used for extraction
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
      
    function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    let items = document.getElementsByClassName('item');
    let palettes = []
    for (let item of items) {


        //the children of  the first child of item (CSS SELECTOR : .item .palette)
        let places = item.children[0].children;
        let colors = [];
        for (let place of places)
        {
            //  extract the color for the format rgb (r,g,b)
            let parsed = place.style.backgroundColor.slice(3)
                            .slice(1).slice(0,-1)
                            .replaceAll(', ',',').split(',');
            if (parsed.length === 3)
            { 

                colors.push(rgbToHex(Number(parsed[0]),Number(parsed[1]),Number(parsed[2])));
            }


        }

        // use the data-code attribute of item as a key of hex color value
        palettes.push ({
            id : item.getAttribute('data-code') || (Math.random()*10000).toFixed().toString(),
            colors
        })

    }

    return palettes
}


//function to inject the javascript code to the page to return our palettes list
export async function getPalettes () {


    let result = {}
    let tab = await getCurrentTab();
    if (checkTab(tab.url))
    {
        result = await chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            function: extractPalletes,
        });
    }
    if (result) {
        return result[0].result;
    }
    else
    {
        return {}
    }
    
}

//  return the current active tab
export async function getCurrentTab () {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    return tab;
}
