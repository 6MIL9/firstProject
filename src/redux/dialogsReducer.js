const ADD_MESSAGE = 'dialogs/ADD-MESSAGE';

let initialState = {
    dialogsData: [
        { id: 1, name: 'Dima', message: 'new idea' },
        { id: 2, name: 'Andrey', message: 'akiha' },
        { id: 3, name: 'Sveta', message: 'low fi' },
        { id: 4, name: 'Sasha', message: 'dnd' },
        { id: 5, name: 'Victor', message: 'new new sas new daravas kvass' },
        { id: 6, name: 'Valera', message: 'new lorem fdasf rf fsd' }
    ]
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
                dialogsData: [...state.dialogsData, newMessage],
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