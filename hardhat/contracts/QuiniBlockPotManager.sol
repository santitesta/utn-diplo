// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/utils/Pausable.sol";
//import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "./QuiniBlockUtils.sol";

contract QuiniBlockPotManager is  Initializable, PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable, QuiniBlockUtils, ReentrancyGuardUpgradeable  {
    uint256 public primaryPot;
    uint256 public secondaryPot;
    uint256 public reservePot;
    uint256 public basePotValue;

    uint8 public primaryPotPercentage;
    uint8 public secondaryPotPercentage;
    uint8 public reservePotPercentage;

    bool private _isContractPaused;

    event SetPotValues(uint256 primaryPot, uint256 secondaryPot, uint256 reservePot);
    event SetPotPercentages(uint8 primaryPotPercentage, uint8 secondaryPotPercentage, uint8 reservePotPercentage);
    event IncrementedPot(uint256 totalIncrement, uint256 primaryIncrement, uint256 secondaryIncrement, uint256 reserveIncrement);
    event AdjustPots(uint256 newPrimaryPot, uint256 newSecondaryPot);

    modifier isPrimaryPotAvailable(){
        require(primaryPot > 0, "An available primary well is required.");
        _;
    }

    function initialize(uint256 _basePotValue, address initialOwner) virtual initializer public {
        __Ownable_init(initialOwner);
        basePotValue = _basePotValue;
        primaryPot = basePotValue;
        __UUPSUpgradeable_init();
    }
    
    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
    
    // Para establecer los valores de cada pozo.
    function setPotValues(uint256 _primaryPot, uint256 _secondaryPot, uint256 _reservePot) public onlyOwner whenNotPaused {
        primaryPot = _primaryPot;
        secondaryPot = _secondaryPot;
        reservePot = _reservePot;
        emit SetPotValues(primaryPot, secondaryPot, reservePot);
    }

    // Para asignar porcentajes a cada pozo, asegurándose de que la suma de los porcentajes sea 100.
    function setPotPercentages(uint8 _primaryPotPercentage, uint8 _secondaryPotPercentage, uint8 _reservePotPercentage) public onlyOwner whenNotPaused {
        require(_primaryPotPercentage + _secondaryPotPercentage + _reservePotPercentage == 100, "Percentages must add up to 100");
        primaryPotPercentage = _primaryPotPercentage;
        secondaryPotPercentage = _secondaryPotPercentage;
        reservePotPercentage = _reservePotPercentage;
        emit SetPotPercentages(primaryPotPercentage, secondaryPotPercentage, reservePotPercentage);
    }

    // Para incrementar los pozos según los porcentajes establecidos.
    function incrementPots(uint256 totalIncrement) internal {
        uint256 primaryIncrement = (totalIncrement * primaryPotPercentage) / 100;
        uint256 secondaryIncrement = (totalIncrement * secondaryPotPercentage) / 100;
        uint256 reserveIncrement = (totalIncrement * reservePotPercentage) / 100;

        primaryPot += primaryIncrement;
        secondaryPot += secondaryIncrement;
        reservePot += reserveIncrement;

        emit IncrementedPot(totalIncrement, primaryIncrement, secondaryIncrement, reserveIncrement);
    }

    // Funciones para validar que haya suficientes fondos en cada pozo.
    function validateFundsPrimary(uint256 primaryAmount) public view returns (bool) {
        return (primaryPot >= primaryAmount);
    }

    function validateFundsSecondary(uint256 secondaryAmount) public view returns (bool) {
        return (secondaryPot >= secondaryAmount);
    }

    function validateFundsReserve(uint256 reserveAmount) public view returns (bool) {
        return (reservePot >= reserveAmount);
    }

    // Esta función valida que la suma de fondos primario y secundario sea menor al balance para asegurarse que el contrato tenga liquidez
    function validateFunds(uint256 primaryAmount, uint256 secondaryAmount, uint256 reserveAmount) public view returns (bool) {
        uint256 totalFunds = address(this).balance;
        uint256 requiredFunds = primaryAmount + secondaryAmount + reserveAmount;
        return (primaryPot >= primaryAmount && secondaryPot >= secondaryAmount && reservePot >= reserveAmount && requiredFunds <= totalFunds);
    }

    // Para reiniciar el pozo primario al valor base y ajustar el pozo secundario en consecuencia.
    function adjustPots() internal onlyOwner {
        if (secondaryPot >= basePotValue) {
            // Si el pozo secundario es mayor o igual al valor base
            secondaryPot -= basePotValue;
            primaryPot = basePotValue;
        } else {
            // Si el pozo secundario es menor que el valor base
            primaryPot = secondaryPot;
            secondaryPot = 0;
        }
        emit AdjustPots(primaryPot, secondaryPot);
    }

    // Para establecer el valor base del pozo primario.
    function setBasePotValue(uint256 _basePotValue) public onlyOwner whenNotPaused {
        basePotValue = _basePotValue;
    }
    
    // Function to pause the contract
    function pause() public onlyOwner {
        _pause();
        _isContractPaused = true;
    }

    // Function to unpause the contract
    function unpause() public onlyOwner {
        _unpause();
        _isContractPaused = false;
    }

    // Función para recibir fondos en el contrato.
    receive() external payable {}
}
