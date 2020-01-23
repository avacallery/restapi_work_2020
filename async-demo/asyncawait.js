//Async and Await approach
//Helps you write async code like sync code 
//the function (getUser(1)) returns a promise. Anytime you call a function that returns a promise, you can AWAIT the result of that function. We store the result in the user object. 
//whenever you use the await operator in a function, you need to decorate that function with the async modifier (line 11)
//we need to wrap our async-await code with a try/catch block to catch any errors 

//QUESTIONS: 
//what would happen if we took await out?

console.log('Before')

async function displayCommits() {
    try {
        const user = await getUser(1); 
        const repos = await getRespositories(user.gitHubUsername); 
        const commits = await getCommits(repos[0]); 
        console.log(commits); 
    }
    catch (err) {
        console.log('Error', err.message); 
    }
}

displayCommits();

console.log('After')

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
            //resolve(['repo1', 'repo2', 'repo3']); 
            reject(new Error('Could not get the repos.')); 
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