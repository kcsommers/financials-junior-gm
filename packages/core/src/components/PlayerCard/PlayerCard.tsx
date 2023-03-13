import classNames from 'classnames';
import Image from 'next/image';
import { ReactElement } from 'react';
import PlayerIcon from '../../components/svg/player-image.svg';
import { Player } from '../../game/teams/players';
import { getPlayerStatMax } from '../../game/teams/utils/get-player-stat-max';
import { capitalize } from '../../utils/capitalize';
import { getDollarString } from '../../utils/get-dollar-string';
import styles from './PlayerCard.module.scss';
import { PlayerRankGraph } from './PlayerRankGraph';
import { PlayerRankPie } from './PlayerRankPie';

type PlayerCardProps = {
  player: Player;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (player: Player) => void;
  getTeamLogo: (props?: { [key: string]: any }) => ReactElement;
  isProPlayer: boolean;
};

export const PlayerCard = ({
  player,
  size = 'sm',
  onClick,
  getTeamLogo,
  isProPlayer,
}: PlayerCardProps) => {
  return size === 'sm' ? (
    <div
      className={classNames(styles.player_card_wrap, styles[size], {
        'cursor-pointer': !!onClick,
      })}
    >
      <div
        className="inline-flex flex-col h-full"
        onClick={() => {
          if (onClick) {
            onClick(player);
          }
        }}
      >
        <p
          className={classNames(
            styles.position_text,
            styles[size],
            'font-bold text-primary text-center'
          )}
        >
          {capitalize(player.playerPosition)}
        </p>
        <div className={styles.player_card_header}>
          <div
            className={classNames(
              styles.player_card_header_inner,
              styles[size]
            )}
          >
            <span>{player.overallRank}</span>
            {player.playerCost && (
              <span>{getDollarString(player.playerCost)}</span>
            )}
          </div>
        </div>
        <div
          className={
            isProPlayer
              ? classNames(
                  'shadow-mat',
                  styles.player_card_body,
                  styles.player_card_color_shark
                )
              : classNames(
                  'shadow-mat',
                  styles.player_card_body,
                  styles.player_card_color_reg
                )
          }
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <span className="text-xxs mx-auto text-dark">
            {player.playerName.split(' ')[1]}
          </span>
          <div
            className={classNames(
              styles.player_card_img_wrap,
              styles[size],
              'mx-auto rounded-full relative'
            )}
          >
            {!!player.playerPicture ? (
              <Image
                style={{ pointerEvents: 'none' }}
                src={player.playerPicture}
                alt={player.playerName}
                width={45}
                height={45}
              />
            ) : (
              // @ts-ignore
              <PlayerIcon width={45} />
            )}
          </div>
          {player.playerPosition === 'goalie' ? (
            <div className={styles.player_ranks}>
              <PlayerRankPie
                label="Saves"
                sliceColorClass="bg-foreground"
                rank={+player.overallRank}
                max={getPlayerStatMax(+player.playerLevel)}
              />
            </div>
          ) : (
            <div className={styles.player_ranks}>
              <PlayerRankPie
                label="Off"
                sliceColorClass="bg-danger"
                rank={+player.offensiveRank}
                max={getPlayerStatMax(+player.playerLevel)}
              />
              <PlayerRankPie
                label="Pass"
                sliceColorClass="bg-primary"
                rank={+player.passRank}
                max={getPlayerStatMax(+player.playerLevel)}
              />
              <PlayerRankPie
                label="Def"
                sliceColorClass="bg-foreground"
                rank={+player.defensiveRank}
                max={getPlayerStatMax(+player.playerLevel)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={classNames(
        styles.player_card_wrap,
        styles.player_card_wrap_large,
        styles[size],
        { 'cursor-pointer': !!onClick }
      )}
    >
      <div
        className="inline-flex flex-col h-full"
        onClick={() => {
          if (onClick) {
            onClick(player);
          }
        }}
      >
        <p
          className={classNames(
            styles.position_text,
            styles[size],
            'font-bold text-primary text-center'
          )}
        >
          {capitalize(player.playerPosition)}
        </p>
        <div className={styles.player_card_header}>
          <div
            className={classNames(
              styles.player_card_header_inner,
              styles[size]
            )}
          >
            <span className="inline-flex flex-col">
              <span className="text-base -mb-2">Rank</span>
              {player.overallRank}
            </span>
            {player.playerCost && (
              <span>{getDollarString(player.playerCost)}</span>
            )}
            {isProPlayer && !!getTeamLogo && (
              <span className={classNames(styles.logo, styles[size])}>
                {getTeamLogo()}
              </span>
            )}
          </div>
        </div>
        <div
          className={classNames(
            'pb-2',
            player.sharkPlayer === 'TRUE'
              ? classNames(
                  'shadow-mat',
                  styles.player_card_body,
                  styles.player_card_color_shark
                )
              : classNames(
                  'shadow-mat',
                  styles.player_card_body,
                  styles.player_card_color_reg
                )
          )}
        >
          <p
            className={classNames(
              styles.player_card_player_name,
              styles[size],
              'outline-black'
            )}
          >
            {player.playerName}
          </p>
          <div
            className={classNames(
              styles.player_card_img_wrap,
              styles[size],
              'mx-auto'
            )}
          >
            {!!player.playerPicture ? (
              <Image
                style={{ pointerEvents: 'none' }}
                src={player.playerPicture}
                alt={player.playerName}
                width={size === 'md' ? 84 : 140}
                height={size === 'md' ? 84 : 140}
              />
            ) : (
              // @ts-ignore
              <PlayerIcon width={45} />
            )}
          </div>
          {player.playerPosition === 'goalie' ? (
            <div
              className={classNames(
                styles.player_rank_graphs_container,
                styles[size]
              )}
            >
              <PlayerRankGraph
                label="Saves"
                rgb={[0, 47, 108]}
                rank={+player.overallRank}
                isSmall={size === 'md'}
                max={getPlayerStatMax(+player.playerLevel)}
              />
            </div>
          ) : (
            <div
              className={classNames(
                styles.player_rank_graphs_container,
                styles[size]
              )}
            >
              <PlayerRankGraph
                label="Offense"
                rgb={[220, 45, 45]}
                rank={+player.offensiveRank}
                isSmall={size === 'md'}
                max={getPlayerStatMax(+player.playerLevel)}
              />
              <PlayerRankGraph
                label="Passing"
                rank={+player.passRank}
                rgb={[0, 120, 138]}
                isSmall={size === 'md'}
                max={getPlayerStatMax(+player.playerLevel)}
              />
              <PlayerRankGraph
                label="Defense"
                rank={+player.defensiveRank}
                rgb={[0, 47, 108]}
                isSmall={size === 'md'}
                max={getPlayerStatMax(+player.playerLevel)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
