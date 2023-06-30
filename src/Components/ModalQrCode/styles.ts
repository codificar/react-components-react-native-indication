import { ActivityIndicator, Modal } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Icon as RNEIcon } from "react-native-elements";

interface ITheme {
  color?: String
}

export const ContainerModal = styled(Modal)``;

export const Container = styled.View`
  flex: 1px;
  padding: 0px 16px;
  background-color: rgba(255, 255, 255, 1);
`;

export const ContainerHeader = styled.View`
  padding: 24px 0px;
  align-items: flex-start;
  flex-direction: row;
`

export const ContainerBody = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const IconHeader = styled(RNEIcon).attrs({
  size: 26,
})``;

export const Image = styled.ImageBackground<ITheme>`
  aspect-ratio: 0.7143;
  border-style: solid;
  border-width: 3px;
  border-radius: 5px;
  display: flex;
  flex: 1;
  ${props => (props.color) && css`
    border-color: ${String(props.color)};
  `};
`;

export const Title = styled.Text<ITheme>`
  font-size: 25px;
  font-weight: bold;
  padding-left: 16px;

  ${props => (props.color) && css`
    color: ${String(props.color)};
  `};
`;

export const ButtonShare = styled.TouchableOpacity<ITheme>`
  padding: 5px;
  margin: 16px 0;
  margin-top: 10px;
  border-radius: 8px;
  height: 50px;
  justify-content: center;
  align-items: center;

  ${props => (props.color) && css`
    background-color: ${String(props.color)};
  `};
`;

export const TextButtonShare = styled.Text<ITheme>`
  font-size: 18px;
  font-weight: bold;

  ${props => (props.color) && css`
    color: ${String(props.color)};
  `};
`;

export const Spinner = styled(ActivityIndicator)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
