pragma solidity ^0.4.2;


import './zeppelin/token/CrowdsaleToken.sol';
import './zeppelin/token/PausableToken.sol';


// /**
//  * @title Ferro
//  */

contract Ferro  is CrowdsaleToken, PausableToken {

	string public name = "Ferro"; 
	string public symbol = "FO";
	uint public decimals = 18;
	uint public INITIAL_SUPPLY = 10000;
	uint public PRICE = 250;

	address public issuer;
	address public author;

	function Ferro(address theIssuer, address theAuthor) {
		totalSupply = INITIAL_SUPPLY;
		balances[msg.sender] = INITIAL_SUPPLY;
		issuer = theIssuer;
		author = theAuthor;
	}

  /**
   * @dev Creates tokens and send to the specified address.
   * @param recipient The address which will recieve the new tokens.
   */
  function createTokens(address recipient) payable {
    if (msg.value == 0) {
      throw;
    }

    uint tokens = msg.value.mul(getPrice());
    totalSupply = totalSupply.add(tokens);

    balances[recipient] = balances[recipient].add(tokens);

    if (!owner.send(msg.value)) {
      throw;
    }
  }

  /**
   * @dev replace this with any other price function
   * @return The price per unit of token. 
   */
  function getPrice() constant returns (uint result) {
    return PRICE;
  }


	function getBalanceInEth(address addr) returns(uint){
		return (balanceOf(addr) / PRICE);
	}

}