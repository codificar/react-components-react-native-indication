// Modules
import React, { useCallback, useEffect, useState } from 'react'
import { Platform, Share } from 'react-native';
import Axios from 'axios'
import Toast from 'react-native-root-toast';
import Clipboard from '@react-native-clipboard/clipboard';

// Locale
import { languages } from '../../Locales/index.js';

// Components
import ModalQrCode from '../../Components/ModalQrCode';
import ModalShared from '../../Components/ModalShared'

// Styles
import {
  ContainerBody,
  ContainerHeader,
  ContainerInput,
  ContainerCode,
  Icon,
  IconHeader,
  InputButton,
  InputLabel,
  SubTitle,
  Text,
  TextInput,
  Title,
  Button,
  TextButton,
  Line,
  ItemTitle,
  ItemValue,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  ContainerLoading,
  ContainerCodeRow,
} from './styles';

// Interfaces
interface IProps {
  URLs:{
    getQRCode: string;
    getIndication: string;
    createLedgerParent: string;
    updateReferralCode: string;
  },
  theme: {
    colors: {
      button: string;
      textButton: string;
      title: string;
      text: string;
    },
  },
  type: string,
  id: number;
  token: string;
  language: string;
  handlerException: (title: string, error: string) => void;
  goBack: React.Dispatch<void>;
}

interface IData {
  success: boolean;
  referral_code: string;
  active_register_link_and_media: boolean;
  show_provider_menu_indication: boolean;
  android_provider_message_referral: string;
  ios_provider_message_referral: string;
  show_client_menu_indication: boolean;
  android_client_message_referral: string;
  ios_client_message_referral: string;
  balance_amount_formatted: string;
  simple_indication_value_per_user: string;
  simple_indication_value_per_provider: string;
  has_parent: boolean;
  program_name: string;
  total_simple_referrals: number;
  total_compesation_referrals: number;
  isCustomIndicationEnabled: boolean;
  enter_indication_code: string;
  share_indication_code: string;
}

