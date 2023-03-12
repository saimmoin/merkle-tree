//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MerkleTree {
    
   bytes32 public root;
   bytes32[][] public allProofs;

function createTree(string[] memory data) public {
    require(data.length > 0, "No data provided");

    bytes32[] memory layer = new bytes32[](data.length);

    for (uint256 i = 0; i < data.length; i++) {
        layer[i] = keccak256(abi.encodePacked(data[i]));
    }
    
    // Add the root hash to the proofs array
    allProofs.push(layer);

    while (layer.length > 1) {
        uint256 length = layer.length;
        uint256 size = (length + 1) / 2;
        bytes32[] memory newLayer = new bytes32[](size);

        for (uint256 i = 0; i < length; i += 2) {
            if (i == length - 1) {
                newLayer[i / 2] = layer[i];
            } else {
                newLayer[i / 2] = keccak256(abi.encodePacked(layer[i], layer[i + 1]));
            }
        }

        // Add the new layer to the proofs array
        allProofs.push(newLayer);

        layer = newLayer;
    }

    root = layer[0];
}

function getRoot() public view returns (bytes32) {
    return root;
}

function getProofs() public view returns (bytes32[][] memory) {
    return allProofs;
}
}