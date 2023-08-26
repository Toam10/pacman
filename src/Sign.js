const baseUrl = 'http//:localhost:5050/public';

const handleSign = async () => {
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(!username) return alert('username required');
    if(!password) return alert('password required');

    const response = await handleSignApi( username, password );

    const {code, message} = response;

    if(code === 1)
    {
        window.location.href = '/pacman';
    }
    else
    {
        return alert(message);
    }
}

const handleSignApi = async ( username, password ) => {
    try
    {
        const method = 'POST';
        const headers = {'Accept':'Application/json', 'Content-Type':'Application/json'};
        const body = JSON.stringify( { username, password } ) 

        const response = await fetch('/public/sign', {method, headers, body});
        const response_json = await response.json();

        return response_json;
    }
    catch(error)
    {
        console.log(error);

    }
}
