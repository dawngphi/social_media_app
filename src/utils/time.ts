import moment from 'moment';
export function formatPostTime(postTime: Date,lang:string) {

// if (lang === 'vi') {
  // if (lang === 'en') {

  const currentTime = moment();
  const diffMinutes = currentTime.diff(postTime, 'minutes');
  const diffHours = currentTime.diff(postTime, 'hours');
  const diffDays = currentTime.diff(postTime, 'days');

  if (diffMinutes < 1) {
    return lang === 'vi' ? 'Vừa xong' : 'Just now';
  } else if (diffHours < 1) {
    return `${diffMinutes} ${lang === 'vi' ? 'phút trước' : 'minutes ago'}`;
  } else if (diffDays < 1) {
    return `${diffHours} ${lang === 'vi' ? 'giờ trước' : 'hours ago'}`;
  } else {
    const formattedTime = moment(postTime).format('DD/MM/YYYY');
    const formattedHour = moment(postTime).format('HH');
    const formattedMinute = moment(postTime).format('mm');
    return `${formattedTime} ${formattedHour}:${formattedMinute}`;
  }
}