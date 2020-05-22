export const requiredField = (value) => {
    if (value) {
        return undefined;
    } else {
        return 'field is required';
    }
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) {
        return `max length is ${maxLength} symbols`;
    } else {
        return undefined;
    }
}

