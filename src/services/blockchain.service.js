import { getBlockchainsCollection } from "../gateway/mongo.js"

export const createBlockchain = async (blockchain) => {
    const col = await getBlockchainsCollection();
    const { insertedId } = await col.insertOne(blockchain);
        // TODO: we should validate name is unique;
    return insertedId;
};

export const getOneBlockchain = async (name) => {
    const col = await getBlockchainsCollection();
        // TODO: add a filter by deletedAt flag so we don't return deleted blockchains;
    const blockchain = await col.findOne({name});
    if(blockchain.deletedAt)
        return 'Blockchain deleted from database'
    return blockchain;
};

export const getAllBlockchains = async () => {
    const col = await getBlockchainsCollection();
    const blockchainArray = await col.find({deletedAt:{$exists:false}}).toArray();
    return blockchainArray;
};

export const updateBlockchain = async (name, newValue) => {
    const col = await getBlockchainsCollection();
    await col.updateOne({name}, {$set: newValue});
}

export const deleteBlockchain = async (name) => {
    await updateBlockchain(name, {deletedAt: new Date()} );
}