/// <reference types="node" />
import { EventEmitter } from 'events';
import { Connection, errors, validate, xrpToDrops, dropsToXrp, rippleTimeToISO8601, iso8601ToRippleTime } from './common';
import { connect, disconnect, isConnected, getLedgerVersion } from './server/server';
import getTransaction from './ledger/transaction';
import getTransactions from './ledger/transactions';
import getTrustlines from './ledger/trustlines';
import getBalances from './ledger/balances';
import getBalanceSheet from './ledger/balance-sheet';
import getPaths from './ledger/pathfind';
import getOrders from './ledger/orders';
import { getOrderbook, formatBidsAndAsks } from './ledger/orderbook';
import { getSettings, parseAccountFlags } from './ledger/settings';
import getAccountInfo from './ledger/accountinfo';
import getAccountObjects from './ledger/accountobjects';
import getPaymentChannel from './ledger/payment-channel';
import preparePayment from './transaction/payment';
import prepareTrustline from './transaction/trustline';
import prepareOrder from './transaction/order';
import prepareOrderCancellation from './transaction/ordercancellation';
import prepareEscrowCreation from './transaction/escrow-creation';
import prepareEscrowExecution from './transaction/escrow-execution';
import prepareEscrowCancellation from './transaction/escrow-cancellation';
import preparePaymentChannelCreate from './transaction/payment-channel-create';
import preparePaymentChannelFund from './transaction/payment-channel-fund';
import preparePaymentChannelClaim from './transaction/payment-channel-claim';
import prepareCheckCreate from './transaction/check-create';
import prepareCheckCancel from './transaction/check-cancel';
import prepareCheckCash from './transaction/check-cash';
import prepareSettings from './transaction/settings';
import sign from './transaction/sign';
import combine from './transaction/combine';
import submit from './transaction/submit';
import { GenerateAddressOptions, GeneratedAddress } from './offline/generate-address';
import { deriveXAddress } from './offline/derive';
import computeLedgerHash from './offline/ledgerhash';
import signPaymentChannelClaim from './offline/sign-payment-channel-claim';
import verifyPaymentChannelClaim from './offline/verify-payment-channel-claim';
import getLedger from './ledger/ledger';
import { AccountObjectsRequest, AccountObjectsResponse, AccountOffersRequest, AccountOffersResponse, AccountInfoRequest, AccountInfoResponse, AccountLinesRequest, AccountLinesResponse, BookOffersRequest, BookOffersResponse, GatewayBalancesRequest, GatewayBalancesResponse, LedgerRequest, LedgerResponse, LedgerDataRequest, LedgerDataResponse, LedgerEntryRequest, LedgerEntryResponse, ServerInfoRequest, ServerInfoResponse } from './common/types/commands';
import RangeSet from './common/rangeset';
import * as ledgerUtils from './ledger/utils';
import * as schemaValidator from './common/schema-validator';
import { TransactionJSON, Instructions, Prepare } from './transaction/types';
import { ConnectionUserOptions } from './common/connection';
import { isValidXAddress, isValidClassicAddress } from 'ripple-address-codec';
export interface APIOptions extends ConnectionUserOptions {
    server?: string;
    feeCushion?: number;
    maxFeeXRP?: string;
    proxy?: string;
    timeout?: number;
}
declare class RippleAPI extends EventEmitter {
    _feeCushion: number;
    _maxFeeXRP: string;
    connection: Connection;
    static _PRIVATE: {
        validate: typeof validate;
        RangeSet: typeof RangeSet;
        ledgerUtils: typeof ledgerUtils;
        schemaValidator: typeof schemaValidator;
    };
    static renameCounterpartyToIssuer: typeof ledgerUtils.renameCounterpartyToIssuer;
    static formatBidsAndAsks: typeof formatBidsAndAsks;
    constructor(options?: APIOptions);
    request(command: 'account_info', params: AccountInfoRequest): Promise<AccountInfoResponse>;
    request(command: 'account_lines', params: AccountLinesRequest): Promise<AccountLinesResponse>;
    request(command: 'account_objects', params: AccountObjectsRequest): Promise<AccountObjectsResponse>;
    request(command: 'account_offers', params: AccountOffersRequest): Promise<AccountOffersResponse>;
    request(command: 'book_offers', params: BookOffersRequest): Promise<BookOffersResponse>;
    request(command: 'gateway_balances', params: GatewayBalancesRequest): Promise<GatewayBalancesResponse>;
    request(command: 'ledger', params: LedgerRequest): Promise<LedgerResponse>;
    request(command: 'ledger_data', params?: LedgerDataRequest): Promise<LedgerDataResponse>;
    request(command: 'ledger_entry', params: LedgerEntryRequest): Promise<LedgerEntryResponse>;
    request(command: 'server_info', params?: ServerInfoRequest): Promise<ServerInfoResponse>;
    request(command: string, params: any): Promise<any>;
    hasNextPage<T extends {
        marker?: string;
    }>(currentResponse: T): boolean;
    requestNextPage<T extends {
        marker?: string;
    }>(command: string, params: object, currentResponse: T): Promise<T>;
    prepareTransaction(txJSON: TransactionJSON, instructions?: Instructions): Promise<Prepare>;
    convertStringToHex(string: string): string;
    _requestAll(command: 'account_offers', params: AccountOffersRequest): Promise<AccountOffersResponse[]>;
    _requestAll(command: 'book_offers', params: BookOffersRequest): Promise<BookOffersResponse[]>;
    _requestAll(command: 'account_lines', params: AccountLinesRequest): Promise<AccountLinesResponse[]>;
    generateAddress(options?: GenerateAddressOptions): GeneratedAddress;
    generateXAddress(options?: GenerateAddressOptions): GeneratedAddress;
    connect: typeof connect;
    disconnect: typeof disconnect;
    isConnected: typeof isConnected;
    getServerInfo: typeof ledgerUtils.common.serverInfo.getServerInfo;
    getFee: typeof ledgerUtils.common.serverInfo.getFee;
    getLedgerVersion: typeof getLedgerVersion;
    getTransaction: typeof getTransaction;
    getTransactions: typeof getTransactions;
    getTrustlines: typeof getTrustlines;
    getBalances: typeof getBalances;
    getBalanceSheet: typeof getBalanceSheet;
    getPaths: typeof getPaths;
    getOrderbook: typeof getOrderbook;
    getOrders: typeof getOrders;
    getSettings: typeof getSettings;
    getAccountInfo: typeof getAccountInfo;
    getAccountObjects: typeof getAccountObjects;
    getPaymentChannel: typeof getPaymentChannel;
    getLedger: typeof getLedger;
    parseAccountFlags: typeof parseAccountFlags;
    preparePayment: typeof preparePayment;
    prepareTrustline: typeof prepareTrustline;
    prepareOrder: typeof prepareOrder;
    prepareOrderCancellation: typeof prepareOrderCancellation;
    prepareEscrowCreation: typeof prepareEscrowCreation;
    prepareEscrowExecution: typeof prepareEscrowExecution;
    prepareEscrowCancellation: typeof prepareEscrowCancellation;
    preparePaymentChannelCreate: typeof preparePaymentChannelCreate;
    preparePaymentChannelFund: typeof preparePaymentChannelFund;
    preparePaymentChannelClaim: typeof preparePaymentChannelClaim;
    prepareCheckCreate: typeof prepareCheckCreate;
    prepareCheckCash: typeof prepareCheckCash;
    prepareCheckCancel: typeof prepareCheckCancel;
    prepareSettings: typeof prepareSettings;
    sign: typeof sign;
    combine: typeof combine;
    submit: typeof submit;
    deriveKeypair: (seed: string, options?: object) => {
        publicKey: string;
        privateKey: string;
    };
    deriveAddress: (publicKey: any) => string;
    computeLedgerHash: typeof computeLedgerHash;
    signPaymentChannelClaim: typeof signPaymentChannelClaim;
    verifyPaymentChannelClaim: typeof verifyPaymentChannelClaim;
    errors: typeof errors;
    static deriveXAddress: typeof deriveXAddress;
    static deriveClassicAddress: (publicKey: any) => string;
    static isValidXAddress: typeof isValidXAddress;
    static isValidClassicAddress: typeof isValidClassicAddress;
    xrpToDrops: typeof xrpToDrops;
    dropsToXrp: typeof dropsToXrp;
    rippleTimeToISO8601: typeof rippleTimeToISO8601;
    iso8601ToRippleTime: typeof iso8601ToRippleTime;
    txFlags: {
        Universal: {
            FullyCanonicalSig: number;
        };
        AccountSet: {
            RequireDestTag: number;
            OptionalDestTag: number;
            RequireAuth: number;
            OptionalAuth: number;
            DisallowXRP: number;
            AllowXRP: number;
        };
        TrustSet: {
            SetAuth: number;
            NoRipple: number;
            SetNoRipple: number;
            ClearNoRipple: number;
            SetFreeze: number;
            ClearFreeze: number;
        };
        OfferCreate: {
            Passive: number;
            ImmediateOrCancel: number;
            FillOrKill: number;
            Sell: number;
        };
        Payment: {
            NoRippleDirect: number;
            PartialPayment: number;
            LimitQuality: number;
        };
        PaymentChannelClaim: {
            Renew: number;
            Close: number;
        };
    };
    isValidAddress: typeof schemaValidator.isValidAddress;
    isValidSecret: typeof schemaValidator.isValidSecret;
}
export { RippleAPI };
//# sourceMappingURL=api.d.ts.map