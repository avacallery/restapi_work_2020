//Use a callback to get the user object 
//a callback is a function that we're going to call when the result of an asynchronous function is ready 
//in this example, we pass the user object in the callback


//note the NESTED STRUCTURE in this code ... getUser, getRepos, then maybe another function! 
//with all these callbacks, our code will enter CALLBACK HELL!
//NAMED FUNCTIONS WILL SAVE YOU FROM CALLBACK HELL

console.log('Before'); 
getUser(1, getRespositories); 
console.log('After'); 

function getRespositories(user) {
    getRespositories(user.gitHubUsername, getCommits)
}

function getCommits(repos) {
    getCommits(repo, displayCommits)
}

function displayCommits(commits) {
    console.log(commits); 
}


function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'mosh' });  
    }, 2000); 
}

//convert this function to an async function that takes 2 seconds to complete
//use a callback to get the result of the list of repositories
//display repositories on console 
function getRespositories(username, callback) {
    setTimeout(() => {
        console.log('Calling Github Api...'); 
        callback(['repo1', 'repo2', 'repo3']); 
    }, 2000);
};
