import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Platform, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Mock data mapping
const spotData = {
  '1': { title: 'Hidden Waterfall', category: 'Secret Spots', desc: '"Tucked away behind the old ruins, this waterfall is a perfect peaceful escape. The water is crystal clear and freezing cold!"', images: ['https://images.unsplash.com/photo-1432405972618-c60002a157c6'], lat: 34.0522, lng: -118.2437 },
  '2': { title: 'Mountain View Cafe', category: 'Cafes', desc: '"Best pour-over coffee I have had in the hills. The altitude makes it taste different. Get there before 9am for the best lighting."', images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24'], lat: 34.0522, lng: -118.2437 },
  '3': { title: 'Spicy Momo Stall', category: 'Momo Spots', desc: '"This stall has no name, but the fiery red chutney they serve with the steamed chicken momos will blow your mind."', images: ['https://images.unsplash.com/photo-1626804475297-4160cb462fff'], lat: 34.0522, lng: -118.2437 },
  '4': { title: 'Sunset Point', category: 'Viewpoints', desc: '"You have to hike up about 20 minutes from the parking lot, but the panoramic sunset view over the valley is unmatched."', images: ['https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'], lat: 34.0522, lng: -118.2437 },
};

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const spot = spotData[id];

  if (!spot) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Spot not found.</Text>
      </View>
    );
  }

  const openMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${spot.lat},${spot.lng}`;
    const label = spot.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Top Section: Image Swiper */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.swiper}>
          {spot.images.map((img, idx) => (
            <Image key={idx} source={{ uri: img }} style={styles.swiperImage} />
          ))}
        </ScrollView>

        <View style={styles.content}>
          {/* Middle Section: Title, Category, Description */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>{spot.title}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{spot.category}</Text>
            </View>
          </View>
          
          <View style={styles.blockquote}>
            <Text style={styles.quoteText}>{spot.desc}</Text>
          </View>

          {/* Map Button */}
          <TouchableOpacity style={styles.mapBtn} onPress={openMap}>
            <Text style={styles.mapBtnText}>🗺️ View on Map</Text>
          </TouchableOpacity>

          {/* Reviews List Placeholder */}
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Community Reviews</Text>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewRating}>★★★★★</Text>
              <Text style={styles.reviewText}>Absolutely loved this place! Highly recommend visiting.</Text>
              <Text style={styles.reviewAuthor}>- User123</Text>
            </View>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewRating}>★★★★☆</Text>
              <Text style={styles.reviewText}>Great spot, but parking is a bit difficult to find.</Text>
              <Text style={styles.reviewAuthor}>- Explorer007</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#fff', fontSize: 18 },
  scrollContent: { paddingBottom: 40 },
  swiper: { height: 300, width: '100%' },
  swiperImage: { width: 400, height: 300, resizeMode: 'cover' }, // 400 is approx screen width, but flex usually handles it better
  content: { padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', flex: 1, marginRight: 10 },
  categoryBadge: { backgroundColor: '#14C38E20', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#14C38E' },
  categoryText: { color: '#14C38E', fontWeight: 'bold', fontSize: 12 },
  blockquote: { borderLeftWidth: 4, borderLeftColor: '#14C38E', paddingLeft: 15, marginBottom: 25 },
  quoteText: { color: '#ccc', fontSize: 16, fontStyle: 'italic', lineHeight: 24 },
  mapBtn: { backgroundColor: '#222', padding: 18, borderRadius: 10, alignItems: 'center', marginBottom: 30, borderWidth: 1, borderColor: '#444' },
  mapBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  reviewsSection: { marginTop: 10 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  reviewCard: { backgroundColor: '#1c1c1c', padding: 15, borderRadius: 10, marginBottom: 10 },
  reviewRating: { color: '#FFD700', fontSize: 16, marginBottom: 5 },
  reviewText: { color: '#ddd', fontSize: 14, marginBottom: 8, lineHeight: 20 },
  reviewAuthor: { color: '#888', fontSize: 12, fontWeight: 'bold' },
});
