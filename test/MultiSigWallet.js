const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Multi Sig Wallet",  ()=> {
    let owner1,owner2, receiver;
    let wallet;

    beforeEach(async()=>{
        [owner1,owner2,receiver]=await ethers.getSigners()

        const Wallet=await ethers.getContractFactory('MultiSigWallet')
        wallet=await Wallet.deploy([owner1.address,owner2.address],2)
    })

    it('Should assign owners',async()=>{
        expect(await wallet.owners(0)).to.equal(owner1.address);
        expect(await wallet.owners(1)).to.equal(owner2.address);
    })

    it('Should set confirmations required',async()=>{
        expect(await wallet.numConfirmationsRequired()).to.equal(2);
    })
});
