import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { colors } from '@/theme';
import { useTranslation } from 'react-i18next';

interface CheckboxProps {
    label?: string;
    initialChecked?: boolean;
    onCheckChange?: (isChecked: boolean) => void;
    onValueChange?: (value: string) => void;
}

const Checkbox2: React.FC<CheckboxProps> = ({ label, initialChecked = false, onCheckChange,onValueChange }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);
    const {t} = useTranslation();

    const toggleCheckbox = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        if (onCheckChange) {
            onCheckChange(newState);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container} onPress={toggleCheckbox}>
                <FontAwesomeIcon color={colors.purple} icon={isChecked ? faCheckSquare : faSquare} size={24} />
                {label && <Text style={styles.label}>{label}</Text>}
            </TouchableOpacity>
                <Text style={{ color: colors.purple, fontSize: 14, fontWeight: '500', marginTop:20 }}>{t(" Terms, & Policy")}</Text>
        </View>
    );
};

export default Checkbox2;

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