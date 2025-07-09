import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, ImageBackground } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const resourceData = {
  frontend: [
    {
      id: '1',
      type: 'tutorial',
      title: 'React Official Tutorial',
      source: 'reactjs.org',
      url: 'https://reactjs.org/tutorial/tutorial.html',
      accent: '#61DAFB' // React blue
    },
    {
      id: '2',
      type: 'video',
      title: 'CSS Flexbox in 20 Minutes',
      source: 'YouTube',
      url: 'https://youtube.com/watch?v=JJSoEo8JSnc',
      accent: '#FF0000' // YouTube red
    },
    {
      id: '3',
      type: 'article',
      title: 'JavaScript ES6 Features',
      source: 'freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/es6-features/',
      accent: '#0A0A23' // freeCodeCamp navy
    }
  ],
  // ... other paths
};

const LearningHubScreen = () => {
  const resources = resourceData.frontend;

  const handlePress = (url: string) => {
    Linking.openURL(url).catch(() => {
      alert("Couldn't open the link");
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return 'youtube';
      case 'article': return 'book';
      default: return 'code';
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/image1.png')} 
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.03 }}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(248, 249, 250, 0.9)' }}>
        {/* Header */}
        <View style={{ 
          padding: 24, 
          backgroundColor: '#4f46e5',
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          marginBottom: 16
        }}>
          <Text style={{ 
            fontSize: 28, 
            fontWeight: 'bold', 
            color: 'white',
            marginBottom: 8
          }}>
            Learning Hub
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="category" size={20} color="white" />
            <Text style={{ color: 'white', marginLeft: 8 }}>Frontend Development</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {resources.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handlePress(item.url)}
              style={{
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
                elevation: 3,
                borderLeftWidth: 4,
                borderLeftColor: item.accent || '#4f46e5'
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: `${item.accent}20`,
                  padding: 10,
                  borderRadius: 12,
                  marginRight: 16
                }}>
                  <Feather 
                    name={getIcon(item.type)} 
                    size={20} 
                    color={item.accent || '#4f46e5'}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontWeight: '600', 
                    fontSize: 16,
                    color: '#1f2937'
                  }}>
                    {item.title}
                  </Text>
                  <Text style={{ 
                    color: '#6b7280', 
                    marginTop: 4,
                    fontSize: 12
                  }}>
                    {item.source}
                  </Text>
                </View>
                <Feather 
                  name="external-link" 
                  size={18} 
                  color="#9ca3af" 
                />
              </View>
            </TouchableOpacity>
          ))}

          {/* Decorative Footer Card */}
          <View style={{
            backgroundColor: '#eef2ff',
            padding: 20,
            borderRadius: 16,
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Feather name="bookmark" size={24} color="#4f46e5" />
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontWeight: '600', color: '#1e40af' }}>
                Save Resources
              </Text>
              <Text style={{ color: '#6b7280', marginTop: 4, fontSize: 12 }}>
                Bookmark your favorites to access later
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default LearningHubScreen;