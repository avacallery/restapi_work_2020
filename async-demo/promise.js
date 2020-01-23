//PROMISES

//a JavaScript promise is an OBJECT that holds the eventual result of an async operation
//it can result in a VALUE or an ERROR
//this object can be in 1 of 3 states: 
//when we create it, it will be in PENDING state. It will kick off some async operation. When it is ready it will be either FULFILLED/RESOLVED, meaning it completed successfully. Otherwise, if it went wrong, it will be in the REJECTED STATE or ERROR. 

//anywhere you have an async function that takes a callback, you should modify that function to return a PROMISE. 

// const p = new Promise((resolve, reject) => {
//     //Kick off some async work 
//     //...
//     setTimeout(() => {
//         //resolve(1); 
//         reject(new Error('message')); 
//     }, 2000);
// }); 

//When our async operation completes successfully it produces (1) as the result. 
//Now we need to consume this promise!

// p
//     .then(result => console.log('Result', result)) 
//     .catch(err => console.log('Error', err.message)); 


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//REWRITE BY USING PROMISES 

//Using CALLBACKS
console.log('Before'); 
// getUser(1, (user) => {
//     getRespositories(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits); 
//         })
//     })
// }); 
console.log('After'); 

//Using PROMISES - because promises expose .then method, we can chain them to implement a complex async operation. 
getUser(1)
    .then(user => getRespositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message)); 


//REPLACE CALLBACK FUNCTIONS WITH PROMISES (BELOW - COMPLETED)

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });  
        }, 2000); 
    });
}

function getRespositories(username) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github Api...'); 
            resolve(['repo1', 'repo2', 'repo3']); 
        }, 2000);
    });
};

function getCommits(repo) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);  
        }, 2000); 
    })
}