pragma solidity 0.6.2;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

// 測試用 usdt 測試網用
contract TetherToken is ERC20 {
  constructor() ERC20('TetherToken Stablecoin', 'USDT') public {}

  function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
}
