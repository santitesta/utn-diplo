// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract QuiniBlockUtils {

    // Function to check if numbers are unique
    function areUniqueNumbers(uint32[6] memory numbers) public pure returns (bool) {
        require(numbers.length == 6, "Invalid number of chosen numbers");
        for (uint8 i = 0; i < numbers.length; i++) {
            for (uint8 j = i + 1; j < numbers.length; j++) {
                if (numbers[i] == numbers[j]) {
                    return false;
                }
            }
        }
        return true;
    }

    // Function to check if numbers are within the valid range
    function areValidNumbers(uint32[6] memory numbers) public pure returns (bool) {
        require(areUniqueNumbers(numbers), "The Numbers must be unique");

        for (uint8 i = 0; i < numbers.length; i++) {
            if (numbers[i] < 0 || numbers[i] > 45) {
                return false;
            }
        }
        return true;
    }

    // Function to compare two sets of numbers
    function compareNumbers(uint32[6] memory numbers1, uint32[6] memory numbers2) public pure returns (bool) {
        for (uint8 i = 0; i < numbers1.length; i++) {
            if (numbers1[i] != numbers2[i]) {
                return false;
            }
        }
        return true;
    }

    // Function to order the chosen numbers in ascending order
    function orderNumbers(uint32[6] memory numbers) public pure returns (uint32[6] memory) {
        for (uint i = 0; i < numbers.length - 1; i++) {
            for (uint j = i + 1; j < numbers.length; j++) {
                if (numbers[i] > numbers[j]) {
                    uint32 temp = numbers[i];
                    numbers[i] = numbers[j];
                    numbers[j] = temp;
                }
            }
        }
        return numbers;
    }
}
