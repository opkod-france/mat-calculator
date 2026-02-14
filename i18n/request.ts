import {getRequestConfig} from 'next-intl/server';
import {cookies, headers} from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  // 1. Check cookie first (user's explicit choice)
  let locale = cookieStore.get('locale')?.value;

  // 2. Fall back to Accept-Language header (browser preference)
  if (!locale) {
    const acceptLanguage = headerStore.get('accept-language') || '';
    locale = acceptLanguage.startsWith('fr') ? 'fr' : 'en';
  }

  // 3. Ensure valid locale
  if (locale !== 'fr' && locale !== 'en') {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
