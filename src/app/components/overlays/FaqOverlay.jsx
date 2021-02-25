import { OverlayBoard } from './OverlayBoard';
import { useEffect, useRef, useState } from 'react';

export const FaqOverlay = ({ questions, title, onStartTutorial }) => {
  const answerRefs = useRef([]);

  const [questionStates, setQuestionStates] = useState({});

  useEffect(() => {
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
  };

  const questionsView = questions.map((q, i) => (
    <div
      key={i}
      className='question-container box-shadow'
      style={{
        padding: '1rem 1rem 1rem 0',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: i !== questions.length - 1 ? '1rem' : '0',
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
          style={{
            paddingTop: '1rem',
            display: 'inline-block',
            lineHeight: '2rem',
          }}
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
          padding: '3rem 0 2rem 0',
        }}
      >
        <h3
          className='color-primary'
          style={{ marginBottom: '2rem', fontSize: '2rem' }}
        >
          {title}
        </h3>
        <div
          className='faq-wrap'
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.5rem 0.5rem 2rem 0.5rem',
          }}
        >
          {questionsView}
        </div>
        <div
          className='box-shadow'
          style={{
            width: '100%',
            borderRadius: '5px',
            backgroundColor: '#f3901d',
            color: '#fff',
            padding: '1rem 0',
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
          onClick={onStartTutorial}
        >
          Watch Tutorial
        </div>
      </div>
    </OverlayBoard>
  );
};
