Thoughts


How to stamp time on to trade 
    - Can we stamp unix time (do we pass it to function or can the evm get at it)
    - Do we have to use block time
    - Can block time be used as proxy for real time- is it on block - Yes
    
    
    
    
#Notes

##Solidity

You can't assign to a mapping outside of a function






#Changes to mushroom

- Added common_promises_helper.js

- Did something to reference helpers

- Need to change contract helpers so they reference rpc

- get deployer to prompt for password

- need to get deployer to take a variable amount of gas (changed to 30000000 from 3000000)

- need to change ethereumplay to hold a higher gas limit, look at --targetgaslimit geth option

- added dependencies