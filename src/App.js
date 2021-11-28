import style from './App.module.css';
import nullButton from './assets/img/nullButton.svg';
import activeButton from './assets/img/activeButton.svg';
import smallAvatar from './assets/img/smallAvatar.png'
import { useRef, useState } from 'react';


const App = () => {

  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef()
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('')


  const connect = () => {
    socket.current = new WebSocket('wss://ws.qexsystems.ru')

    socket.current.onopen = () => {
      setConnected(true)
    }
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages(prev => [message, ...prev])
    }
    socket.current.onclose = () => {
      console.log('Socket закрыт')
    }
    socket.current.onerror = () => {
      console.log('Socket ошибка')
    }
  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      time: new Date().toLocaleTimeString(),
      id: Date.now(),
      event: 'message'
    }
    socket.current.send(JSON.stringify(message));
    messages.push(message)
    setValue('')
  }

  if (!connected) {
    return (
      <div className={style.center}>
        <div className={style.form}>
          <input value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='Inter your login' />
          <button onClick={connect} >Sign In</button>
        </div>
      </div>
    )
  }

  return (
    <div className={style.App}>
      <div className={style.chat}>
        <div className={style.header} >
          <div className={style.avatar}>
            <img src={smallAvatar} />
          </div>
          <div className={style.username}>
            {username != '' ? username : 'User Name'}
          </div>
        </div>
        <div className={style.main}>
          <div className={style.messages}>
            {messages.map(m =>
              <div key={m.id}>
                {m.username != username
                  ? <div className={style.companion}>
                    <div className={style.name}>
                      {m.username != '' ? m.username : 'User Name'}
                    </div>
                    <div className={style.messageText}>{m.message}</div>
                    <div className={style.time}>{m.time}</div>
                  </div>
                  : <div className={style.you}>
                    <div className={style.yourMessageText}>{m.message}</div>
                    <div className={style.yourTime}>{m.time}</div>
                  </div>}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={style.newMessage}>
        <textarea value={value}
          onChange={e => setValue(e.target.value)}
          type='text'
          className={style.textarea}
          placeholder='Enter text message...'></textarea>
        <button onClick={sendMessage} className={style.button} >
          <img src={value != '' ? activeButton : nullButton} />
        </button>
      </div>
    </div>
  );
}

export default App;
