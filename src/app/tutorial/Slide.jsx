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
    this.small = config.small;
    this.transparentBg = config.transparentBg;
    this.slideAnimate = config.slideAnimate;
    this.canCancel = config.canCancel;
    this.fontSizes = this.getFontSizes();
  }

  getFontSizes() {
    if (this.message.length >= 80 && this.message.length < 110) {
      if (this.small) {
        return { base: '1.665rem', accent: '1.96rem' };
      }
      return { base: '2.25rem', accent: '2.655rem' };
    }

    if (this.message.length >= 110) {
      if (this.small) {
        return { base: '1.48rem', accent: '1.258' };
      }
      return { base: '2rem', accent: '2rem' };
    }

    if (this.small) {
      return { base: '1.85rem', accent: '2.18rem' };
    }

    return { base: '2.5rem', accent: '2.95rem' };
  }

  getJsx() {
    if (!this.accentText) {
      return (
        <p
          className='slide-msg color-primary'
          style={{ fontSize: this.fontSizes.base }}
        >
          {this.message}
        </p>
      );
    }

    const messageSplit = this.message.split(this.accentText);
    return (
      <p
        className='slide-msg color-primary'
        style={{ fontSize: this.fontSizes.base }}
      >
        {messageSplit[0]}
        <span
          className='color-accent'
          style={{ fontSize: this.fontSizes.accent }}
        >
          {this.accentText}
        </span>
        {messageSplit[1]}
      </p>
    );
  }
}
