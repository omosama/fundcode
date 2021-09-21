// run `node index.js` in the terminal
const axios = require('axios');
const cheerio = require('cheerio');

async function callWeb(fundcode) {
  var res = await axios.get('https://codequiz.azurewebsites.net/', {
    headers: { Cookie: 'hasCookie=true' },
  });

  const $ = cheerio.load(res.data);
  $('tr').each((index,value) => {
      if(index>1){
        const td = $(value).find('td');
        const fundname = $(td[0]).text();
        const nav = $(td[1]).text();
        if(fundcode == fundname.trim()) {
            console.log(nav)
        }
      }
  });
}

const fundcode = process.argv.slice(2);
callWeb(fundcode);