import sharkiePlay from '../../assets/images/sharkie-play.svg';
import sharkieSpeak from '../../assets/images/sharkie-speak.svg';

const messages = [
  'Hello there!',
  'Are you here to deliver my fish?',
  'No?',
  "Wait, aren't you the new Junior Manager of the San Jose Sharks?",
  'Welcome to our stadium!',
  "My name is Sharkie, I'm here to teach about your new job!",
  'Ready?',
];

export const Slides = {
  home: [
    {
      message: {
        text: messages[0],
        jsx: (
          <p className='tutorial-msg color-primary font-lg'>{messages[0]}</p>
        ),
      },
      image: {
        key: 'sharkie-play',
        jsx: (
          <img className='sharkie-img' src={sharkiePlay} alt={messages[0]} />
        ),
        variants: {
          enter: { opacity: 0.5, scale: 0.3, x: '95%', y: '13%' },
          center: { opacity: 1, scale: 1, x: '95%', y: '13%' },
        },
      },
      buttons: true,
      timer: 3000,
    },
    {
      message: {
        text: messages[1],
        jsx: (
          <p className='tutorial-msg color-primary font-lg'>{messages[1]}</p>
        ),
      },
      image: {
        key: 'sharkie-play',
        jsx: (
          <img className='sharkie-img' src={sharkiePlay} alt={messages[1]} />
        ),
        variants: {
          enter: { opacity: 0.5, scale: 1, x: '95%', y: '13%' },
          center: { opacity: 1, scale: 1, x: '95%', y: '13%' },
        },
      },
      timer: 3000,
      buttons: true,
    },
    {
      message: {
        text: messages[2],
        jsx: (
          <p className='tutorial-msg color-primary font-lg'>{messages[2]}</p>
        ),
      },
      image: {
        key: 'sharkie-play',
        jsx: (
          <img className='sharkie-img' src={sharkiePlay} alt={messages[2]} />
        ),
        variants: {
          enter: { opacity: 0.5, scale: 1, x: '95%', y: '13%' },
          center: { opacity: 1, scale: 1, x: '95%', y: '13%' },
          exit: { opacity: 0 },
        },
      },
      timer: 3000,
      buttons: true,
    },
    {
      message: {
        text: messages[3],
        jsx: (
          <p className='tutorial-msg color-primary font-lg'>
            Wait, aren't you the new{' '}
            <span className='color-accent font-xl'>Junior Manager</span> of the
            San Jose Sharks?
          </p>
        ),
      },
      image: {
        key: 'sharkie-speak',
        jsx: (
          <img className='sharkie-img' src={sharkieSpeak} alt={messages[3]} />
        ),
        variants: {
          enter: { opacity: 0, scale: 1, x: '95%', y: '13%' },
          center: { opacity: 1, scale: 1, x: '95%', y: '15%' },
        },
      },
      timer: 3000,
      buttons: true,
    },
    {
      message: {
        text: messages[4],
        jsx: (
          <p className='tutorial-msg color-primary font-lg'>{messages[4]}</p>
        ),
      },
      image: {
        key: 'sharkie-speak',
        jsx: (
          <img className='sharkie-img' src={sharkieSpeak} alt={messages[4]} />
        ),
        variants: {
          enter: { opacity: 1, scale: 1, x: '95%', y: '15%' },
          center: { opacity: 1, scale: 1, x: '95%', y: '15%' },
        },
      },
      timer: 3000,
      buttons: true,
    },
    {
      message: {
        text: messages[5],
        jsx: (
          <p className='tutorial-msg color-primary font-lg'>{messages[5]}</p>
        ),
      },
      image: {
        key: 'sharkie-speak',
        jsx: (
          <img className='sharkie-img' src={sharkieSpeak} alt={messages[5]} />
        ),
        variants: {
          enter: { opacity: 1, scale: 1, x: '95%', y: '15%' },
          center: { opacity: 1, scale: 1, x: '95%', y: '15%' },
        },
      },
      timer: 3000,
      buttons: true,
    },
    {
      message: {
        text: messages[6],
        jsx: (
          <p className='tutorial-msg color-primary font-lg'>{messages[6]}</p>
        ),
      },
      image: {
        key: 'sharkie-speak',
        jsx: (
          <img className='sharkie-img' src={sharkieSpeak} alt={messages[6]} />
        ),
        variants: {
          enter: { opacity: 1, scale: 1, x: '95%', y: '15%' },
          center: { opacity: 1, scale: 1, x: '95%', y: '15%' },
        },
      },
      timer: 0,
      buttons: true,
    },
  ],
};
