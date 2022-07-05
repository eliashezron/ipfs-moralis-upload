const fs = require('fs')
const path = require('path')
const axios = require('axios')

let ipfsArray = []
let promises= []

for (let i = 0; i < 11; i++) {
   promises.push(new Promise((res, rej)=>{
        fs.readFile(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.json`,(err,data)=>{
            if(err) rej()
            ipfsArray.push(
                JSON.stringify(data)
              ).toString()
            res()
        })
   }))
    
}
Promise.all(promises).then(()=>{
    console.log(ipfsArray)

})
