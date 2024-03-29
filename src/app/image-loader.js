import backBtnRvrsd from '@images/back-btn-reversed.svg';
import backBtn from '@images/back-btn.svg';
import ice from '@images/field.png';
import financialsLogo from '@images/financials-logo.svg';
import iceBgSmall from '@images/ice-bg-small.svg';
import arrowLeft from '@images/icons/arrow-left.svg';
import arrowRight from '@images/icons/arrow-right.svg';
import binoculars from '@images/icons/binoculars.svg';
import cancelBtn from '@images/icons/cancel-big.svg';
import confirmBtn from '@images/icons/confirm-big.svg';
import jrSharksLogo from '@images/icons/jr-sharks-logo-lg.svg';
import notepad from '@images/icons/notepaper-pen.svg';
import sjbarracudalogo from '@images/icons/sjbarracuda-logo.svg';
import sjsharkslogo from '@images/icons/sjsharkslogo.svg';
import abbcanucksLogo from '@images/icons/team-logos/ahl/AbbotsfordCanucks.png';
import wranglersLogo from '@images/icons/team-logos/ahl/CalgaryWranglers.png';
import cvFirebirdsLogo from '@images/icons/team-logos/ahl/CoachellaValleyFirebirds.png';
import condorsLogo from '@images/icons/team-logos/ahl/bakersfieldcondorsLG.png';
import eaglesLogo from '@images/icons/team-logos/ahl/coloradoeaglesLG.png';
import silverKinghtsLogo from '@images/icons/team-logos/ahl/hendersonsilverknightsLG.png';
import iowaWildLogo from '@images/icons/team-logos/ahl/iowawildLG.png';
import reignLogo from '@images/icons/team-logos/ahl/ontarioreignLG.png';
import gullesLogo from '@images/icons/team-logos/ahl/sandiegogullsLG.png';
import texasStartsLogo from '@images/icons/team-logos/ahl/texasstarsLG.png';
import roadRunnersLogo from '@images/icons/team-logos/ahl/tucsonroadrunnersLG.png';
import blackbeaversLogo from '@images/icons/team-logos/blackbeaversLg.svg';
import bluebearsLogo from '@images/icons/team-logos/bluebearsLg.svg';
import goldengeckosLogo from '@images/icons/team-logos/goldengeckosLg.svg';
import graygrasshoppersLogo from '@images/icons/team-logos/graygrasshoppersLg.svg';
import greengiraffesLogo from '@images/icons/team-logos/greengiraffesLg.svg';
import ducksLogo from '@images/icons/team-logos/nhl/anaheimducksLG.png';
import coyotesLogo from '@images/icons/team-logos/nhl/arizonacoyotesLG.png';
import flamesLogo from '@images/icons/team-logos/nhl/calgaryflamesLG.png';
import avalancheLogo from '@images/icons/team-logos/nhl/coloradoavalancheLG.png';
import dallasStarsLogo from '@images/icons/team-logos/nhl/dallasstarsLG.png';
import oilersLogo from '@images/icons/team-logos/nhl/edmontonoilersLG.png';
import kingsLogo from '@images/icons/team-logos/nhl/losangeleskingsLG.png';
import minnesotaWildLogo from '@images/icons/team-logos/nhl/minnesotawildLG.png';
import bluesLogo from '@images/icons/team-logos/nhl/stlouisbluesLG.png';
import canucksLogo from '@images/icons/team-logos/nhl/vancouvercanucksLG.png';
import goldenKnightsLogo from '@images/icons/team-logos/nhl/vegasgoldenknightsLG.png';
import jetsLogo from '@images/icons/team-logos/nhl/winnipegjetsLG.png';
import orangeowlsLogo from '@images/icons/team-logos/orangeowlsLg.svg';
import pinkpandasLogo from '@images/icons/team-logos/pinkpandasLg.svg';
import pinkpanthersLogo from '@images/icons/team-logos/pinkpanthersLg.svg';
import redrabbitsLogo from '@images/icons/team-logos/redrabbitsLg.svg';
import silverspidersLogo from '@images/icons/team-logos/silverspidersLg.svg';
import whitewolvesLogo from '@images/icons/team-logos/whitewolvesLg.svg';
import yellowyaksLogo from '@images/icons/team-logos/yellowyaksLg.svg';
import sharkieBtn from '@images/sharkie-btn.svg';
import { getTeamVideos } from './data/season/season';

const images = [
  backBtn,
  backBtnRvrsd,
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
  condorsLogo,
  cvFirebirdsLogo,
  eaglesLogo,
  silverKinghtsLogo,
  iowaWildLogo,
  wranglersLogo,
  reignLogo,
  abbcanucksLogo,
  gullesLogo,
  texasStartsLogo,
  roadRunnersLogo,
  ducksLogo,
  coyotesLogo,
  flamesLogo,
  avalancheLogo,
  dallasStarsLogo,
  oilersLogo,
  kingsLogo,
  minnesotaWildLogo,
  bluesLogo,
  canucksLogo,
  goldenKnightsLogo,
  jetsLogo,
];

export const loadImages = () => {
  images.forEach((img) => {
    const imgEl = new Image();
    imgEl.src = img;
  });
};

export const loadVideos = (level) => {
  getTeamVideos(level).forEach((_vidLink) => {
    const _videoEl = document.createElement('video');
    _videoEl.setAttribute('src', _vidLink);
    _videoEl.addEventListener('loadstart', (e) => {
      console.log('on load start:::: ', e.target);
    });
    _videoEl.addEventListener('loadeddata', (e) => {
      console.log('on loaded data:::: ', e.target);
    });
    _videoEl.addEventListener('loadend', (e) => {
      console.log('on loaded end:::: ', e.target);
    });
  });
};
