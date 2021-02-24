import { OverlayBoard } from './OverlayBoard';
import { useEffect, useRef, useState } from 'react';

export const FaqOverlay = ({ questions, onStartTutorial }) => {
  const answerRefs = useRef([]);

  const [questionStates, setQuestionStates] = useState({});

  useEffect(() => {
    console.log('USE EFFECT:::: ');
    answerRefs.current = answerRefs.current.slice(0, questions.length);
  }, [questions]);

  const toggleQuestion = (index) => {
    const answerRef = answerRefs.current[index];
    const question = questionStates[index];
    const shouldExpand = !question || !question.isExpanded;

    setQuestionStates({
      ...questionStates,
      [index]: {
        answerHeight: shouldExpand ? answerRef.offsetHeight : 0,
        isExpanded: shouldExpand,
      },
    });
    console.log('ANSWER REF:::: ', answerRef.offsetHeight);
  };

  const questionsView = questions.map((q, i) => (
    <div
      key={i}
      className='question-container box-shadow'
      style={{
        padding: '1rem 1rem 1rem 0',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={toggleQuestion.bind(this, i)}
    >
      <div className='faq-question-wrap' style={{ display: 'flex' }}>
        <span
          style={{
            width: '3rem',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '100%',
              width: '25px',
              height: '25px',
              border: '1px solid #f3901d',
              fontSize: '1.5rem',
              color: '#f3901d',
            }}
          >
            +
          </span>
        </span>
        <p className='faq-question' style={{ flex: 1 }}>
          {q.question}
        </p>
      </div>
      <p
        className='faq-answer'
        style={{
          transition: 'height 0.3s ease',
          height: questionStates[i]
            ? `${questionStates[i].answerHeight}px`
            : '0px',
          overflow: 'hidden',
          paddingLeft: '3rem',
        }}
      >
        <span
          ref={(el) => (answerRefs.current[i] = el)}
          style={{ paddingTop: '1rem', display: 'inline-block' }}
        >
          {q.answer}
        </span>
      </p>
    </div>
  ));

  return (
    <OverlayBoard>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '4rem 0',
        }}
      >
        <div className='faq-wrap'>{questionsView}</div>
      </div>
    </OverlayBoard>
  );
};
