const dotenv = require('dotenv')
const { Readable } = require('stream');
const pinataSDK = require('@pinata/sdk');
dotenv.config()
const pinata = pinataSDK(process.env.API_KEY, process.env.API_SECRET);
const fs = require("fs");


let ipfsArray = []
let promises= []

for (let i = 0; i < 11; i++) {
   promises.push(new Promise((res, rej)=>{
        fs.readFile(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.png`,(err, data)=>{
            if(err) rej()
            ipfsArray.push(
                data           
            )
            res()
        })
   }))
    
}  

Promise.all(promises).then(()=>{
    console.log(ipfsArray.length)
    for (let i = 0; i < ipfsArray.length; i++) {
        // const stream = Readable.from(ipfsArray[i].toString());
        const readableStreamForFile = fs.createReadStream(ipfsArray[i].toString('base64'));
        pinata.pinFileToIPFS(readableStreamForFile).then((result) => {
            //handle results here
            console.log(result);
        }).catch((err) => {
            //handle error here
            console.log("error");
        })
    }
})


