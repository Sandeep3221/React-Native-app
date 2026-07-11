import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

const categories = ['All', 'Cafes', 'Momo Spots', 'Viewpoints', 'Secret Spots'];

const mockFeatured = [
  { id: '1', title: 'Hidden Waterfall', category: 'Secret Spots', image: 'https://images.unsplash.com/photo-1432405972618-c60002a157c6', rating: 4.8, distance: '2.5 km' },
  { id: '2', title: 'Mountain View Cafe', category: 'Cafes', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24', rating: 4.5, distance: '1.2 km' },
];

const mockStream = [
  { id: '3', title: 'Spicy Momo Stall', category: 'Momo Spots', image: 'https://images.unsplash.com/photo-1626804475297-4160cb462fff', rating: 4.9, distance: '0.8 km' },
  { id: '4', title: 'Sunset Point', category: 'Viewpoints', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', rating: 4.7, distance: '5.0 km' },
];

export default function ExploreScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryPill}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderFeatured = ({ item }) => (
    <TouchableOpacity style={styles.featuredCard} onPress={() => router.push(`/place/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDetails}>★ {item.rating} • {item.distance}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderStreamItem = ({ item }) => (
    <TouchableOpacity style={styles.streamCard} onPress={() => router.push(`/place/${item.id}`)}>
      <Image source={{ uri: item.image }} style={styles.streamImage} />
      <View style={styles.streamInfo}>
        <Text style={styles.streamTitle}>{item.title}</Text>
        <Text style={styles.streamCategory}>{item.category}</Text>
        <Text style={styles.streamDetails}>★ {item.rating} • {item.distance}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockStream}
        keyExtractor={item => item.id}
        renderItem={renderStreamItem}
        contentContainerStyle={styles.streamContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#14C38E" />}
        ListHeaderComponent={
          <>
            <View style={styles.categoriesContainer}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={item => item}
                renderItem={renderCategory}
              />
            </View>
            <Text style={styles.sectionTitle}>Featured Gems</Text>
            <View style={styles.featuredContainer}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={mockFeatured}
                keyExtractor={item => item.id}
                renderItem={renderFeatured}
              />
            </View>
            <Text style={styles.sectionTitle}>Community Stream</Text>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  categoriesContainer: { paddingVertical: 15, paddingHorizontal: 10 },
  categoryPill: { backgroundColor: '#222', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, marginHorizontal: 5 },
  categoryText: { color: '#fff', fontWeight: '600' },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10, marginBottom: 15 },
  featuredContainer: { paddingLeft: 10, marginBottom: 20 },
  featuredCard: { width: 280, height: 200, marginHorizontal: 5, borderRadius: 15, overflow: 'hidden' },
  featuredImage: { width: '100%', height: '100%' },
  cardOverlay: { position: 'absolute', bottom: 0, width: '100%', padding: 15, backgroundColor: 'rgba(0,0,0,0.6)' },
  cardCategory: { color: '#14C38E', fontWeight: 'bold', fontSize: 12, marginBottom: 4 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  cardDetails: { color: '#bbb', fontSize: 12 },
  streamContainer: { paddingBottom: 20 },
  streamCard: { flexDirection: 'row', backgroundColor: '#1c1c1c', marginHorizontal: 15, marginBottom: 15, borderRadius: 12, overflow: 'hidden' },
  streamImage: { width: 100, height: 100 },
  streamInfo: { padding: 15, flex: 1, justifyContent: 'center' },
  streamTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  streamCategory: { color: '#14C38E', fontSize: 12, marginBottom: 6 },
  streamDetails: { color: '#bbb', fontSize: 12 },
});
