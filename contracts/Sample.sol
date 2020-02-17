// pragma solidity ^0.4.4;
pragma solidity >0.4.99 <0.6.0;

contract Sample {
    uint256 value = 1;

    function getValue() public view returns (uint256) {
        return value;
    }

    function setValue(uint256 _value) public {
        value = _value;
    }

}
