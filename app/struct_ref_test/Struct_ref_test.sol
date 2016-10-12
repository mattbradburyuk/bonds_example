// Referencing test for mapping -> struct { mapping ->struct {values} }

pragma solidity ^0.4.2;


contract Struct_ref_test{

    // Structure: mapping (uint => Main_struct { mapping (uint => Sub_struct { data }})

    // note: Cannot assign to a mapping outside of a function

    struct Main_struct{

        uint test_number;
        string test_string;
        mapping (uint => Sub_struct) sub_map;
    }

    Main_struct blank_main_struct;

    struct Sub_struct{

        uint sub_number;
        string sub_string;
    }

    Sub_struct blank_sub_struct;

    // starting point for mapping
    mapping (uint => Main_struct) my_test_structs;



    // Contract constructor sets up data
    function Struct_ref_test(){
        set_up_data();
    }


    // set up data
    function set_up_data(){


        my_test_structs[1] = blank_main_struct;
        my_test_structs[1].test_number= 10;
        my_test_structs[1].test_string = "main_string_1";
        my_test_structs[1].sub_map[1] = Sub_struct({sub_number: 1001, sub_string: 'sub_string_1'});
        my_test_structs[1].sub_map[2] = Sub_struct({sub_number: 1002, sub_string: 'sub_string_2'});


        my_test_structs[2] = blank_main_struct;
        my_test_structs[2].test_number= 20;
        my_test_structs[2].test_string = "main_string_2";
        my_test_structs[2].sub_map[1] = Sub_struct({sub_number: 2001, sub_string: 'sub_string_1'});
        my_test_structs[2].sub_map[2] = Sub_struct({sub_number: 2002, sub_string: 'sub_string_2'});
    }


    // data retrival
    function get_my_test_structs(uint main, uint sub) constant returns (uint n,string s, uint sn, string ss ){

        n = my_test_structs[main].test_number;
        s = my_test_structs[main].test_string;
        sn = my_test_structs[main].sub_map[sub].sub_number;
        ss = my_test_structs[main].sub_map[sub].sub_string;

    }
}