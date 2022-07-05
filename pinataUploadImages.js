const dotenv = require('dotenv')
const pinataSDK = require('@pinata/sdk');
dotenv.config()
const pinata = pinataSDK(process.env.API_KEY, process.env.API_SECRET);
const fs = require("fs");

function pinImage(image){
    pinata.pinFileToIPFS(image).then((result) => {
        return (`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}
function pinMetadata(body){
    pinata.pinJSONTOIPFS(body).then((result)=>{
        return (`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}

async function meth(){
for (let i = 0; i < 11; i++) {
   var image = fs.createReadStream(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.png`)
        fs.readFile(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.json`,(err, data)=>{
        if(err) rej()
        let metadata = JSON.parse(data)
        const body = {
            image: pinImage(image),
            tokenId: metadata.tokenId,
            name: metadata.name,
            attributes: metadata.attributes
        }
        const metadataf = pinMetadata(body)
        console.log(metadataf)
        res()
})
}}
meth()
  
 
