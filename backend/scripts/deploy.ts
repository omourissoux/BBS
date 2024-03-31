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

//   const contractAddress = 'ADRESSE_DU_CONTRAT'; // Remplacez par l'adresse de votre contrat
// const provider = new ethers.providers.JsonRpcProvider('URL_DU_RPC_POLYGON'); // URL du provider RPC de Polygon
// const signer = new ethers.Wallet('VOTRE_CLÉ_PRIVÉE', provider); // Remplacez par votre clé privée
// const contract = new ethers.Contract(contractAddress, ABI_DU_CONTRAT, signer); // Remplacez ABI_DU_CONTRAT par l'ABI de votre contrat

// async function addToWhitelist(address) {
//     const tx = await contract.addToWhitelist(address);
//     await tx.wait();
//     console.log(`Adresse ${address} ajoutée à la whitelist`);
// }

// addToWhitelist(wallet.address); // Utilisez l'adresse générée précédemment
