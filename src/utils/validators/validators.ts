export type FieldValidatorType = (value: string) => string | undefined

export const requiredField: FieldValidatorType = (value) => {
    if (value) {
        return undefined;
    } else {
        return 'field is required'; 
    }
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value && value.length > maxLength) {
        return `max length is ${maxLength} symbols`;
    } else {
        return undefined;
    }
}

