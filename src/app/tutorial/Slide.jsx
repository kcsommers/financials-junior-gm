export default class Slide {
  static SLIDE_DURATION = 3000;
  static SLIDE_DURATION_LONG = 5000;

  constructor(config) {
    this.id = Math.floor(Math.random() * 1000000);
    this.message = config.message;
    this.sharkie = config.sharkie;
    this.hasButtons = config.hasButtons;
    this.timer = config.timer;
    this.accentText = config.accentText;
    this.x = config.x;
    this.y = config.y;
    this.repeatIndex = config.repeatIndex;
    this.bubbleDelay = config.bubbleDelay;
    this.enterActions = config.enterActions;
    this.exitActions = config.exitActions;
  }

  getJsx() {
    if (!this.accentText) {
      return <p className='slide-msg color-primary font-lg'>{this.message}</p>;
    }

    console.log('ACCENT:::: ', this.accentText);

    const messageSplit = this.message.split(this.accentText);
    return (
      <p className='slide-msg color-primary font-lg'>
        {messageSplit[0]}
        <span className='color-accent font-xl'>{messageSplit[1]}</span>
        {messageSplit[2]}
      </p>
    );
  }
}
