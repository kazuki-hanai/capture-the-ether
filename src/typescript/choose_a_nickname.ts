import Web3 from 'web3';
require('dotenv').config();

const solution = async () => {
    const web3 = new Web3(process.env.WEB3_PROVIDER || 'invalid');

    const account = web3.eth.accounts.privateKeyToAccount(process.env.ETH_ACCOUNT || 'invalid');

    const abi = require('../../abi/choose_a_nickname.json');

    const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDR || 'invalid');
    const tx = contract.methods.setNickname(web3.utils.asciiToHex("CynicalCat"));

    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: contract.options.address, 
            data: tx.encodeABI(),
            gas: await tx.estimateGas({from: account.address}),
            gasPrice: await web3.eth.getGasPrice(),
            nonce: await web3.eth.getTransactionCount(account.address), 
            chainId: await web3.eth.net.getId()
        },
        account.privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction || '');
    console.log(`Transaction hash: ${receipt.transactionHash}`);
}

solution()
    .then((res) => console.log(res))
    .catch((err) => console.error(err));