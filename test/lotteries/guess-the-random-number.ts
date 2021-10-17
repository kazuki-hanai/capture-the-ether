import { ethers } from "hardhat";
import { expect } from "chai";
import { keccak256 } from "ethers/lib/utils";
import { GuessTheRandomNumberChallenge } from "../../typechain";
import { Signer } from "ethers";

let contract: GuessTheRandomNumberChallenge; // challenge contract
let signer: Signer;
let ans = 0;

before(async () => {
  const provider = ethers.getDefaultProvider();
  signer = (await ethers.getSigners())[0];
  const factory = await ethers.getContractFactory(
    "GuessTheRandomNumberChallenge",
    signer
  );
  contract = await factory
    .attach(`0xAeC270df1Fd150535d8DDBe41b90cd3EF645983f`)
    .deployed();
});

it("solves the challenge", async function () {
  const ans = parseInt(
    await contract.provider.getStorageAt(contract.address, 0)
  );
  console.log(`ans: ${ans}`);
  const tx = await contract.guess(ans, {
    value: ethers.utils.parseEther(`1`),
    gasLimit: 1e5,
  });
  const txHash = tx && tx.hash;
  expect(txHash).to.not.be.undefined;
});
