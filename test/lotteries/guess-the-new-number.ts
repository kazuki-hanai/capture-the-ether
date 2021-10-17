import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract } from "ethers";

let ChallengeContract: Contract;
let AttackerContract: Contract;

before(async () => {
  const ChallengeFactory = await ethers.getContractFactory(
    "GuessTheNewNumberChallenge"
  );

  console.log(ethers.getDefaultProvider());
  ChallengeContract = await ChallengeFactory.deploy({
    value: ethers.utils.parseEther(`1`),
  });

  const AttackerFactory = await ethers.getContractFactory(
    "GuessTheNewNumberAttacker"
  );
  AttackerContract = await AttackerFactory.deploy(ChallengeContract.address);
});

it("solves the challenge", async function () {
  const tx = await AttackerContract.attack({
    value: ethers.utils.parseEther(`1`),
    gasLimit: 1e5,
  });
  const txHash = tx && tx.hash;
  console.log(`txHash: ${txHash}`);
  const isComplete = await ChallengeContract.isComplete();
  // eslint-disable-next-line no-unused-expressions
  expect(isComplete).to.be.true;
});
