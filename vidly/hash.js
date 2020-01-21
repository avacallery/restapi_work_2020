const bcrypt = require('bcrypt')

// 1234 -> abcd (crypt version)

async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt); 
    console.log(salt); 
    console.log(hashed); 
}

run(); 

//output $2b$10$zPIbDCLj4zS12u7PFwMCJe