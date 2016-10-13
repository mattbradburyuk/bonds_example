#Trades_test_3

Adds 'New_trade_event' and 'Edit_trade_event' to the .sol

* Trades_test_3_multiple_new.js -> creates 4 new trades with sequential trade_ids
* Trades_test_3_new_edit_get.js - creates a single new trade, then edits it to fill in trade details then gets the trade details
* Trades_test_3_watch.js -> watches for events as they are fired 
* Trades_test_3_get_all_events -> gets all events that have been historically fired
* Trades_test_3_get_filtered_new_trade_events.js -> gets new trade events but filtered for only the trade_2 (using a trade_no index event field)