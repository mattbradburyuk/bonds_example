#Trades_test_1

Solidity contract has a data structure: 

* alltrades (string -> Trade_version_manager)
* Trade_version_manager (uint -> Trade_detail)
* Trade_detail holds instrument, buyer, seller, amount etc..

Constructor populates data structure with dummy data

Trades_test_1_interact.js -> prompts to enter a trade (either 'trade_0' or 'trade_1') then returns all versions of that trade in a cli-table


Note: this contract takes 6,000,000 gas to deploy, need to alter multi_deploy.js to up the gas provided. The gasEstimate is way off for this one.

