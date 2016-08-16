const request = require('request');
const url = 'http://apellidosnicas.net/municipios.htm';

let getNames = (callback) => {
  let names = [];
  request({
    url:url,
    encoding: 'binary'
  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      // all match
      let all = body.match(/<font face="Verdana">(\D{1,})<\/font><\/td>/gi);

      // to replace
      let regEx = /<font face="Verdana">(\D{1,})<\/font><\/td>/g;

      // each results
      all.forEach((line) => {
        let name = line.replace(regEx, '$1');
        names.push(name);
      });
      callback(null, names);
    }
    else {
      callback(error, null);
    }
  });
}

getNames((error, names) => {
  console.log(error);
  console.log(JSON.stringify(names, null, 2));
});
