import { ethers } from 'hardhat';
import { GinkgoFactory } from "../typechain-types";

async function main() {
    const GinkgoFactory = await ethers.getContractFactory("GinkgoFactory");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const ginkgo = await GinkgoFactory.deploy(owner) as GinkgoFactory;

    await ginkgo.createContract(owner, `GINKGO-BETA`, `BGNK`);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

