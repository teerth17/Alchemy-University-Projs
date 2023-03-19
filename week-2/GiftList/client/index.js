const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const index = niceList.findIndex((n) => n === process.argv[2]);
  if (!index || index < 0 || !process.argv[3]) {
    console.log("Please enter valid name from list and name to send to server");
    process.exit();
  }

  const leaf = process.argv[3];

  const merkeleTree = new MerkleTree(niceList);
  const proof = merkeleTree.getProof(index);
  console.log(`No. of proof nodes: ${proof.length}`);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    leaf,
  });

  console.log({ gift });
}

main();
