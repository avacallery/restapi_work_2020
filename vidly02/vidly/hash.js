const bcrypt = require('bcrypt'); 

//when you want to authenticate the user 

// hash algorithims // decrypting 
// a Salt is a random string placed before or after the password so the password can be hashed and safely saved into a database
// bcrypt is the library we are importing, and genSalt is the method we are running to generate the salt 
// the backend recieves the password 

async function run() {
    const salt = await bcrypt.genSalt(10); 
    const hashed = await bcrypt.hash('1234', salt); 
    console.log(salt); //$2b$10$4JYIWP9ylhTn2Gm58S/fXO
    console.log(hashed); //$2b$10$4JYIWP9ylhTn2Gm58S/fXOwwhlx3VRLDZ/2Rw8hYZOpGflaiNjINm
}

run(); 
