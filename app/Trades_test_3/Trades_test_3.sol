pragma solidity ^0.4.2;


contract Trades_test_3 {

    event New_trade_event(address indexed sender, string trade_id);
    event Edit_trade_event(address indexed sender, string trade_id);

    struct Trade_detail {
        string instrument;
        string buyer;
        string seller;
        uint amount;
        uint bond_price;
        uint settlement_date;
        uint version;
    }

    Trade_detail blank_td;

    mapping (string => Trade_detail) all_trades_details;

    string[] all_trades_names;


    function Trades_test_3(){
        //all_trades_names.length = 1;
        //all_trades_names[0] = 'dummy';

    }

    function get_trade_name(uint t) constant returns (string){
        return all_trades_names[t];
    }

    function get_num_trades() constant returns (uint){
        return all_trades_names.length;
    }

    function get_trade_detail(string trade_id) constant returns (string instrument, string buyer, string seller, uint amount, uint bond_price, uint settlement_date, uint version){

        Trade_detail td = all_trades_details[trade_id];

        instrument = td.instrument;
        buyer = td.buyer;
        seller = td.seller;
        version = td.version;
        amount = td.amount;
        bond_price = td.bond_price;
        settlement_date = td.settlement_date;
        version = td.version;
    }

    function new_trade(string trade_id) {
        uint sl = all_trades_names.length;
        all_trades_names.length = sl + 1;
        all_trades_names[sl] = trade_id;
        all_trades_details[trade_id] = blank_td;

        New_trade_event(msg.sender, trade_id);

    }


    function edit_trade(string trade_id, string instrument, string buyer, string seller, uint amount, uint bond_price, uint settlement_date) {

        uint old_version = all_trades_details[trade_id].version;

        Trade_detail memory td ;

        td.instrument = instrument;
        td.buyer = buyer;
        td.seller = seller;
        td.amount = amount;
        td.bond_price = bond_price;
        td.settlement_date = settlement_date;
        td.version = old_version + 1;

        all_trades_details[trade_id] = td;

        Edit_trade_event(msg.sender, trade_id );
    }

}