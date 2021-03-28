import { Button } from '@components';
import teamPlayersLogo from '@images/icons/team-players.svg';
import seasonSticksLogo from '@images/icons/season-sticks.svg';
import trophyLogo from '@images/icons/trophy.svg';
import budgetLogo from '@images/icons/dollar-sign.svg';

const styles = {
  container: {
    padding: '0.75rem 3rem',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
};

const btnConfigs = {
  team: {
    text: 'Team',
    background: '#ea7200',
    link: '/team',
    image: teamPlayersLogo,
  },
  trophies: {
    text: 'Trophies',
    background: '#002f6c',
    link: '/trophies',
    image: trophyLogo,
  },
  season: {
    text: 'Season',
    background: '#ea7200',
    link: '/season',
    image: seasonSticksLogo,
  },
  budget: {
    text: 'Budget',
    background: '#002f6c',
    link: '/budget',
    image: budgetLogo,
  },
};

export const FooterComponent = ({ links, history }) => {
  return (
    <div style={styles.container}>
      <div className='footer-inner' style={styles.inner}>
        {links.map((l) => (
          <Button
            key={l}
            size='small'
            text={btnConfigs[l].text}
            background={btnConfigs[l].background}
            link={btnConfigs[l].link}
            image={btnConfigs[l].image}
            onClick={() => history.push(btnConfigs[l].link)}
          />
        ))}
      </div>
    </div>
  );
};
