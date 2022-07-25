pragma solidity 0.8.14;

contract myEth{
    
    address private minter;
    mapping (address=>uint) Balance;

    constructor() {
        minter = msg.sender;
    }

    modifier onlyMinter() {
        require(msg.sender == minter);
        _;
    }

    modifier checkBal(uint _amount){
        require(Balance[msg.sender] >= _amount);
        _;
    }   

    function mint(uint _amount) public onlyMinter(){
        Balance[minter] += _amount;
    }

    function transfer(address _reciever,uint _amount) public checkBal(_amount){
        Balance[_reciever] += _amount;
        Balance[msg.sender] -= _amount;
    }

    function balance() public view returns(uint) {
        return Balance[msg.sender];
    }
}