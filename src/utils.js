/**
 * Check if the user is an adult
 * @param birthday - The user's birthday in YYYY-MM-DD format
 * @param ageOfMajority - The age of an adult (default is 18)
 * @returns boolean
 */
function isAdult(birthday, ageOfMajority = 18) {
  const birthDate = new Date(birthday);
  const today = new Date();
  const yearDiff = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  const isBirthdayThisYearPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
  const age = isBirthdayThisYearPassed ? yearDiff : yearDiff - 1;
  return age >= ageOfMajority;
}

exports.isAdult = isAdult;
