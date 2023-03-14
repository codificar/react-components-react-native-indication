import {Modal, Platform, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { PrimaryButton, SecondaryButton } from '../../Themes/WhiteLabelTheme/WhiteLabel';
import { Colors } from '../../Themes';
import colors from '../../Themes/Colors';

export const RNStatusBar = styled(StatusBar)``;

export const ContainerModal = styled(Modal)``;

export const Container = styled.View`
  flex: 1px;
  padding-vertical: 25px;
  padding-horizontal: 30px;
  background-color: rgba(255, 255, 255);
`;

export const CloseRanger = styled.TouchableOpacity`
  flex: 1;
`;

export const ContainerPoster = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  flex: 1;
  border-color: ${Colors.primaryColor + '90'}
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  margin-top: ${Platform.OS === 'ios' ? '20px' : '0'};
`;

export const ContainerQrCode = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const QrCodeHeader = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 5px;
`;

export const QrCodeBody = styled.View`
  display: flex;
  flex: 4;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 5px;
`;

export const QrCodeFooter = styled.View`
  display: flex;
  flex: 1;
  padding-top: 20px;
  align-items: center;
  width: 100%;
  border-radius: 5px;
`;

export const QrCodeBackGround = styled.View`
  background-color: #FFF;
  border-radius: 8px;
  width: 210px;
  height: 210px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${PrimaryButton};
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const TextHeader = styled.Text`
  color: ${colors.white};
  font-size: 50px;
  justify-content: center;
`;

export const TextFooter = styled.Text`
  color: ${colors.white};
  font-size: 30px;
  justify-content: center;
`;

export const ButtonShare = styled.TouchableOpacity`
  padding: 5px;
  margin-top: 10px;
  border-radius: 8px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primaryColor};
`;

export const TextButtonShare = styled.Text`  
  color: ${colors.white};
  font-size: 18px;
  font-weight: bold;
`;

export const Icon = styled(FontAwesome)`
  margin-right: 5px;
`;
