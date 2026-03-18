import { Result } from 'antd';

import Link from 'next/link';

const NotFound = () => {
  <Result
    status='404'
    title='404'
    subTitle='Такой курс не найден'
    extra={<Link href='/courses'>Вернуться назад</Link>}
  />;
};

export default NotFound;
