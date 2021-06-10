import React, { useEffect, useState } from 'react'

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        let wsChannel: WebSocket

        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }
        function createChannel() {
            wsChannel?.removeEventListener('close', closeHandler)
            wsChannel?.close()

            wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            wsChannel?.addEventListener('close', closeHandler)
            setWs(wsChannel)
        }
        createChannel()

        return () => {
            wsChannel.removeEventListener('close', closeHandler)
            wsChannel.close()
        }
    }, [])

    return <div>
        <Messages ws={ws} />
        <AddMessageForm ws={ws} />
    </div>
}

const Messages: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const messageHandler = (e: MessageEvent) => {
        let newMessages = JSON.parse(e.data)
        setMessages((prevMessages) => [...prevMessages, ...newMessages])
    }
    useEffect(() => {
        ws?.addEventListener('message', messageHandler)
        return () => {
            ws?.removeEventListener('message', messageHandler)
        }
    }, [ws])

    return <div style={{ height: "400px", overflowY: 'auto' }}>
        {messages.map((m: any, index) => <Message message={m} key={index} />)}
    </div>
}
const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return <div>
        <img src={message.photo} style={{ width: "50px", borderRadius: "100px" }} /> <b>{message.userId}</b>
        <div>{message.message}</div>
        <hr />
    </div>
}

const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState(0)

    useEffect(() => {
        const openhandler = () => {
            setReadyStatus(1)
        }
        ws?.addEventListener('open', openhandler)
        return () => {
            ws?.removeEventListener('open', openhandler)
        }
    }, [ws])

    const sendMessage = () => {
        if (!message) return
        ws?.send(message)
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            <button onClick={sendMessage} disabled={ws === null && readyStatus !== 1}>Send</button>
        </div>
    </div>
}

export default ChatPage
