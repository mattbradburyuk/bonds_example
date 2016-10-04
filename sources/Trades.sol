pragma solidity ^0.4.0;


contract Trades {

    uint dummy_var;

    struct Trade {
        string instrument;
        string buyer;
        string seller;
        // uint amount;
        // uint bond_price;
        // uint settlement_date;
    }

    Trade dummy_trade;

    function Trades(){
        dummy_var = 100;

        dummy_trade.instrument = "bond_1";
        dummy_trade.buyer = "buyer_bank";
        dummy_trade.seller = "seller_bank";
        }

    function get_trade() constant returns (string a, string b, string c){

        a = dummy_trade.instrument;
        b = dummy_trade.buyer;
        c = dummy_trade.seller;
    }

    function proxy_set_trade(){

        set_trade("bond_4","buyer_4","seller_4");

    }

    function set_trade(string i, string b, string s){

        dummy_trade.instrument = i;
        dummy_trade.buyer = b;
        dummy_trade.seller = s;

    }


    function get_dummy() constant returns (uint){

        return dummy_var;

    }

}