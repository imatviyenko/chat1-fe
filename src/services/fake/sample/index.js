const timeoutInSeconds = 5;

const fakeData = [
    {
        index: '1',
        title: 'Document1'
    },
    {
        index: '2',
        title: 'Document2'
    },
    {
        index: '3',
        title: 'Document3'
    },
    {
        index: '4',
        title: 'Document4'
    }
];


// Get sample data - fake implementation
export async function getCollection1Items() {
    return new Promise( (resolve, reject) => {
        setTimeout(resolve(fakeData), timeoutInSeconds * 1000);
    });

    /*
   const response = await fetch(this.apiUrl);
   const json = await response.json(); 
   return json;
    */
}