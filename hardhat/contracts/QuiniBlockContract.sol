// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

import "./QuiniBlockUtils.sol";

contract QuiniBlockContract is Ownable, Pausable, QuiniBlockUtils {
    struct Ticket {
        uint32[6] chosenNumbers;
        address buyer;
        uint32 drawId; // Added to link ticket to a draw
    }

    struct Draw {
        uint256 drawDate;
        uint32[6] winningNumbers;
        address[] winners;
    }

    uint256 public primaryPotValue;
    uint256 public secondaryPotValue;
    uint256 public ticketPrice = 0.001 ether;

    mapping(uint32 => Ticket) public tickets;
    uint32 public ticketCount;

    mapping(uint32 => Draw) public draws;
    uint32 public currentDrawId;

    // Events
    event SetPotValues(uint256 _primaryPotValue, uint256 _secondaryPotValue);
    event DrawStarted(uint32 drawId,uint256 _primaryPotValue);
    event TicketPurchased(uint32 ticketId, uint32 drawId, address buyer); // Modified event
    event DrawDone(uint32 drawId,  uint256 drawDate,uint32[6] winningNumbers,address[] winners);

    //constructor for Ownable
    constructor(address initialOwner) Ownable(initialOwner) {}

    // Function to purchase a ticket
    function purchaseTicket(uint32[6] memory _chosenNumbers) public payable whenNotPaused {
        // Check if the sent value is equal to the ticket price
        require(msg.value == ticketPrice, "Incorrect Ether value sent");
        require(currentDrawId > 0, "No draw has been initiated yet");
        require(areValidNumbers(_chosenNumbers), "Chosen numbers must be between 0 and 45");
        require(draws[currentDrawId].drawDate == 0, "No active draw with the current draw ID");

        uint32[6] memory orderChosenNumbers = orderNumbers(_chosenNumbers);
        tickets[ticketCount] = Ticket({
            chosenNumbers: orderChosenNumbers,
            buyer: msg.sender,
            drawId: currentDrawId // Link ticket to the draw
        });

        emit TicketPurchased(ticketCount, currentDrawId, msg.sender); // Emit modified event
        ticketCount++;
    }

    // Function to start a new draw
    function startDraw(uint256 _primaryPotValue, uint256 _secondaryPotValue) public onlyOwner whenNotPaused {
        require(_primaryPotValue > 0 , "Requires that the primary Pot not be null");
        currentDrawId++;
        setPotValues(_primaryPotValue, _secondaryPotValue);
        emit DrawStarted(currentDrawId, _primaryPotValue);
    }

    // Function that issues the draw and distributes the prize
    function emitDraw(uint32[6] memory _winningNumbers) public onlyOwner whenNotPaused {
        require(areValidNumbers(_winningNumbers), "Winning numbers must be between 0 and 45");
        // Buscar a los ganadores con los números
        address[] memory myWinners  = findWinners(currentDrawId, _winningNumbers); // Inicializar como dirección nula

        draws[currentDrawId] = Draw({
            winningNumbers: _winningNumbers,
            drawDate: block.timestamp,
            winners : myWinners
        });

        //transfiere los fondos
        if (myWinners.length > 0) {
            uint256 prize = primaryPotValue / myWinners.length;
            for (uint32 i = 0; i < myWinners.length; i++) {
                (bool success, ) = myWinners[i].call{value: prize}("");
                require(success, "Transfer to winner failed");
            }
            primaryPotValue = 0; // Reset primary pot after distribution
        }

        //falta ajustar los pozo para el siguiente sorteo
        emit DrawDone(currentDrawId, block.timestamp, _winningNumbers, myWinners);
    }

    // Function to see the result of a draw
    function getDraw(uint32 _drawId) public view returns (Draw memory) {
        return draws[_drawId];
    }

    // Function to set contract info
    function setPotValues(uint256 _primaryPotValue, uint256 _secondaryPotValue) public onlyOwner {
        primaryPotValue = _primaryPotValue;
        secondaryPotValue = _secondaryPotValue;
        emit SetPotValues(primaryPotValue, secondaryPotValue);
    }

    // Function to get the chosen numbers of a ticket
    function getTicketNumbers(uint32 ticketId) public view returns (uint32[6] memory) {
        return tickets[ticketId].chosenNumbers;
    }
    
    // Function to find the winners of a draw
    function findWinners(uint32 _drawId, uint32[6] memory _winningNumbers) private view returns (address[] memory) {
        address[] memory tempWinners = new address[](ticketCount);
        uint32 winnerCount = 0;

        for (uint32 i = 0; i < ticketCount; i++) {
            if (tickets[i].drawId == _drawId && compareNumbers(tickets[i].chosenNumbers, _winningNumbers)) {
                tempWinners[winnerCount] = tickets[i].buyer;
                winnerCount++;
            }
        }

        address[] memory winners = new address[](winnerCount);
        for (uint32 i = 0; i < winnerCount; i++) {
            winners[i] = tempWinners[i];
        }

        return winners;
    }

    // Function to pause the contract
    function pause() public onlyOwner {
        _pause();
    }

    // Function to unpause the contract
    function unpause() public onlyOwner {
        _unpause();
    }
}
