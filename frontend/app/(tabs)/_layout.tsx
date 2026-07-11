import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#121212', borderTopWidth: 0 },
        tabBarActiveTintColor: '#14C38E', // Green highlight
        tabBarInactiveTintColor: '#888888',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="add-spot"
        options={{
          title: 'Add Spot',
        }}
      />
    </Tabs>
  );
}
