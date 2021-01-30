import React from 'react';
import './tutorial.css';
import { Messages } from './tutorials';
import speechBubble from '../../assets/images/speech-bubble.svg';

class HomePageTutorial extends React.Component {
  timer = 0;

  constructor(props) {
    super(props);

    this.state = {
      messageIndex: 0,
    };
  }

  setMessageIndex(dir) {
    // dir will be 1 or -1

    console.log('SET MESG');

    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = 0;
    }

    this.setState((state) => ({
      messageIndex: state.messageIndex + dir,
    }));
  }

  render() {
    const currentMsg = Messages.home[this.state.messageIndex];
    if (!currentMsg) {
      console.error('NO MESSAGE!!!');
      return null;
    }

    if (currentMsg.timer) {
      this.timer = window.setTimeout(
        this.setMessageIndex.bind(this, 1),
        currentMsg.timer
      );
    }

    return (
      <div className='tutorial-container'>
        <div className='cartoon-wrap'>
          <img
            className='speech-bubble-img'
            src={speechBubble}
            alt={currentMsg.message}
          />
          {currentMsg.jsx}
          {currentMsg.image}
        </div>
      </div>
    );
  }
}

export default HomePageTutorial;
