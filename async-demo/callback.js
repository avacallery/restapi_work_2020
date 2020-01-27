//CALLBACKS

//Use a callback to get the user object 
//a callback is a function that we're going to call when the result of an asynchronous function is ready 
//in this example, we pass the user object in the callback

//note the NESTED STRUCTURE in this code ... getUser, getRepos, then maybe another function! 
//with all these callbacks, our code will enter CALLBACK HELL!
//PROMISES aND ASYNC AWAIT WILL SAVE YOU FROM CALLBACK HELL

console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});
console.log('After');

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database...');
    callback({ id: id, gitHubUsername: 'mosh' });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['commit']);
  }, 2000);
}