import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Row, Col, Card, Typography } from 'antd';
import request from '@/utils/request';

import 'antd/dist/antd.css';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

export default () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(62);

  const [inputText, setInputText] = useState(`class Main {
    static public void main( String args[] ) {
      System.out.println( "Hello World!" );
    }
  }`);
  const [outputText, setOutputText] = useState<any>(undefined);
  const [submission, setSubmission] = useState<any>(undefined);

  useEffect(() => {
    request('https://api.judge0.com/languages/').then((res) => setLanguages(res));
  }, []);

  const checkSubmission = (token: string) => {
    if (token === undefined) return;

    request(`https://api.judge0.com/submissions/${token}`).then((res) => {
      if (res.status.id < 3) {
        checkSubmission(token);
      }
      setOutputText(res);
    });
  };

  const onSubmit = () => {
    request('https://api.judge0.com/submissions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        source_code: inputText,
        language_id: selectedLanguage,
        stdin: '',
      },
    }).then((res) => {
      setSubmission(res);
      checkSubmission(res.token);
    });
  };

  return (
    <PageHeaderWrapper content="Challenges">
      <Card>
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col xs={24} lg={9}>
            <TextArea
              style={{ width: '100%' }}
              rows={10}
              onChange={(e) => setInputText(e.target.value)}
              defaultValue={inputText}
            />
          </Col>
          <Col xs={24} lg={6}>
            <Select
              showSearch
              placeholder="Select language"
              optionFilterProp="children"
              defaultValue={62}
              style={{ width: '100%', margin: '10px auto' }}
              onSelect={(e: any) => setSelectedLanguage(e)}
            >
              {languages && languages.map((l: any) => <Option value={l.id}>{l.name}</Option>)}
            </Select>
            <Button block type="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Col>
          <Col xs={24} lg={9}>
            {/* <Button
              type="link"
              onClick={() => {
                if (submission !== undefined) checkSubmission(submission.token);
              }}
            >
              Reload
            </Button>
            <Button
              type="link"
              onClick={() => {
                setOutputText(undefined);
                setSubmission(undefined);
              }}
            >
              Clear
            </Button> */}
            <Text code>Status : {outputText?.status.description}</Text>
            <TextArea rows={10} value={outputText?.stdout} />
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
};
