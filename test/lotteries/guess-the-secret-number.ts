import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { expect } from "chai";

let contract: Contract; // challenge contract

before(async () => {
  const factory = await ethers.getContractFactory(
    "GuessTheSecretNumberChallenge"
  );
  contract = factory.attach(`0x0A6d4a743AFCc6a69Cc5593dE455238ef4C3fa83`);
});

it("solves the challenge", async function () {
  const tx = await contract.guess(170, {
    value: ethers.utils.parseEther(`1`),
    gasLimit: 1e5,
  });
  const txHash = tx && tx.hash;
  expect(txHash).to.not.be.undefined;
});

