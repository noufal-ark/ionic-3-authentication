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
    ]
}