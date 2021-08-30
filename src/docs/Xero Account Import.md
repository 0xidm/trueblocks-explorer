## File format for import of accounts into Xero Accounting

| Field           | Description                                                                                                                                                                                                                                                                                                                                                             | Required |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Code            | Use letters, numbers or symbols, up to 10 characters. You can use symbols within the code, but not at the start. The account code must be unique. Xero uses Tracking instead of subcodes.                                                                                                                                                                               | yes      |
| Name            | Use letters, numbers or symbols, up to 150 characters. You can use symbols within the name, but not at the start. The name must be unique.                                                                                                                                                                                                                              | yes      |
| Type            | You must use one of these types (spelled and formatted the same). Xero only uses one Accounts Receivable system (control) account and one Accounts Payable system (control) account. If you previously used multiple control accounts, you'll need to merge them in Xero.                                                                                               | yes      |
| Tax Code        | Add a tax rate for each account. If you don't select a tax rate, Xero imports the account with the rate No Tax, which you can update later. For bank accounts, you must use the code No Tax. If you use a custom tax rate, include the rate value in brackets. For example, 'Tax on Expenses (8.5%)'.                                                                   | yes      |
| Reporting Name  | (Adviser role only) In Partner Edition, add a reporting name to an account. The name doesn't have to be unique. Reporting name only appears on new reports and report templates. The option is available for all accounts except bank accounts, PayPal and credit card accounts.                                                                                        | no       |
| Description     | You can add a Description to all accounts except bank accounts. For bank accounts, leave the field blank. Consider adding descriptions to accounts your users can choose when they enter receipts into expense claims. This helps users who are unfamiliar with the chart of accounts.                                                                                  | no       |
| Dashboard       | Specify if the account should appear in the Account Watchlist on your dashboard. Enter only Yes or No. For bank accounts, this field must be No or left blank.                                                                                                                                                                                                          | no       |
| Expense claims  | Specify if the account should appear in the drop-down list of accounts when entering an expense claim receipt. Enter only Yes or No. For bank accounts, this field must be No or left blank.                                                                                                                                                                            | no       |
| Enable Payments | Specify if the account you're creating should appear in the drop-down list of accounts when you're entering a payment directly on an invoice, bill or expense claim. Enter only Yes or No. For bank accounts, this field must be No or left blank.                                                                                                                      | no       |
| Balance         | If you want to import account balances, enter the balances immediately prior to your conversion date. Xero imports positive balances as debits, and negative balances as credits. Xero ignores symbols and non-numeric data, other than negative signs and brackets (showing a negative balance). If you don't want to import balances, leave the Balance column blank. | no       |