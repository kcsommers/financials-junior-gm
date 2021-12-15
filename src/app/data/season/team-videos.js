export const getGameOverVideo = (level, team, score) => {
  let _videos;
  if (+level === 3) {
    _videos = SharksVideos[team];
  } else if (+level === 2) {
    _videos = BarricudaVideos[team];
  }
  return _videos && _videos[score[0] > score[1] ? 'goal' : 'save'];
};

export const getGameOnVideo = () => {
  const _gameOnVideos = [
    `${BASE_URL}1oPh4X6k_bY5M8rYYFvklzvXwtkQEXmFp`,
    `${BASE_URL}1dd2pjPatwHz4mIwFetxeF56rKZ02Axt_`,
    `${BASE_URL}1G_Ioyiet_9cbi5Rpds4hnNkhwyxp7-5y`,
    `${BASE_URL}1wPBJ2lZJo5K6Ywba7FoudL9Ey188BnBL`,
  ];
  return _gameOnVideos[Math.floor(Math.random() * _gameOnVideos.length)];
};

export const getAllTeamVideos = () => {
  return Object.keys(SharksVideos).reduce((links, team) => {
    links.push(SharksVideos[team].goal);
    links.push(SharksVideos[team].save);
    return links;
  }, []);
};
