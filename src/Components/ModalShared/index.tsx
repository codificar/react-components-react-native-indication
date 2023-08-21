// Modules
import React, { useCallback } from 'react'
import { Platform, Share } from 'react-native';
import Toast from 'react-native-root-toast';


// Styles
import {
  Buttom,
  CloseRanger,
  Container,
  ContainerIcon,
  ContainerInner,
  ContainerModal,
  Icon,
  RNStatusBar,
  Text,
  Title
} from './styles'

// Locale
import { languages } from '../../Locales/index.js';

// Interfaces
interface ISharePlatform {
  ios: string;
  android: string;
}

interface IShareData {
  message: ISharePlatform,
}

interface IModalProps {
  language: string,
  client: IShareData,
  provider: IShareData,
  showModal: Boolean;
  setShowModal?: React.Dispatch<boolean>;
  handlerException: (title: string, error: string) => void;
  colors: {
    button: string;
    textButton: string;
    title: string;
    text: string;
  },
}

const ModalShared: React.FC<IModalProps> = ({
  language,
  colors,
  client,
  provider,
  showModal,
  setShowModal,
  handlerException
}) => {
  /**
   * Função responsável por tratar algum erro.
   *
   */
  const notifyException = useCallback((message: string, error: string, location: string) => {
    Toast.show(message, { duration: Toast.durations.LONG });
		handlerException && handlerException(`ModalShared.${location}`, error);
	}, [handlerException])


  //Get the lang from props. If hasn't lang in props, default is pt-BR
  const strings = languages(language);

  /**
   * Função responsável por fechar o modal
   *
   */
  const HandleCloseModal = useCallback(() => {
      setShowModal && setShowModal(false)
    }, [])

  /**
   * Função responsável por compartilhar a menssagem
   *
   */
  const handlerShareCode = useCallback((value: IShareData) => {
    try {
      const options = Platform.OS === 'android'
        ? {
            dialogTitle: strings.indication.share_indication_code,
          }
        : {
            excludedActivityTypes: [
              'com.apple.UIKit.activity.PostToTwitter',
            ],
          }

      Share.share({
        message: value.message[Platform.OS],
        title: strings.indication.join_our_app,
      }, options);
    } catch (error) {
      notifyException(strings.indication.share_code_error, error, 'handlerShareCode')
    } finally {
      if(Platform.OS === 'android') HandleCloseModal()
    }

  }, [HandleCloseModal])

  return (
      <ContainerModal
        animationType="fade"
        transparent
        visible={!!showModal}
      >
				<RNStatusBar backgroundColor="#00000080" />
        <Container>
          <CloseRanger onPress={HandleCloseModal}></CloseRanger>
					<ContainerInner>
						<Title color={colors?.title}>{strings.indication.title_shared}</Title>
						<Buttom onPress={() => handlerShareCode(client)} color={colors?.button}>
              <ContainerIcon>
                <Icon
                  size={20}
                  type={"font-awesome-5"}
                  color={String(colors?.textButton)}
                  name="user"
                />
              </ContainerIcon>
							<Text color={colors?.textButton}>{strings.indication.client_buttom}</Text>
						</Buttom>
						<Buttom onPress={() => handlerShareCode(provider)} color={colors?.button}>
              <ContainerIcon>
                <Icon
                  size={20}
                  type="antdesign"
                  color={String(colors?.textButton)}
                  name="car"
                />
              </ContainerIcon>
							<Text color={colors?.textButton}>{strings.indication.provider_buttom}</Text>
						</Buttom>
					</ContainerInner>
        </Container>
      </ContainerModal>
  )
}

export default ModalShared
