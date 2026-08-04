// Modules
import styled, { css } from "styled-components/native";
import { Icon as RNEIcon } from "react-native-elements";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

interface ITheme {
  color?: String
}

export const ScrollView = styled.ScrollView`
  padding: 0px 16px;
`

// styled.SafeAreaView (core RN) e' no-op no Android — trocado pelo primitivo
// do safe-area-context pra aplicar inset de verdade nas duas plataformas.
export const SafeAreaView = styled(RNSafeAreaView)`
  background-color: #FFF;
  flex: 1;
`

// padding-top era 32px fixo, empurrando o botao de voltar bem abaixo do
// padrao de 16dp do resto do app (a SafeAreaView ja cobre o inset real do
// topo). Reduzido pra 16px pra alinhar com as outras telas, sem mexer na
// composicao centralizada icone+titulo.
export const ContainerHeader = styled.View`
  padding: 16px 0 32px;
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

// Padronizado para o icone 24dp do app (era 26px font-awesome-5). O alvo de
// toque de 48dp vem via hitSlop passado no uso (index.tsx) — RNEIcon repassa
// hitSlop/accessibilityRole/accessibilityLabel pro Touchable interno sem
// precisar de wrapper, entao a posicao/layout do header nao muda.
export const IconHeader = styled(RNEIcon).attrs({
  size: 24,
  type: 'feather',
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
