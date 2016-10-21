#Trade_test_5 (Tt5)

Concentrated mostly on how to batch load trades into the Contract.

All tests done against a single dockerised geth


main files: 

csv_trade_sources_<no trades>_at_X_per_Y_blocks.scv
* a csv file generated out of google sheets
* column 17 has the target block to be mined in, this is used to set the firing pattern relative to the block number




Tt5_load_trades_from_csv.js
* Reads in th csv file containing trades
* uses promise chains to fire the transactions at the appropriate point
* ran into problems with linux running out of open files (see test 1 and 2 below)

Tt5_load_trades_basic.js
* a more basic firer, to compensate for the problems with Tt5_load_trades_from_csv.js
* requires editing to either create new trades or edit existing ones: 

```
new_trades() 

// edit_trades() 

```
    (ie have to run twice)


Tt5_get_all_trades.js
* reads all trades from the blockchain
* outputs a csv file of the trades (output.csv)
* displays the trades in a cli-table in the console
* can set default block to get snap shots: 
```
line 39:
// web3.eth.defaultBlock = 180   <= uncomment and change to desired block to see previous snapshot
```

# Steps to run a clean test:

1) deploy new geth
2) log on to geth with docker exec
3) open console
```
root@cdf87b2c2654:~# cd go-ethereum/build/bin/
root@cdf87b2c2654:~/go-ethereum/build/bin# ./geth attach
Welcome to the Geth JavaScript console!

instance: Geth/v1.4.18-stable-c72f5459/linux/go1.6.2
coinbase: 0xc71bb89ce21c21c8f83f9490a37fa0876953b49a
at block: 4 (Fri, 21 Oct 2016 14:50:54 UTC)
 datadir: /root/.ethereum
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> 
```

4) deploy and generate helpers from cli
```
$ node mushroom.js deploy
$ node mushroom.js helpers
```
5) (if using Tt5_load_trades_basic.js) unlock account in console for an hour 
```
> personal.unlockAccount(eth.coinbase,'<password>', 3600)
```
6) start mining from console
```
> miner.start()
```
7) If using Tt5_load_trades_basic.js, toggle the new_trade/edit_trade call on line 47/49

7) fire loading script:
```
$ Tt5_load_trades_basic.js
or
$ Tt5_load_trades_from_csv.js
```

7) Review the ethereum logs to see what's going on
* filter on 'commit new work' will show txns going into a block as they are mined
* filter on 'too many' will show errors caused by exceeding the open file limit in linux




#Key learnings:

* The promises approach caused problems maxing out the number of open files in linux (see test 3 below)
* Must make sure that the accounts are unlocked and stay unlocked for the whole test (Tt5_load_trades_basic.js does not have unlock function so need to do manually), eg:
```
personal.unlockAccount(eth.coinbase, '<password>', <time in seconds to stay unlocked>)
``` 
Make sure this is after the contracts have been deployed if using mushroom as the unlocking mechanism for deploy may interfere)




#Tests

##Test 1 

set up: 

* docker geth 1.4.18,
* csv_trade_sources_1000_at_10_per_10_blocks.csv
* Tt5_load_trades_from_csv.js

results

* Only a few trades got through
* key error message: 
```
server.go:2161] http: Accept error: accept tcp [::]:8545: accept4: too many open files;
```
* After this message geth didn't accept anymore connections


##Test 2 

Hypothesis, error in test 1 might be caused by dockerise geth, so run on a local (mac OSX) geth

set up:

* local geth 1.4.18
* csv_trade_sources_1000_at_10_per_10_blocks.csv
* Tt5_load_trades_from_csv.js

results

* only 59 trades out of 1000 got through
* same error as test 1:
```
server.go:2161] http: Accept error: accept tcp 127.0.0.1:8546: accept: too many open files; retrying in 1s
```



##Test 3 

Investigate the problems in test 1 and test 2, focusing on the dockerise geth 

* The error appears to come from the go file:  './usr/share/go-1.6/src/net/http/server.go' in the linux container
* (the same error occurs on other non-geth go programs, see: https://github.com/containous/traefik/issues/157)
* it appears that geth is hitting the Max open files limit set in Linux.

Steps to establish: (utilising techniques in this post: http://www.linuxintro.org/wiki/Is_my_ulimit_exceeded)

1) Start up a geth docker instance
2) Connect to instance:
```
docker exec -it <container_name> bash
```

3) Find out geth process id
```
root@293df5e6d4ce:~# ps -A
  PID TTY          TIME CMD
    1 ?        00:00:24 geth  <--- PID = 1
   13 ?        00:00:00 bash
   29 ?        00:00:00 bash
   50 ?        00:00:00 ps
```

