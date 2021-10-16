import { exit } from 'process';
import Web3 from 'web3';
require('dotenv').config();

const solution = async () => {
    const web3 = new Web3(process.env.WEB3_PROVIDER || 'invalid');

    const account = web3.eth.accounts.privateKeyToAccount(process.env.ETH_ACCOUNT || 'invalid');

    const abi = require('../../abi/guess_the_number.json');
    const contract = new web3.eth.Contract(abi, "0x77c31f5199d4b3EedAE827eFaA725A139B7204C5");

    let answer = -1;
    for (let i = 0; i <= 256; i++) {
        if (web3.utils.keccak256(web3.utils.toHex(i)) == "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365") {
            answer = i;
            break;
        }
    }

    if (answer == -1) {
        console.log("Could not find the answer");
        exit(1);
    }

    const networkId = await web3.eth.net.getId();
    const tx = contract.methods.guess(answer);
    const gas = await tx.estimateGas({ from: account.address, value: web3.utils.toWei('1', 'ether') });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account.address);

    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: contract.options.address,
            data,
            gas,
            value: web3.utils.toWei('1', 'ether'),
            gasPrice,
            nonce,
            chainId: networkId
        },
        account.privateKey
    ).catch(err => {
        console.log('signTransaction');
        console.log(err);
        exit(1);
    });

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction || '');
    console.log(`Transaction hash: ${receipt.transactionHash}`);
}

solution()
    .then((res) => console.log(res))
    .catch((err) => console.error(err));