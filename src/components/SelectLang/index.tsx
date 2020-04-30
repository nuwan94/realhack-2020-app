import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getLocale, setLocale, useIntl } from 'umi';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

interface SelectLangProps {
  className?: string;
}

const SelectLang: React.FC<SelectLangProps> = (props) => {
  const intl = useIntl();
  const { className } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }: ClickParam): void => setLocale(key);

  const locales = ['zh-CN', 'en-US'];
  const languageLabels = {
    'zh-CN': 'සිංහල',
    'en-US': 'English',
  };
  const languageIcons = {
    'zh-CN': '🇱🇰',
    'en-US': '🇺🇸',
  };
  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {locales.map((locale) => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span
        className={classNames(styles.dropDown, className)}
        title={intl.formatMessage({ id: 'navBar.lang' })}
      >
        <GlobalOutlined />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
