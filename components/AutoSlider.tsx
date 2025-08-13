import  { useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

interface AutoSliderProps {
  images: any[];
  autoPlayInterval?: number;
}

const AutoSlider: React.FC<AutoSliderProps> = ({ 
  images, 
  autoPlayInterval = 3000 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ width: width - 16, height: 208 }}>
      <Image
        source={item}
        style={{ 
          width: '100%', 
          height: '100%',
          borderRadius: 12,
        }}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View className="h-52 w-full mb-4">
      <Carousel
        data={images}
        renderItem={renderItem}
        width={width - 16}
        height={208}
        autoPlay={true}
        autoPlayInterval={autoPlayInterval}
        loop={true}
        onSnapToItem={setActiveIndex}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 0,
        }}
      />
      
      {/* Pagination Dots */}
      <View className="absolute -bottom-6 left-0 right-0 flex-row justify-center">
        {images.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === activeIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default AutoSlider;
