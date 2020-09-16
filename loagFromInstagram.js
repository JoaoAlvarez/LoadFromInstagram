const puppeteer = require('puppeteer');
// npm install puppeteer

const SELECTOR_PAGE_LOADED = ".RR-M-";
const SELECTOR_PHOTO_PERFIL = ".RR-M-";
const SELECTOR_PHOTOS = ".v1Nh3";

// SELECTORES : 
//.$ PEGAR O PROMEIRO VALOR ENCONTADO
//.$$ PEGA TODOS OS VALORES ENCONTADOS 
//SE POR "eval" no final possibilidade passar um callback para tratar o que foi encontrado (Ex.: .$$eval(select, links => link))
module.exports.loagFromInstagram = async (urlInstagram) => {

    async function getProperty(tag, proprety) {
        return await tag.getProperty(proprety).then(async (res) => res.jsonValue());
    };

    async function getPhotoPerfil(page) {
        console.info("Buscando foto de perfil...")
        return await page.$(SELECTOR_PHOTO_PERFIL).then(async tag => {
            const img = await tag.$('img');
            return await getProperty(img, "src");
        })
    }
    async function getPosts(page) {
        console.info("Buscando foto de posts...")
        const photosJson = await page.$$(SELECTOR_PHOTOS).then(async (photoList) => {
            let photos = [];
            for (const div of photoList) {
                const a = await div.$('a');
                const link = await getProperty(a, "href");
                const img = await div.$('img');
                const src = await getProperty(img, "src");
                photos.push({ href: link, src: src });
            }
            return photos;
        });
        return photosJson;
    }

    console.info("Iniciando busca no instagram...")
    const browser = await puppeteer.launch(/*{headless : false}*/);
    const page = await browser.newPage();
    await page.goto(urlInstagram, { waitUntil: 'networkidle2' });
    await page.waitFor(SELECTOR_PAGE_LOADED);
    const photoPerfil = await getPhotoPerfil(page);
    const photosJson = await getPosts(page);
    console.info("Busca concluida com sucesso")
    return { perfil: photoPerfil, posts: photosJson };
}