4) Go to the proc directory
```
root@293df5e6d4ce:~# cd /proc/1
root@293df5e6d4ce:/proc/1# 
```

5) look at 'limits' file, note Max open files = 2048 

```
root@293df5e6d4ce:/proc/1# cat limits
Limit                     Soft Limit           Hard Limit           Units     
Max cpu time              unlimited            unlimited            seconds   
Max file size             unlimited            unlimited            bytes     
Max data size             unlimited            unlimited            bytes     
Max stack size            8388608              unlimited            bytes     
Max core file size        0                    unlimited            bytes     
Max resident set          unlimited            unlimited            bytes     
Max processes             1048576              1048576              processes 
Max open files            2048                 1048576              files     
Max locked memory         65536                65536                bytes     
Max address space         unlimited            unlimited            bytes     
Max file locks            unlimited            unlimited            locks     
Max pending signals       15666                15666                signals   
Max msgqueue size         819200               819200               bytes     
Max nice priority         0                    0                    
Max realtime priority     0                    0                    
Max realtime timeout      unlimited            unlimited            us    

```

6) Change to the fd file (tracks open files, I think)
```
root@293df5e6d4ce:/proc/1/fd# ls
0  1  10  11  12  13  14  15  16  17  18  19  2  20  21  3  4  5  6  7  8  9
```

7) use 'ls -1|wc -l' to get number of file
```
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
22
```

8) Start the test again (configured as per test 1)

9) Keep running 'ls -1|wc -l' as the transactions are fired into geth, see the max files top out at 2048.

```
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
22
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
22

root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
310
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
325
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
325
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
325
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
325
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
1316
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
2048
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
2048
root@293df5e6d4ce:/proc/1/fd# ls -1|wc -l
2048
```

This corresponds to when the geth error starts appearing

```
[36mgeth_1_1  |[0m I1020 14:14:43.038691 server.go:2161] http: Accept error: accept tcp [::]:8545: accept4: too many open files; retrying in 1s
```

10) running 'ls -al' shows all the files mapped to the sockets
```
root@293df5e6d4ce:/proc/1/fd# ls -al
total 0
dr-x------ 2 root root  0 Oct 20 13:55 .
dr-xr-xr-x 9 root root  0 Oct 20 13:55 ..
lr-x------ 1 root root 64 Oct 20 13:55 0 -> pipe:[30612]
l-wx------ 1 root root 64 Oct 20 13:55 1 -> pipe:[30613]
lr-x------ 1 root root 64 Oct 20 13:56 10 -> /root/.ethereum/chaindata/000002.ldb
lrwx------ 1 root root 64 Oct 20 14:13 100 -> socket:[32703]
lrwx------ 1 root root 64 Oct 20 14:13 1000 -> socket:[34556]
lrwx------ 1 root root 64 Oct 20 14:13 1001 -> socket:[34558]
lrwx------ 1 root root 64 Oct 20 14:13 1002 -> socket:[34559]
lrwx------ 1 root root 64 Oct 20 14:13 1003 -> socket:[34560]
lrwx------ 1 root root 64 Oct 20 14:13 1004 -> socket:[34561]
lrwx------ 1 root root 64 Oct 20 14:13 1005 -> socket:[34562]
lrwx------ 1 root root 64 Oct 20 14:13 1006 -> socket:[34564]
lrwx------ 1 root root 64 Oct 20 14:13 1007 -> socket:[34565]
lrwx------ 1 root root 64 Oct 20 14:13 1008 -> socket:[34566]
lrwx------ 1 root root 64 Oct 20 14:13 1009 -> socket:[34567]
lrwx------ 1 root root 64 Oct 20 14:13 101 -> socket:[32704]
lrwx------ 1 root root 64 Oct 20 14:13 1010 -> socket:[34569]
lrwx------ 1 root root 64 Oct 20 14:13 1011 -> socket:[34570]
lrwx------ 1 root root 64 Oct 20 14:13 1012 -> socket:[34571]
lrwx------ 1 root root 64 Oct 20 14:13 1013 -> socket:[34572]
lrwx------ 1 root root 64 Oct 20 14:13 1014 -> socket:[34573]
lrwx------ 1 root root 64 Oct 20 14:13 1015 -> socket:[34574]
lrwx------ 1 root root 64 Oct 20 14:13 1016 -> socket:[34576]
 etc...

```


##Test 4

Question: Does the same limit found in test 1 and test 2 come in when not using promises in the node file

