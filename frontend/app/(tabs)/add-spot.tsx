import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function AddSpotScreen() {
  const [title, setTitle] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);

  const pickImage = async () => {
    if (images.length >= 3) {
      Alert.alert('Limit Reached', 'You can only upload up to 3 photos.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const pinLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation({
      lat: loc.coords.latitude.toFixed(5),
      lng: loc.coords.longitude.toFixed(5),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Share a Hidden Gem</Text>

        <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImage}>
          <Text style={styles.imagePickerText}>+ Select Photos (Max 3)</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.thumbnail} />
          ))}
        </ScrollView>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} placeholder="e.g. Secret Rooftop Cafe" placeholderTextColor="#666" value={title} onChangeText={setTitle} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Type</Text>
          <TextInput style={styles.input} placeholder="e.g. Cafe, Viewpoint..." placeholderTextColor="#666" value={serviceType} onChangeText={setServiceType} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Personal Description</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="What makes this place special?" placeholderTextColor="#666" multiline numberOfLines={4} value={description} onChangeText={setDescription} />
        </View>

        <TouchableOpacity style={[styles.locationBtn, location && styles.locationBtnSuccess]} onPress={pinLocation}>
          <Text style={styles.locationBtnText}>
            {location ? `✓ Location Pinned (Lat: ${location.lat}, Lng: ${location.lng})` : '📍 Pin My Current Location'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Publish Gem</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  scrollContent: { padding: 20 },
  header: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  imagePickerBtn: { width: '100%', height: 100, borderWidth: 2, borderColor: '#333', borderStyle: 'dashed', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  imagePickerText: { color: '#888', fontSize: 16, fontWeight: '600' },
  imageScroll: { marginBottom: 20, flexDirection: 'row' },
  thumbnail: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  inputGroup: { marginBottom: 20 },
  label: { color: '#ccc', marginBottom: 8, fontSize: 14, fontWeight: '600' },
  input: { backgroundColor: '#1c1c1c', color: '#fff', padding: 15, borderRadius: 10, fontSize: 16 },
  textArea: { height: 120, textAlignVertical: 'top' },
  locationBtn: { backgroundColor: '#333', padding: 18, borderRadius: 10, alignItems: 'center', marginBottom: 30 },
  locationBtnSuccess: { backgroundColor: '#14C38E' },
  locationBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  submitBtn: { backgroundColor: '#14C38E', padding: 18, borderRadius: 10, alignItems: 'center' },
  submitBtnText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
});
