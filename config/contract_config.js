module.exports = {

    rpc: {
        host: "192.168.99.100",
        port: 8541
    },

    files_to_compile: [ "Struct_ref_test.sol","Array_test.sol" ,"Trades_test_2.sol", "Events_test.sol" ],
    compiler_output_file: "compiled.json",
    compiler_output_file_to_deploy: "compiled.json",
    contracts_to_deploy: ["Array_test", "Trades_test_2", "Events_test","Struct_ref_test"],
    deployment_record: "deployed_instances.json"
    
};