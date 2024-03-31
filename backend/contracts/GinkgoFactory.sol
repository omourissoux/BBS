// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GinkgoBoilerplate.sol";

contract GinkgoFactory is Ownable {
    constructor(address initialOwner) Ownable(initialOwner)
    {
    }

    GinkgoBoilerPlate[] public ginckgoContracts;

    function createContract(address _initialOwner, string memory _name, string memory _symbol) public {
        GinkgoBoilerPlate newGinkgoContract = new GinkgoBoilerPlate(_initialOwner, _name, _symbol);
        ginckgoContracts.push(newGinkgoContract);
    }

    function getContracts() public view returns(GinkgoBoilerPlate[] memory) {
        return ginckgoContracts;
    }
}
