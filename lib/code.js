const request = require('request');
const url = 'http://apellidosnicas.net/municipios.htm';

let getCodes = (callback) => {
  let codes = [];
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      // all match
      let all = body.match(/<font face="Verdana">(\d{3})<\/font>/gi);

      // to replace
      let regEx = /<font face="Verdana">(\d{3})<\/font>/g;

      // each results
      all.forEach((line) => {
        let code = line.replace(regEx, '$1');
        codes.push(code);
      });
      callback(null, codes);
    }
    else {
      callback(error, null);
    }
  });
}

getCodes((error, codes) => {
  console.log(error);
  console.log(codes);
});
