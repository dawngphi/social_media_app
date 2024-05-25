import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface OtpInputProps {
  onOtpComplete: (otp: string) => void;
  resetFlag: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({onOtpComplete, resetFlag}) => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>(new Array(4).fill(null));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resetFlag) {
      setOtp(new Array(4).fill(''));
      inputRefs.current[0]?.focus();
    }
  }, [resetFlag]);

  const focusNextInput = (index: number) => {
    if (index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const focusPreviousInput = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text) {
      focusNextInput(index);
    }

    if (newOtp.every(item => item !== '')) {
      onOtpComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index]) {
      focusPreviousInput(index - 1);
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.otpBox}
          keyboardType="numeric"
          maxLength={1}
          onKeyPress={e => handleKeyPress(e, index)}
          value={value}
          onChangeText={text => handleChange(text, index)}
          ref={ref => {
            inputRefs.current[index] = ref;
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 40,
  },
  otpBox: {
    width: 55,
    height: 55,
    textAlign: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
});

export default OtpInput;
