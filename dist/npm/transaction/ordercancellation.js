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
Object.defineProperty(exports, "__esModule", { value: true });
const utils = __importStar(require("./utils"));
const validate = utils.common.validate;
function createOrderCancellationTransaction(account, orderCancellation) {
    const txJSON = {
        TransactionType: 'OfferCancel',
        Account: account,
        OfferSequence: orderCancellation.orderSequence
    };
    if (orderCancellation.memos !== undefined) {
        txJSON.Memos = orderCancellation.memos.map(utils.convertMemo);
    }
    return txJSON;
}
function prepareOrderCancellation(address, orderCancellation, instructions = {}) {
    try {
        validate.prepareOrderCancellation({
            address,
            orderCancellation,
            instructions
        });
        const txJSON = createOrderCancellationTransaction(address, orderCancellation);
        return utils.prepareTransaction(txJSON, this, instructions);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = prepareOrderCancellation;
//# sourceMappingURL=ordercancellation.js.map