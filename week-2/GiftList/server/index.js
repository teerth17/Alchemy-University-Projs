const express = require("express");
const verifyProof = require("../utils/verifyProof");
const MerkeleTree = require("../utils/MerkleTree");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix

// const niceList = require("../utils/niceList.json");
// const merkleTree = new MerkeleTree(niceList);
// console.log(`Root: ${merkleTree.getRoot()}`);
// console.log(`Leaves: ${niceList.length}`);
// console.log(`Layers: ${Math.ceil(Math.log2(niceList.length))}`);
// process.exit();

// Merkele_root is updated by uncommenting above block of code...
const MERKLE_ROOT =
  "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(body.proof, body.leaf, MERKLE_ROOT);
  console.log(`Verifying ${body.leaf}...`);
  if (isInTheList) {
    console.log(`${body.leaf} is in the list`);
    res.send("You got a toy robot!");
  } else {
    console.log(`${body.leaf} is not in the list`);
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
