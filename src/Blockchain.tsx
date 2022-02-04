export interface IBlockPayload {
    data: any;
    previousPayloadHash?: string;
    timestamp: number;
}

export interface IBlock {
    payload: IBlockPayload;
    payloadHash: string;
}

export interface IBlockchain extends Array<IBlock> {}

export abstract class Blockchain {
    public static initBlockChain() {
        var startingData = Math.floor(Math.random() * 100000000);
        var startingBlock: IBlock = this.constructPayload(startingData);

        return [startingBlock];
    }

    public static addToBlockchain(data: any, blockChain: IBlockchain) {
        var previousPayloadHash: string = blockChain[blockChain.length - 1].payloadHash;
        var block: IBlock = this.constructPayload(data, previousPayloadHash);

        blockChain.push(block);
        return blockChain;
    }

    static constructPayload(data: any, previousPayloadHash?: string) {
        var md5: NodeRequire = require("md5");
        var payload: IBlockPayload = {
            data: data,
            timestamp: Date.now(),
            previousPayloadHash: previousPayloadHash,
        };
        var block: IBlock = {
            payload: payload,
            payloadHash: md5(JSON.stringify(payload))
        };
        return block;
    }
}
