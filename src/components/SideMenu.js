import React, { useContext } from 'react';
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { DifficultyContext } from '../util/DifficultyContext';

const SideMenu = () => {
  const { setDifficulty } = useContext(DifficultyContext);

  const onClick = (e) => {
    switch (e.key) {
        case '1':
          setDifficulty({ rows: 5, cols: 5, bombs: 10 });
          break;
        case '2':
          setDifficulty({ rows: 10, cols: 10, bombs: 20 });
          break;
        case '3':
          setDifficulty({ rows: 15, cols: 15, bombs: 30 });
          break;
        default:
          setDifficulty({ rows: 5, cols: 5, bombs: 10 });
      }
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
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
    />
  );
};

export default SideMenu;
