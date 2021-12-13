const BASE_URL = 'https://drive.google.com/uc?export=download&id=';

export const SharksVideos = {
  'Anaheim Ducks': {
    save: `${BASE_URL}16eGdmNdbxWXYh6PsZ_XEDC14wK-Ac87P`,
    goal: `${BASE_URL}18V-3NoSaKkBhfnXfDI_Az2lefB4Xh7C4`,
  },
  'Arizona Coyotes': {
    goal: `${BASE_URL}1frVTBwuhDPEpRKd9gK2WF0xFMAWEdlDS`,
    save: `${BASE_URL}1nv6s08mnibCkMOGHQyG-zxZT-R5vFc_E`,
  },
  'Calgary Flames': {
    save: `${BASE_URL}1DdV-IXh_tbDz_JotqQuC7NveLoe2zfnt`,
    goal: `${BASE_URL}1iAU9azLhply4wFojyCguhMCdiDrqGw73`,
  },
  'Edmonton Oilers': {
    save: `${BASE_URL}1C40cdlpPEahpTHnJt11AFgjPjKMoyvB4`,
    goal: `${BASE_URL}1tbmsIS19EVH9YAUGbF39nJjRcmVl_-Rr`,
  },
  'Los Angeles Kings': {
    save: `${BASE_URL}154_Yjpz8zr93rJlnfAjuSwXgvAUyM3MX`,
    goal: `${BASE_URL}1SaKMEvxj7UTnQSXUMp4uCz9bYYt4LGM-`,
  },
  'Vancouver Canucks': {
    save: `${BASE_URL}16qHCeq_NyQ2hK94k9JyDL_Py4IyjaWw1`,
    goal: `${BASE_URL}1F2mjDyzKbln95tQaevV1PlnLFEiRFIXf`,
  },
  'Vegas Golden Knights': {
    save: `${BASE_URL}1G8dOcYotW73_akjM16hxhQ0Q-4Gd8opO`,
    goal: `${BASE_URL}1JcZz5ghEu117qPwtpQNax4QBOgNf8OQ0`,
  },
  'Dallas Stars': {
    goal: `${BASE_URL}1ClF4BaO7oquZc5OFMN1Nxc0Ey--esNID`,
    save: `${BASE_URL}1hHfMzIaVIgJ6D1j-AVYqcLK0jZ_LqwZK`,
  },
  'Colorado Avalanche': {
    save: `${BASE_URL}1-d1MtoO15oC1kEL71FdnVVpbWD4_tKjV`,
    goal: `${BASE_URL}16sLL01blwI6cTJF-HvDrqQB1Tb8Kgayy`,
  },
  'Winnipeg Jets': {
    save: `${BASE_URL}1eSs9a-q_RG0lTwR3RLMLKsub6_NnoOSi`,
    goal: `${BASE_URL}1Fqf7zF2gTZrlb00DLZnMnuVuwYOQJicV`,
  },
  'Minnesota Wild': {
    goal: `${BASE_URL}1RX7CmBJb-BL-H-B7BOcpdefAmBSBMIsF`,
    save: `${BASE_URL}1m2AcFM5tgA94jOKSC4WaMKv0yfd2GVsZ`,
  },
  'St. Louis Blues': {
    goal: `${BASE_URL}1b3XZU0gSup21cYiMzaw5SNQuXM_1IJPl`,
    save: `${BASE_URL}1t1CjEDwZGs4W9_kOcBMHT8fmf9_-7Kbi`,
  },
};

export const getGameOverVideo = (level, team, score) => {
  if (+level === 3 || +level === 2 || +level === 1) {
    const _videos = SharksVideos[team] || SharksVideos['St. Louis Blues'];
    console.log('getGameOverVideo score:::: ', score);
    console.log('getGameOverVideo:::: ', score[0] > score[1] ? 'goal' : 'save');
    return _videos[score[0] > score[1] ? 'goal' : 'save'];
  }
  return null;
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
