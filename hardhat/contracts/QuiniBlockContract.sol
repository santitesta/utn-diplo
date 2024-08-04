// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./QuiniBlockPotManager.sol";

contract QuiniBlockContract is QuiniBlockPotManager {
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

    uint256 public ticketPrice = 0.001 ether; //trabajar en wei

    mapping(uint32 => Ticket) public tickets;
    uint32 public ticketCount;

    mapping(uint32 => Draw) public draws;
    uint32 public currentDrawId = 0;

    // Events
    event DrawStarted(uint32 drawId,uint256 _primaryPot);
    event TicketPurchased(uint32 ticketId, uint32 drawId, address buyer); // Modified event
    event DrawDone(uint32 drawId,  uint256 drawDate,uint32[6] winningNumbers,address[] winners);
    event SetTicketPrice(uint256 _ticketPriceInWei);

    //constructor for Ownable
    constructor(uint256 _basePotValue, address initialOwner) QuiniBlockPotManager(_basePotValue,initialOwner) {}

    // Function to purchase a ticket
    function purchaseTicket(uint32[6] memory _chosenNumbers) public payable whenNotPaused {
        // // Check if the sent value is equal to the ticket price
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
        // //incremento los pozos
        incrementPots(ticketPrice);
    }

    // Function to start a new draw
    function startDraw() public onlyOwner whenNotPaused isPrimaryPotAvailable{
        currentDrawId++;
        emit DrawStarted(currentDrawId, primaryPot);
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
            uint256 prize = primaryPot / myWinners.length;
            for (uint32 i = 0; i < myWinners.length; i++) {
                (bool success, ) = myWinners[i].call{value: prize}("");
                require(success, "Transfer to winner failed");
            }

            resetPrimaryPot();// Reset primary pot after distribution
        }

        //falta ajustar los pozo para el siguiente sorteo
        emit DrawDone(currentDrawId, block.timestamp, _winningNumbers, myWinners);
    }

    // Function to see the result of a draw
    function getDraw(uint32 _drawId) public view returns (Draw memory) {
        return draws[_drawId];
    }

    // Function to set el precio de ticketen wei
    function setTicketPrice(uint256 _ticketPriceInWei) public onlyOwner {
        require(_ticketPriceInWei > 0, "El precio del ticket debe ser mayor que 0");
        ticketPrice = _ticketPriceInWei;
        emit SetTicketPrice(_ticketPriceInWei);
    }

    // Function to get the chosen numbers of a ticket
    function getTicketNumbers(uint32 ticketId) public view returns (uint32[6] memory) {
        return tickets[ticketId].chosenNumbers;
    }
    
    // Function to find the winners of a draw
    function findWinners(uint32 _drawId, uint32[6] memory _winningNumbers) private view returns (address[] memory) {
        address[] memory tempWinners = new address[](ticketCount);
        uint32 winnerCount = 0;
        uint32[6] memory _winningOrderNumbers = orderNumbers(_winningNumbers);
        for (uint32 i = 0; i < ticketCount; i++) {
            if (tickets[i].drawId == _drawId && compareNumbers(tickets[i].chosenNumbers, _winningOrderNumbers)) {
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

}
