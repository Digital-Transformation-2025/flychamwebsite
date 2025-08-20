import uaeImage from '@/assets/images/Destenations/uae.webp';
import iraqImage from '@/assets/images/Destenations/iraq.webp';
import oman from '@/assets/images/Destenations/oman.webp';
import syria from '@/assets/images/Destenations/syria.webp';
import turkey from '@/assets/images/Destenations/turkey.webp';
import kuwait from '@/assets/images/Destenations/kuwait.webp';
const destinations =
 [

    {
        country: 'UAE',
        background: uaeImage,
        cities: [
            {
                name: 'Dubai',
                description:
                    'Travel to Dubai with Fly Cham and discover a city unlike any other destination in the world. From towering skyscrapers to traditional markets, golden beaches, and enchanting deserts, Dubai combines luxury with authentic Arabian hospitality.'
            },
            {
                name: 'Abu Dhabi',
                description:
                    'Travel with Fly Cham to Abu Dhabi, the second largest city in the United Arab Emirates and one of the top tourist destinations in the Arabian Gulf region, thanks to its cultural and entertainment attractions that attract millions of tourists annually. It boasts stunning gardens, diverse recreational activities, and picturesque beaches, along with distinctive shopping venues.'
            },
        ],
    },

    {
        country: 'Syria',
        background: syria,
        cities: [
            {
                name: 'Damascus',
                description:
                    "Travel to the Syrian capital, Damascus, where you'll find a unique blend of culture and history. The city boasts a rich heritage, a distinctive character, and a vibrant atmosphere, making it one of the best destinations in the Middle East.",
            },
            {
                name: 'Aleppo',
                description:
                    "Travel to Aleppo, the oldest continuously inhabited city in the world, the second-largest city after Damascus, and the economic capital of Syria. Renowned as a center of Arabic poetry, art, cuisine, and handicrafts, it is home to a fascinating array of attractions and travel adventures, making it one of the best destinations to visit.",
            },
            ,
        ],
    },


    {
        country: 'Kuwait',
        background: kuwait,
        cities: [
            {
                name: 'Kuwait',
                description:
                    'Travel to Kuwait, one of the most popular tourist destinations in the heart of the Arabian Gulf, distinguished by its stunning beauty and rich heritage. Kuwait stands as a meeting point for diverse cultures on the Arabian Gulf coast.'
            },
        ],
    },
    {
        country: 'Oman',
        background: oman,
        cities: [
            {
                name: 'Muscat',
                description:
                    'Travel to Muscat, the enchanting jewel of Oman, offering the perfect blend of traditional charm and serene beauty. Renowned for its sparkling beaches, traditional souks, and delicious seafood, Muscat is also known for its fascinating blend of ancient and modern sites. Historic forts stand proudly alongside luxurious resorts, inviting you to experience Omani hospitality at its finest.'
            },

        ],
    },
    {
        country: 'Iraq',
        background: iraqImage,
        cities: [
            {
                name: 'Baghdad',
                description:
                    'Travel to the heart of Arab civilization in Baghdad, Iraq, where the mysteries of ancient civilizations meet the splendor of modern life. Embark on an unforgettable journey to a city brimming with history and culture.'
            },
            {
                name: 'Erbil',
                description:
                    'Travel to Erbil, the enchanting jewel of Kurdistan and the oldest continuously inhabited city in the region, dating back to ancient times, specifically the sixth millennium BC. Erbil is also the ideal destination for those seeking to experience the mountains, enchanting natural landscapes, and ancient archaeological sites'
            },
        ],
    },



];
export default destinations