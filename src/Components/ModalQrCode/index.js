import { View, ImageBackground } from 'react-native';
import { strings } from '../../Locales/i18n';
import { captureRef } from "react-native-view-shot";
import { useRef } from 'react';
import { 
	Container, 
	ContainerModal, 
	ContainerPoster, 
	ContainerQrCode,
	QrCodeHeader,
	QrCodeBody,
	QrCodeBackGround,
	QrCodeFooter,
	ButtonShare,
	TextButtonShare,
	Title, 
	TextHeader,
	TextFooter
} from './styles';
import QRCode from 'react-native-qrcode-svg';
import Close from 'react-native-vector-icons/AntDesign';
import Share from 'react-native-share';

const ModalQrCode = ({isVisible, qrCodeText, shareQrCode, projectName}) => {

	const ref = useRef();
	const onCapture = () => {
		captureRef(ref, {
			format: "jpg",
			fileName: `qrcode_${projectName}-`,
			quality: 0.9,
		}).then(uri => {
			Share.open({
				message: strings('indication.join_our_app'),
				url: uri,
				title: strings('indication.join_our_app'),
			}).catch(error => handleException('ModalQrCode.onCapture.Share', error));
		}).catch(error => handleException('ModalQrCode.onCApture.captureRef', error));
	};

	return (
		<ContainerModal
			animationType="fade"
			transparent={false}
			style={{backgroundColor: '#FFFFFF50'}}
			visible={isVisible}
			onRequestClose={() => {
				shareQrCode(!isVisible);
			}}
			backdropOpacity={1}
			backdropColor="#FBFBFB"
			useNativeDriver>
			<Container>
				<Close
					name="close"
					size={25}
					color="#000"
					onPress={() =>
						shareQrCode(!isVisible)
					}
				/>
				<Title>
					{strings('indication.share_referralcode')}
				</Title>

				<ContainerPoster ref={ref}>
					<ImageBackground
						resizeMode={"contain"}
						source={images.splash_full}
						blurRadius={5}
						borderRadius={5}
						style={{ width: '100%', height: '100%'}}>
						<ContainerQrCode>
							<QrCodeHeader>
								<TextHeader>Header</TextHeader>
							</QrCodeHeader>
							<QrCodeBody>
								<QrCodeBackGround>
									<QRCode
										value={qrCodeText}
										size={200}
										logoBackgroundColor='transparent'/>
								</QrCodeBackGround>
							</QrCodeBody>
							<QrCodeFooter>
								<TextFooter>footer</TextFooter>
							</QrCodeFooter>
						</ContainerQrCode>
					</ImageBackground>
				</ContainerPoster>
				
				<View>
					<ButtonShare
						onPress={() => onCapture()}>
						<TextButtonShare>{strings('indication.share')}</TextButtonShare>
					</ButtonShare>
				</View>
			</Container>
		</ContainerModal>
	);
};

export default ModalQrCode;
