export const validateName = (value) => {
    const usernameRegex = /^[a-z0-9_.]+$/
    if( usernameRegex.test(value)){
        return 'Please enter a valid name'
    }else{
        return null
    }
}

