const dotenv = require('dotenv')
const pinataSDK = require('@pinata/sdk');
dotenv.config()
const pinata = pinataSDK(process.env.API_KEY, process.env.API_SECRET);
const fs = require("fs");

for (let i = 0; i < 11; i++) {
    const image = fs.createReadStream(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.png`)  
       pinata.pinFileToIPFS(image).then((result) => {
        console.log(result.IpfsHash)
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        console.log(err);})
       
      
}
