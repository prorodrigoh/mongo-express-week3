import { getBlockchainsCollection } from "../gateway/mongo.js"

// create ONE blockchain
// create all the data in the body and use POST to send to the database
// POSTMAN: POST - http://localhost:3030/blockchain/ethereum

export const createBlockchain = async (blockchain) => {
    const col = await getBlockchainsCollection();
    const { insertedId } = await col.insertOne(blockchain);
        // TODO: we should validate name is unique;
    return insertedId;
};

// get ALL blockchains in the DB that have not been marked as deleted
// http://localhost:3030

export const getAllBlockchains = async () => {
    const col = await getBlockchainsCollection();
    const blockchainArray = await col.find({deletedAt:{$exists:false}}).toArray();
    return blockchainArray;
};

// get ONE blockchain by name that has not been marked as deleted
// Address bar in the browser: just add the name of any blockchain to it
// http://localhost:3030/ethereum

export const getOneBlockchain = async (name) => {
    const col = await getBlockchainsCollection();
    const blockchain = await col.findOne({name});
    if(blockchain.deletedAt)
        return 'Blockchain deleted from database';
    return blockchain;
};

// selected one blockchain by name and update it with the data sent in the body
// POSTMAN: we need to send the body and in the address, the name of the blockchain
// POSTMAN: PATCH - http://localhost:3030/blockchain/ethereum
export const updateBlockchain = async (name, newValue) => {
    const col = await getBlockchainsCollection();
    await col.updateOne({name}, {$set: newValue});
};

// mark one blockchain as deleted
// POSTMAN: DELETE - http://localhost:3030/blockchain/ethereum
export const deleteBlockchain = async (name) => {
    await updateBlockchain(name, {deletedAt: new Date()} );
};