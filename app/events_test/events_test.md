#Events_test

Solidity contract sets up functions to fire two types of events.

events_test_fire_event_1.js -> fires Event_1

events_test_fire_event_2.js -> fires Event_2

event_test_get_all_events.js -> will retrieve all events previously fired and return the messages and block they were mined in 

events_test_watch.js -> retrieves all previous events then watches for new ones


Remember to:
* unlock the coinbase account before firing
* make sure geth is mining
