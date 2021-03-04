import backBtn from '@images/back-btn.svg';
import financialsLogo from '@images/financials-logo.svg';
import ice from '@images/field.png';
import bluebearsLogo from '@images/icons/team-logos/bluebearsLg.svg';
import redrabbitsLogo from '@images/icons/team-logos/redrabbitsLg.svg';
import pinkpanthersLogo from '@images/icons/team-logos/pinkpanthersLg.svg';
import yellowyaksLogo from '@images/icons/team-logos/yellowyaksLg.svg';
import greengiraffesLogo from '@images/icons/team-logos/greengiraffesLg.svg';
import goldengeckosLogo from '@images/icons/team-logos/goldengeckosLg.svg';
import graygrasshoppersLogo from '@images/icons/team-logos/graygrasshoppersLg.svg';
import orangeowlsLogo from '@images/icons/team-logos/orangeowlsLg.svg';
import silverspidersLogo from '@images/icons/team-logos/silverspidersLg.svg';
import whitewolvesLogo from '@images/icons/team-logos/whitewolvesLg.svg';
import pinkpandasLogo from '@images/icons/team-logos/pinkpandasLg.svg';
import blackbeaversLogo from '@images/icons/team-logos/blackbeaversLg.svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo-lg.svg';
import sjbarracudalogo from '@images/icons/sjbarracuda-logo.svg';
import sjsharkslogo from '@images/icons/sjsharkslogo.svg';
import cancelBtn from '@images/icons/cancel-big.svg';
import confirmBtn from '@images/icons/confirm-big.svg';
import notepad from '@images/icons/notepaper-pen.svg';
import arrowRight from '@images/icons/arrow-right.svg';
import arrowLeft from '@images/icons/arrow-left.svg';
import binoculars from '@images/icons/binoculars.svg';
import sharkieBtn from '@images/sharkie-btn.svg';
import iceBgSmall from '@images/ice-bg-small.svg';

const images = [
  backBtn,
  financialsLogo,
  ice,
  iceBgSmall,
  cancelBtn,
  confirmBtn,
  bluebearsLogo,
  redrabbitsLogo,
  pinkpanthersLogo,
  yellowyaksLogo,
  greengiraffesLogo,
  goldengeckosLogo,
  graygrasshoppersLogo,
  orangeowlsLogo,
  silverspidersLogo,
  whitewolvesLogo,
  pinkpandasLogo,
  blackbeaversLogo,
  jrSharksLogo,
  sjbarracudalogo,
  sjsharkslogo,
  notepad,
  arrowLeft,
  arrowRight,
  binoculars,
  sharkieBtn,
];

export const loadImages = () => {
  images.forEach((img) => {
    const imgEl = new Image();
    imgEl.src = img;
  });
};
