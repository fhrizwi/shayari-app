// Poet data with their information and categories
export interface Poet {
  id: string;
  name: string;
  image: any;
  description: string;
  categories: string[];
}

export const poetData: Poet[] = [
  {
    id: '1',
    name: 'Rahat Indori',
    image: require('../assets/cards/rahatindori.webp'),
    description: 'Famous for his revolutionary and romantic poetry',
    categories: ['Love', 'Revolution', 'Life', 'Society']
  },
  {
    id: '2',
    name: 'Mirza Ghalib',
    image: require('../assets/cards/mirzagalib.webp'),
    description: 'The greatest Urdu poet of all time',
    categories: ['Love', 'Philosophy', 'Life', 'Pain']
  },
  {
    id: '3',
    name: 'Allama Iqbal',
    image: require('../assets/cards/allamaiqbal.jpeg'),
    description: 'Poet-philosopher and spiritual leader',
    categories: ['Spirituality', 'Nation', 'Philosophy', 'Motivation']
  },
  {
    id: '4',
    name: 'Faiz Ahmed Faiz',
    image: require('../assets/cards/faizahmedfaiz.jpg'),
    description: 'Revolutionary poet and social activist',
    categories: ['Revolution', 'Love', 'Freedom', 'Society']
  },
  {
    id: '5',
    name: 'Ahmad Faraz',
    image: require('../assets/cards/ahmadfaraz.webp'),
    description: 'Master of romantic and revolutionary poetry',
    categories: ['Love', 'Romance', 'Pain', 'Life']
  },
  {
    id: '6',
    name: 'Mir Taqi Mir',
    image: require('../assets/cards/mirtaqimir.jpg'),
    description: 'Pioneer of Urdu ghazal',
    categories: ['Love', 'Pain', 'Life', 'Philosophy']
  },
  {
    id: '7',
    name: 'Majrooh Sultanpuri',
    image: require('../assets/cards/majroohsultanpuri.jpeg'),
    description: 'Renowned lyricist and poet',
    categories: ['Love', 'Romance', 'Life', 'Dreams']
  },
  {
    id: '8',
    name: 'Sahir Ludhianvi',
    image: require('../assets/cards/sahirludhianvi.webp'),
    description: 'Progressive poet and lyricist',
    categories: ['Love', 'Society', 'Revolution', 'Life']
  },
  {
    id: '9',
    name: 'Parveen Shakir',
    image: require('../assets/cards/parveenshakir.jpg'),
    description: 'Leading female Urdu poet',
    categories: ['Love', 'Feminism', 'Life', 'Emotions']
  },
  {
    id: '10',
    name: 'Jigar Moradabadi',
    image: require('../assets/cards/jigarmoradabadi.jpg'),
    description: 'Master of classical Urdu poetry',
    categories: ['Love', 'Classical', 'Life', 'Beauty']
  },
  {
    id: '11',
    name: 'Josh Malihabadi',
    image: require('../assets/cards/joshmalihabadi.jpg'),
    description: 'Fiery poet known for his passionate verses',
    categories: ['Passion', 'Revolution', 'Love', 'Nation']
  },
  {
    id: '12',
    name: 'Bashir Badr',
    image: require('../assets/cards/bashirbadr.png'),
    description: 'Contemporary master of ghazal',
    categories: ['Love', 'Life', 'Philosophy', 'Modern']
  },
  {
    id: '13',
    name: 'Harivansh Rai Bachchan',
    image: require('../assets/cards/harivanshraibachchan.jpeg'),
    description: 'Legendary Hindi poet',
    categories: ['Life', 'Philosophy', 'Motivation', 'Hope']
  },
  {
    id: '14',
    name: 'Ramdhari Singh Dinkar',
    image: require('../assets/cards/ramdharisinghdinkar.jpg'),
    description: 'National poet of India',
    categories: ['Nation', 'Courage', 'Revolution', 'Motivation']
  },
  {
    id: '15',
    name: 'Kumar Vishwas',
    image: require('../assets/cards/kumarvishwas.jpg'),
    description: 'Contemporary Hindi poet and politician',
    categories: ['Love', 'Modern', 'Life', 'Romance']
  },
  {
    id: '16',
    name: 'Rumi',
    image: require('../assets/cards/rumi.jpg'),
    description: 'Sufi mystic and poet',
    categories: ['Spirituality', 'Love', 'Philosophy', 'Mysticism']
  },
  {
    id: '17',
    name: 'Hafiz',
    image: require('../assets/cards/hafiz.jpeg'),
    description: 'Persian lyric poet',
    categories: ['Love', 'Spirituality', 'Wine', 'Philosophy']
  },
  {
    id: '18',
    name: 'Omar Khayyam',
    image: require('../assets/cards/omarkhayyam.webp'),
    description: 'Persian mathematician and poet',
    categories: ['Philosophy', 'Life', 'Wine', 'Time']
  },
  {
    id: '19',
    name: 'Bulleh Shah',
    image: require('../assets/cards/bullehshah.jpg'),
    description: 'Punjabi Sufi poet',
    categories: ['Spirituality', 'Sufi', 'Philosophy', 'Divine']
  },
  {
    id: '20',
    name: 'Pablo Neruda',
    image: require('../assets/cards/pabloneruda.jpg'),
    description: 'Chilean poet and Nobel laureate',
    categories: ['Love', 'Nature', 'Politics', 'Romance']
  }
];

