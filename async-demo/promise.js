//PROMISES

//a JavaScript promise is an OBJECT that holds the eventual result of an async operation
//Promises are specific to async code "we'll do this later"
//when it completes, a promise can result in a VALUE or an ERROR
//this object can be in 1 of 3 states: 
//when we create it, it will be in PENDING state. It will kick off some async operation. When it is ready it will be either FULFILLED/RESOLVED, meaning it completed successfully. Otherwise, if it went wrong, it will be in the REJECTED STATE or ERROR. 
//anywhere you have an async function that takes a callback, you should modify that function to return a PROMISE. 

// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1); 
//         // reject(new Error('message')); 
//     }, 2000);
// }); 

// p
//     .then(result => console.log('Result', result)) 
//     .catch(err => console.log('Error', err.message)); 


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//REPLACE ALL CALLBACKS WITH PROMISES AND THEN USE PROMISES
//because promises expose .then method, we can chain them to implement a complex async operation. 


// // Using CALLBACKS
console.log('Before'); 
// getUser(1, (user) => {
//     getRespositories(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits); 
//         })
//     })
// }); 

// // Using PROMISES
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message)); 

    console.log('After'); 

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });  
        }, 2000); 
    });
}

function getRepositories(username) {
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