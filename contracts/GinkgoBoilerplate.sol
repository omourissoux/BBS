// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "./Whitelistable.sol";

contract GinkgoBoilerPlate is ERC20, ERC20Burnable, ERC20Pausable, ERC20Permit, Whitelistable {

    mapping(address => uint256) private _lastMoveTimeStamp;

    uint256 private _usingPeriod = 180 days;
    uint256 private _decreaseRate = 10;

    constructor(address initialOwner, string memory name, string memory symbol)
        ERC20(name, symbol)
        ERC20Permit(name)
        Whitelistable(initialOwner)
    {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }

    function getUsingPeriod() public view returns (uint256) {
        return _usingPeriod;
    }

    function getDecreaseRate() public view returns (uint256) {
        return _decreaseRate;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transfer(address recipient, uint256 amount) public override onlyWhitelisted(recipient) returns (bool) {

        if (_mustBeDecreased(msg.sender)) {
            _decreasedTokenValue(msg.sender);
        }

        if (_mustBeDecreased(recipient)) {
            _decreasedTokenValue(recipient);
        }

        _lastMoveTimeStamp[msg.sender] = block.timestamp;
        _lastMoveTimeStamp[recipient] = block.timestamp;

        return super.transfer(recipient, amount);
    }

    function _decreasedTokenValue(address account) private {

            uint256 balance = balanceOf(account);
            uint256 decreasedAmount = balance * _decreaseRate / 100;

            _transfer(account, owner(), decreasedAmount);
    }

    function _mustBeDecreased(address account) private view returns (bool) {
        return block.timestamp - _lastMoveTimeStamp[account] > _usingPeriod;
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}