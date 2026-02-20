export interface Mosque {
  id: number;
  name: string;
  nameML: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    juma: string;
  };
  facilities: string[];
  distance?: number;
}

export const mosques: Mosque[] = [
  {
    id: 1,
    name: "Edappally Juma Masjid",
    nameML: "എടപ്പള്ളി ജുമാ മസ്ജിദ്",
    address: "Edappally, Kochi, Kerala 682024",
    lat: 10.0261,
    lng: 76.3125,
    phone: "+91 484 2345678",
    prayerTimes: { fajr: "5:15 AM", dhuhr: "12:30 PM", asr: "3:45 PM", maghrib: "6:30 PM", isha: "7:45 PM", juma: "12:30 PM" },
    facilities: ["Parking", "Wudu Area", "AC Hall", "Library"],
  },
  {
    id: 2,
    name: "Masjid Al-Huda",
    nameML: "മസ്ജിദ് അൽ-ഹുദാ",
    address: "Near Lulu Mall, Edappally, Kochi 682024",
    lat: 10.0285,
    lng: 76.3082,
    phone: "+91 484 2345679",
    prayerTimes: { fajr: "5:10 AM", dhuhr: "12:30 PM", asr: "3:45 PM", maghrib: "6:30 PM", isha: "7:45 PM", juma: "12:30 PM" },
    facilities: ["Parking", "Wudu Area", "Madrasa"],
  },
  {
    id: 3,
    name: "Noor Masjid",
    nameML: "നൂർ മസ്ജിദ്",
    address: "Changampuzha Nagar, Edappally, Kochi 682033",
    lat: 10.0195,
    lng: 76.3045,
    phone: "+91 484 2345680",
    prayerTimes: { fajr: "5:15 AM", dhuhr: "12:35 PM", asr: "3:50 PM", maghrib: "6:30 PM", isha: "7:50 PM", juma: "12:35 PM" },
    facilities: ["Wudu Area", "Madrasa", "Community Hall"],
  },
  {
    id: 4,
    name: "Taqwa Masjid",
    nameML: "തഖ്‌വ മസ്ജിദ്",
    address: "Ponekkara, Edappally, Kochi 682041",
    lat: 10.0320,
    lng: 76.3160,
    phone: "+91 484 2345681",
    prayerTimes: { fajr: "5:10 AM", dhuhr: "12:30 PM", asr: "3:45 PM", maghrib: "6:30 PM", isha: "7:45 PM", juma: "12:30 PM" },
    facilities: ["Parking", "AC Hall", "Wudu Area"],
  },
  {
    id: 5,
    name: "Markaz Masjid",
    nameML: "മർക്കസ് മസ്ജിദ്",
    address: "Nethaji Nagar, Edappally, Kochi 682024",
    lat: 10.0230,
    lng: 76.3100,
    prayerTimes: { fajr: "5:15 AM", dhuhr: "12:30 PM", asr: "3:45 PM", maghrib: "6:30 PM", isha: "7:45 PM", juma: "12:30 PM" },
    facilities: ["Wudu Area", "Madrasa", "Library", "Parking"],
  },
  {
    id: 6,
    name: "Farooq Masjid",
    nameML: "ഫാറൂഖ് മസ്ജിദ്",
    address: "Toll Junction, Edappally, Kochi 682024",
    lat: 10.0305,
    lng: 76.3055,
    phone: "+91 484 2345683",
    prayerTimes: { fajr: "5:10 AM", dhuhr: "12:30 PM", asr: "3:50 PM", maghrib: "6:30 PM", isha: "7:45 PM", juma: "12:30 PM" },
    facilities: ["Parking", "Wudu Area", "Community Hall", "AC Hall"],
  },
  {
    id: 7,
    name: "Bilal Masjid",
    nameML: "ബിലാൽ മസ്ജിദ്",
    address: "Edappally Bypass, Kochi 682024",
    lat: 10.0245,
    lng: 76.3070,
    phone: "+91 484 2345684",
    prayerTimes: { fajr: "5:10 AM", dhuhr: "12:30 PM", asr: "3:45 PM", maghrib: "6:30 PM", isha: "7:45 PM", juma: "12:30 PM" },
    facilities: ["Parking", "Wudu Area", "Madrasa"],
  },
  {
    id: 8,
    name: "Salam Masjid",
    nameML: "സലാം മസ്ജിദ്",
    address: "Companypady, Edappally, Kochi 682033",
    lat: 10.0210,
    lng: 76.3020,
    prayerTimes: { fajr: "5:15 AM", dhuhr: "12:30 PM", asr: "3:45 PM", maghrib: "6:30 PM", isha: "7:50 PM", juma: "12:30 PM" },
    facilities: ["Wudu Area", "Community Hall"],
  },
  {
    id: 9,
    name: "Muhiyudheen Masjid",
    nameML: "മുഹ്‌യിദ്ദീൻ മസ്ജിദ്",
    address: "Palarivattom, Near Edappally, Kochi 682025",
    lat: 10.0070,
    lng: 76.3060,
    phone: "+91 484 2345685",
    prayerTimes: { fajr: "5:10 AM", dhuhr: "12:35 PM", asr: "3:50 PM", maghrib: "6:30 PM", isha: "7:45 PM", juma: "12:35 PM" },
    facilities: ["Parking", "Wudu Area", "AC Hall", "Madrasa", "Library"],
  },
  {
    id: 10,
    name: "Ansar Masjid",
    nameML: "അൻസാർ മസ്ജിദ്",
    address: "Vazhakkala, Edappally, Kochi 682030",
    lat: 10.0150,
    lng: 76.3200,
    prayerTimes: { fajr: "5:15 AM", dhuhr: "12:30 PM", asr: "3:45 PM", maghrib: "6:30 PM", isha: "7:45 PM", juma: "12:30 PM" },
    facilities: ["Wudu Area", "Parking"],
  },
  {
    id: 11,
    name: "Hidaya Masjid",
    nameML: "ഹിദായ മസ്ജിദ്",
    address: "Kakkanad Road, Edappally, Kochi 682024",
    lat: 10.0180,
    lng: 76.3150,
    phone: "+91 484 2345686",
    prayerTimes: { fajr: "5:10 AM", dhuhr: "12:30 PM", asr: "3:45 PM", maghrib: "6:30 PM", isha: "7:45 PM", juma: "12:30 PM" },
    facilities: ["Wudu Area", "AC Hall", "Community Hall"],
  },
  {
    id: 12,
    name: "Rahmaniya Masjid",
    nameML: "റഹ്‌മാനിയ മസ്ജിദ്",
    address: "Edappally Church Road, Kochi 682024",
    lat: 10.0275,
    lng: 76.3110,
    prayerTimes: { fajr: "5:15 AM", dhuhr: "12:30 PM", asr: "3:50 PM", maghrib: "6:30 PM", isha: "7:50 PM", juma: "12:30 PM" },
    facilities: ["Parking", "Wudu Area", "Madrasa", "Library"],
  },
];

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
