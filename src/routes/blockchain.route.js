import { Router } from 'express';
import { createBlockchain, deleteBlockchain, getAllBlockchains, getOneBlockchain, updateBlockchain } from '../services/blockchain.service.js';

export const blockchainRouter = Router();

blockchainRouter.post('/blockchain', async (req, res) => {
    const blockchain = req.body;
    const id = await createBlockchain(blockchain);
    res.status(200).send('Created Blockchain ' + id.toString());
})

blockchainRouter.get('/', async (req, res) => {
    const blockchainList = await getAllBlockchains();
    res.status(200).send(blockchainList);
})

blockchainRouter.get('/:name', async (req, res) => {
    const blockchainName = req.params.name;
    const blockchainData = await getOneBlockchain(blockchainName);
    res.status(200).send(blockchainData);
})

blockchainRouter.patch('/blockchain/:name', async (req, res) => {
    const blockchainName = req.params.name;
    if(blockchainName) {
        res.status(500).send('Cannot update Blockchain name')
        return
    }
    const blockchainData = req.body;
    const id = await updateBlockchain(blockchainName, blockchainData);
    res.status(200).send('Updated Blockchain ' + blockchainName)
})

blockchainRouter.patch('/delete/:name', async (req, res) => {
    const blockchainName = req.params.name;
    await deleteBlockchain(blockchainName);
    res.status(200).send('Deleted Blockchain ' + blockchainName);
})