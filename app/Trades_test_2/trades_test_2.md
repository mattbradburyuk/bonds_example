#Trades_test_2

Solidity sets up a data structure: 

    struct Trade_detail {
        string instrument;
        string buyer;
        string seller;
        uint amount;
        uint bond_price;
        uint settlement_date;
        uint version;
    }
    mapping (string => Trade_detail) all_trades_details;


Then 



* Creates a new trade
* Checks number of trades
* Edits the trade to provide trade details
* reads the trade details from the blockchain

note, this always gives the same trade name (trade_0) so doesn't test multiple trades

