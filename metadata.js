const fs = require('fs')
const path = require('path')
const axios = require('axios')

let ipfsArray = []
let promises= []

for (let i = 0; i < 11; i++) {
   promises.push(new Promise((res, rej)=>{
        fs.readFile(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.json`,(err, data)=>{
            if(err) rej()
            let metadata = JSON.parse(data)
            ipfsArray.push({
                path:`${i}`,
                content: {
                    image: `https://ipfs.moralis.io:2053/ipfs/${process.env.MORALIS_X_API_KEY}/images/${i}.png`,
                    tokenId: metadata.tokenId,
                    name: metadata.name,
                    attributes: metadata.attributes
                }
            })
            res()
        })
   }))
    
}
Promise.all(promises).then(()=>{
    axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray,
        {
            headers:{
            "accept": "application/json",
            "X-API-KEY": 'bTyKM0ql1TTNZzVFbIG9VfCOv0w1SX3Bwz9PCm31yTwqnCo7d7MqUj6EeuuONtnX', 
            "Content-Type": "application/json "
        }}).then((res)=>{
                console.log(res.data)
        }).catch((err)=>{
                console.log(err)
        })
})
// 'https://ipfs.moralis.io:2053/ipfs/QmRB5kMbVe27zcqUEvrY6gZDpJrSAGaFjmEa9sDSrtHUcP/images/9.png'
// 'https://ipfs.moralis.io:2053/ipfs/QmVK9JphGobZGKT8WZYD1CoTNUq37tdonzyvyadj4hZeSP/metadata/1.json