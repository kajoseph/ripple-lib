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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const utils_1 = require("./utils");
const common_1 = require("../../common");
const amount_1 = __importDefault(require("./amount"));
function parsePaymentChannelCreate(tx) {
    assert.ok(tx.TransactionType === 'PaymentChannelCreate');
    return common_1.removeUndefined({
        amount: amount_1.default(tx.Amount).value,
        destination: tx.Destination,
        settleDelay: tx.SettleDelay,
        publicKey: tx.PublicKey,
        cancelAfter: tx.CancelAfter && utils_1.parseTimestamp(tx.CancelAfter),
        sourceTag: tx.SourceTag,
        destinationTag: tx.DestinationTag
    });
}
exports.default = parsePaymentChannelCreate;
//# sourceMappingURL=payment-channel-create.js.map