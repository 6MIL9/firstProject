const ADD_MESSAGE = 'dialogs/ADD-MESSAGE';

let initialState = {
    dialogsData: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Victor' },
        { id: 6, name: 'Valera' }
    ],
    messagesData: [
        { id: 1, message: 'Hi, how are you?' },
        { id: 2, message: 'I love ds3!' },
        { id: 3, message: 'Smoug' },
        { id: 4, message: 'Smoug' },
        { id: 5, message: 'Smoug' },
    ],
};

const dialogsReducer = (state = initialState, action) => {


    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 5,
                message: action.newMessage,
            };

            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            };

        default:
            return state;
    }
}

export const addMessageCreator = (newMessage) => {
    return {
        type: ADD_MESSAGE,
        newMessage
    }
}

export default dialogsReducer;