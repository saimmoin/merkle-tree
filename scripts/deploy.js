const hre = require("hardhat");

async function main() {
    const MerkleTree = await hre.ethers.getContractFactory("MerkleTree");
    const merkletree = await MerkleTree.deploy();
    await merkletree.deployed();
    console.log("Contract Deployed To: ", merkletree.address)

    let array = ["T1", "T2", "T3", "T4", "T5", "T6"];
    const transaction = await merkletree.createTree(array);
    await transaction.wait();

    const transaction2 = await merkletree.getRoot();
    console.log("Merkle Root: ", transaction2);

    const transaction3 = await merkletree.getProofs();
    console.log("Merkle Proofs: ", transaction3);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();