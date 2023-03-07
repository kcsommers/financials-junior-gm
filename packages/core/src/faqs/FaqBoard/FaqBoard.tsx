import classNames from 'classnames';
import { FAQ } from '../faq';
import { FaqAccordian } from './FaqAccordian';

type FaqBoardProps = {
  faqs: FAQ[];
  title: string;
  onWatchTutorial: () => void;
};

export const FaqBoard = ({ faqs, title, onWatchTutorial }: FaqBoardProps) => {
  return (
    <div className="w-full h-full p-16 flex flex-col overflow-auto">
      <h4 className="text-primary text-3xl text-center mb-8">{title}</h4>
      <div className="flex flex-col justify-between flex-1">
        <div className="max-h-full">
          <div className="max-h-full">
            {(faqs || []).map((faq, i) => (
              <div key={faq.question} className={classNames({ 'mt-4': i > 0 })}>
                <FaqAccordian faq={faq} />
              </div>
            ))}
          </div>
        </div>
        <button
          className="btn btn-secondary-2 text-center text-lg mt-4"
          onClick={onWatchTutorial}
        >
          Watch Tutorial
        </button>
      </div>
    </div>
  );
};
