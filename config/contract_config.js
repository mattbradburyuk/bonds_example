module.exports = {

    rpc: {
        host: "192.168.99.100",
        port: 8541
    },

    files_to_compile: ["Struct_ref_test.sol", "Trades_test_1.sol" ],
    compiler_output_file: "compiled.json",
    compiler_output_file_to_deploy: "compiled.json",
    contracts_to_deploy: ["Struct_ref_test","Trades_test_1"],
    deployment_record: "deployed_instances.json"
    
};