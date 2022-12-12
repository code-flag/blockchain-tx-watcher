export interface IProvider {
    web3http: any,
    web3ws: any,
    httpUrl: string,
    wsUrl: string,
    providerName: string,
    clientConnection(): any
}

