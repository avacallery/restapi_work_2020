//BEFORE - NESTED 
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//       getTopMovies((movies) => {
//         console.log('Top movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log('Email sent...')
//         });
//       });
//     }
//   });


//AFTER USING ASYNC AWAIT 
async function notificationEmail() {
    try {

        const customer = await getCustomer(1);
        console.log('Customer: ', customer);
        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log('Movies: ', movies);
            await sendEmail(customer.email, movies);
            console.log('Email sent...');
        }
    }
    catch (err) {
        console.log('Error', err.message);
    }
}
notificationEmail();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            });
        }, 4000);
    });
}

function getTopMovies() {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
    });
    }

function sendEmail(email, movies) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 4000);
    })
    }