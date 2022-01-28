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
const toRippledAmount = utils.common.toRippledAmount;
const common_1 = require("../common");
function createCheckCreateTransaction(account, check) {
    const txJSON = {
        Account: account,
        TransactionType: 'CheckCreate',
        Destination: check.destination,
        SendMax: toRippledAmount(check.sendMax)
    };
    if (check.destinationTag !== undefined) {
        txJSON.DestinationTag = check.destinationTag;
    }
    if (check.expiration !== undefined) {
        txJSON.Expiration = common_1.iso8601ToRippleTime(check.expiration);
    }
    if (check.invoiceID !== undefined) {
        txJSON.InvoiceID = check.invoiceID;
    }
    return txJSON;
}
function prepareCheckCreate(address, checkCreate, instructions = {}) {
    try {
        common_1.validate.prepareCheckCreate({ address, checkCreate, instructions });
        const txJSON = createCheckCreateTransaction(address, checkCreate);
        return utils.prepareTransaction(txJSON, this, instructions);
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.default = prepareCheckCreate;
//# sourceMappingURL=check-create.js.map