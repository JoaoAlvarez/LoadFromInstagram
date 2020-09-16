# LoagFromInstagram <br/>
Carregar fotos do instagram requerido

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


