import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import RegisterBanner from '../login/banner';
import Logo from '../../assets/logo.svg';

import styles from './style/index.module.less';
import RegisterForm from './form';

export default () => {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
        <div className={styles['logo-text']}>图书管理后台系统</div>
      </div>
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <RegisterBanner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <RegisterForm />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};
