import { expect } from "chai";
import hre from "hardhat";
import { Signer } from "ethers";
import { GinkgoBoilerPlate, GinkgoBoilerPlate__factory, GinkgoFactory } from "../typechain-types";

describe("GinkgoFactory Contract", function () {
    let ginkgoFactory: GinkgoFactory;
    let owner: Signer;
    let addr1: Signer;

    beforeEach(async function () {
        
        const ethers = hre.ethers;
        const ginkgoFactoryArtifact = await ethers.getContractFactory("GinkgoFactory");
        
        [owner, addr1] = await ethers.getSigners();
        
        // Déployer le contrat avec le propriétaire initial
        ginkgoFactory = await ginkgoFactoryArtifact.deploy(await owner.getAddress());
    });

    describe("Deployment", function () {
        it("Should be owned", async function () {
            expect(await ginkgoFactory.owner()).to.equal(await owner.getAddress());
        });
    });

    describe("createContract", function () {
        it("Should create contract", async function () {

            // Arrange and Act
            const tx = await ginkgoFactory.createContract(await addr1.getAddress(), "TestName", "TSN");
            await tx.wait();

            // Assert
            const contracts = await ginkgoFactory.getContracts();
            expect(contracts.length).to.equal(1);
        });
    });

    describe("getContracts", function () {
        it("Should return all created contracts", async function () {
            // Arrange
            const artifact1 = await ginkgoFactory.createContract(await addr1.getAddress(), "TestName1", "TSN1");
            const artiffact2 = await ginkgoFactory.createContract(await addr1.getAddress(), "TestName2", "TSN2");

            // Act
            const contracts = await ginkgoFactory.getContracts();

            // Assert
            expect(contracts.length).to.equal(2);
        });
    });
});