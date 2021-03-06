import { InferActionsTypes } from "./reduxStore";

type DialogType = {
    id: number
    name?: string
    message: string
}

let initialState = {
    dialogsData: [
        { id: 1, name: 'Dima', message: 'new idea' },
        { id: 2, name: 'Andrey', message: 'akiha' },
        { id: 3, name: 'Sveta', message: 'low fi' },
        { id: 4, name: 'Sasha', message: 'dnd' },
        { id: 5, name: 'Victor', message: 'new new sas new daravas kvass' },
        { id: 6, name: 'Valera', message: 'new lorem fdasf rf fsd' }
    ] as DialogType[]
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'dialogs/ADD-MESSAGE':
            let newMessage = {
                id: 7,
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

export const actions = {
    addMessage: (newMessage: string) => ({
            type: 'dialogs/ADD-MESSAGE',
            newMessage
    } as const)
}

export default dialogsReducer;
