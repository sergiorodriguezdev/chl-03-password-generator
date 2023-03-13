// Sets of characters
// List of special characters collected from here: https://owasp.org/www-community/password-special-characters 
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
  copyBtn.disabled = password.length === 0;
}

// Copy generated password to clipboard when button is clicked
function copyPasswordToClipboard() {
  var passwordText = document.querySelector("#password");
  
  // Highlight password
  passwordText.select();

  // Copy password to clipboard
  navigator.clipboard.writeText(passwordText.value);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copyPasswordToClipboard);

// Password generation prompts and logic
// Returns the generated password, or empty string if user cancels out of prompt
function generatePassword() {
  var randomPassword = "";
    
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

  selectedTypes = []; // Remove previously selected options
  
  do {
    promptTypes();
  } while(selectedTypes.length === 0); // If no types are selected, run through prompts again

  do {
    // Start with an empty password string
    randomPassword = "";
    
    // Reset character counters
    specialCounter = 0;
    upperCaseCounter = 0;
    lowerCaseCounter = 0;
    numericCounter = 0;

    // Generate random characters and append to string (randomPassword)
    // Length entered by user will determine number of times to run through loop
    for (var i = 0; i < passwordLength; i++) {
      randomPassword += generateRandomCharacter();
    }
  
  } while (!validatePassword(randomPassword, passwordLength)); // Keep generating password as long as validation step fails

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

  // Pick a type from tracking array randomly
  var randomSelection = Math.floor(Math.random() * selectedTypes.length);

  // If type selected is lower case, pick a random lower case char
  if(selectedTypes[randomSelection] === lowerCase) {
    lowerCaseCounter++;
    randomSelection = Math.floor(Math.random() * lowerCaseChars.length);
    return lowerCaseChars[randomSelection];
  }
  // If type selected is lower case, pick a random upper case char
  else if(selectedTypes[randomSelection] === upperCase) {
    upperCaseCounter++;
    randomSelection = Math.floor(Math.random() * upperCaseChars.length);
    return upperCaseChars[randomSelection];
  }
  // If type selected is lower case, pick a random number
  else if(selectedTypes[randomSelection] === numeric) {
    numericCounter++;
    randomSelection = Math.floor(Math.random() * numericChars.length);
    return numericChars[randomSelection]; // I guess randomSelection can be returned here rather than using a string
  }
  // If type selected is lower case, pick a random special char
  else if(selectedTypes[randomSelection] === special) {
    specialCounter++;
    randomSelection = Math.floor(Math.random() * specialChars.length);
    return specialChars[randomSelection];
  }
  // If empty string is returned, then there's something wrong with code upstream
  else {
    console.log("Empty string returned as random character, there's an error with the code");
    return "";
  }
}

// Validate the password has been generated correctly based on the criteria specified by user
// Check the length of the password string matches the desired length entered by user
// Check that the password contains at least 1 character for each character type selected
// Return true if password validation passes
function validatePassword(generatedPassword, passwordLength) {

  // If the length of the password generated is not the same as the length specified by user, abort and inform user
  // This will only happen if code upstream is buggy
  if (generatedPassword.length !== passwordLength) {
    console.log("password validation failed - password length doesn't match length entered by user");
    return false;
  }
  // If selected types includes the lower case option and the corresponding counter is 0, then validation fails
  else if (selectedTypes.includes(lowerCase) && lowerCaseCounter === 0) {
    console.log("password validation failed - " + lowerCase + " option selected, 0 lower case characters included in password.");
    return false;
  }
  // If selected types includes the upper case option and the corresponding counter is 0, then validation fails
  else if (selectedTypes.includes(upperCase) && upperCaseCounter === 0) {
    console.log("password validation failed - " + upperCase + " option selected, 0 upper case characters included in password.");
    return false;
  }
  // If selected types includes the numeric option and the corresponding counter is 0, then validation fails
  else if (selectedTypes.includes(numeric) && numericCounter === 0) {
    console.log("password validation failed - " + numeric + " option selected, 0 numbers included in password.");
    return false;
  }
  // If selected types includes the special chars option and the corresponding counter is 0, then validation fails
  else if (selectedTypes.includes(special) && specialCounter === 0) {
    console.log("password validation failed - " + special + " option selected, 0 special characters included in password.");
    return false;
  }

  // Only return true if any of the checks above fail, meaning password validation was successful
  console.log("password validation passed");
  return true;
}