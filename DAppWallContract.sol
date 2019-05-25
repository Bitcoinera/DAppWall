pragma solidity ^0.5.1;

contract DappWall {
    event listIP(
        address indexed _from,
        bytes32 indexed _swarmHashList
    );

    function update(bytes32 _swarmHashList) public payable{
        // Events are emitted using 'emit', followed by
        // the name of the event and the arguments
        // (if any) in parentheses. Any such invocation
        // (even deeply nested) can be detected from
        // the JavaScript API by filtering for 'Deposit'
        emit listIP(msg.sender, _swarmHashList);
    }
}
