export const validateName = (value) => {
    const usernameRegex = /^[a-z0-9_.]+$/
    if( usernameRegex.test(value)){
        return 'Please enter a valid name'
    }else{
        return null
    }
}

export const _nameValidate = name => {
    var nameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (name === '') {
        return '*Please enter name.'
    } else if (!nameRegex.test(name)) {
        return '*Please enter valid name.'
    } else {
        return null
    }
};

export const _passwordvalidate = pass => {
    var passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (pass === '') {
        return '*Please enter password.'
    } else if (/([A-Z]+)/g.test(pass) && pass.length < 8) {
        return    '*Please enter a special character and length must be 8 digit.'
    } else if (!passwordRegex.test(pass)) {
        return '*Please enter valid password.'
    } else {
        return null
    }
};

export const _emailValidate = email => {
    var emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email === '') {
      return '*Please enter email.' 
    } else if (!emailRegex.test(email)) {
      return '*Please enter valid email.'
    } else {
      return null 
    }
  }