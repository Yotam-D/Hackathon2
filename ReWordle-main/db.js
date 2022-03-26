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
    let info = await db('users')
    .join('words', 'users.progress', '=', 'words.word_id')
    .then(data => {
        return data.find(user =>(user.username==userName && user.password == pass))
        })
    return info;
}


module.exports ={
    validate,
    getUserInfo
}