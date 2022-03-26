async function validate(userName,pass,db) {
    await db
    .select('username','password').from('users')
    .then(data => {
        var checkMatch = data.some(user => {
            return (userName == user.username && pass == user.password);
            })
        return checkMatch
    })
    .catch(err=>console.log('catch Err',err))
}
module.exports ={
    validate
}