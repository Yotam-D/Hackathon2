let userIn = document.getElementById('InputUser')
let passwordIn = document.getElementById('InputPassword')

async function postOnLogin(e){
    e.preventDefault()
    const data = {username: userIn.value, password: passwordIn.value};
    await fetch('http://localhost:5000/login', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
    })
    .then(response => {
        return response.json();
    })
    .then(res => {
        if (res.status == 'valid user') {
            console.log("valid user")
            document.forms[0].submit();
        }
        else{
            alert("invalid user");
        }
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}

