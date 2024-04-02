import { expect } from "chai";
import hre from "hardhat";
import { Signer } from "ethers";
import { GinkgoBoilerPlate } from "../typechain-types";
  
  describe("Boilerplate", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.

    let ginkgo: GinkgoBoilerPlate;
    let owner: Signer;
    let addr1: Signer;
    let addr2: Signer;

    beforeEach(async function () {
        const ethers = hre.ethers;
        const Boilerplate = await ethers.getContractFactory("GinkgoBoilerPlate");
        [owner, addr1, addr2] = await ethers.getSigners();

        ginkgo = await Boilerplate.deploy(await owner.getAddress(), "GINKGO", "GNK") as GinkgoBoilerPlate;
    });

    

    describe("Minting", function () {
        it("Should succeed", async function () {

            // Arrange
            const addr1Address = await addr1.getAddress();

            // Act
            await ginkgo.mint(addr1Address, 100);

            // Assert
            expect(await ginkgo.balanceOf(addr1Address)).to.equal(100);
        });
      });

      describe("Transfer", function () {
        it("Should transfer tokens between accounts", async function () {
            //Arrange
            await ginkgo.mint(addr1, 100);
            
            await ginkgo.addToWhitelist(addr2);

            // Act
            await ginkgo.connect(addr1).transfer(addr2, 50);

            // Assert
            expect(await ginkgo.balanceOf(addr2)).to.equal(50);
        });
      });
    
    describe("Pause/Unpause", function () {
        it("Should pause and unpause the contract", async function () {

            // Act
            await ginkgo.pause();

            // Assert
            expect(await ginkgo.paused()).to.equal(true);
    
            // Act
            await ginkgo.unpause();

            // Assert
            expect(await ginkgo.paused()).to.equal(false);
        });
      });
    
    describe("Token Value Decrease Over Time", function () {
      it("Should decrease token value for inactive accounts after the specified period", async function () {

        // Arrange : mint initial tokens to addr1 and fast-forward time to simulate inactivity
        const usingPeriod = await ginkgo.getUsingPeriod();
        const decreaseRate = await ginkgo.getDecreaseRate();
        const ethers = hre.ethers;
        const initialMintAmount = ethers.parseUnits("1000", "ether"); // Assuming the token has 18 decimals

        // Mint initial tokens to addr1
        await ginkgo.mint(addr1, initialMintAmount);

        // Fast-forward time to simulate inactivity
        await ethers.provider.send("evm_increaseTime", [180 * 24 * 60 * 60 + 1]); // +1 to ensure it's just over the using period
        await ethers.provider.send("evm_mine", []);

        
        await ginkgo.addToWhitelist(addr2);
        // Act: Trigger a transfer to initiate the check for inactivity and possible decrease
        const transferAmount = ethers.parseUnits("1", "ether");
        await ginkgo.connect(addr1).transfer(addr2, transferAmount);
    
        // Calculate the expected decrease due to inactivity
        const expectedDecreaseAmount = initialMintAmount * decreaseRate / BigInt(100);
        const expectedBalanceAfterDecreaseAndTransfer = initialMintAmount - expectedDecreaseAmount - transferAmount;
    
        // Check the balance of addr1 to ensure it has been decreased appropriately
        const actualBalance = await ginkgo.balanceOf(addr1);
        expect(actualBalance).to.equal(expectedBalanceAfterDecreaseAndTransfer);
      });
    });
});