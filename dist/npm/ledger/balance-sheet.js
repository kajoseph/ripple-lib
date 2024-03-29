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
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const common_1 = require("../common");
const utils_1 = require("./utils");
function formatBalanceSheet(balanceSheet) {
    const result = {};
    if (!_.isUndefined(balanceSheet.balances)) {
        result.balances = [];
        _.forEach(balanceSheet.balances, (balances, counterparty) => {
            _.forEach(balances, balance => {
                result.balances.push(Object.assign({ counterparty }, balance));
            });
        });
    }
    if (!_.isUndefined(balanceSheet.assets)) {
        result.assets = [];
        _.forEach(balanceSheet.assets, (assets, counterparty) => {
            _.forEach(assets, balance => {
                result.assets.push(Object.assign({ counterparty }, balance));
            });
        });
    }
    if (!_.isUndefined(balanceSheet.obligations)) {
        result.obligations = _.map(balanceSheet.obligations, (value, currency) => ({ currency, value }));
    }
    return result;
}
function getBalanceSheet(address, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        common_1.validate.getBalanceSheet({ address, options });
        options = yield utils_1.ensureLedgerVersion.call(this, options);
        const response = yield this.request('gateway_balances', {
            account: address,
            strict: true,
            hotwallet: options.excludeAddresses,
            ledger_index: options.ledgerVersion
        });
        return formatBalanceSheet(response);
    });
}
exports.default = getBalanceSheet;
//# sourceMappingURL=balance-sheet.js.map