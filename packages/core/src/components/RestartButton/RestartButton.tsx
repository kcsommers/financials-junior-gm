import RestartIcon from '../svg/rotate-left-solid.svg';

type RestartButtonProps = {
  onClick: () => void;
};

export const RestartButton = ({ onClick }: RestartButtonProps) => {
  return (
    <button
      className="rounded-full p-1 border-6 border-gray-700"
      onClick={onClick}
    >
      <div className="rounded-full bg-primary p-2">
        {/* @ts-ignore */}
        <RestartIcon className="fill-secondary" width={30} />
      </div>
    </button>
  );
};