setup: 

* docker geth 1.4.18,
* csv_trade_sources_100_sequentially.csv (1 trade per block)
* Tt5_load_trades_basic.js(first run firing new_trades(), then run again editing to fire edit_trades() )
* tx spacing set to ?? (i think it was 5000ms though)

results:

* All trades succesfully loaded 
* open file count did not exceed ~24


##Test 5

* docker geth 1.4.18,
* csv_trade_sources_100_at_10_per_10_blocks.csv
* Tt5_load_trades_basic.js (first run firing new_trades(), then run again editing to fire edit_trades() )
* tx spacing set to ??

results
setup:
* failed after 39 new trade transactions 
* however, didn't get the server.go error
* all the transactions that received a transaction id were mined
* question -> where did the transactions go


##Test 6

try less trades at a time - 5 per 5 blocks

setup:
* docker geth 1.4.18,
* csv_trade_sources_100_at_5_per_5_blocks.csv
* Tt5_load_trades_basic.js (first run firing new_trades(), then run again editing to fire edit_trades() )
* tx spacing set to ??

results:
* failed after 28 new trade transactions 
* however, didn't get the server.go error
* all the transactions that received a transaction id were mined
* question -> where did the transactions go
* question -> is the limit the amount of transaction in the block or it needs more time between transaction batches to sort its self out 

#Test 7 

setup:
* docker geth 1.4.18,
* csv_trade_sources_100_at_5_per_10_blocks.csv
* Tt5_load_trades_basic.js (first run firing new_trades(), then run again editing to fire edit_trades() )
* tx spacing set to 2000ms

results:
* failed after 13 new trade transactions 
* however, didn't get the server.go error
* all the transactions that received a transaction id were mined
* question -> where did the transactions go
* question -> is the limit the amount of transaction in the block or it needs more time between transaction batches to sort its self out 

#Test 8

setup:
* docker geth 1.4.18,
* csv_trade_sources_100_at_5_per_10_blocks.csv
* Tt5_load_trades_basic.js (first run firing new_trades(), then run again editing to fire edit_trades() )
* tx spacing set to 5000ms

results:
* failed after 14 new trade transactions 
* however, didn't get the server.go error
* all the transactions that received a transaction id were mined
* question -> where did the transactions go
* question -> is the limit the amount of transaction in the block or it needs more time between transaction batches to sort its self out 




Investigate:

* Note, when restarting the test on the same blockchain no trades were accepted 
* turns out I had forgotten to unlock the account, it was still unlocked from the deploy but then locked after acouple of minutes of the test.
* Solution unlock the account for an hour: 
```
personal.unlockAccount(eth.coinbase,'mattspass',3600)
```


##Test 9

re run earlier tests

(re run test 5)

* docker geth 1.4.18,
* csv_trade_sources_100_at_10_per_10_blocks.csv
* Tt5_load_trades_basic.js (first run firing new_trades(), then run again editing to fire edit_trades() )
* tx spacing set to 5000

result:

* all new trades and edit trades run successfully

##Test 10

up the load

* docker geth 1.4.18,
* csv_trade_sources_100_at_10_per_10_blocks.csv
* Tt5_load_trades_basic.js (first run firing new_trades(), then run again editing to fire edit_trades() )
* tx spacing set to 500ms

new trades all ran successfully - didn't run edit as it would take to long


##Test 11

How many trades can ethereum process in one go + how long to clear them

* docker geth 1.4.18,
* csv_trade_sources_100_at_100_per_1_block.csv
* Tt5_load_trades_basic.js (first run firing new_trades(), then run again editing to fire edit_trades() )
* tx spacing set to 50ms

results:
* all trades and edits processed
* 4 blocks to clear all new trades
* 12 blocks to clear edit trades


##Test 12

Can the interval get reduced further -> 5ms

* docker geth 1.4.18,
* csv_trade_sources_100_at_100_per_1_block.csv
* Tt5_load_trades_basic.js (first run firing new_trades(), then run again editing to fire edit_trades() )
* tx spacing set to 5ms

results:
* all trades and edits processed
* 14 blocks to clear all new trades
* 4 blocks to clear edit trades

Hence, reducing interval doesnt; improve rate of acceptance of trades into geth, there must be another limiting factor.


##Test 13

How many tades can geth take in one go? 

* docker geth 1.4.18,
* csv_trade_sources_1000_at_1000_per_1_block.csv
* Tt5_load_trades_basic.js (first run firing new_trades(), then run again editing to fire edit_trades() )
* tx spacing set to 50ms

