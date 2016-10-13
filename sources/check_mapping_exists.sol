pragma solidity ^0.4.2;


contract Check_mapping_exists{

    mapping (string => string) my_map;

    struct my_struct{
        bool initialised;
        uint    a_uint;
        string  a_string;
    }

    my_struct blank_struct;

    mapping (string => my_struct) my_struct_map;

    function Check_mapping_exists(){

        my_map['key_0'] = 'value_0';
        my_map['key_1'] = 'value_1';
        my_map['key_2'] = 'value_2';
        my_map['key_3'] = 'value_3';
        my_map['key_4'] = 'value_4';

        blank_struct.initialised = true;

        my_struct_map['key_0'] = blank_struct;
        my_struct_map['key_1'] = blank_struct;
        my_struct_map['key_2'] = blank_struct;
        my_struct_map['key_3'] = blank_struct;
        my_struct_map['key_4'] = blank_struct;
    }

    function check_key(string key) constant returns (string){

        return my_map[key];

    }

    function check_struct_key(string key) constant returns (uint ret_val){

        if (my_struct_map[key].initialised == false){
            ret_val = 0;
        }else
        {
            ret_val = 1;
        }
    }
}