const isValidFullName = (value) => /^[a-zA-Z\s]+$/.test(value);

const validateString = (value, minLength, maxLength) => {
    const n = value.length;
    if (n < minLength || n > maxLength) {
        throw new Error(`Must contain from ${minLength}-${maxLength} characters`);
    }
};

const validateFullName = (value) => {
    validateString(value, 3, 100);
    if (!isValidFullName(value)) {
        throw new Error("Must contain only letters or spaces");
    }
};

const validatePassword = (value) => {
    validateString(value, 6, 100);
};

const validateEmail = (value) => {
    validateString(value, 3, 200);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(value)) {
        throw new Error("Is not a valid email address");
    }
};

export default { validateEmail, validateFullName, validatePassword, validateString, }