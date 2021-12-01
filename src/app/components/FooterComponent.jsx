import { Button } from '@components';
import teamPlayersLogo from '@images/icons/team-players.svg';
import seasonSticksLogo from '@images/icons/season-sticks.svg';
import trophyLogo from '@images/icons/trophy.svg';
import budgetLogo from '@images/icons/dollar-sign.svg';
import { startingLineupFull } from '@data/players/players-utils';

const styles = (tutorialActive) => ({
  container: {
    padding: '0.75rem 3rem',
    zIndex: tutorialActive ? 0 : 1,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const getButtonConfigs = (
  _student,
  _inTransition,
  _tutorialActive,
  _allTutorialsViewed
) => {
  const btnConfigs = {
    team: {
      text: 'Team',
      background: '#ea7200',
      link: '/team',
      image: teamPlayersLogo,
      isDisabled: !!(_inTransition || _tutorialActive || !_allTutorialsViewed),
    },
    trophies: {
      text: 'Trophies',
      background: '#002f6c',
      link: '/trophies',
      image: trophyLogo,
      isDisabled: !!(_inTransition || _tutorialActive || !_allTutorialsViewed),
    },
    season: {
      text: 'Season',
      background: '#ea7200',
      link: '/season',
      image: seasonSticksLogo,
      isDisabled: !!(_inTransition || _tutorialActive || !_allTutorialsViewed),
    },
    budget: {
      text: 'Budget',
      background: '#002f6c',
      link: '/budget',
      image: budgetLogo,
      isDisabled: !!(_inTransition || _tutorialActive || !_allTutorialsViewed),
    },
  };
  if (+_student.level > 1) {
    const _pagesVisited = _student ? _student.pagesVisited || [] : [];
    if (!btnConfigs.team.isDisabled) {
      btnConfigs.team.isDisabled = !_pagesVisited.includes('budget');
    }
    if (!btnConfigs.season.isDisabled) {
      btnConfigs.season.isDisabled = !startingLineupFull(_student);
    }
  }
  return btnConfigs;
};

export const FooterComponent = ({
  links,
  history,
  inTransition,
  tutorialActive,
  student,
}) => {
  const allTutorialsViewed =
    student &&
    student.tutorials &&
    student.tutorials.home &&
    student.tutorials.budget &&
    student.tutorials.team &&
    student.tutorials.scout &&
    student.tutorials.season;

  const btnConfigs = getButtonConfigs(
    student,
    inTransition,
    tutorialActive,
    allTutorialsViewed
  );

  console.log('bnt::: ', btnConfigs);

  return (
    <div style={styles(tutorialActive).container}>
      <div className="footer-inner" style={styles(tutorialActive).inner}>
        {links.map((l) => (
          <Button
            key={l}
            size="small"
            isDisabled={btnConfigs[l].isDisabled}
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
