// Sometimes you want to create a promise that's already resolved/or rejected

//RESOLVE
// .resolve is a static method that will return an already resolved promise
// const p = Promise.resolve({ id: 1 }); 
// p.then(result => console.log(result)); 

//REJECT
// .reject is a method that will return an already rejected promise
// returning the Error object will return the callstack 
// const p = Promise.reject(new Error('Reason for rejection.')); 
// p.catch(error => console.log(error)); 




//PARALLEL PROMISES 
//Sometimes you want to run multiple async operations in parallel, and when they all complete, you want to do something after.

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        // reject(new Error('because something failed.')); 
        resolve(1);
    }, 2000)
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000)
});

// //THIS OPERATION WILL RUN BOTH PROMISES AND RETURN A PROMISE!
Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));