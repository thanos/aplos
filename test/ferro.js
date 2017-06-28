var Ferro = artifacts.require("../contracts/Ferro.sol");

contract('Ferro', function(accounts) {
  it("should put 10000 Ferro in the first account", function() {
    return Ferro.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var ferro;
    var FerroBalance;
    var FerroEthBalance;

    return Ferro.deployed().then(function(instance) {
      ferro = instance;
      return ferro.balanceOf.call(accounts[0]);
    }).then(function(outCoinBalance) {
      FerroBalance = outCoinBalance.toNumber();
      return ferro.balanceOfInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      FerroEthBalance = outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(FerroEthBalance, (FerroBalance/ferro.getPrice()), "Library function returned unexpeced function, linkage may be broken");
    });
  });

  it("should send coin correctly", function() {
    var ferro;

    //    Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return Ferro.deployed().then(function(instance) {
      ferro = instance;
      return ferro.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return ferro.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return ferro.transfer(account_two, amount, {from: account_one});
    }).then(function() {
      return ferro.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return ferro.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
