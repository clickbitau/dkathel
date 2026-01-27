import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  try {
    let messages;
    if (locale === 'en') {
      messages = (await import(`../messages/en`)).default;
    } else if (locale === 'bn') {
      messages = (await import(`../messages/bn`)).default;
    } else {
      messages = (await import(`../messages/en`)).default;
    }
    
    return {
      locale: locale || 'en',
      messages
    };
  } catch (error) {
    console.error('Failed to load messages in i18n config:', error);
    return {
      locale: locale || 'en',
      messages: {}
    };
  }
});