"use server";

import {
    CountryCode,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
    try {
        // get banks from db
        const banks = await getBanks({ userId });

        const accounts = await Promise.all(
            banks?.map(async (bank: Bank) => {
                // get each account info from plaid
                const accountsResponse = await plaidClient.accountsGet({
                    access_token: bank.accessToken,
                });
                const accountData = accountsResponse.data.accounts[0];

                // get institution info from plaid
                const institution = await getInstitution({
                    institutionId: accountsResponse.data.item.institution_id!,
                });

                const account = {
                    id: accountData.account_id,
                    availableBalance: accountData.balances.available!,
                    currentBalance: accountData.balances.current!,
                    institutionId: institution.institution_id,
                    name: accountData.name,
                    officialName: accountData.official_name,
                    mask: accountData.mask!,
                    type: accountData.type as string,
                    subtype: accountData.subtype! as string,
                    appwriteItemId: bank.$id,
                    sharaebleId: bank.shareableId,
                };

                return account;
            })
        );

        const totalBanks = accounts.length;
        const totalCurrentBalance = accounts.reduce((total, account) => {
            return total + account.currentBalance;
        }, 0);

        return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
    } catch (error) {
        console.error("An error occurred while getting the accounts:", error);
    }
};

// Get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
    try {
        // get bank from db
        const bank = await getBank({ documentId: appwriteItemId });
        if (!bank) return null;

        // get account info from plaid
        const accountsResponse = await plaidClient.accountsGet({
            access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        // get transfer transactions from appwrite
        const transferTransactionsData = await getTransactionsByBankId({
            bankId: bank.$id,
        });

        const transferTransactions = transferTransactionsData?.documents?.map(
            (transferData: Transaction) => ({
                id: transferData.$id,
                name: transferData.name!,
                amount: transferData.amount!,
                date: transferData.$createdAt,
                paymentChannel: transferData.channel,
                category: transferData.category,
                type: transferData.senderBankId === bank.$id ? "debit" : "credit",
            })
        ) || [];

        // get plaid transactions
        const transactions = await getTransactions({
            accessToken: bank?.accessToken,
        }) || [];

        // sort transactions by date
        const allTransactions = [...transactions, ...transferTransactions].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        return {
            data: accountData,
            transactions: allTransactions,
        };
    } catch (error) {
        console.error("Error getting account:", error);
        return null;
    }
};

// Get bank info
export const getInstitution = async ({
    institutionId,
}: getInstitutionProps) => {
    try {
        const institutionResponse = await plaidClient.institutionsGetById({
            institution_id: institutionId,
            country_codes: ["US"] as CountryCode[],
        });

        const intitution = institutionResponse.data.institution;

        return parseStringify(intitution);
    } catch (error) {
        console.error("An error occurred while getting the accounts:", error);
    }
};

// Get transactions
export const getTransactions = async ({ accessToken }: getTransactionsProps) => {
    try {
        const response = await plaidClient.transactionsSync({
            access_token: accessToken,
            cursor: ''
        });
        return response.data.added || [];
    } catch (error) {
        console.error('Plaid API error:', error);
        return [];
    }
};