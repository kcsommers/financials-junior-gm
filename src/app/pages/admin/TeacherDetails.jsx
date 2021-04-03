export const TeacherDetails = ({
  match: {
    params: { id },
  },
}) => {
  console.log('ID:::: ', id);
  return (
    <div className='teacher-details-wrap'>
      <h1>Teacher Details</h1>
    </div>
  );
};
