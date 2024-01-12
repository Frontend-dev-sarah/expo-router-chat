import UserProvider, { UserContext } from '@/context/UserContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';

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

  if (!loaded) {
    return null;
  }

  return <UserProvider>
    <RootLayoutNav />
  </UserProvider>
}

function RootLayoutNav() {
  const router = useRouter()
  const { currentUser, isLoading } = useContext(UserContext);



  useEffect(() => {
    if (currentUser) {
      router.push('/home/home')
    }
  }, [currentUser])

  if (isLoading) {
    return <ActivityIndicator />;
  }

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
      <Stack.Screen name='home/home' options={{
        title: "Home",
      }} />
      <Stack.Screen name='chat/index'
        options={{
          title: "Chat",
          headerLeft: () => <Entypo.Button
            onPress={() => router.push('/home/home')}
            name="home" color='#f57c00'
            backgroundColor={'#fff'}
          />
        }} />

    </Stack>

  );
}
