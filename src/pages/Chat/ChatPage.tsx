import React from 'react'

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC = () => {
    const messages = [1, 2, 3, 4]
    return <div>
        {messages.map((m: any) => <Message />)}
    </div>
}
const Message: React.FC = () => {
    const message = {
        url: 'https://via.placeholder.com/50',
        author: 'Michael',
        text: 'I`m Michael'
    }
    return <div>
        <img src={message.url} /> <b>{message.author}</b>
        <div>{message.text}</div>
        <hr />
    </div>
}

const AddMessageForm: React.FC = () => {
    return <div>
        <div>
            <textarea></textarea>
            <button>Send</button>
        </div>
    </div>
}

export default ChatPage
