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
const common_1 = require("../../common");
const amount_1 = __importDefault(require("./amount"));
const claimFlags = common_1.txFlags.PaymentChannelClaim;
function parsePaymentChannelClaim(tx) {
    assert.ok(tx.TransactionType === 'PaymentChannelClaim');
    return common_1.removeUndefined({
        channel: tx.Channel,
        balance: tx.Balance && amount_1.default(tx.Balance).value,
        amount: tx.Amount && amount_1.default(tx.Amount).value,
        signature: tx.Signature,
        publicKey: tx.PublicKey,
        renew: Boolean(tx.Flags & claimFlags.Renew) || undefined,
        close: Boolean(tx.Flags & claimFlags.Close) || undefined
    });
}
exports.default = parsePaymentChannelClaim;
//# sourceMappingURL=payment-channel-claim.js.map