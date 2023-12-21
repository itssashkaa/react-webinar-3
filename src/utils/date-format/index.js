const initDateOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric', 
};

const initTimeOptions = {
    hour: 'numeric', 
    minute: 'numeric' 
};

export default function dateFormat (date, locale='ru-RU', optionsDate = initDateOptions, optionsTime = initTimeOptions) {
    const originalDate = new Date(date)
    const formattedDate = originalDate.toLocaleDateString(locale, optionsDate);
    const formattedTime = originalDate.toLocaleTimeString(locale, optionsTime);

    return `${formattedDate} в ${formattedTime}`;
}