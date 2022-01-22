import React from 'react';

import { useAppSelector } from '../../store';
import Alert from '../Alert';
import Header from '../Header';

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
  const alert = useAppSelector((st) => st.layout.alert);

  return (
    <div>
      <Header />
      { children }
      { alert && <Alert type={alert.type} title={alert.title} text={alert.text} /> }
    </div>
  );
}
