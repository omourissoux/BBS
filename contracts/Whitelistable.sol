// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Whitelistable is Ownable {
    
    mapping(address => bool) private _whitelist;

    constructor(address initialOwner) Ownable(initialOwner)
    {
    }

    modifier onlyWhitelisted(address _address) {
        require(_whitelist[_address], "Not in whitelist");
        _;
    }

    function addToWhitelist(address _address) public onlyOwner {
        _whitelist[_address] = true;
    }

    function removeFromWhitelist(address _address) public onlyOwner {
        _whitelist[_address] = false;
    }

    function isWhitelisted(address _address) public view returns (bool) {
        return _whitelist[_address];
    }
}
