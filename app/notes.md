Thoughts


How to stamp time on to trade 
    - Can we stamp unix time (do we pass it to function or can the evm get at it)
    - Do we have to use block time
    - Can block time be used as proxy for real time- is it on block - Yes
    
    
    
current approach with log_trade_versions will end up with alot of duplicated code, can closures make it more efficient.
    
    
#Notes

##Solidity

You can't assign to a mapping outside of a function






#Changes to mushroom

- Added common_promises_helper.js - done

- Did something to reference helpers

- Need to change contract helpers so they reference rpc - done

- get deployer to prompt for password - done

- need to get deployer to take a variable amount of gas (changed to 30000000 from 3000000) - done

- need to change ethereumplay to hold a higher gas limit, look at --targetgaslimit geth option

- added dependencies - done




"trade_0", "inst_1", "buyer_1", "seller_1", 100, 123, 123456789