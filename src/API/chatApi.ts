// import { instance, ResponseType } from './Api'

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

type subsriberType = (messages: ChatMessageType[]) => void

let subscribers = [] as subsriberType[]

let ws: WebSocket

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)

}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: subsriberType) {
        subscribers.push(callback)
    },
    unsubscribe(callback: subsriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
};
