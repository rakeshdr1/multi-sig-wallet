// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, network, artifacts } = require("hardhat");
const fs = require("fs");
const path = require("path");

function saveContractABI(contract, artifactName) {
  const contractsDir = path.resolve(__dirname, "../output");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    `${contractsDir}/${artifactName}-${network.name}.json`,
    JSON.stringify({ [artifactName]: contract.address }, undefined, 2)
  );
  const Artifact = artifacts.readArtifactSync(artifactName);

  fs.writeFileSync(
    `${contractsDir}/${artifactName}.json`,
    JSON.stringify(Artifact, null, 2)
  );
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [deployer] = await ethers.getSigners();
  console.log(deployer.address);

  // We get the contract to deploy
  const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
  const multiSigWallet = await MultiSigWallet.deploy(
    [
      "0x1a27322aa77b155447818D24a4f8885E3Cf776B5",
      "0x518d0Be4956918dEb2B3D4e3AB0fbB40397Ec076",
    ],
    2
  );

  await multiSigWallet.deployed();

  console.log("MultiSigWallet deployed to:", multiSigWallet.address);

  saveContractABI(multiSigWallet, "MultiSigWallet");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
