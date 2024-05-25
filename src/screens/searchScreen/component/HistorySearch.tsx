import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IconClose from '@/assets/icons/IconClose'

type HistorySearchProps = {
    titleSearch: string,
    timeHistory?: string,   
    onPressSearch?: () => void,
    onPressDelete?: () => void,
}
const HistorySearch:React.FC<HistorySearchProps> = ({titleSearch, timeHistory, onPressSearch, onPressDelete}) => {
  return (
    <View style = {styles.Container}>
        <TouchableOpacity style = {styles.TitleSearchContainer} onPress={onPressSearch}>
            <Text style = {styles.TitleSearch}>{titleSearch}</Text>
            <Text style = {styles.TimeHistory}>{timeHistory}</Text>
        </TouchableOpacity>
      <TouchableOpacity style = {styles.ButtonDelete} onPress={onPressDelete}>
        <IconClose />
      </TouchableOpacity>
    </View>
  )
}

export default HistorySearch

const styles = StyleSheet.create({
    TimeHistory:{
        marginTop: 4,
        fontSize: 12,
        lineHeight: 14,
        fontFamily: 'Roboto',
        color: '#9F9F9F',
    },
    TitleSearchContainer:{
        width: '70%',
        justifyContent: 'center',
        height: 30,

    },
    ButtonDelete:{
        height: 30,
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '30%',
        
    },
    TitleSearch:{
        fontSize: 16,
        lineHeight: 18,
        fontFamily: 'Roboto',
        color: '#000000',
    },
    Container:{
        paddingVertical: 16,
        marginVertical: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})