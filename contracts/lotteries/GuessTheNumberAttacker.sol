pragma solidity ^0.8.9;

interface IGuessTheNewNumberChallenge {
    function isComplete() external view returns (bool);
    function guess(uint8 n) external payable;
}

contract GuessTheNumberChallengeAttacker {
    IGuessTheNewNumberChallenge public challenge;

    constructor (address challengeAddress) {
        challenge = IGuessTheNewNumberChallenge(challengeAddress);
    }

    function attack() external payable {
    }
}
