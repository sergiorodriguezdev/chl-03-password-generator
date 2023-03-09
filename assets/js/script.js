// Sets of characters
const specialChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
const numericChars = "012345689";

// Variables to track character types selected
// Valid options are: 'special', 'upper', 'lower', 'numeric'
var selectedTypes = [];
const special = "special";
const upperCase = "upper";
const lowerCase = "lower";
const numeric = "numeric";
var specialCounter = 0;
var upperCaseCounter = 0;
var lowerCaseCounter = 0;
var numericCounter = 0;

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  var randomPassword = "";
  selectedTypes = []; // Remove previously selected options
  
  var passwordLength = window.prompt("Enter the desired password length. It should be a number between 8 and 128 inclusive: ");

  // If user cancels prompt, then return to web page
  if (passwordLength == null) {
    return "";
  }
  
  passwordLength = Number(passwordLength);
  
  // Check if length value is valid per user acceptance criteria
  // Input must be an integer between 8 and 128 (inclusive)
  // Input is invalid if length is a string (NaN once converted to a number type) or length is a float
  if(isNaN(passwordLength) || !Number.isInteger(passwordLength) || passwordLength < 8 || passwordLength > 128) {
    
    // Continue prompting for input while length value entered is incorrect
    do {
      passwordLength = window.prompt("Invalid input. Enter the desired password length. It should be a number between 8 and 128 inclusive: ");
      
      // If user cancels prompt, then return to web page
      if (passwordLength == null) {
        return "";
      }
      
      passwordLength = Number(passwordLength);
    } while(isNaN(passwordLength) || !Number.isInteger(passwordLength) || passwordLength < 8 || passwordLength > 128); // Same conditional statement as above
  }

//
do {
  promptTypes();
} while(selectedTypes.length === 0); // If no types are selected, run through prompts again

  // for(var i = 0; i < passwordLength; i++) {
  //   randomPassword += "a";
  // }

  return randomPassword;
}

function promptTypes() {
  var confirmOption = window.confirm("Include lower case letters?");
  if (confirmOption)
  {
    selectedTypes.push(lowerCase); // Add lower case type to tracking array
  }

  confirmOption = window.confirm("Include upper case letters?");
  if (confirmOption)
  {
    selectedTypes.push(upperCase); // Add upper case type to tracking array
  }

  confirmOption = window.confirm("Include numbers?");
  if (confirmOption)
  {
    selectedTypes.push(numeric); // Add numeric type to tracking array
  }

  confirmOption = window.confirm("Include special characters?");
  if (confirmOption)
  {
    selectedTypes.push(special); // Add sepcial chars type to tracking array
  }
}