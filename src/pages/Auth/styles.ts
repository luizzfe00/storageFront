import { motion } from 'framer-motion';
import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const BoxContainer = styled.div`
  width: 480px;
  min-height: 550px;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: ${colors.white};
  box-shadow: 0 0 2px ${colors.containerShadow};
  position: relative;
  overflow: hidden;
`;

export const TopContainer = styled.div`
  width: auto;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 2em;
`;

export const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 56%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(71, 119, 207);
  background: linear-gradient(
    90deg,
    rgba(71, 119, 207, 1) 30%,
    rgba(0, 212, 255, 1) 100%,
    rgba(2, 0, 36, 1) 100%
  );
`;

export const backdropVariants = {
  expanded: {
    width: '125%',
    height: '950px',
    borderRadius: '40%',
    transform: 'rotate(80deg)',
  },
  collapsed: {
    width: '105%',
    height: '850px',
    borderRadius: '50%',
    transform: 'rotate(75deg)',
  },
};

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 10;
  text-align: center;
`;

export const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: ${colors.white};
  margin: 0;
`;

export const SmallText = styled.h5`
  color: ${colors.white};
  font-weight: 500;
  font-size: 11px;
  margin: 7px 0 0 0;
`;

export const InnerContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  padding: 2em 1.8em;
  z-index: 10;
`;
