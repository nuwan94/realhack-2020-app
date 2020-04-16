import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography } from 'antd';
import styles from './Welcome.less';

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <Card>
      <CodePreview> npm run ui</CodePreview>
      <CodePreview> npm run fetch:blocks</CodePreview>
    </Card>
  </PageHeaderWrapper>
);
