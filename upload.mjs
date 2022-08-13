// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File, Blob } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

let ipfsArray = []
let promises= []
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE0MmNiMUVkNUE1M0Q5NTZDODIyQWRmYTREQWQ0ZGM4RkUzQTVERkMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDM5MDA1OTc0OCwibmFtZSI6ImljYyJ9.PzJ8kwc0E6rh-IBdFEiTQbNA68iZ1Z7M2b9tV00mlrA'
const client = new NFTStorage({ token: NFT_STORAGE_KEY })
for (let i = 0; i < 11 ; i++) {
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
Promise.all(promises).then(async()=>{
    const imageFile = new File(ipfsArray, 'nfts', { type: 'image/png' })
    const cid = await client.storeDirectory([imageFile])
    console.log(cid)

})


