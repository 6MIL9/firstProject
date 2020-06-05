import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';


let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: 1, post: 'Hi, how are you?', likesCnt: 3 },
                { id: 2, post: 'Nice day to walk', likesCnt: 2 },
            ],
            newPostText: "",
        },

        dialogsPage: {
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

            newMessageText: '',
        },

        sidebar: {
            friendsData: [
                { id: 1, name: 'Dima' },
                { id: 2, name: 'Andrey' },
                { id: 3, name: 'Sveta' }
            ]
        }
    },
    _callSubscriber() { },

    getState() {
        return this._state;
    },
    subsribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    },
}

window.store = store;

export default store;

