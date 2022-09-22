// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract KingOfTheFools {
    
    uint256 private constant _INIT_AMOUNT = 1 ether;
    uint8 private constant _NOT_ENTERED = 1;
    uint8 private constant _ENTERED = 2;

    uint256 public currentAmount;
    address public currentKing;
    uint8 private _status;

    event NewKing(address newKing, address previousKing, uint256 paidAmount);

    error Reentrant();
    error InsufficientFunds();

    constructor() {
        _status = _NOT_ENTERED;
    }

    function becomeKing() public payable {
        // reentrancy guard
        if (_status == _ENTERED) {
            revert Reentrant();
        }
        _status = _ENTERED;

        uint256 prevAmount = currentAmount;
        uint256 amount = prevAmount;

        // calculate new amount
        if (amount == 0) {
            amount = _INIT_AMOUNT;
        } else {
            amount = amount + amount / 2;
        }

        // return over sent amount
        if (msg.value != amount) {
            if (msg.value > amount) {
                unchecked {
                    payable(msg.sender).transfer(msg.value - amount);
                }
            } else {
                revert InsufficientFunds();
            }
        }

        // return to the previous king
        address king = currentKing;
        if (king != address(0)) {
            payable(king).transfer(prevAmount);
        }
        currentKing = msg.sender;
        currentAmount = amount;
        emit NewKing(msg.sender, king, amount);

        // reentrancy guard end
        _status = _NOT_ENTERED;
    }

    function nextAmount() external view returns (uint256) {
        uint256 amount = currentAmount;
        if (amount == 0) {
            return _INIT_AMOUNT;
        } else {
            return amount + amount / 2;
        }
    }
}
