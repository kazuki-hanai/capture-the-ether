import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

let contract: Contract; // challenge contract

before(async () => {
  const factory = await ethers.getContractFactory(
    "GuessTheSecretNumberChallenge"
  );
  contract = factory.attach(`0x26d106d839d2C6f083264820B485899bb6889a6a`);
});

it("solves the challenge", async function () {
  const tx = await contract.guess(42, {
    value: ethers.utils.parseEther(`1`),
    gasLimit: 1e5,
  });
  const txHash = tx && tx.hash;
  expect(txHash).to.not.be.undefined;
});

