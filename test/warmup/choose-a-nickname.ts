import Web3 from 'web3';
require('dotenv').config();

const solution = async () => {
    const web3 = new Web3(process.env.WEB3_PROVIDER || 'invalid');

    const account = web3.eth.accounts.privateKeyToAccount(process.env.ETH_ACCOUNT || 'invalid');

    const abi = require('../../abi/choose_a_nickname.json');

    const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDR || 'invalid');

    const networkId = await web3.eth.net.getId();
    const tx = contract.methods.setNickname(web3.utils.asciiToHex("CynicalCat"));
    const gas = await tx.estimateGas({from: account.address});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account.address);

    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: contract.options.address, 
            data,
            gas,
            gasPrice,
            nonce, 
            chainId: networkId
        },
        account.privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction || '');
    console.log(`Transaction hash: ${receipt.transactionHash}`);
}

solution()
    .then((res) => console.log(res))
    .catch((err) => console.error(err));