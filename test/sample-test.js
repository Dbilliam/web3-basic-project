const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", async function (){
    let contract;
    beforeEach(async() => {
        const Greeter = await ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello I am the World!");
        await greeter.deployed();
        contract = greeter;
    })
    it("Should return the new greeting once it's changed", async function(){
        // assert stx
        assert.equal(await contract.greet(),"Hello I am the World!");
        // expect stx
        expect(await contract.greet()).to.equal("Hello I am the World!");
    });
    it("Should assign new value to greeting variable", async function(){
        const setGreetingTx = await contract.setGreeting("Hello Web3, I am change the Project to Web3!");
        // wait util the transation is mined
        await setGreetingTx.wait();
        expect(await contract.greet()).to.equal("Hello Web3, I am change the Project to Web3!");
    });

    // it("Should return the new greeting once it's changed", async function (){
    //     const Greeter = await ethers.getContractFactory("Greeter");
    //     const greeter = await Greeter.deploy("Hello World!");
    //     await greeter.deployed();

    //     expect(await greeter.greet()).to.equal("Hello World!");
    //     const setGreetingTx = await greeter.setGreeting("Hola, Mundo!");

    //    //wait until the transaction is mined
    //    await setGreetingTx.wait();
    //    expect(await greeter.greet()).to.equal("Hola, mundo!");

    // });
});