import sharkiePlay from '../../assets/images/sharkie-play.svg';
import sharkieSpeak from '../../assets/images/sharkie-speak.svg';

const messages = [
  'Hello there!',
  'Are you here to deliver my fish?',
  'No?',
  'Wait, aren`\t you the new Junior Manager of the San Jose Sharks?',
];

export const Messages = {
  home: [
    {
      message: messages[0],
      jsx: <p className='tutorial-msg color-primary font-lg'>{messages[0]}</p>,
      timer: 3000,
      buttons: true,
      image: (
        <img
          className='sharkie-img'
          src={sharkiePlay}
          style={{ transform: 'translate(92%, 43%)' }}
          alt={messages[0]}
        />
      ),
    },
    {
      message: messages[1],
      jsx: <p className='tutorial-msg color-primary font-lg'>{messages[1]}</p>,
      timer: 3000,
      buttons: true,
      image: (
        <img
          className='sharkie-img'
          src={sharkiePlay}
          style={{ transform: 'translate(92%, 43%)' }}
          alt={messages[1]}
        />
      ),
    },
    {
      message: messages[2],
      jsx: <p className='tutorial-msg color-primary font-lg'>No?</p>,
      timer: 3000,
      buttons: true,
      image: (
        <img
          className='sharkie-img'
          src={sharkieSpeak}
          style={{ transform: 'translate(85%, 50%)' }}
          alt={messages[2]}
        />
      ),
    },
    {
      message: messages[3],
      jsx: (
        <p className='tutorial-msg color-primary font-lg'>
          Wait, aren't you the new{' '}
          <span className='color-accent font-xl'>Junior Manager</span> of the
          San Jose Sharks?
        </p>
      ),
      timer: 0,
      buttons: true,
      image: (
        <img
          className='sharkie-img'
          src={sharkieSpeak}
          style={{ transform: 'translate(85%, 50%)' }}
          alt={messages[2]}
        />
      ),
    },
  ],
};
