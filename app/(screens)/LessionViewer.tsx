import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

const resourceData = {
  frontend: [
    {
      id: '1',
      type: 'tutorial',
      title: 'React Official Tutorial',
      source: 'reactjs.org',
      url: 'https://reactjs.org/tutorial/tutorial.html'
    },
    {
      id: '2',
      type: 'video',
      title: 'CSS Flexbox in 20 Minutes',
      source: 'YouTube',
      url: 'https://youtube.com/watch?v=JJSoEo8JSnc'
    },
    {
      id: '3',
      type: 'article',
      title: 'JavaScript ES6 Features',
      source: 'freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/es6-features/'
    }
  ],
  backend: [
    {
      id: '4',
      type: 'tutorial',
      title: 'Node.js Crash Course',
      source: 'Node.js Docs',
      url: 'https://nodejs.org/en/docs/guides/'
    }
  ],
  mobile: [
    {
      id: '5',
      type: 'tutorial',
      title: 'React Native Basics',
      source: 'reactnative.dev',
      url: 'https://reactnative.dev/docs/tutorial'
    }
  ]
};

const LearningHubScreen = () => {
  const resources =resourceData.frontend;
  const handlePress = (url: string) => {
    Linking.openURL(url).catch(() => {
      alert("Couldn't open the link");
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return 'youtube';
      case 'article': return 'book';
      default: return 'link';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Learning Resources
        </Text>
        
        {resources.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handlePress(item.url)}
            style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 8,
              marginBottom: 12,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather 
                name={getIcon(item.type)} 
                size={20} 
                color="#4f46e5" 
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.title}</Text>
                <Text style={{ color: '#6b7280', marginTop: 4 }}>{item.source}</Text>
              </View>
              <Feather name="external-link" size={18} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default LearningHubScreen;