pragma solidity ^0.4.19;


contract PropertyContract {

	string public owner_name;
	string public location;
	string public ptype;
	uint   public size;
	uint   public cost;
	uint   public tax;

	address public government;

	bool public isGovernmentSigned = false;
	uint public governmentSignedTime;

	address public owner;

	event NewPropertyCreated(address indexed owner_address, uint created_time);
	event GovernmentSigned(uint time);
	event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
	
    constructor (string _owner_name, string _location, string _ptype, uint _size, uint _cost, uint _tax, address _government, address _owner) public {
      owner_name = _owner_name;
      location   = _location;
      ptype      = _ptype;
      size       = _size;
      cost       = _cost;
      tax        = _tax;
      government = _government;
      owner = _owner;
      emit NewPropertyCreated(_owner, now);
    }

    modifier onlyOwner() {
	    require(msg.sender == owner);
	    _;
    }

    modifier onlyGovernment() { 
    	require (msg.sender == government); 
    	_; 
    }
    
    modifier bGovernmentSigned() {
        require (!isGovernmentSigned);
        _;
    }
    

    function GovernmentSign() onlyGovernment public returns(bool){
    	isGovernmentSigned = true;
    	governmentSignedTime = now;
    	emit GovernmentSigned(now);
    	return true;
    }

    function transferOwnership(address newOwner) onlyOwner bGovernmentSigned public {
	    require(newOwner != address(0));
	    emit OwnershipTransferred(owner, newOwner);
	    owner = newOwner;
	}

    function checkGovernmentSigned() public constant returns(bool) {
    	return isGovernmentSigned;
    }
    
    function checkOwnership() public constant returns(bool) {
        return msg.sender == owner;
    }

}
