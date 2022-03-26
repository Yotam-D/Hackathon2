async function validate(userName,pass,db) {
    let check = await db
        .select('username','password').from('users')
        .then(data => {
            return data.some(user => userName == user.username && pass == user.password)
        })
        .catch(err=>console.log('catch Err',err))
    return check 
}

async function getUserInfo(userName,pass,db){
    await db('users')
    .then(data => {
        let gotUser = data.find(user =>(user.username==userName && user.password == pass))
        console.log(gotUser);
        return gotUser
    })
    }


module.exports ={
    validate,
    getUserInfo
}