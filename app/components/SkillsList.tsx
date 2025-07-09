import React from 'react';
import { View, Text } from 'react-native';

interface SkillsListProps {
  skills: string[];
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
  return (
    <View className="flex-row flex-wrap mt-3 -ml-1">
      {skills.map((skill, i) => (
        <View 
          key={i} 
          className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 m-1"
        >
          <Text className="text-gray-700 text-sm font-medium">
            {skill}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default SkillsList;