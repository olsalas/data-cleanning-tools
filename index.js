/*const fs = require('fs')
const readFile = require('readLine')

fs.readFile( 'dominios.txt', 'utf8', (err, data) => {

    if (err) {

        console.log(err)
        return

    }

    console.log(data);

})
*/

const fs = require('fs');
const readline = require('readline');
const isValidDomain = require('is-valid-domain')

async function processLineByLine() {
  const fileStream = fs.createReadStream('dominios.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  var fileContent = '';

  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if(!isValidDomain(line)){

        fileContent += line + '\n'
        
    }
    
  }

  //write to file 
    fs.writeFile('invalidDomains.txt', fileContent, (err) => {

        if (err) throw err

        console.log('The fie was successfuly saved!.')
    })
}

processLineByLine();