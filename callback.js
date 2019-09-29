console.log('Before');
console.log(new Date());

getUser(1, (kongx) => {
    console.log('User :', kongx);
    getRepo(kongx.username, (repos) => {
        console.log('Repos :', repos);
    });
});

    // getRepo("rush", (obj) => {
    //     console.log('username :', obj);
    // });

console.log('After');

function getUser(id, callbac) {
    setTimeout(() => {
        console.log(new Date());
        console.log('Reading a user from a database...');
        callbac({id: id, username: 'fish'});
    }, 5000)
}

///   you just sent all of functions out
//outout
//Before
//After
//Reading a user from a database...
//User : { id: 1, Username: 'fish' }

function getRepo(username, getrep) {
    setTimeout(() => {
        console.log(new Date());
        console.log('getting the repo');
        getrep({username: username, repo: ['repo1', 'repo2', 'repo3']});
    }, 2000);
}

//arr, okay this will serve in sequence