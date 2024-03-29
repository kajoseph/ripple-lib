"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RippleAPI = void 0;
const events_1 = require("events");
const common_1 = require("./common");
const server_1 = require("./server/server");
const transaction_1 = __importDefault(require("./ledger/transaction"));
const transactions_1 = __importDefault(require("./ledger/transactions"));
const trustlines_1 = __importDefault(require("./ledger/trustlines"));
const balances_1 = __importDefault(require("./ledger/balances"));
const balance_sheet_1 = __importDefault(require("./ledger/balance-sheet"));
const pathfind_1 = __importDefault(require("./ledger/pathfind"));
const orders_1 = __importDefault(require("./ledger/orders"));
const orderbook_1 = require("./ledger/orderbook");
const settings_1 = require("./ledger/settings");
const accountinfo_1 = __importDefault(require("./ledger/accountinfo"));
const accountobjects_1 = __importDefault(require("./ledger/accountobjects"));
const payment_channel_1 = __importDefault(require("./ledger/payment-channel"));
const payment_1 = __importDefault(require("./transaction/payment"));
const trustline_1 = __importDefault(require("./transaction/trustline"));
const order_1 = __importDefault(require("./transaction/order"));
const ordercancellation_1 = __importDefault(require("./transaction/ordercancellation"));
const escrow_creation_1 = __importDefault(require("./transaction/escrow-creation"));
const escrow_execution_1 = __importDefault(require("./transaction/escrow-execution"));
const escrow_cancellation_1 = __importDefault(require("./transaction/escrow-cancellation"));
const payment_channel_create_1 = __importDefault(require("./transaction/payment-channel-create"));
const payment_channel_fund_1 = __importDefault(require("./transaction/payment-channel-fund"));
const payment_channel_claim_1 = __importDefault(require("./transaction/payment-channel-claim"));
const check_create_1 = __importDefault(require("./transaction/check-create"));
const check_cancel_1 = __importDefault(require("./transaction/check-cancel"));
const check_cash_1 = __importDefault(require("./transaction/check-cash"));
const settings_2 = __importDefault(require("./transaction/settings"));
const sign_1 = __importDefault(require("./transaction/sign"));
const combine_1 = __importDefault(require("./transaction/combine"));
const submit_1 = __importDefault(require("./transaction/submit"));
const generate_address_1 = require("./offline/generate-address");
const derive_1 = require("./offline/derive");
const ledgerhash_1 = __importDefault(require("./offline/ledgerhash"));
const sign_payment_channel_claim_1 = __importDefault(require("./offline/sign-payment-channel-claim"));
const verify_payment_channel_claim_1 = __importDefault(require("./offline/verify-payment-channel-claim"));
const ledger_1 = __importDefault(require("./ledger/ledger"));
const rangeset_1 = __importDefault(require("./common/rangeset"));
const ledgerUtils = __importStar(require("./ledger/utils"));
const transactionUtils = __importStar(require("./transaction/utils"));
const schemaValidator = __importStar(require("./common/schema-validator"));
const serverinfo_1 = require("./common/serverinfo");
const utils_1 = require("./ledger/utils");
const ripple_address_codec_1 = require("ripple-address-codec");
function getCollectKeyFromCommand(command) {
    switch (command) {
        case 'account_offers':
        case 'book_offers':
            return 'offers';
        case 'account_lines':
            return 'lines';
        default:
            return undefined;
    }
}
class RippleAPI extends events_1.EventEmitter {
    constructor(options = {}) {
        super();
        this.connect = server_1.connect;
        this.disconnect = server_1.disconnect;
        this.isConnected = server_1.isConnected;
        this.getServerInfo = serverinfo_1.getServerInfo;
        this.getFee = serverinfo_1.getFee;
        this.getLedgerVersion = server_1.getLedgerVersion;
        this.getTransaction = transaction_1.default;
        this.getTransactions = transactions_1.default;
        this.getTrustlines = trustlines_1.default;
        this.getBalances = balances_1.default;
        this.getBalanceSheet = balance_sheet_1.default;
        this.getPaths = pathfind_1.default;
        this.getOrderbook = orderbook_1.getOrderbook;
        this.getOrders = orders_1.default;
        this.getSettings = settings_1.getSettings;
        this.getAccountInfo = accountinfo_1.default;
        this.getAccountObjects = accountobjects_1.default;
        this.getPaymentChannel = payment_channel_1.default;
        this.getLedger = ledger_1.default;
        this.parseAccountFlags = settings_1.parseAccountFlags;
        this.preparePayment = payment_1.default;
        this.prepareTrustline = trustline_1.default;
        this.prepareOrder = order_1.default;
        this.prepareOrderCancellation = ordercancellation_1.default;
        this.prepareEscrowCreation = escrow_creation_1.default;
        this.prepareEscrowExecution = escrow_execution_1.default;
        this.prepareEscrowCancellation = escrow_cancellation_1.default;
        this.preparePaymentChannelCreate = payment_channel_create_1.default;
        this.preparePaymentChannelFund = payment_channel_fund_1.default;
        this.preparePaymentChannelClaim = payment_channel_claim_1.default;
        this.prepareCheckCreate = check_create_1.default;
        this.prepareCheckCash = check_cash_1.default;
        this.prepareCheckCancel = check_cancel_1.default;
        this.prepareSettings = settings_2.default;
        this.sign = sign_1.default;
        this.combine = combine_1.default;
        this.submit = submit_1.default;
        this.deriveKeypair = derive_1.deriveKeypair;
        this.deriveAddress = derive_1.deriveAddress;
        this.computeLedgerHash = ledgerhash_1.default;
        this.signPaymentChannelClaim = sign_payment_channel_claim_1.default;
        this.verifyPaymentChannelClaim = verify_payment_channel_claim_1.default;
        this.errors = common_1.errors;
        this.xrpToDrops = common_1.xrpToDrops;
        this.dropsToXrp = common_1.dropsToXrp;
        this.rippleTimeToISO8601 = common_1.rippleTimeToISO8601;
        this.iso8601ToRippleTime = common_1.iso8601ToRippleTime;
        this.txFlags = common_1.txFlags;
        this.isValidAddress = schemaValidator.isValidAddress;
        this.isValidSecret = schemaValidator.isValidSecret;
        common_1.validate.apiOptions(options);
        this._feeCushion = options.feeCushion || 1.2;
        this._maxFeeXRP = options.maxFeeXRP || '2';
        const serverURL = options.server;
        if (serverURL !== undefined) {
            this.connection = new common_1.Connection(serverURL, options);
            this.connection.on('ledgerClosed', message => {
                this.emit('ledger', server_1.formatLedgerClose(message));
            });
            this.connection.on('error', (errorCode, errorMessage, data) => {
                this.emit('error', errorCode, errorMessage, data);
            });
            this.connection.on('connected', () => {
                this.emit('connected');
            });
            this.connection.on('disconnected', code => {
                let finalCode = code;
                if (finalCode === 1005 || finalCode === 4000) {
                    finalCode = 1000;
                }
                this.emit('disconnected', finalCode);
            });
        }
        else {
            this.connection = new common_1.Connection(null, options);
        }
    }
    request(command, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.request(Object.assign(Object.assign({}, params), { command, account: params.account ? common_1.ensureClassicAddress(params.account) : undefined }));
        });
    }
    hasNextPage(currentResponse) {
        return !!currentResponse.marker;
    }
    requestNextPage(command, params = {}, currentResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!currentResponse.marker) {
                return Promise.reject(new common_1.errors.NotFoundError('response does not have a next page'));
            }
            const nextPageParams = Object.assign({}, params, {
                marker: currentResponse.marker
            });
            return this.request(command, nextPageParams);
        });
    }
    prepareTransaction(txJSON, instructions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return transactionUtils.prepareTransaction(txJSON, this, instructions);
        });
    }
    convertStringToHex(string) {
        return transactionUtils.convertStringToHex(string);
    }
    _requestAll(command, params = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const collectKey = options.collect || getCollectKeyFromCommand(command);
            if (!collectKey) {
                throw new common_1.errors.ValidationError(`no collect key for command ${command}`);
            }
            const countTo = params.limit !== undefined ? params.limit : Infinity;
            let count = 0;
            let marker = params.marker;
            let lastBatchLength;
            const results = [];
            do {
                const countRemaining = utils_1.clamp(countTo - count, 10, 400);
                const repeatProps = Object.assign(Object.assign({}, params), { limit: countRemaining, marker });
                const singleResult = yield this.request(command, repeatProps);
                const collectedData = singleResult[collectKey];
                marker = singleResult['marker'];
                results.push(singleResult);
                const isExpectedFormat = Array.isArray(collectedData);
                if (isExpectedFormat) {
                    count += collectedData.length;
                    lastBatchLength = collectedData.length;
                }
                else {
                    lastBatchLength = 0;
                }
            } while (!!marker && count < countTo && lastBatchLength !== 0);
            return results;
        });
    }
    generateAddress(options = {}) {
        return generate_address_1.generateAddressAPI(Object.assign(Object.assign({}, options), { includeClassicAddress: true }));
    }
    generateXAddress(options = {}) {
        return generate_address_1.generateAddressAPI(options);
    }
}
exports.RippleAPI = RippleAPI;
RippleAPI._PRIVATE = {
    validate: common_1.validate,
    RangeSet: rangeset_1.default,
    ledgerUtils,
    schemaValidator
};
RippleAPI.renameCounterpartyToIssuer = utils_1.renameCounterpartyToIssuer;
RippleAPI.formatBidsAndAsks = orderbook_1.formatBidsAndAsks;
RippleAPI.deriveXAddress = derive_1.deriveXAddress;
RippleAPI.deriveClassicAddress = derive_1.deriveAddress;
RippleAPI.isValidXAddress = ripple_address_codec_1.isValidXAddress;
RippleAPI.isValidClassicAddress = ripple_address_codec_1.isValidClassicAddress;
//# sourceMappingURL=api.js.map