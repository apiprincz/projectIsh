const { WHITELIST_OG_ADDRESS } = require("./whitelist_Address")
const keccak256 = require("keccak256")
const { MerkleTree } = require("merkletreejs")


const addressLeaves = WHITELIST_OG_ADDRESS.map(x => keccak256(x))
const ogMerkleTree = new MerkleTree(addressLeaves, keccak256, {
    sortPairs : true
})

const ogRootHash = ogMerkleTree.getHexRoot()

module.exports = { ogMerkleTree, ogRootHash }