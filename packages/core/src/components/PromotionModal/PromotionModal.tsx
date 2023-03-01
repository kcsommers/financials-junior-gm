import { logger } from '../../auth/utils/logger';
import { Student } from '../../student/student.interface';

type PromotionModalProps = {
  student: Student;
  videos: string[];
  promotedFrom: number;
};

export const PromotionModal = ({
  student,
  videos,
  promotedFrom,
}: PromotionModalProps) => {
  console.log('student::::: ', student.level);
  const getVideoSrc = () => {
    if (+student.level === promotedFrom) {
      // game over after level three so level equals promotedFrom
      return videos[2];
    }

    return videos[+student.level - 2];
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <video
        key="promotion-video"
        className="w-full bg-neutral-200"
        autoPlay
        loop
        controls
        onError={(e) => logger.error('promotion video error:::: ', e)}
        onLoadStart={() => logger.log('video load started:::::')}
        onLoadedData={() => logger.log('vid data loaded::::')}
      >
        <source src={getVideoSrc()} type="video/mp4" />
      </video>
    </div>
  );
};
