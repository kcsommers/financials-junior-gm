import { LoadingSpinner } from '@components';

export const withUser = (PageComponent, user, userRole) => {
  const props = { [userRole]: user };

  return user ? (
    <PageComponent {...props} />
  ) : (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingSpinner />
    </div>
  );
};
