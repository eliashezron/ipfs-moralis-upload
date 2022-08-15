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
    for (let i = 0; i < 3; i++) {
        fs.readFile(`${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.json`,async(err, data)=>{
            if(err) rej()
            let metadata = JSON.parse(data)
            await storeAsset(metadata.name, 'description', metadata.attributes, `${__dirname}/nfts/output/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}.png`)
        })
    }
 }

 uploadFolder()

//  IntergalacticCockroach # 1: ipfs://bafyreidim3rmljot5sigrzrr4fsl36nwmi43vpoxc6a4cdvvmwd24bew5i/metadata.json
// IntergalacticCockroach # 0: ipfs://bafyreigttjt3vlcuzwuab7galtq7fokhlpg3u423yeovn6iejldmq7vt2e/metadata.json
// IntergalacticCockroach # 2: ipfs://bafyreidyu7v5lzimb6bnhukto7rvga7zcc4q6ngri5eljfnl66jwqumwyq/metadata.json
