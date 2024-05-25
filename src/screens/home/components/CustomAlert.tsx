import { colors } from '@/theme';
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useTranslation } from 'react-i18next';

interface CustomAlertProps {
    visible: boolean;
    title: string;
    avatar: string | null;
    onClose: () => void;

}

const CustomAlert: React.FC<CustomAlertProps> = ({ visible, title, onClose, avatar }) => {
    const {t} = useTranslation();
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {avatar && <Image style={styles.imgCar} source={{uri:avatar}} />}
                    <Text style={styles.modalText}>{t('Block')} @{title}</Text>
                    <Text style={styles.modalText2}>@{title} {t('will no longer be able to follow or reply you, and you will not see notifications from')} @{title}</Text>
                    <View style={{ width: 290, height: 1, borderWidth: 0.1, backgroundColor: "#E3E3E3", marginTop: 210,position:"absolute" }} />
                    <View style={styles.containerBtn}>
                        <TouchableOpacity style={styles.btnBlock} onPress={onClose} >
                            <Text style={styles.btnCancel}>{t('Cancel')}</Text>
                        </TouchableOpacity>
                        <View style={{ width: 1, height: 62, borderWidth: 0.1, backgroundColor: "#E3E3E3" }} />
                        <TouchableOpacity style={styles.btnBlock} onPress={onClose}>
                            <Text style={styles.textStyle}>{t('Block')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default React.memo(CustomAlert);

const styles = StyleSheet.create({
    btnCancel: {
        width: 43,
        height: 19,
        justifyContent: "center",
        alignItems: "center",
        color: colors.newtral2
    },
    btnBlock: {
        width: 144,
        height: 62,
        justifyContent: "center",
        alignItems: "center",
    },
    containerBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 290,
        height: 51,
        position: "absolute",
        marginTop: 210
    },
    modalText2: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: "400",
        color: colors.newtral2
    },
    imgCar: {
        width: 64,
        height: 64,
        borderRadius: 60,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',

    },
    modalView: {
        borderTopWidth: 7,
        borderTopColor: colors.purple,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 290,
        height: 280
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: colors.red,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 40,
        height: 19,
        justifyContent: "center",
    },
    modalText: {
        marginTop: 12,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "600",
        color: colors.black
    },
});

