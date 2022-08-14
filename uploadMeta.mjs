import { NFTStorage, File, Blob } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

let ipfsArray = []
let promises= []
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE0MmNiMUVkNUE1M0Q5NTZDODIyQWRmYTREQWQ0ZGM4RkUzQTVERkMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDM5MDA1OTc0OCwibmFtZSI6ImljYyJ9.PzJ8kwc0E6rh-IBdFEiTQbNA68iZ1Z7M2b9tV00mlrA'
const client = new NFTStorage({ token: NFT_STORAGE_KEY })


for(let i=0;i<11;i++){
    promises.push(new Promise(async(res, rej)=>{
        fs.readFile(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.json`,async(err, data)=>{
            if(err){
                rej(console.log('error'))
            } else{
                    let metadata = JSON.parse(data)
                    ipfsArray.push(new File({
                        image: `https://ipfs.io/ipfs/bafybeia4h2kbe2nxosodfrpjyzylcjsydmi7lnxa4ocvgvu3m2ajxyipzy/${i}.png`,
                        tokenId: metadata.tokenId,
                        name: metadata.name,
                        attributes: metadata.attributes}
                        ), `${i}.json`,{ type: 'text/javascript' })
                    res(console.log('worked', i))
            }
        })
    
    }))
}
Promise.all(promises).then(async()=>{
    const cid = await client.storeDirectory([...ipfsArray])
        console.log(cid)
})

// bafybeia4h2kbe2nxosodfrpjyzylcjsydmi7lnxa4ocvgvu3m2ajxyipzy
// https://ipfs.io/ipfs/bafybeia4h2kbe2nxosodfrpjyzylcjsydmi7lnxa4ocvgvu3m2ajxyipzy