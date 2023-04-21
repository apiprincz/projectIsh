const { WHITELIST_ARB_ADDRESS } = require("./whitelist_Address")
const keccak256 = require("keccak256")
const { MerkleTree } = require("merkletreejs")


const addressLeaves = WHITELIST_ARB_ADDRESS.map(x => keccak256(x))
const arbMerkleTree = new MerkleTree(addressLeaves, keccak256, {
    sortPairs : true
})

const arbRootHash =arbMerkleTree.getHexRoot()

module.exports = { arbMerkleTree, arbRootHash }