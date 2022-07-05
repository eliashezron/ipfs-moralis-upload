const dotenv = require('dotenv')
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
            ipfsArray.push({
                path:`images/${i}.png`,
                content: data.toString('base64')
            })
            res()
        })
   }))
    
}  

Promise.all(promises).then(()=>{
    console.log(ipfsArray.length)
    for (let i = 0; i < ipfsArray.length; i++) {
        pinata.pinFileToIPFS(ipfsArray[i]).then((result) => {
            //handle results here
            console.log(result);
        }).catch((err) => {
            //handle error here
            console.log(err);
        })
    }
})


