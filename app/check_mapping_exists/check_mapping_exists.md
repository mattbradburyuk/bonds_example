#Check_mapping_exisits

looks at mechanism for seeing if a key has a mapping in a map.

2 cases: 

1) mapping to a string ie. mapping (string => string) my_map;

    tested with: check_string_mapping_exists.js

2) mapping to a struct ie. mapping (string => my_struct) my_struct_map;

    tested with: check_struct_mapping_exists.js

Note, for Solidity data types they initialise to 0, "" etc... A struct doesn;t have a 'zero' initalised value, so can include a struct.initalise boolean which can be set on initalisation.
