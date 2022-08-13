// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File, Blob } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

// let ipfsArray = []
// let promises= []
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE0MmNiMUVkNUE1M0Q5NTZDODIyQWRmYTREQWQ0ZGM4RkUzQTVERkMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDM5MDA1OTc0OCwibmFtZSI6ImljYyJ9.PzJ8kwc0E6rh-IBdFEiTQbNA68iZ1Z7M2b9tV00mlrA'
const client = new NFTStorage({ token: NFT_STORAGE_KEY })

// async function uploadImages(){

// for (let i = 0; i < 11 ; i++) {
//     const imageFiles = new File([fs.promises.readFile(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.png`)], 'images', {type:'image/png'}) 
//     const cid = await client.storeDirectory([imageFiles])
//     console.log(cid)
     
// }
// }
// uploadImages()
// Promise.all(promises).then(async()=>{
//     const imageFile = new File([ipfsArray.content], 'images', { type: 'image/png' })
//     const cid = await client.storeDirectory([imageFile])
//     console.log(cid)

// })

async function storeAsset(name, description, attributes, picture_path) {
    const metadata = await client.store({
        name: name,
        description: description,
        attributes: attributes,
        image: new File(
            [await fs.promises.readFile(picture_path)],
            `${name}Photo.png`,
            { type: 'image/png' }
        ),
    })
    console.log(`${name}: ${metadata.url}`)
 }

 function uploadFolder(){
    for (let i = 0; i < 11; i++) {
        fs.readFile(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.json`,async(err, data)=>{
            if(err) rej()
            let metadata = JSON.parse(data)
            await storeAsset(metadata.name, 'description', metadata.attributes, `${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.png`)
        })
    }
 }

 uploadFolder()
