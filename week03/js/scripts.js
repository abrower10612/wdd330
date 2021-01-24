// const old = inventors.filter(function (year) {
//   return (year > 1499) && (year < 1600);
// });

const old = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));

console.log(old);

const firstAndLast = inventors.map(inventor => first, last);

console.log(firstAndLast);

