import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { colors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStackEnum, LoginStackParamList } from '@/navigation/login';
import reduxStorage from '@/redux/store/reduxStorage';
import { useTranslation } from 'react-i18next';

interface CheckboxProps {
    label?: string;
    initialChecked?: boolean;
    onCheckChange?: (isChecked: boolean) => void;
    email?: string;
    password?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, initialChecked = false, onCheckChange, email, password }) => {
    const navigation = useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
    const [isChecked, setIsChecked] = useState(initialChecked);
    const {t} = useTranslation();
    useEffect(() => {
        setIsChecked(initialChecked);
    }, [initialChecked]);
    const toggleCheckbox = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        if (onCheckChange) {
            onCheckChange(newState);
        }
        if(newState) {
            reduxStorage.setItem('email', email);
            reduxStorage.setItem('password', password);
            reduxStorage.setItem('rememberMe', 'true'); 
        } else {
            reduxStorage.removeItem('email');
            reduxStorage.removeItem('password');
            reduxStorage.setItem('rememberMe', 'false');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container} onPress={toggleCheckbox}>
                <FontAwesomeIcon color={colors.purple} icon={isChecked ? faCheckSquare : faSquare} size={24} />
                {label && <Text style={styles.label}>{label}</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(LoginStackEnum.ForgotPass)}>
                <Text style={{ color: colors.purple, fontSize: 14, fontWeight: '500', marginLeft: 124, marginTop:20 }}>{t("Forgot password?")}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Checkbox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    label: {
        marginLeft: 15,
        fontSize: 14,
        fontWeight: '500',
        color: colors.black,
    },
});