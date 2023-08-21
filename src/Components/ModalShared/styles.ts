// Modules
import {Modal, Platform, StatusBar} from 'react-native';
import styled, { css } from 'styled-components/native';
import { Icon as RNEIcon } from "react-native-elements";


interface ITheme {
  color?: String
}

export const RNStatusBar = styled(StatusBar)``;

export const ContainerModal = styled(Modal)``;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CloseRanger = styled.TouchableOpacity`
  flex: 1;
`;

export const ContainerInner = styled.View`
  background-color: #FFF;
  padding: 10px 25px;
  margin-top: ${Platform.OS === 'ios' ? '20px' : '0'};
`;

export const Title = styled.Text<ITheme>`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;

  ${props => (props.color) && css`
    color: ${String(props.color)};
  `};
`;

export const Text = styled.Text<ITheme>`
  font-size: 25px;
  margin-left: 20px;
  flex: 2;

  ${props => (props.color) && css`
    color: ${String(props.color)};
  `};
`;

export const ContainerIcon = styled.View`
  flex: 0.5;
`;

export const Buttom = styled.TouchableOpacity<ITheme>`
  height: 50px;
  margin: 8px 0;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  elevation: 3;

  ${props => (props.color) && css`
    background-color: ${String(props.color)};
  `};
`;

export const Icon = styled(RNEIcon)`
  margin-right: 5px;
`;
