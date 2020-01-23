// //Sometimes you want to create a promise that's already resolved/or rejected

// const p = Promise.resolve({ id: 1 }); 
// p.then(result => console.log(result)); 

// //always use an Error object (new Error) when displaying your error 
// const p = Promise.reject(new Error('Reason for rejection.')); 
// p.catch(error => console.log(error)); 


//PARALLEL PROMISES 
//Sometimes you want to run multiple async operations in parallel, and when they all complete, you want to do something after.

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        reject(new Error('because something failed.')); 
    }, 2000)
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000)
});

//THIS OPERATION WILL RUN BOTH PROMISES AND RETURN A PROMISE!
Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));