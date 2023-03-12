const { expect } = require("chai");
const hre = require("hardhat");

describe("Merkle Tree implementation", () => {
    describe("Fetch merkle root from array of string", () => {
        let MerkleRoot = null;
        let Transactions = ["T1", "T2", "T3", "T4", "T5", "T6"];

        before(async () => {
            const MerkleTree = await hre.ethers.getContractFactory("MerkleTree");
            MerkleRoot = await MerkleTree.deploy();
            await MerkleRoot.deployed();
            console.log("Contract Deployed To: ", MerkleRoot.address)
         })

         it("Getting Merkle Tree contract", () => {
            expect(MerkleRoot).not.to.be.null
        })

        it("Fetching merkle root", async() => {
            const transaction = await MerkleRoot.createTree(Transactions);
            await transaction.wait();
        
            const transaction2 = await MerkleRoot.getRoot();
            console.log("Merkle Root: ", transaction2);
        })

        it("Fetching merkle proofs", async() => {        
            const transaction3 = await MerkleRoot.getProofs();
            console.log("Merkle Proofs: ", transaction3);
        })
    })
})
