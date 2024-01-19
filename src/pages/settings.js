// import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from '../sections/settings/settings-notifications';
import { SettingsPassword } from '../sections/settings/settings-password';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { SettingDetails } from '../sections/settings/settings-details';

const Settings = () => (
  <>
    {/* <Head>
      <title>
        Settings | Devias Kit
      </title>
    </Head> */}
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Settings
          </Typography>
          <SettingDetails />
          {/* <SettingsNotifications /> */}
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
);

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;
