# react-native-indication

A component for share indications

## Install

add in package.json:

```bash
"PROJECTNAME": "git+https://libs:ofImhksJ@git.codificar.com.br/react-components/react-native-indication.git",
```

## Usage

```javascript
this.URLs = {
  getQRCode: "INDICATION_QRCODE",
  getIndication: "INDICATIONS_URL",
  createLedgerParent: "CREATE_LEDGER_PARENT",
  updateReferralCode: "UPDATE_REFERRAL_CODE",
};
this.theme = {
  colors: {
    button: "#DDD",
    textButton: "#000",
    title: "#000",
    text: "#000",
  },
};
this.providerId = 1;
this.providerToken = "ABC....XYZ";

<IndicationScreenLib
  URLs={this.URLs}
  theme={this.theme}
  type="user"
  id={this.providerId}
  token={this.providerToken}
  handlerException={handlerException}
  goBack={() => this.props.navigation.navigate("MainScreen")}
/>;
```

## Properties

| Prop             |                                                                         Default                                                                         |    Type    | Description                                 |
| :--------------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :------------------------------------------ |
| URLs             | {getIndication: 'INDICATIONS_URL',getQRCode: 'INDICATION_QRCODE',createLedgerParent: 'CREATE_LEDGER_PARENT',updateReferralCode: 'UPDATE_REFERRAL_CODE'} |  `object`  | rota para pegar o relatorio de saques       |
| theme            |                                        colors:{button: '#072c75',textButton: 'white',title: '#111',text: '#555'}                                        |  `object`  | id do prestador                             |
| type             |                                                                       'provider'                                                                        |  `string`  | tipo do app utilizado. 'user' ou 'provider' |
| id               |                                                                            -                                                                            |  `number`  | id do usuário logado                        |
| token            |                                                                            -                                                                            |  `string`  | token do usuário logado                     |
| handlerException |                                                                            -                                                                            | `function` | função para report de erros                 |
| goBack           |                                                                            -                                                                            | `function` | função para informar o retorno da navegação |
