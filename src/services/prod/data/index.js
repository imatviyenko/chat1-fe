import fakeUsers from './fakeUsers';
import fakeData_Collection1 from './fakeCollection1';

const timeoutInSeconds = 5;

// Get sample data - fake implementation
export async function getCollection1Items() {
    return new Promise( (resolve, reject) => {
        setTimeout(resolve(fakeData_Collection1), timeoutInSeconds * 1000);
    });
    /*
   const response = await fetch(this.apiUrl);
   const json = await response.json(); 
   return json;
    */
}

export async function getUserProfileByEmail(email) {
    const emailLowerCase = email.toLowerCase();
    const userProfile = fakeUsers.find( p => p.email.toLowerCase() === emailLowerCase );
    return new Promise( (resolve, reject) => {
        setTimeout(resolve(userProfile), timeoutInSeconds * 1000);
    });
}
