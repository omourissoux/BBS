import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GinkgoFactoryModule = buildModule("Ginkgo", (m) => {

  const factory = m.contract("GinkgoFactory", [process.env.PUB_KEY as `0x${string}`]);
  return { factory };
});

export default GinkgoFactoryModule;
