export const validation_messages = {
    'email': [
        { type: 'required', message: 'Email is required.' },
        { type: 'minlength', message: 'Email must be at least 5 characters long.' },
        // { type: 'maxlength', message: 'Email cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your Email must match valid email format.' },
        // { type: 'validEmail', message: 'Your Email has already been taken.' }
    ],
    'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 6 characters long.' },
        { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' }
    ],
    'confirmpassword': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Password must be at least 6 characters long.' },
        { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' }
    ],
    'personname': [
        { type: 'required', message: 'Name is required.' },
        { type: 'minlength', message: 'Name must be at least 3 characters long.' },
        { type: 'maxlength', message: 'Name cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your name only allow charecters.' },
    ],
    'mobile': [
        { type: 'required', message: 'Mobile number is required.' },
        { type: 'minlength', message: 'Mobile number must be at least 10 characters long.' }
    ]
}
export const PASSWORD_UNMATCH = 'Password must match with confirm password.';