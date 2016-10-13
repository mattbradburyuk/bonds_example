
pragma solidity ^0.4.2;


contract Trades_test_1 {

    struct Trade_version_manager
    {
        uint current_version;
        mapping (uint => Trade_detail) versions;
    }

    Trade_version_manager blank_tvm;

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


    mapping (string => Trade_version_manager) all_trades;

        string temp = "trade_1";


    // Contract constructor
    function Trades_test_1(){

        create_dummy_trades();

    }


    function get_trade(string t) constant returns (string instrument, string buyer, string seller, uint amount, uint bond_price, uint settlement_date, uint version){

        uint cv = all_trades[t].current_version;

        instrument = all_trades[t].versions[cv].instrument;
        buyer = all_trades[t].versions[cv].buyer;
        seller = all_trades[t].versions[cv].seller;
        amount = all_trades[t].versions[cv].amount;
        bond_price = all_trades[t].versions[cv].bond_price;
        settlement_date = all_trades[t].versions[cv].settlement_date;
        version = all_trades[t].versions[cv].version;
    }

    function get_trade_current_version( string t) constant returns (uint cv){

        cv = all_trades[t].current_version;

    }


    function get_trade_version(string t, uint cv) constant returns (string instrument, string buyer, string seller, uint amount, uint bond_price, uint settlement_date, uint version){

        instrument = all_trades[t].versions[cv].instrument;
        buyer = all_trades[t].versions[cv].buyer;
        seller = all_trades[t].versions[cv].seller;
        amount = all_trades[t].versions[cv].amount;
        bond_price = all_trades[t].versions[cv].bond_price;
        settlement_date = all_trades[t].versions[cv].settlement_date;
        version = all_trades[t].versions[cv].version;
    }



    function create_dummy_trades(){

        // set up trade_1

        all_trades['trade_1'] = blank_tvm;

        all_trades['trade_1'].current_version = 2;
        all_trades['trade_1'].versions[1] = blank_td;
        all_trades['trade_1'].versions[2] = blank_td;


        all_trades['trade_1'].versions[1].instrument = "ins_1";
        all_trades['trade_1'].versions[1].buyer = 'buyer_bank_1';
        all_trades['trade_1'].versions[1].seller = 'seller_bank_1';
        all_trades['trade_1'].versions[1].amount = 100;
        all_trades['trade_1'].versions[1].bond_price = 123;
        all_trades['trade_1'].versions[1].settlement_date = 1475651000;
        all_trades['trade_1'].versions[1].version = 1;

        all_trades['trade_1'].versions[2].instrument = "ins_1";
        all_trades['trade_1'].versions[2].buyer = 'buyer_bank_1';
        all_trades['trade_1'].versions[2].seller = 'seller_bank_1';
        all_trades['trade_1'].versions[2].amount = 100;
        all_trades['trade_1'].versions[2].bond_price = 234;
        all_trades['trade_1'].versions[2].settlement_date = 1475651000;
        all_trades['trade_1'].versions[2].version = 2;

        // set up trade_2

        all_trades['trade_2'] = blank_tvm;

        all_trades['trade_2'].current_version = 3;
        all_trades['trade_2'].versions[1] = blank_td;
        all_trades['trade_2'].versions[2] = blank_td;
        all_trades['trade_2'].versions[3] = blank_td;

        all_trades['trade_2'].versions[1].instrument = "ins_1";
        all_trades['trade_2'].versions[1].buyer = 'buyer_bank_2';
        all_trades['trade_2'].versions[1].seller = 'seller_bank_2';
        all_trades['trade_2'].versions[1].amount = 200;
        all_trades['trade_2'].versions[1].bond_price = 456;
        all_trades['trade_2'].versions[1].settlement_date = 1475652000;
        all_trades['trade_2'].versions[1].version = 1;

        all_trades['trade_2'].versions[2].instrument = "ins_1";
        all_trades['trade_2'].versions[2].buyer = 'buyer_bank_2';
        all_trades['trade_2'].versions[2].seller = 'seller_bank_3';
        all_trades['trade_2'].versions[2].amount = 200;
        all_trades['trade_2'].versions[2].bond_price = 456;
        all_trades['trade_2'].versions[2].settlement_date = 1475652000;
        all_trades['trade_2'].versions[2].version = 2;

        all_trades['trade_2'].versions[3].instrument = "ins_1";
        all_trades['trade_2'].versions[3].buyer = 'buyer_bank_2';
        all_trades['trade_2'].versions[3].seller = 'seller_bank_3';
        all_trades['trade_2'].versions[3].amount = 200;
        all_trades['trade_2'].versions[3].bond_price = 567 ;
        all_trades['trade_2'].versions[3].settlement_date = 1475652000;
        all_trades['trade_2'].versions[3].version = 3;
    }

}