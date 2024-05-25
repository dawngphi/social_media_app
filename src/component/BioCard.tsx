import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { text } from '@fortawesome/fontawesome-svg-core';
interface BioCardProps {
    title: string
}

const BioCard: React.FC<BioCardProps> = ({title}) => {
    const [numberText, setNumberText] = useState('');
    const ClearText = () => {
        setNumberText('');
    }
    const handleTextChange = (text:string) => {
        const MAX_CHARS_PER_LINE = 230; // Giới hạn số ký tự trên mỗi dòng
        const lines = text.split('\n');
        let newText = lines.map((line) => {
          if (line.length > MAX_CHARS_PER_LINE) {
            // Cắt bớt ký tự nếu vượt quá giới hạn
            return line.substring(0, MAX_CHARS_PER_LINE);
          }
          return line;
        }).join('\n');
    
        setNumberText(newText);
      };
  return (
    <View style = {styles.Container}>
        <View style = {styles.TitleContainer}>
            <Text style = {styles.Title}>{title}</Text>
            <TouchableOpacity onPress={ClearText}>
                {numberText.length > 0 && <FontAwesomeIcon icon={ faCircleXmark } size={15} color="#000"/>}
            </TouchableOpacity>
        </View> 
        <TextInput 
            placeholder="Write a bio..." 
            style = {styles.TextInputStyle} 
            keyboardType='default' 
            multiline={true}
            value={numberText}
            onChangeText={handleTextChange}
            maxLength={230}/>
        <Text style = {styles.NumberTextStyle}>{numberText.length}/230</Text>
    </View>
  )
}

export default BioCard

const styles = StyleSheet.create({
    NumberTextStyle:{
        fontSize: 12,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#000',
        textAlign: 'right',
        marginTop: 20,
    },
    TextInputStyle:{
        color: '#000',
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: '400',
    },
    Title:{
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#000',
    },
    TitleContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Container:{
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#C8C8C8',
        backgroundColor: 'white',
        marginTop: 26,
    },
})