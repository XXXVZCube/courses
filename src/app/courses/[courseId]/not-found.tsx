import { Button, Result } from 'antd';

import Link from 'next/link';

const NotFound = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Такой курс не найден'
      extra={
        <Link href='/courses'>
          <Button type='primary'>Вернуться назад</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
