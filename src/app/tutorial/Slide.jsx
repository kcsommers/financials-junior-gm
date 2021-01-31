export default class Slide {
  static SLIDE_DURATION = 3000;

  constructor(message, sharkie, hasButtons, timer, accentText) {
    this.id = Math.floor(Math.random() * 1000000);
    this.message = message;
    this.sharkie = sharkie;
    this.hasButtons = hasButtons;
    this.timer = timer;
    this.accentText = accentText;
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
