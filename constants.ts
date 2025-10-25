import type { Destination, TribalItem } from './types';
import { IMAGES } from './assets';

export const DESTINATIONS: Destination[] = [
  {
    name: 'Chitrakote Falls',
    description: 'Known as the "Niagara of India," this majestic waterfall offers breathtaking views, especially during monsoon.',
    image: IMAGES.destinations.chitrakote,
    lat: 19.21,
    lon: 81.69,
  },
  {
    name: 'Bastar',
    description: 'Explore the heart of tribal Chhattisgarh, rich in unique culture, traditional art, and vibrant local markets.',
    image: IMAGES.destinations.bastar,
    lat: 19.07,
    lon: 82.03,
  },
  {
    name: 'Kanger Valley National Park',
    description: 'Home to stunning limestone caves, waterfalls, and diverse wildlife. A paradise for nature lovers and adventurers.',
    image: IMAGES.destinations.kanger,
    lat: 18.87,
    lon: 81.93,
  },
  {
    name: 'Mainpat',
    description: 'Often called the "Shimla of Chhattisgarh," Mainpat is a charming hill station with Tibetan refugee settlements.',
    image: IMAGES.destinations.mainpat,
    lat: 22.85,
    lon: 83.27,
  },
];

export const TRIBAL_ITEMS: TribalItem[] = [
  {
    name: 'Dhokra Art',
    description: 'A non-ferrous metal casting using the lost-wax technique. This ancient art form creates stunning figurines.',
    image: IMAGES.tribal.dhokra,
  },
  {
    name: 'Gond Painting',
    description: 'Vibrant paintings characterized by a sense of movement, dots, and lines, depicting nature and folklore.',
    image: IMAGES.tribal.gond,
  },
  {
    name: 'Bastar Dussehra',
    description: 'A unique 75-day festival, one of the longest in the world, celebrating Devi Danteshwari with unique rituals.',
    image: IMAGES.tribal.dussehra,
  },
  {
    name: 'Tribal Cuisine',
    description: 'Experience authentic flavors with dishes like red ant chutney (Chaprah), bamboo shoot curry, and Mahua liquor.',
    image: IMAGES.tribal.cuisine,
  },
];

export const CHHATTISGARH_CITIES: string[] = [
  'Raipur',
  'Bhilai',
  'Bilaspur',
  'Korba',
  'Durg',
  'Raigarh',
  'Rajnandgaon',
  'Jagdalpur',
  'Ambikapur',
  'Chirmiri',
  'Mahasamund',
  'Dhamtari',
  'Kanker',
  'Kawardha',
];
