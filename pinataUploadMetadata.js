const dotenv = require('dotenv')
const pinataSDK = require('@pinata/sdk');
dotenv.config()
const pinata = pinataSDK(process.env.API_KEY, process.env.API_SECRET);
const fs = require("fs");

const pinataOptions: {
    cidVersion: 0, 
    wrapWithDirectory: false
}

function pinImage(image){
    pinata.pinFileToIPFS(image).then((result) => {
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}
let meta = []
const promises = []

    for (let i = 0; i < 11; i++) {
        promises.push(new Promise((res, rej)=>{
            fs.readFile(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.json`,(err, data)=>{
            if(err) rej()
            var image = fs.createReadStream(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.png`)
            let metadata = JSON.parse(data)
            const body = {
                image: '',
                tokenId: metadata.tokenId,
                name: metadata.name,
                attributes: metadata.attributes
            }
            meta.push(body)
        res()
    })
    }))}

Promise.all(promises).then(()=>{
    console.log(meta)
}).catch((err)=>{
    console.log(err)
})



