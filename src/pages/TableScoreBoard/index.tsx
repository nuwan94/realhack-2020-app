import React from 'react';
import { Table } from 'antd';
import styles from './index.less';
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';

const data = [
  {
    key: '1',
    teamname: 'Mora Coders',
    score: 498,
    university: 'University of Moratuwa',
  },
  {
    key: '2',
    teamname: 'BiteCode',
    score: 475,
    university: 'University of Peradeniya',
  },
  {
    key: '3',
    teamname: 'xBitz',
    score: 460,
    university: 'University of Colombo',
  },
  {
    key: '4',
    teamname: 'Sharkz',
    score: 399,
    university: 'University of Moratuwa',
  },
];

class App extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  // clearFilters = () => {
  //   this.setState({ filteredInfo: null });
  // };

  // clearAll = () => {
  //   this.setState({
  //     filteredInfo: null,
  //     sortedInfo: null
  //   });
  // };

  // setAgeSort = () => {
  //   this.setState({
  //     sortedInfo: {
  //       order: "descend",
  //       columnKey: "age"
  //     }
  //   });
  // };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || { columnKey: 'score' };
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Team Name',
        dataIndex: 'teamname',
        key: 'teamname',
        sorter: (a, b) => (a.teamname > b.teamname ? 1 : -1),
        sortOrder: sortedInfo.columnKey === 'teamname' && sortedInfo.order,
        ellipsis: true,
      },

      {
        title: 'University',
        dataIndex: 'university',
        key: 'university',
        filters: [
          { text: 'UoC', value: 'University of Colombo' },
          { text: 'UoM', value: 'University of Moratuwa' },
          { text: 'UoP', value: 'University of Peradeniya' },
        ],
        filteredValue: filteredInfo.university || null,
        onFilter: (value, record) => record.university.includes(value),
        sorter: (a, b) => (a.university > b.university ? 1 : -1),
        sortOrder: sortedInfo.columnKey === 'university' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        render: (text) => {
          return (
            <div>
              {`${text} `}
              {parseInt(text, 10) % 2 === 0 ? (
                <CaretUpFilled style={{ color: 'green' }} />
              ) : (
                <CaretDownFilled style={{ color: 'red' }} />
              )}
            </div>
          );
        },
        sorter: (a, b) => a.score > b.score,
        sortOrder: sortedInfo.columnKey === 'score' && sortedInfo.order,
        ellipsis: true,
      },
    ];
    return (
      <div>
        {/* <div className="table-operations">
          <Button onClick={this.setAgeSort}>Sort age</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div> */}
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-reset-filter">
      <App />
    </div>
  </div>
);
