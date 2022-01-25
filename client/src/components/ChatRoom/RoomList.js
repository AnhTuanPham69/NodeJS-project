import React from 'react';
import { Collapse, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;
const CollapseStyled = styled(Collapse)`
    white-space: nowrap;
    overflow-wrap: ellipsis;
`;

const LinkStyled = styled.div`
  padding: 10px 10px 10px 30px;
  color: white;
  font-size: 15px;
  text-decoration: none;
  display: block;
  margin-bottom: 20px;
  pointer-event: none;
  cursor: default;
`;
const ActiveRoomStyled = styled.div`
  max-width: 100%;
  padding: 10px 10px 10px 30px;
  margin-bottom: 20px;
  background: white;
  color: #4287f5;
  border-radius: 25px;
  position: relative;
  pointer-event: none;
  cursor: default;
`
export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId, selectedRoomId } =
    React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <CollapseStyled ghost defaultActiveKey={['1']}>
      <PanelStyled header='Danh sách các phòng' key='1'>
        {rooms.map((room) => (
            room.id === selectedRoomId 
          ? <ActiveRoomStyled><div key={room.id} onClick={() => setSelectedRoomId(room.id)}> {room.name} </div></ActiveRoomStyled>
          : <div><LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>{room.name}</LinkStyled></div>
         
        ))}
        <Button
          type='text'
          icon={<PlusSquareOutlined />}
          className='add-room'
          onClick={handleAddRoom}
        >
          Thêm phòng
        </Button>
      </PanelStyled>
    </CollapseStyled>
  );
}
