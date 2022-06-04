import {
    Palette,
    PaletteContainer
} from './components';
import './css/all.min.css'
import './css/style.css';
import {
    getPalettes
} from './utils';


export function QS(selector) {
    return document.querySelector(selector);
}
export function QSAll(selector) {
    return document.querySelectorAll(selector);
}


export const PalettesManager = {


    saved : [],
    palettes: [],
    addPallete: async () => {
        let palettes = await getPalettes();

        let globalLength = 0;
        for (let palette of PalettesManager.palettes)
        {
            globalLength += palette.length;
        }
        if (globalLength !== 0)
        {

            let start = globalLength - 1;
            let end = globalLength + 41;
            palettes = palettes.slice(start, end);
        }
       
        if (palettes.length > 1)
        {
            PalettesManager.palettes.push(palettes);
            PalettesManager.renderPalettes();
        }
    },
    renderPalettes: function () {
        QS('.body').innerHTML = "";
        for (const palettes of this.palettes) {
            let docs = [];
            for (const palette of palettes) {
                docs.push(Palette(palette.colors));
            }
            let container = PaletteContainer(docs);
            
            QS('.body').append(container);
        }
    },
    initPalettes : function () {

    }


}



export const Router = {

    body : () => QS('.body'),
    activeRoute : 'home',
    home : {
        template : `
            <div class="msg">
                <h1>Palettes will be viewed here</h1>
            </div>
        `,
        render : function () {
            Router.body().innerHTML = Router.home.template;
            let btn = QS('.btn');
            btn.addEventListener('click', async function () {

                if (Router.activeRoute !== "home")
                {
                    Router.home.render();
                }
                PalettesManager.addPallete();
            });

            
        }
    },
    saves : {
        template : ``,
        render : function () {

        }
    }, 
    navigate : (route) => {
        Router[route].render();
        Router.activeRoute = route;
    }
}


document.addEventListener('DOMContentLoaded', function () {
    Router.navigate(Router.activeRoute);
})