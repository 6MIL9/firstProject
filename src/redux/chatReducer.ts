import { ResultCodes, ResultCodesForCaptcha } from '../API/Api';
import { authAPI } from '../API/authApi'
import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { ChatMessageType } from '../pages/Chat/ChatPage';
import { chatAPI } from '../API/chatApi';
import { Dispatch } from 'redux';

let initialState = {
    messages: [] as ChatMessageType[]
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload]
            };
        }

        default:
            return state;
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: messages
    } as const),
}

type ThunkType = BaseThunkType<ActionsTypes>

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreater = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe(newMessageHandlerCreater(dispatch))
    }
}

export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe(newMessageHandlerCreater(dispatch))
        chatAPI.stop()
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async (dispatch) => {
        chatAPI.sendMessage(message)
    }
}

export default chatReducer;