const IndicationScreenLib: React.FC<IProps> = ({
  URLs,
  theme,
  language,
  type,
  id,
  token,
  goBack,
  handlerException
}) => {
  // Loadings
  const [loading, setLoading] = useState(false)
  const [loadingMyCode, setLoadingMyCode] = useState(false)
  const [loadingIndication, setLoadingIndication] = useState(false)

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [showModalQRCode, setShowModalQRCode] = useState(false)

  // Input
  const [inputMyCode, setInpuMyCode] = useState<string>('')
  const [inputReferralCode, setInputReferralCode] = useState<string>('')

  // Data
  const [data, setData] = useState<IData>({} as IData)

  //Get the lang from props. If hasn't lang in props, default is pt-BR
  const strings = languages(language);

  /**
   * Função responsável por tratar algum erro.
   *
   */
  const notifyException = useCallback((message: string, error: string, location: string) => {
    Toast.show(message, { duration: Toast.durations.LONG });
		handlerException && handlerException(`IndicationScreenLib.${location}`, error);
	}, [handlerException])

  /**
   * Função responsável por copiar o código de indicação.
   *
   */
  const handleCopyToClipboard = useCallback(() => {
    try {
      Clipboard.setString(inputMyCode);
      Toast.show(strings.indication.clipboard,{
        duration: Toast.durations.SHORT
      });
    } catch (error) {
      notifyException(strings.indication.clipboard_error, error, 'handleCopyToClipboard')
    }
  }, [inputMyCode, notifyException])

  /**
   * Função responsável por compartilhar o código de indicação.
   *
   */
  const handleShared = useCallback(() => {
    try {
      if (data.active_register_link_and_media) {
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
          message: data[`${Platform.OS}_client_message_referral`],
          title: strings.indication.join_our_app,
        }, options);
      } else {
        setShowModal(true)
      }
    } catch (error) {
      notifyException(strings.indication.shared_error, error, 'handleShared')
    }
  }, [data, notifyException])

  /**
   * Função responsável por usar um código de indicação de terceiros.
   *
   */
  const handlerCreateLedgerParent = useCallback(async () => {
    try {
      setLoadingIndication(true)

      if (!inputReferralCode) {
        Toast.show(strings.indication.empty_code,{
          duration: Toast.durations.LONG
        });
        setLoadingIndication(false)
        return;
      }


      await Axios.post(URLs.createLedgerParent, {
        id,
        token,
        referral_code: inputReferralCode,
        type
      })
    } catch (error) {
      notifyException(strings.indication.create_ledger_error, error, 'handlerCreateLedgerParent')
    } finally {
      setLoadingIndication(false)
    }

	}, [inputReferralCode, id, token, notifyException])

  /**
   * Função responsável por atualizar um código de indicação.
   *
   */
  const handlerUpdateReferralCode = useCallback(async () => {
    try {
      setLoadingMyCode(true);

      if (!inputMyCode) {
        Toast.show(strings.indication.empty_code,{
          duration: Toast.durations.LONG
        });
        setLoadingMyCode(false)
        return;
      }

      data

      const response = await Axios.post(URLs.updateReferralCode, {
        id,
        token,
        referral_code: inputMyCode,
      })

      if (!response.data.success){
        Toast.show(response.data.error || response.data.errors, {
          duration: Toast.durations.LONG
        });
        setLoadingMyCode(false)
        return
      }

      Toast.show(response.data.message, {
        duration: Toast.durations.LONG
      });
    } catch (error) {
      notifyException(strings.indication.update_referral_code_error, error, 'handlerUpdateReferralCode')
    } finally {
      setLoadingMyCode(false)
    }
	}, [inputMyCode, id, token])

  /**
   * Função responsável por carregar os dados.
   *
   */
  const LoadData = useCallback(async () => {
		try {
      setLoading(true)
      const response = await Axios.get(URLs.getIndication, {
        params: {id, token, },
      });

      if(!response.data.success) throw new Error(response.data.error || response.data.errors);

      setInpuMyCode(response.data.referral_code)
      setData(response.data)
      setLoading(false)

		} catch (error) {
      goBack();
      notifyException(strings.indication.load_data_error, error, 'loadData')
		}
	}, [id, token])

  useEffect(() => { LoadData() }, [LoadData])

  if (loading) return <ContainerLoading><ActivityIndicator color={String(theme?.colors?.button)} size={64} /></ContainerLoading>

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ModalShared
          language={language}
          colors={theme.colors}
          showModal={showModal}
          setShowModal={setShowModal}
					handlerException={handlerException}
          client={{
            message: {
              ios: data.ios_client_message_referral,
              android: data.android_client_message_referral,
            },
          }}
          provider={{
            message: {
              ios: data.ios_provider_message_referral,
              android: data.android_provider_message_referral,
            },
          }}
        />
        <ModalQrCode
          showModal={showModalQRCode}
          getQRCodeURL={URLs.getQRCode}
          setShowModal={setShowModalQRCode}
          handlerException={handlerException}
          colors={theme.colors}
          data={{
            type,
            id,
            token,
            qr_code: inputMyCode,
          }}
        />
        <ContainerHeader>
          <IconHeader onPress={() => goBack()} name='arrow-left' color={String(theme?.colors?.title)} type="font-awesome-5" />
          <Title color={theme?.colors?.title}>{data.program_name}</Title>
        </ContainerHeader>
        <ContainerBody>
          <ContainerCode>
            <SubTitle color={String(theme?.colors?.title)}>{strings.indication.container_my_code.sub_title}</SubTitle>
            <Text color={String(theme?.colors?.text)}>{data.share_indication_code}</Text>
            <InputLabel>{strings.indication.container_my_code.label}</InputLabel>
            <ContainerInput>
              <TextInput
                value={inputMyCode}
                placeholder={strings.indication.container_my_code.placeholder}
                onChangeText={newText => setInpuMyCode(newText)}
              />
              <InputButton onPress={() => setShowModalQRCode(true)}>
                <Icon name="qrcode" type="antdesign" />
              </InputButton>
              <InputButton onPress={handleShared}>
                <Icon name="share" type="entypo" />
              </InputButton>
              <InputButton onPress={handleCopyToClipboard}>
                <Icon name="copy" type="entypo" />
              </InputButton>
            </ContainerInput>
            <Button onPress={handlerUpdateReferralCode} color={String(theme?.colors?.button)}>
              {loadingMyCode
                ? <ActivityIndicator color={String(theme?.colors?.textButton)}/>
                : <TextButton color={String(theme?.colors?.textButton)}>{strings.indication.update_code}</TextButton>
              }
            </Button>
          </ContainerCode>

          <Line />

          {!data.has_parent &&
            <>
              <ContainerCode>
                <SubTitle color={String(theme?.colors?.title)}>{strings.indication.container_indication.sub_title}</SubTitle>
                <Text color={String(theme?.colors?.text)}>{data.enter_indication_code}</Text>
                <InputLabel>{strings.indication.container_indication.label}</InputLabel>
                <ContainerInput>
                  <TextInput
                    value={inputReferralCode}
                    placeholder={strings.indication.container_indication.placeholder}
                    onChangeText={newText => setInputReferralCode(newText)}
                  />
                </ContainerInput>

                <Button onPress={handlerCreateLedgerParent} color={String(theme?.colors?.button)}>
                  {loadingIndication
                    ? <ActivityIndicator color={String(theme?.colors?.textButton)}/>
                    : <TextButton color={String(theme?.colors?.textButton)}>{strings.indication.create_ledger}</TextButton>
                  }
                </Button>
              </ContainerCode>

              <Line />
            </>
          }

          <ContainerCodeRow>
            <ItemTitle color={String(theme?.colors?.text)}>{strings.indication.balance_of_indication}</ItemTitle>
            <ItemValue color={String(theme?.colors?.title)}>{data.balance_amount_formatted}</ItemValue>
          </ContainerCodeRow>
          {data.isCustomIndicationEnabled &&
            <>
              {!!data.total_simple_referrals &&
                <ContainerCodeRow>
                  <ItemTitle color={String(theme?.colors?.text)}>{strings.indication.total_referrals}</ItemTitle>
                  <ItemValue color={String(theme?.colors?.title)}>{data.total_simple_referrals}</ItemValue>
                </ContainerCodeRow>
              }
              {!!data.total_compesation_referrals &&
                <ContainerCodeRow>
                  <ItemTitle color={String(theme?.colors?.text)}>{strings.indication.total_rides_earnings}</ItemTitle>
                  <ItemValue color={String(theme?.colors?.title)}>{data.total_compesation_referrals}</ItemValue>
                </ContainerCodeRow>
              }
            </>
          }

          <Line />

        </ContainerBody>
      </ScrollView>
    </SafeAreaView>
  )
}

IndicationScreenLib.defaultProps = {
  URLs: {
    getIndication: 'INDICATIONS_URL',
    getQRCode: 'INDICATION_QRCODE',
    createLedgerParent: 'CREATE_LEDGER_PARENT',
    updateReferralCode: 'UPDATE_REFERRAL_CODE',
  },
  language: 'en',
  type: 'provider',
  id: -1,
  token: "",
  handlerException(title, error) {
    console.error(title, error)
  },
  goBack() {
    console.warn('FECHAR')
  },
  theme: {
    colors:{
      button: '#072c75',
      textButton: 'white',
      title: '#111',
      text: '#555',
    },
  }
}

export default IndicationScreenLib
