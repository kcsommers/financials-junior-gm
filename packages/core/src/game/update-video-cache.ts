import { Student } from '../student/student.interface';
import { loadVideos } from '../utils/asset-loader/load-videos';
import { OpposingTeam } from './teams/opposing-team.type';

export const updateVideoCache = (
  student: Student,
  opposingTeams: OpposingTeam[][],
  promotionVideos: string[],
  videoCache: Map<string, string>[]
) => {
  const levelVideoCache = videoCache[+student.level - 1];
  if (levelVideoCache?.size) {
    // videos already loaded
    return;
  }
  const seasonVideos = opposingTeams[+student.level - 1].reduce(
    (vids, team) => {
      if (team.videos?.gameOn) {
        vids.push(team.videos.gameOn);
      }
      if (team.videos?.gameHighlight) {
        vids.push(team.videos.gameHighlight.loss);
        vids.push(team.videos.gameHighlight.win);
      }
      return vids;
    },
    []
  );
  seasonVideos.push(promotionVideos[+student.level - 1]);
  loadVideos(seasonVideos, levelVideoCache);
};
