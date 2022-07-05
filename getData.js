async function fetchIPFSDoc(ipfsHash) {
    const url = `https://gateway.moralisipfs.com/ipfs/${ipfsHash}/metadata/1.json`;
    const response = await fetch(url);
    return await response.json();
}
fetchIPFSDoc(QmVK9JphGobZGKT8WZYD1CoTNUq37tdonzyvyadj4hZeSP)
