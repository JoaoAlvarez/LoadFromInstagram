const puppeteer = require('puppeteer');
// npm install puppeteer

const SELECTOR_PAGE_LOADED = ".RR-M-";
const SELECTOR_PHOTO_PERFIL = ".RR-M-";
const SELECTOR_PHOTOS = ".v1Nh3";

// SELECTORES : 
//.$ PEGAR O PROMEIRO VALOR ENCONTADO
//.$$ PEGA TODOS OS VALORES ENCONTADOS 
//SE POR "eval" no final possibilidade passar um callback para tratar o que foi encontrado (Ex.: .$$eval(select, links => link))

async function init(urlInstagram){

    async function getPhotos(page){

        async function getHref(page){
            return await page.$('a[href]').then(a => a.getProperty("href"));
        }
        
        async function getImgSrc(page){
            return await page.$('img[src]').then(a => a.getProperty("src"));
        }

        const photos = await page.$$eval(SELECTOR_PHOTOS, async(photos) => await photos.map(async(photo) => {
            console.log("Here")
            //const href = await getHref(photo);
            //const src = await getImgSrc(photo);
            //console.log("href :",href)
            //console.log("src: ",src);
            return await { href : await getHref(photo) , src : await getImgSrc(photo)};
        })
        );
        console.log("Final",photos);
    }
    
    const browser = await puppeteer.launch(/*{headless : false}*/);
    const page = await browser.newPage();
    await page.goto(urlInstagram, { waitUntil : 'networkidle2'});
    console.log("url goto:",urlInstagram)
    //await page.waitForXPath('//h2[contains(text(),"Piores empresas nos últimos 30 dias")]');
    await page.waitFor(SELECTOR_PAGE_LOADED);
    
    await getPhotos(page);
} 

init("https://www.instagram.com/cleibsonsilvaa/");