import UserProvider, { UserContext } from '@/context/UserContext';
import { SplashScreen, Stack, useRouter, useRootNavigation } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { currentUser, isLoading } = useContext(UserContext);
  const router = useRouter()
  const rootNavigation = useRootNavigation();

  const [isNavigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', (event) => {
      setNavigationReady(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);


  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }
    if (!currentUser) {
      router.push('/(modals)/login')
    }
  }, [currentUser, isNavigationReady])

  if (!loaded) {
    return null;
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return <UserProvider>
    <RootLayoutNav />
  </UserProvider>
}

function RootLayoutNav() {
  const router = useRouter()

  return (
    <Stack>
      <Stack.Screen name='(modals)/login'
        options={{
          presentation: 'modal',
          title: "Login",
        }} />
      <Stack.Screen name='(modals)/signup'
        options={{
          presentation: 'modal',
          title: "Signup",
        }} />
      <Stack.Screen name='(home)/index' options={{
        title: "Home",
      }} />
      <Stack.Screen name='chat/index'
        options={{
          title: "Chat",
          headerLeft: () => <Entypo.Button
            onPress={() => router.push('/(home)/')}
            name="home" color='#f57c00'
            backgroundColor={'#fff'}
          />
        }} />
    </Stack>

  );
}
