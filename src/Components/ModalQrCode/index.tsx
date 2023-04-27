// Modules
import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios'
import Share from 'react-native-share';
import RNFetchBlob from "rn-fetch-blob";
import Toast from 'react-native-root-toast';

// Locale
import { languages } from '../../Locales/index.js';

// Styles
import {
	Container,
  IconHeader,
	ContainerModal,
	ButtonShare,
	TextButtonShare,
	Title,
	Spinner,
  Image,
  ContainerHeader,
  ContainerBody
} from './styles';

interface IProps {
  language: string,
  getQRCodeURL: string;
  setShowModal: React.Dispatch<boolean>;
  handlerException: (title: string, error: string) => void;
  showModal: boolean;
  data: {
    type: string;
    id: number;
    token: string;
    qr_code: string;
  }
  colors?: {
    button: string;
    textButton: string;
    title: string;
    text: string;
  }
}

const ModalQrCode: React.FC<IProps> = ({
  language,
  data,
  colors,
  showModal,
  getQRCodeURL,
  setShowModal,
  handlerException
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageQrCode, setImageQrCode] = useState<string>('');

  /**
   * Função responsável por tratar algum erro.
   *
   */
  const notifyException = useCallback((message: string, error: string, location: string) => {
    Toast.show(message, { duration: Toast.durations.LONG });
		handlerException && handlerException(`ModalQrCode.${location}`, error);
	}, [handlerException])

  //Get the lang from props. If hasn't lang in props, default is pt-BR
  const strings = languages(language);

  /**
   * Função responsável por carregar o QR Code.
   *
   */
  const getQrCodeIndication = useCallback(async () => {
    try {
      setImageQrCode('')
      setIsLoading(true)

      const response = await Axios.post(getQRCodeURL, {
        provider_id: data.type == 'provider' ? data.id : null,
        user_id: data.type == 'user' ? data.id : null,
        token: data.token,
        referral_code: data.qr_code
      })

      if(!response.data.success){
        setIsLoading(false)
        setImageQrCode('');
        throw new Error(response.data.error || response.data.errors);
      }

      const timestamp = Date.now();
      const newImageUrl = `${response.data.url}?${timestamp}`;

      setImageQrCode(newImageUrl);
    } catch (error) {
      notifyException(strings.indication.qr_code_error, error, 'getQrCodeIndication');
      setShowModal(false)
    }
  }, [notifyException, getQRCodeURL, data])

  /**
   * useEffect
   *
   */
  useEffect(() => {
    if(data?.qr_code && showModal) getQrCodeIndication();
    return () => setImageQrCode('')
  }, [showModal, data]);

  /**
   * Função responsável por converter a imagem em base64 e compartilhar.
   *
   */
  const convertToBase64AndShare = useCallback(async () => {
    let imagePath: string = '';
    await RNFetchBlob.config({
      fileCache: true
    })
    .fetch("GET", imageQrCode)
    .then(resp => {
      imagePath =resp.path();
      return resp.readFile("base64");
    })
    .then(async base64Data => {
      RNFetchBlob.fs.unlink(imagePath);
      return await shareIndicationQrCode(base64Data)
    });
  }, [imageQrCode])

  /**
   * Função responsável por compartilhar o base64.
   *
   */
  const shareIndicationQrCode = useCallback(async (imageBase64) => {
    await Share.open({
      message: strings.indication.join_our_app,
      url: `data:image/png;base64,${imageBase64}`,
      title: strings.indication.join_our_app,
    }).catch(error => {
      handlerException('ModalQrCode.shareIndicationQrCode', error);
    });
  }, [])

  return (
    <ContainerModal
      animationType="fade"
      transparent={false}
      visible={!!showModal}
      onRequestClose={() => {
        setShowModal(!showModal);
        setImageQrCode('')
      }}
    >
      <Container>
        <ContainerHeader>
          <IconHeader
            name="arrow-left"
            color={String(colors?.title)}
            onPress={() => setShowModal(!showModal)}
            type="font-awesome-5"
          />
          <Title color={String(colors?.title)}>
            {strings.indication.share_referral_code}
          </Title>
        </ContainerHeader>
        <ContainerBody>
          <Image
            resizeMode={"stretch"}
            source={{uri: imageQrCode || undefined}}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            color={String(colors?.button)}
          >
            {isLoading && <Spinner size={60} color={String(colors?.button)} />}
          </Image>
        </ContainerBody>
        <ButtonShare
          color={String(colors?.button)}
          onPress={() => convertToBase64AndShare()}
        >
          <TextButtonShare color={String(colors?.textButton)}>{strings.indication.share}</TextButtonShare>
        </ButtonShare>

      </Container>
    </ContainerModal>
  );
};


export default ModalQrCode;
