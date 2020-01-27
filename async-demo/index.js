//CHAPTER 6 - Asynchronous Javascript

// // synchronous or blocking program
// // one task must finish completing before moving onto the next task 
// console.log('Before'); 
// console.log('After'); 

// //asynchronous program or non-blocking program
// //timeout sets a task to be completed in the future 
// //our program runs on a single thread 
// console.log('Before'); 
// setTimeout(() => {
//     console.log('Reading a user from a database...'); 
// }, 2000); 
// console.log('After'); 

//three patterns for dealing with asynchronous code:
//callbacks, promises, and async/await 

console.log('Before'); 
const user = getUser(1); 
console.log(user); 
console.log('After'); 

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        return { id: id, gitHubUsername: 'mosh' };  
    }, 2000); 

    return 1; 
}
