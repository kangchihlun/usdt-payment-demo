pragma solidity ^0.6.2;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract PaymentProcessor {
  address public admin;
  IERC20 public usdt;

  event PaymentDone(
    address payer,
    uint amount,
    uint paymentId,
    uint date
  );

  constructor(address adminAddress, address usdtAddress) public {
    admin = adminAddress;
    usdt = IERC20(usdtAddress);
  }

  function pay(uint amount, uint paymentId) external {
    usdt.transferFrom(msg.sender, admin, amount);
    emit PaymentDone(msg.sender, amount, paymentId, block.timestamp);
  }
}
