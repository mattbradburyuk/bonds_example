pragma solidity ^0.4.0;

contract Events_test {

    event My_message(address indexed sender, bytes32 message);

    function send_message() {

        My_message(msg.sender, "Short message");
    }
}
