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
var copyBtn = document.querySelector("#copy-clipboard");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

  // Unhide and enable Copy to Clipboard button
  copyBtn.setAttribute("style", "display:inline-block;");
  copyBtn.disabled = false;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyPasswordToClipboard);

function copyPasswordToClipboard() {
  var passwordText = document.querySelector("#password");
  
  // Highlight password
  passwordText.select();

  // Copy password to clipboard
  navigator.clipboard.writeText(passwordText.value);
}

function generatePassword() {
  var randomPassword = "";
  selectedTypes = []; // Remove previously selected options
  
  // Reset character counters
  specialCounter = 0;
  upperCaseCounter = 0;
  lowerCaseCounter = 0;
  numericCounter = 0;
  
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
  };

  do {
    promptTypes();
  } while(selectedTypes.length === 0); // If no types are selected, run through prompts again

  // Generate random characters and append to string (randomPassword)
  // Length entered by user will determine number of times to run through loop
  for (var i = 0; i < passwordLength; i++) {
    randomPassword += generateRandomCharacter();
  }
  // Need to commit again -- ignore

  // Validate password based on character types selected
  // randomPassword = validatePassword(randomPassword);

  // Return validated password
  return randomPassword;
}

// Users will be prompted to select up to 4 types of characters to include in password
// These options will be added to tracking array (selectedTypes)
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

// Character type will be selected at random from tracking array
// Then, character will be selected at random from arrays/strings containing characters to include and 
//  corresponding counters will be updated - these will be used for validation downstream
// Selected character will be returned
function generateRandomCharacter() {

  // Pick a random type from tracking array
  var randomSelection = Math.floor(Math.random() * selectedTypes.length);

  // If type selected is lower case, pick a random lower case char
  if(selectedTypes[randomSelection] === lowerCase) {
    lowerCaseCounter++;
    randomSelection = Math.floor(Math.random() * lowerCaseChars.length);
    return lowerCaseChars[randomSelection];
  }

  // If type selected is lower case, pick a random upper case char
  if(selectedTypes[randomSelection] === upperCase) {
    upperCaseCounter++;
    randomSelection = Math.floor(Math.random() * upperCaseChars.length);
    return upperCaseChars[randomSelection];
  }

  // If type selected is lower case, pick a random number
  if(selectedTypes[randomSelection] === numeric) {
    numericCounter++;
    randomSelection = Math.floor(Math.random() * numericChars.length);
    return numericChars[randomSelection];
  }

  // If type selected is lower case, pick a random special char
  if(selectedTypes[randomSelection] === special) {
    specialCounter++;
    randomSelection = Math.floor(Math.random() * specialChars.length);
    return specialChars[randomSelection];
  }

  // If "error" is returned, then there's something wrong with code upstream
  return "error";
}

// Validate the password has been generated correctly based on the criteria specified by user
// Check that the password contains at least 1 character for each character type selected
// If a character for a type selected is not found in the generated password, replace 10% of the string with that type of characters
function validatePassword(generatedPassword) {

  // If the length of the password generated is not the same as the length specified by user, abort and inform user
  // This will only happen if code upstream is buggy
  if (generatedPassword.length !== passwordLength) {
    window.alert("Something is wrong with the password that has been generated. Please try again\nIf issue persists, contact the developer.");
    return "";
  }

  // Iterate through selected types
  for (var i = 0; i < selectedTypes.length; i++) {
    if (selectedTypes[i] === lowerCase && lowerCaseCounter === 0) {
      // If no lower case characters were included in generated password, then replace 10% of string with lower case chars
    } else if (selectedTypes[i] === upperCase && upperCaseCounter === 0) {
      // If no upper case characters were included in generated password, then replace 10% of string with upper case chars
    } else if (selectedTypes[i] === numeric && numericCounter === 0) {
      // If no numers were included in generated password, then replace 10% of string with numbers
    } else if (selectedTypes[i] === special && specialCounter === 0) {
      // If no special characters were included in generated password, then replace 10% of string with special chars
    }
  }


  return generatedPassword;
}