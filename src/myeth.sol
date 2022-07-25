pragma solidity 0.8.15;

contract myEth{
    
    address private minter;
    mapping (address=>uint) Balance;

    constructor(address _minter) {
        minter = _minter;
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