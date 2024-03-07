import { Button, Box, Tabs } from '@rocket.chat/fuselage';
import '@rocket.chat/fuselage-polyfills';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DOWNLOADS_BACK_BUTTON_CLICKED } from '../../actions';
import { dispatch } from '../../../store';

import type { RootState } from '../../../store/rootReducer';
import { CertificatesTab } from './CertificatesTab';
import { GeneralTab } from './GeneralTab';

export const SettingsView = () => {
  const isVisible = useSelector(
    ({ currentView }: RootState) => currentView === 'settings'
  );
  const { t } = useTranslation();

  const [currentTab, setCurrentTab] = useState('general');

  const lastSelectedServerUrl = useSelector(
    ({ lastSelectedServerUrl }: RootState) => lastSelectedServerUrl
  );

  const handleBackSettingsClick = (): void => {
    dispatch({ type: DOWNLOADS_BACK_BUTTON_CLICKED, payload: lastSelectedServerUrl });
  };

  return (
    <Box
      display={isVisible ? 'flex' : 'none'}
      flexDirection='column'
      height='full'
      backgroundColor='light'
      justifyContent='space-between'
    >
      <Box
        width='full'
        padding={24}
        display='flex'
        flexDirection='row'
        flexWrap='nowrap'
        color='default'
        fontScale='h1'
        justifyContent='space-between'
      >
        <Box is='div' color='default' fontScale='h1'>
          {t('settings.title')}
        </Box>
        <Button
          type='submit'
          primary
          onClick={handleBackSettingsClick}
          >
            Back
        </Button>
      </Box>

      <Tabs>
        <Tabs.Item
          selected={currentTab === 'general'}
          onClick={() => setCurrentTab('general')}
        >
          {t('settings.general')}
        </Tabs.Item>
        <Tabs.Item
          selected={currentTab === 'certificates'}
          onClick={() => setCurrentTab('certificates')}
        >
          {t('settings.certificates')}
        </Tabs.Item>
      </Tabs>
      <Box m='x24' overflowY='auto'>
        {(currentTab === 'general' && <GeneralTab />) ||
          (currentTab === 'certificates' && <CertificatesTab />)}
      </Box>
    </Box>
  );
};
