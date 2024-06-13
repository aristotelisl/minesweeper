import React, { useContext, useState } from 'react';
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import { Menu, InputNumber, Button, Form, Collapse } from 'antd';
import { DifficultyContext } from '../util/DifficultyContext';

const { Panel } = Collapse;

const SideMenu = () => {
  const { setDifficulty } = useContext(DifficultyContext);
  const [customRows, setCustomRows] = useState(10);
  const [customCols, setCustomCols] = useState(10);
  const [customBombs, setCustomBombs] = useState(20);

  const onClick = (e) => {
    switch (e.key) {
      case '1':
        setDifficulty({ rows: 10, cols: 10, bombs: 20 });
        break;
      case '2':
        setDifficulty({ rows: 15, cols: 15, bombs: 30 });
        break;
      case '3':
        setDifficulty({ rows: 20, cols: 20, bombs: 40 });
        break;
      default:
        break;
    }
  };

  const handleCustomDifficulty = () => {
    setDifficulty({ rows: customRows, cols: customCols, bombs: customBombs });
  };

  const items = [
    {
      key: '1',
      icon: <SmileOutlined />,
      label: 'Easy',
    },
    {
      key: '2',
      icon: <MehOutlined />,
      label: 'Medium',
    },
    {
      key: '3',
      icon: <FrownOutlined />,
      label: 'Hard',
    }
  ];

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
      />
      <Collapse style={{ marginTop: '20px' }}>
        <Panel header="Custom Board" key="1">
          <Form layout="vertical">
            <Form.Item label="Rows" layout="horizontal" style={{ display: 'flex', flexDirection: 'row' }}>
              <InputNumber
                min={5}
                max={50}
                value={customRows}
                onChange={setCustomRows}
              />
            </Form.Item>
            <Form.Item label="Columns" layout="horizontal" style={{ display: 'flex', flexDirection: 'row' }}>
              <InputNumber
                min={5}
                max={50}
                value={customCols}
                onChange={setCustomCols}
              />
            </Form.Item>
            <Form.Item label="Bombs" layout="horizontal" style={{ display: 'flex', flexDirection: 'row' }}>
              <InputNumber
                min={1}
                max={Math.min(customRows * customCols - 1, 2500)}
                value={customBombs}
                onChange={setCustomBombs}
              />
            </Form.Item>
            <Button type="primary" onClick={handleCustomDifficulty}>
              Set Custom Board
            </Button>
          </Form>
        </Panel>
      </Collapse>
    </>
  );
};

export default SideMenu;