// Sample shayari data for each poet and category
export const poetShayariData: Record<string, Record<string, string[]>> = {
  'Rahat Indori': {
    'Love': [
      'इश्क़ में हम तुम्हें क्या देंगे राहत,\nहमारे पास दिल के सिवा कुछ भी नहीं।',
      'मोहब्बत में नहीं है कोई तर्क राहत,\nयहाँ पर दिल की सुनते हैं, दिमाग की नहीं।',
      'कभी फुर्सत मिले तो आइएगा हमारे घर,\nहमें भी देखिए कि हम कितने अकेले हैं।'
    ],
    'Revolution': [
      'सभी का खून है शामिल यहाँ की मिट्टी में,\nकिसी के बाप का हिंदुस्तान थोड़ी है।',
      'उठो कि अब बहुत सो चुके हैं हम,\nवक्त आ गया है जागने का।',
      'जो वादा किया था निभाना पड़ेगा,\nये वक्त का तकाजा है राहत।'
    ],
    'Life': [
      'जिंदगी क्या है? एक कहानी है,\nकभी खुशी कभी परेशानी है।',
      'हर आदमी में एक बच्चा होता है,\nजो कभी कभी रो देता है।'
    ],
    'Society': [
      'समाज की बुराइयों से लड़ना होगा,\nसच्चाई के लिए खड़ा होना होगा।',
      'अन्याय के खिलाफ आवाज उठानी होगी,\nन्याय की लड़ाई लड़नी होगी।'
    ]
  },
  'Mirza Ghalib': {
    'Love': [
      'इश्क़ पर ज़ोर नहीं, है ये वो आतिश ग़ालिब,\nकि लगाए न लगे और बुझाए न बने।',
      'हुस्न और इश्क़ दोनों को रुसवा कर गए,\nहम वहाँ हैं जहाँ से हमको भी कुछ हमारा हाल मालूम नहीं।',
      'मोहब्बत में नहीं है फर्क जीने और मरने का,\nउसी को देख कर जीते हैं जिस काफिर पे मरते हैं।'
    ],
    'Philosophy': [
      'हज़ारों ख्वाहिशें ऐसी कि हर ख्वाहिश पे दम निकले,\nबहुत निकले मेरे अरमान लेकिन फिर भी कम निकले।',
      'न था कुछ तो खुदा था, कुछ न होता तो खुदा होता,\nडुबोया मुझको होने ने, न होता मैं तो क्या होता।',
      'दिल-ए-नादाँ तुझे हुआ क्या है,\nआखिर इस दर्द की दवा क्या है।'
    ],
    'Life': [
      'हुई मुद्दत कि ग़ालिब मर गया पर याद आता है,\nवो हर इक बात पर कहना कि यूँ होता तो क्या होता।',
      'कोई उम्मीद बर नहीं आती,\nकोई सूरत नज़र नहीं आती।'
    ],
    'Pain': [
      'ग़म-ए-हस्ती का असद किस से हो जुज़ मर्ग इलाज,\nशम्मा हर रंग में जलती है सहर होने तक।',
      'दर्द मिन्नत-कश-ए-दवा न हुआ,\nमैं न अच्छा हुआ न बुरा हुआ।'
    ]
  },
  'Allama Iqbal': {
    'Spirituality': [
      'खुदी को कर बुलंद इतना कि हर तकदीर से पहले,\nखुदा बंदे से खुद पूछे बता तेरी रज़ा क्या है।',
      'तू शाहीन है परवाज़ है काम तेरा,\nतेरे सामने आसमान और भी हैं।'
    ],
    'Nation': [
      'सारे जहाँ से अच्छा हिंदोस्तां हमारा,\nहम बुलबुलें हैं इसकी ये गुलसितां हमारा।',
      'मज़हब नहीं सिखाता आपस में बैर रखना,\nहिंदी हैं हम वतन है हिंदोस्तां हमारा।'
    ]
  },
  'Faiz Ahmed Faiz': {
    'Revolution': [
      'बोल कि लब आज़ाद हैं तेरे,\nबोल ज़बान अब तक तेरी है।',
      'हम देखेंगे लाज़िम है कि हम भी देखेंगे,\nवो दिन कि जिसका वादा है।'
    ],
    'Love': [
      'मुझ से पहली सी मोहब्बत मेरे महबूब न माँग,\nमैंने समझा था कि तू है तो दरख्शां है हयात।',
      'और भी दुख हैं ज़माने में मोहब्बत के सिवा,\nराहतें और भी हैं वस्ल की राहत के सिवा।'
    ]
  }
};