export const validateName = (value) => {
    if(value.trim() == ''){
        return 'Please enter a valid name'
    }else{
        return null
    }
}