// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuiniBlock {
    struct Ticket {
        uint32[] chosenNumbers;
        address buyer;
        uint32 drawId; // Added to link ticket to a draw
    }

    struct Draw {
        uint32 drawId;
        uint32[] winningNumbers;
        uint256 drawDate;
    }

    uint256 public primaryPotValue;
    uint256 public secondaryPotValue;

    mapping(uint32 => Ticket) public tickets;
    uint32 public ticketCount;

    mapping(uint32 => Draw) public draws;
    uint32 public drawCount;

    // Events
    event TicketPurchased(uint32 ticketId, uint32 drawId, address buyer); // Modified event
    event DrawCreated(uint32 drawId, uint32[] winningNumbers, uint256 drawDate);

    // Function to purchase a ticket
    function purchaseTicket(uint32 drawId, uint32[] memory _chosenNumbers) public {
        require(drawId < drawCount, "Invalid draw ID"); // Ensure draw exists

        tickets[ticketCount] = Ticket({
            chosenNumbers: _chosenNumbers,
            buyer: msg.sender,
            drawId: drawId // Link ticket to the draw
        });

        emit TicketPurchased(ticketCount, drawId, msg.sender); // Emit modified event
        ticketCount++;
    }

    // Function to create a new draw
    function createDraw(uint32[] memory _winningNumbers) public {
        draws[drawCount] = Draw({
            drawId: drawCount,
            winningNumbers: _winningNumbers,
            drawDate: block.timestamp
        });

        emit DrawCreated(drawCount, _winningNumbers, block.timestamp);
        drawCount++;
    }

    // Function to set contract info
    function setPotValues(uint256 _primaryPotValue, uint256 _secondaryPotValue) public {
        primaryPotValue = _primaryPotValue;
        secondaryPotValue = _secondaryPotValue;
    }
}
