// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

//return the doubled value of the number, if over 9 after doubling, then subtract 9 and that will be the returned value.
const getConvertedVal = (arr, i, value, dbldvlue) => {
  dbldvlue = arr[i] * 2;
  value = dbldvlue;
  if(dbldvlue > 9) {
    dbldvlue -= 9;
    value = dbldvlue;
  }
  return(value);
};


const validateCred = (arr) => {
  let sum = 0;

  //loop through each indivual number on the card and calculate if the whole number is invalid. return true if valid, false if not.
  for(let i = arr.length - 1; i >= 0; i--) {
    let value = arr[i]; //get values for credit card individual numbers that don't need to be calculated (every other number)
    if(arr.length % 2 === 0) { //get values for credit card individual numbers that need to be calculated for even number placements of credit cards.
      if(i % 2 === 0) {
       value = getConvertedVal(arr, i);  
      }
    } else {
        if(i % 2 != 0) {  //get values for credit card individual numbers that need to be calculated for odd number placements of credit cards.
          value = getConvertedVal(arr, i);
      }
    }
    sum += value;
  }
    if(sum % 10 === 0) { //if sum is divided by 10 === 0  then numbers are valid, if not, the numbers are invalid.
      return true;
    } else {
      return false;
    }
};

console.log
//put in an array of all invalid and valid credit card numbers.  Send each card number to validateCred and return and array of invalid numbers.
const findInvalidCards = (arrs) => {
  const invalidNums = arrs.filter(arr => !validateCred(arr));
  return invalidNums;
};

// Put in the everything array of all numbers and return the array of invalid cards.
const arrOfInvalidNums = findInvalidCards(batch);

//put in array of invalid credit card numbers and return arr of companies that issued the card.
const idInvalidCardCompanies = (invalidArrs) => {
  let company = "";
  const invalidCompanies = [];
  for(let i = 0; i < invalidArrs.length; i++) {
    const firstDigit = invalidArrs[i][0]; //Identify company by knowing which number the card starts with.
    switch(firstDigit) {
      case 3:
        company = 'Amex (American Express)';
        break;
      case 4:
        company = 'Visa';
        break;
      case 5:
        company = 'Mastercard';
        break;
      case 6:
        company = 'Discover';
        break;
      default:
        company = 'Company not found';
      }
    invalidCompanies.push(company);
  }

  //put in array of invalid companies, take out duplicates and return array of invalid companies without duplicates.
  function onlyUnique(value, index, self) { //filter out duplicate companies.
    return self.indexOf(value) === index;
    }
    
  const uniqueInvalidCompanies = invalidCompanies.filter(onlyUnique);
    return uniqueInvalidCompanies; 
};

 console.log(idInvalidCardCompanies(arrOfInvalidNums));