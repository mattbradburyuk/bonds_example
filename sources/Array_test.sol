pragma solidity ^0.4.2;

contract Array_test{

    string[] my_array;

    function Array_test(){
        my_array.length = 2;

        my_array[0] = 'hello';
        my_array[1] = 'world';

    }

    function add_array_item(){
        uint len = my_array.length;
        my_array.length = len + 1;
        my_array[len] = "an array item";
    }


    function get_array_item(uint ind) constant returns(string){
        return my_array[ind];
    }

    function get_array_len() constant returns (uint){
        return my_array.length;
    }


}