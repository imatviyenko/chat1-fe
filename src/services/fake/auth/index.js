const timeoutInSeconds = 5;

const users = [
    {
        email: 'user1@gmail.com',
        password: '111'
    },
    {
        email: 'user2@gmail.com',
        password: '222'
    }    
];


export function authUser(userEmail, password) {
    console.log('authUser -> userEmail: ', userEmail);
    const userEmailLowercase = userEmail.toLowerCase();
    return new Promise( (resolve, reject) => {
        const matchedUser = users.find( u => u.email.toLowerCase() === userEmailLowercase);
        if (matchedUser && matchedUser.password === password) {
            const authResult = {status: 'success', tokenAsString: `username:${matchedUser.username}`};
            setTimeout(resolve(authResult), timeoutInSeconds * 1000);
        } else {
            const authResult = {status: 'invalidCredentials'};
            setTimeout(resolve(authResult), timeoutInSeconds * 1000);
        }
    });
}