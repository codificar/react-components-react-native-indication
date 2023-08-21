// Modules
import styled, { css } from "styled-components/native";
import { Icon as RNEIcon } from "react-native-elements";

interface ITheme {
  color?: String
}

export const ScrollView = styled.ScrollView`
  padding: 0px 16px;
`

export const SafeAreaView = styled.SafeAreaView`
  background-color: #FFF;
  flex: 1;
`

export const ContainerHeader = styled.View`
  padding: 32px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text<ITheme>`
  flex: 1;
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: #000;

  ${props => (props.color) && css`
    color: ${String(props.color)};
  `};

`

export const IconHeader = styled(RNEIcon).attrs({
  size: 26,
})``

export const ContainerBody = styled.View``

export const Text = styled.Text<ITheme>`
  font-size: 16px;
  font-weight: normal;
  color: #555;
  margin-bottom: 16px;

  ${props => (props.color) && css`
    color: ${String(props.color)};
  `};
`

export const ContainerCode = styled.View``

export const ContainerCodeRow = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  background-color: #EEE;
  padding: 16px;
  border-radius: 8px;
  elevation: 3;
  justify-content: space-between;
  align-items: center;
`

export const SubTitle = styled.Text.attrs({
  numberOfLines: 1,
})<ITheme>`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  padding-bottom: 24px;

  ${props => (props.color) && css`
    color: ${String(props.color)};
  `};

`

export const InputLabel = styled.Text`
  margin-bottom: 8px;
`

export const ContainerInput = styled.View`
  background-color: #EEE;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  margin-bottom: 8px;
  border-radius: 5px;
`

export const TextInput = styled.TextInput`
  flex: 1;
  text-align: center;
`

export const InputButton = styled.TouchableOpacity`
  background-color: #DDD;
  width: 35px;
  height: 35px;
  margin-left: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  elevation: 3;
`

export const Icon = styled(RNEIcon).attrs({
  size: 24,
  color: '#888'
})``

export const Button = styled.TouchableOpacity<ITheme>`
  align-items: center;
  padding: 12px;
  border-radius: 5px;
  elevation: 3;

  ${props => (props.color) && css`
    background-color: ${String(props.color)};
  `};
`

export const TextButton = styled.Text<ITheme>`
  ${props => (props.color) && css`
    color: ${String(props.color)};
  `};
`

export const ContainerLoading = styled.View`
  flex: 1;
  background-color: #FFF;
  justify-content: center;
  align-items: center;
`

export const ActivityIndicator = styled.ActivityIndicator``

export const Line = styled.View`
  height: 1px;
  background-color: #DDD;
  margin: 48px;
`

export const ItemTitle = styled.Text.attrs({
  numberOfLines: 2,
})<ITheme>`
  font-size: 16px;
  margin-right: 16px;
  color: #000;

  ${props => (props.color) && css`
    color: ${String(props.color)};
  `};

`
export const ItemValue = styled.Text<ITheme>`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  padding: 8px 0;

  ${props => (props.color) && css`
    color: ${String(props.color)};
  `};

`
