import { NFTStorage, File } from "nft.storage"
import mime from "mime"
import fs from "fs"
import path from "path"
const __dirname = path.resolve()

const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE0MmNiMUVkNUE1M0Q5NTZDODIyQWRmYTREQWQ0ZGM4RkUzQTVERkMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDM5MDA1OTc0OCwibmFtZSI6ImljYyJ9.PzJ8kwc0E6rh-IBdFEiTQbNA68iZ1Z7M2b9tV00mlrA"
const client = new NFTStorage({ token: NFT_STORAGE_KEY })

async function storeAsset(name, description, attributes, image_path) {
  const metadata = await client.store({
    name: name,
    description: description,
    attributes: attributes,
    image: new File([await fs.promises.readFile(image_path)], `${name}.png`, {
      type: "image/png",
    }),
  })
  console.log(`${name}: ${metadata.url}`)
}

function uploadFolder() {
  for (let i = 1; i < 13; i++) {
    fs.readFile(
      `${__dirname}/nfts/metadata/metadata.json`,
      async (err, data) => {
        if (err) rej()
        let metadata = JSON.parse(data)
        await storeAsset(
          `nft${i}`,
          "we love Web3",
          metadata.attributes,
          `${__dirname}/nfts/images/nft${i}.png`
        )
      }
    )
  }
}

uploadFolder()
