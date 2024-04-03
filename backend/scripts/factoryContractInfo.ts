export const factoryContractInfo = {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: [
        {
            inputs: [
              {
                internalType: "address",
                name: "_initialOwner",
                type: "address"
              },
              {
                internalType: "string",
                name: "_name",
                type: "string"
              },
              {
                internalType: "string",
                name: "_symbol",
                type: "string"
              }
            ],
            name: "createContract",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
        },
        {
            inputs: [],
            name: "getContracts",
            outputs: [
              {
                internalType: "contract GinkgoBoilerPlate[]",
                name: "",
                type: "address[]"
              }
            ],
            stateMutability: "view",
            type: "function"
          },
    ]
}