import style from './App.module.css';
import nullButton from './assets/img/nullButton.svg';
import activeButton from './assets/img/activeButton.svg';
import smallAvatar from './assets/img/smallAvatar.png'

const App = () => {



  return (
    <div className={style.App}>
      <div className={style.chat}>
        <div className={style.header} >
          <div className={style.avatar}>
            <img src={smallAvatar} />
          </div>
          <div className={style.username}>
            First name + Last name
          </div>
        </div>
        <div className={style.main}>
          <div className={style.messages}>
            -Прив
            -Чд?
            -Нч
            -А ты?
          </div>
          <div className={style.newMessage}>
            <textarea className={style.textarea} placeholder='Enter text message...'></textarea>
            <button className={style.button} >
              <img src={nullButton} />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
