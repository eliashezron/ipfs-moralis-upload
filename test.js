const fs = require("fs")
const path = require("path")
const axios = require("axios")

let ipfsArray = []
let promises = []

for (let i = 0; i < 5000; i++) {
  promises.push(
    new Promise((res, rej) => {
      fs.readFile(
        `${__dirname}/images/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}`,
        (err, data) => {
          if (err) rej()
          let metadata = JSON.parse(data)
          ipfsArray.push({
            path: `${i}`,
            content: {
              image: `https://ipfs.io/ipfs/bafybeiduqovekjb34iblfkbfrdjevydvzimvjcwqdysmulcjwkfppa32dm/${i}.png`,
              tokenId: metadata.tokenId,
              name: `Intergalactic Cockroach # ${i}`,
              attributes: metadata.attributes,
            },
          })
          res()
        }
      )
    })
  )
}

for (let i = 5000; i < 10000; i++) {
  promises.push(
    new Promise((res, rej) => {
      fs.readFile(
        `${__dirname}/images/IntergalacticCockroach #${i}/IntergalacticCockroach #${i}`,
        (err, data) => {
          if (err) {
            console.log(err, i)
          }
          rej()
          let metadata = JSON.parse(data)
          ipfsArray.push({
            path: `${i}`,
            content: {
              image: `https://ipfs.io/ipfs/bafybeibitwhg65xlrtk6dex6ss5gvubaxpobk5gawxgondsrrctglabnwi/${i}.png`,
              tokenId: metadata.tokenId,
              name: metadata.name,
              attributes: metadata.attributes,
            },
          })
          res()
        }
      )
    })
  )
}

// break
Promise.all(promises).then(() => {
  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
      headers: {
        accept: "application/json",
        "X-API-KEY":
          "4FCXtcS0JFQme0jLsXCfMw228H3Pg6B9amiU6JXxdPOIcD3S69bBtLn8MQt2uA2z", // WEB API KEY
        "Content-Type": "application/json ",
      },
      timeout: 600000,
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
})
// ipfs location opf the images
// 0 - 4999 bafybeiduqovekjb34iblfkbfrdjevydvzimvjcwqdysmulcjwkfppa32dm
// 5000 - 9999 bafybeibitwhg65xlrtk6dex6ss5gvubaxpobk5gawxgondsrrctglabnwi
