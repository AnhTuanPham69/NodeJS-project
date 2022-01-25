import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns/esm';
import { AuthContext } from '../../Context/AuthProvider';

const WrapperStyled = styled.div`
    margin-bottom: 20px;
    .partner-mes{
      margin-left: 5%;
      .author {
        color: black;
        margin-left: 5px;
        font-weight: bold;
      }

      .date {
        margin-left: 10px;
        font-size: 11px;
        color: #a7a7a7;
      }

      .content {
        margin-right: 45%;
        margin-left: 30px;
        display: flex;
        justify-content: flex-start;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        .mes-content{
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          padding: 5px 15px 10px 15px;
          background: rgb(228, 230, 235);
          color: black;
          border-radius: 0px 15px 15px 15px;
        }
      }
    }

    .my-mes{
      dispaly: flex;
      justify-content: flex-end;
      margin-right: 10%;
      .author {
        margin-right: 5px;
        font-weight: bold;
      }

      .date {
        display: flex;
        justify-content: flex-end;
        margin-right: 5px;
        margin-left: 10px;
        font-size: 11px;
        color: #a7a7a7;
      }

      .content {
        margin-left: 45%;
        display: flex;
        justify-content: flex-end;
        white-space: pre-wrap;
        overflow-wrap: break-word;

        .my-mes-content{
          display: flex;
          justify-content: flex-end;
          padding: 5px 15px 10px 15px;
          background-color: #4287f5;
          color: white;
          border-radius: 15px 0px 15px 15px;
        }
      }
    }
`;

function formatDate(seconds) {
  // Format Date
  let formattedDate = '';
  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
}

export default function Message({ authMes, text, displayName, createdAt, photoURL }) {
  const [isAuthMes, setAuthMes] = useState(false);;
  const {
    user: { uid },
  } = useContext(AuthContext);
  
  useEffect(() => {
    if(uid === authMes){
      setAuthMes(true);
    } else {
      setAuthMes(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <WrapperStyled>
      <div>
     {
       !isAuthMes ?
        (<div className='partner-mes'>
          <Avatar size='small' src={photoURL}>
            {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Typography.Text className='author'>{displayName}</Typography.Text>
          <Typography.Text className='date'>
            {formatDate(createdAt?.seconds)}
          </Typography.Text>
          <div>
            <Typography.Text className='content'><div className='mes-content'>{text} </div></Typography.Text>
          </div>
        </div>)
          : (
            <div className='my-mes'>
          <Typography.Text className='date'>
            {formatDate(createdAt?.seconds)}
          </Typography.Text>
          <div>
            <Typography.Text className='content'> <div className='my-mes-content'>{text}</div> </Typography.Text>
          </div>
          </div>) 
     }
     </div> 
    </WrapperStyled>
  );
}
