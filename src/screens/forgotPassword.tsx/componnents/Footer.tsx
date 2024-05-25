import {colors} from '@/theme';
import React, {useState, useEffect, FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

interface FooterProps {
  resendOTP: () => void;
}

const Footer: FC<FooterProps> = ({resendOTP}) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isWaiting, setIsWaiting] = useState(true);
  const {t} = useTranslation();

  useEffect(() => {
    if (!isWaiting) return;

    if (timeLeft === 0) {
      setIsWaiting(false);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, isWaiting]);

  const handleResendClick = () => {
    setTimeLeft(60);
    setIsWaiting(true);
    resendOTP();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t("Didn't receive email?")}</Text>
      {isWaiting ? (
        <Text style={styles.text2}>
          {t("You can resend code in")} <Text style={styles.time}>{timeLeft}</Text> s
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResendClick}>
          <Text style={styles.resendText}>{t("Resend again")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontWeight: '500',
  },
  text2: {
    color: colors.black,
    fontWeight: '500',
  },
  time: {
    color: colors.purple,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  resendText: {
    color: 'blue',
  },
});
