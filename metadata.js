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
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE0MmNiMUVkNUE1M0Q5NTZDODIyQWRmYTREQWQ0ZGM4RkUzQTVERkMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDM5MDA1OTc0OCwibmFtZSI6ImljYyJ9.PzJ8kwc0E6rh-IBdFEiTQbNA68iZ1Z7M2b9tV00mlrA