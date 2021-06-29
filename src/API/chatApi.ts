export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error'

type EventsType = 'messages-received' | 'status-changed'

type MessagesReceivedSubsriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubsriberType = (status: StatusType) => void

let subscribers = {
    'messages-received': [] as MessagesReceivedSubsriberType[],
    'status-changed': [] as StatusChangedSubsriberType[]
}

let ws: WebSocket

const closeHandler = () => {
    notifySubsAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifySubsAboutStatus('ready')
}

const errorHandler = () => {
    notifySubsAboutStatus('error')
    console.error('REFRESH PAGE')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubsAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubsAboutStatus('pending')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsType, callback: MessagesReceivedSubsriberType | StatusChangedSubsriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
    },
    unsubscribe(eventName: EventsType, callback: MessagesReceivedSubsriberType | StatusChangedSubsriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
};
