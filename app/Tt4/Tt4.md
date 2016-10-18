#Trade_test_4 (Tt4)

Tt4_load_trades_from_csv.js: 

1) Parse csv_trades_source.csv
2) For each row
 --> Call new trade  
 --> Edit trade to add details 


Tt4_get_all_trades.js

1) get_number of trades from contract
2) get all trade names
3) get all trade details
4) export to csv
5) display in cli-table


Managed to fire 200 trades in. When tried 300 it hung.

Also added tic/ toc to note starting/ending unix time
