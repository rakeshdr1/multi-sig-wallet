const fs=require('fs')

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Wallet = await ethers.getContractFactory("MultiSigWallet");
    const wallet = await Wallet.deploy(["0x980B25668E70B9aD5Fcd00bfD33cC08340fe67C6","0x6b61902B477f97094f2a77A1E108163ea0bc08af"],2);
  
    console.log("Multi Sig Wallet address:", wallet.address);

    const data={
        address:wallet.address,
        abi:JSON.parse(wallet.interface.format('json'))
    }

    fs.writeFileSync('data/MultiSigWallet.json',JSON.stringify(data))
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });