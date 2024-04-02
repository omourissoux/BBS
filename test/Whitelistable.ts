import { ethers } from "hardhat";
import { expect } from "chai";
import { Whitelistable } from "../typechain-types";

describe("Whitelistable Contract", function () {
  let whitelistable: Whitelistable;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let addrs: any[];

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    
    const WhitelistableFactory = await ethers.getContractFactory("Whitelistable");
    whitelistable = (await WhitelistableFactory.deploy(await owner.getAddress())) as Whitelistable;
  });

  describe("Whitelist functionality", function () {
    it("Should allow the owner to add addresses to the whitelist", async function () {

        // Arrange

        // Act
        await whitelistable.addToWhitelist(addr1);
        
        // Assert
        expect(await whitelistable.isWhitelisted(addr1)).to.be.true;
    });

    it("Should not whitelisted", async function () {
        // Arrange

        // Act
        
        // Assert
        expect(await whitelistable.isWhitelisted(addr1)).to.be.false;
    });

    it("Should allow the owner to remove addresses from the whitelist", async function () {
        // Arrange
        await whitelistable.addToWhitelist(addr1);

        // Ensure addr1 is whitelisted
        expect(await whitelistable.isWhitelisted(addr1)).to.be.true;
      
        // Act
        await whitelistable.removeFromWhitelist(addr1);

        // Assert
        expect(await whitelistable.isWhitelisted(addr1)).to.be.false;
    });
  });
});
