import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { chatAPI, ChatMessageAPIType, StatusType } from '../API/chatApi';
import { Dispatch } from 'redux';
import {v1} from 'uuid'

type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m =>( {...m, id: v1()}))].filter((m, index, array) => index >= array.length - 100)
            };
        }

        case 'chat/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status
            };
        }

        default:
            return state;
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'chat/STATUS_CHANGED', payload: { status }
    } as const)
}

type ThunkType = BaseThunkType<ActionsTypes>

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreater = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageAPIType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreater = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe('messages-received', newMessageHandlerCreater(dispatch))
        chatAPI.subscribe('status-changed', statusChangedHandlerCreater(dispatch))
    }
}

export const stopMessagesListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe('messages-received', newMessageHandlerCreater(dispatch))
        chatAPI.unsubscribe('status-changed', statusChangedHandlerCreater(dispatch))
        chatAPI.stop()
    }
}

export const sendMessage = (message: string): ThunkType => {
    return async (dispatch) => {
        chatAPI.sendMessage(message)
    }
}

export default chatReducer;
