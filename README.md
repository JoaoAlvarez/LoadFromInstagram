# LoadFromInstagram <br/>
Carregar as ultimas 24 fotos do instagram requerido

- Requerido puppeteer <br/>
Basta rodar : ```npm install puppeteer```

# Exemplo <br/>
```
const { loagFromInstagram } = require('./loagFromInstagram.js');

teste = async () => {
  const result = await loagFromInstagram("https://www.instagram.com/cleibsonsilvaa/");
  console.log("Result", result)
}
teste();
```
<br/>
* Exemplo de retorno: <br/>
{
  perfil: URL_DA_FOTO_DO_PERFIL,
  posts: [
    {
      href: URL_DA_POSTAGEM,
      src: SRC_DA_IMAGEM_NO_POST
    }
   ]
}



