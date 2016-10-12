pragma solidity ^0.4.0;

contract Events_test {

    event My_message(address indexed sender, bytes32 message);
    event Event_1(address indexed sender, bytes32 message);
    event Event_2(address indexed sender, bytes32 message);


    function send_message() {
        My_message(msg.sender, "2 Short message");
    }

    function trigger_event_1(){
        Event_1(msg.sender, "Event_1 triggered");
    }

    function trigger_event_2(){
        Event_2(msg.sender, "Event_2 triggered");
    }

}
