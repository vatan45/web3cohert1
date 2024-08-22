const crypto = require('crypto');

function findHashWithPrefix(prefix) {
    let input = 0;
    while (true) {
        let inputstr = "100xdevs" + input.toString();
        let hash = crypto.createHash('sha256').update(inputstr).digest('hex');
        if (hash.startsWith(prefix)) {
            return { input: inputstr, hash: hash };
        }
        input++;
    }
}




const result = findHashWithPrefix('00000');
console.log(`input: ${result.input}`)
console.log(`hash: ${result.hash}`)
