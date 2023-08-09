import Button from '@common/Button';
import COLOR from '@constants/colors';
import React from 'react';
import { BiMapAlt } from 'react-icons/bi';
import { PiArrowBendUpLeftBold, PiArrowBendUpRightBold } from 'react-icons/pi';

const NavigationPage = () => {
  return (
    <div style={{ border: '1px solid black' }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '20vh' }}>
        <div
          style={{
            width: '90%',
            height: '90%',
            margin: '0 auto',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '4px 4px 16px 0px rgba(0, 0, 0, 0.36)'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '50%',
              alignItems: 'center',
              padding: '0px 20px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20
              }}
            >
              <PiArrowBendUpRightBold size={40} />
              <div>장애물</div>
            </div>
            <div>21m</div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '50%',
              alignItems: 'center',
              padding: '0px 20px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20
              }}
            >
              <PiArrowBendUpLeftBold size={40} />
              <div>장애물</div>
            </div>
            <div>22m</div>
          </div>
        </div>
      </div>
      <div style={{ height: '70vh' }}></div>
      <div style={{ display: 'flex', gap: 10 }}>
        <div
          style={{
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid black',
            borderRadius: 100,
            borderColor: COLOR.BLUE1,
            padding: 10
          }}
        >
          <BiMapAlt color={COLOR.BLUE1} size={30} />
        </div>
        <Button bgColor={COLOR.BLUE1} color={COLOR.WHITE} height='50px'>
          경로안내 마치기
        </Button>
      </div>
    </div>
  );
};

export default NavigationPage;
