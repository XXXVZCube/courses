'use client';

import { Button, Result } from 'antd';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <Result
      title={error.message}
      subTitle='Sorry, something went wrong.'
      extra={
        <Button type='primary' onClick={reset}>
          Try again
        </Button>
      }
    />
  );
};

export default Error;