const p = new Promise((resolve, reject) => {

    //assume that this is the async work
    setTimeout(() => {
        // resolve(1);    
        reject(new Error('message'))
    }, 2000);

});

p.then(result => console.log('Result :', result))
.catch(err => console.log('Error :', err.message));