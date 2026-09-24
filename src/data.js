import lingkunganSoal1 from './assets/images/image_5soal/lingkungan/soal1.webp';
import lingkunganSoal2 from './assets/images/image_5soal/lingkungan/soal2.webp';
import lingkunganSoal3 from './assets/images/image_5soal/lingkungan/soal3.webp';
import lingkunganSoal4 from './assets/images/image_5soal/lingkungan/soal4.webp';
import lingkunganSoal5 from './assets/images/image_5soal/lingkungan/soal5.webp';

// QR Code Images - Lingkungan
import qrLingkungan1 from './assets/QR/lingkungan/soal1/qrcode_398204701_44fc92117a65799a91c5e73ae20963e6.png';
import qrLingkungan2 from './assets/QR/lingkungan/soal2/qrcode_398186344_c05ed46a130022a20119617f1dd45715.png';
import qrLingkungan3 from './assets/QR/lingkungan/soal3/qrcode_398211643_adfa6e1d82effc4d11fd960e741ba51b.png';
import qrLingkungan4 from './assets/QR/lingkungan/soal4/qrcode_398221657_dae850a265fd4fcb3f897411124f3a22.png';
import qrLingkungan5 from './assets/QR/lingkungan/soal5/qrcode_398230879_f98c237eb2f60bc052e38374843db2ec.png';

import fenomenaSoal1 from './assets/images/image_5soal/fenomena_alam/soal1.webp';
import fenomenaSoal2 from './assets/images/image_5soal/fenomena_alam/soal2.webp';
import fenomenaSoal3 from './assets/images/image_5soal/fenomena_alam/soal3.webp';
import fenomenaSoal4 from './assets/images/image_5soal/fenomena_alam/soal4.webp';
import fenomenaSoal5 from './assets/images/image_5soal/fenomena_alam/soal5.webp';

// QR Code Images - Fenomena Alam
import qrFenomena1 from './assets/QR/fenomena_alam/soal1/qrcode_402370060_f87a0464f0934f0c11c5b8501d03c6be.png';
import qrFenomena2 from './assets/QR/fenomena_alam/soal2/qrcode_402468772_00beb075e11a2528a44bca95d53f1ddc.png';
import qrFenomena3 from './assets/QR/fenomena_alam/soal3/qrcode_402489133_1de670590c2548fbf0739061ddb61795.png';
import qrFenomena4 from './assets/QR/fenomena_alam/soal4/qrcode_402518416_a80379b86cde7865426bd0a145726c38.png';
import qrFenomena5 from './assets/QR/fenomena_alam/soal5/qrcode_402550264_d61bb4942094558404bbc895761eb51c.png';

import floraFaunaSoal1 from './assets/images/image_5soal/flora_fauna/soal1.webp';
import floraFaunaSoal2 from './assets/images/image_5soal/flora_fauna/soal2.webp';
import floraFaunaSoal3 from './assets/images/image_5soal/flora_fauna/soal3.webp';
import floraFaunaSoal4 from './assets/images/image_5soal/flora_fauna/soal4.webp';
import floraFaunaSoal5 from './assets/images/image_5soal/flora_fauna/soal5.webp';

// QR Code Images - Flora & Fauna
import qrFlora1 from './assets/QR/flora_fauna/soal1/qrcode_402872392_5acd458f637bb6c290d350f64ac71d7f.png';
import qrFlora2 from './assets/QR/flora_fauna/soal2/qrcode_402872890_e57f959df4a670f6abe1f2c65179a994.png';
import qrFlora3 from './assets/QR/flora_fauna/soal3/qrcode_403245808_bd3e398e3bb19086ccf347f31302b435.png';
import qrFlora4 from './assets/QR/flora_fauna/soal4/qrcode_403294609_df0d997958e59f7883b3b8327f3aa5a1.png';
import qrFlora5 from './assets/QR/flora_fauna/soal5/qrcode_403426117_08c661b67bad14335c42d8db4b86334f.png';

import tokohSoal1 from './assets/images/image_5soal/tokoh/soal1.webp';
import tokohSoal2 from './assets/images/image_5soal/tokoh/soal2.webp';
import tokohSoal3 from './assets/images/image_5soal/tokoh/soal3.webp';
import tokohSoal4 from './assets/images/image_5soal/tokoh/soal4.webp';
import tokohSoal5 from './assets/images/image_5soal/tokoh/soal5.webp';

// QR Code Images - Tokoh
import qrTokoh1 from './assets/QR/tokoh/soal1/qrcode_403827205_6ce9d5da7dfa24dfec01ce46fc494516.png';
import qrTokoh2 from './assets/QR/tokoh/soal2/qrcode_403874587_9ca984516fa602365b0d36782d72afd7.png';
import qrTokoh3 from './assets/QR/tokoh/soal3/qrcode_404461897_e916500e165753b433a3ac087503569e.png';
import qrTokoh4 from './assets/QR/tokoh/soal4/qrcode_404462329_bf37de9769f0bf0abaeef0a4077d393d.png';
import qrTokoh5 from './assets/QR/tokoh/soal5/qrcode_404486578_eaa79ee9cdaf846c33a07f66f1ebec0c.png';

export const missions = [
  {
    id: "lingkungan",
    title: "Lingkungan",
    description: "Misi menjaga dan mengenali lingkungan sekitar.",
    icon: "TreePine",
    color: "bg-green-100",
    questions: [
      {
        id: "q1",
        text: "Pada sore hari, banyak warga datang ke taman kota untuk berjalan santai, berolahraga, atau bermain bersama keluarga. Taman itu terlihat sejuk karena banyak pohon besar tumbuh di sekitarnya. Di beberapa sudut taman terdapat tempat duduk, tempat sampah, dan jalur khusus pejalan kaki. Suasana taman menjadi nyaman karena pengunjung menjaga kebersihan dan tidak membuang sampah sembarangan.\n\nBerdasarkan deskripsi tersebut, mengapa taman kota terasa nyaman untuk dikunjungi?",
        image: lingkunganSoal1,
        options: [
          "Karena banyak kendaraan lewat di dalam taman",
          "Karena taman memiliki pohon rindang dan lingkungan yang bersih",
          "Karena pengunjung boleh membuang sampah di mana saja",
          "Karena taman hanya boleh dikunjungi pada malam hari"
        ],
        correctAnswer: 1,
        qrImage: qrLingkungan1,
        qrLink: "https://www.youtube.com/watch?feature=shared&v=WzGcNevS7Eg"
      },
      {
        id: "q2",
        text: "Perpustakaan sekolah merupakan tempat yang sering digunakan siswa untuk membaca dan mencari informasi. Di dalam perpustakaan terdapat banyak buku yang disusun rapi berdasarkan jenisnya. Suasananya tenang sehingga siswa dapat membaca dengan fokus. Selain itu, meja dan kursi yang tersedia membuat siswa merasa nyaman saat belajar.\n\nBerdasarkan teks tersebut, hal utama yang membuat perpustakaan cocok digunakan untuk belajar adalah ...",
        image: lingkunganSoal2,
        options: [
          "Suasananya tenang dan buku-bukunya tersusun rapi",
          "Banyak siswa berlari di antara rak buku",
          "Buku-buku diletakkan secara acak di lantai",
          "Perpustakaan digunakan untuk bermain bola"
        ],
        correctAnswer: 0,
        qrImage: qrLingkungan2,
        qrLink: "https://www.youtube.com/watch?v=6nqKKJp-Jnw&feature=youtu.be"
      },
      {
        id: "q3",
        text: "Di belakang kelas terdapat kebun sekolah yang dirawat oleh siswa dan guru. Setiap pagi, beberapa siswa bergiliran menyiram tanaman agar tetap segar. Di kebun itu tumbuh berbagai jenis tanaman, seperti cabai, tomat, bayam, dan bunga hias. Melalui kegiatan merawat kebun, siswa belajar mengenal bagian-bagian tanaman serta pentingnya menjaga lingkungan.\n\nApa manfaat utama kebun sekolah bagi siswa?",
        image: lingkunganSoal3,
        options: [
          "Menjadi tempat untuk menyimpan sepeda",
          "Menjadi tempat belajar mengenal dan merawat tanaman",
          "Menjadi tempat membuang sampah plastik",
          "Menjadi tempat bermain saat hujan deras"
        ],
        correctAnswer: 1,
        qrImage: qrLingkungan3,
        qrLink: "https://www.youtube.com/watch?feature=shared&v=Ce4Tfj_8PrY"
      },
      {
        id: "q4",
        text: "Pantai merupakan salah satu tempat wisata alam yang banyak dikunjungi orang. Di tepi pantai, pasir putih terlihat membentang luas. Ombak datang perlahan menuju bibir pantai, lalu kembali ke laut. Beberapa pohon kelapa tumbuh di sekitar pantai dan membuat suasana terasa teduh. Pengunjung biasanya menikmati pemandangan sambil berjalan di atas pasir atau duduk di bawah pohon.\n\nCiri pantai yang digambarkan dalam teks tersebut adalah ...",
        image: lingkunganSoal4,
        options: [
          "Memiliki pasir putih, ombak, dan pohon kelapa",
          "Dipenuhi gedung tinggi dan jalan raya",
          "Berada di tengah hutan yang gelap",
          "Tidak memiliki air dan pasir"
        ],
        correctAnswer: 0,
        qrImage: qrLingkungan4,
        qrLink: "https://www.youtube.com/watch?feature=shared&v=YEOZ7ad1UxM"
      },
      {
        id: "q5",
        text: "Pasar tradisional biasanya ramai sejak pagi hari. Para pedagang menata dagangannya di atas meja atau di dalam keranjang. Ada yang menjual sayur, buah, ikan, bumbu dapur, dan kebutuhan rumah tangga. Pembeli berjalan dari satu lapak ke lapak lain untuk memilih barang yang dibutuhkan. Suara tawar-menawar membuat suasana pasar terasa hidup.\n\nBerdasarkan teks tersebut, suasana pasar tradisional dapat digambarkan sebagai ...",
        image: lingkunganSoal5,
        options: [
          "Sepi dan tidak ada kegiatan jual beli",
          "Ramai dengan aktivitas penjual dan pembeli",
          "Gelap karena tidak ada orang yang datang",
          "Sunyi seperti perpustakaan"
        ],
        correctAnswer: 1,
        qrImage: qrLingkungan5,
        qrLink: "https://www.youtube.com/watch?feature=shared&v=4OCdgnqvWCc"
      }
    ]
  },
  {
    id: "florafauna",
    title: "Flora dan Fauna",
    description: "Kenali berbagai hewan dan tumbuhan unik.",
    icon: "PawPrint",
    color: "bg-orange-100",
    questions: [
      {
        id: "q1",
        text: "Burung cenderawasih dikenal sebagai salah satu burung yang sangat indah. Burung ini memiliki bulu berwarna cerah dan bentuk ekor yang menarik. Saat bertengger di dahan pohon, bulunya tampak seperti hiasan alami. Keindahan bulunya membuat burung cenderawasih sering disebut sebagai burung surga.\n\nMengapa burung cenderawasih disebut burung yang indah?",
        image: floraFaunaSoal1,
        options: [
          "Karena memiliki bulu berwarna cerah dan menarik",
          "Karena hidup di dalam air",
          "Karena tidak memiliki sayap",
          "Karena tubuhnya selalu berwarna hitam polos"
        ],
        correctAnswer: 0,
        qrImage: qrFlora1,
        qrLink: "https://www.youtube.com/watch?si=A_xXj4uvKQtc0cmc&v=9KENc3gb60c&feature=youtu.be"
      },
      {
        id: "q2",
        text: "Bunga Rafflesia merupakan salah satu bunga yang unik. Ukurannya sangat besar dibandingkan bunga pada umumnya. Bunga ini tumbuh di lantai hutan dan tidak memiliki daun seperti tanaman biasa. Ketika mekar, bentuknya terlihat lebar dengan warna kemerahan. Karena ukurannya yang besar, bunga ini mudah menarik perhatian orang yang melihatnya.\n\nCiri khas bunga Rafflesia berdasarkan teks tersebut adalah ...",
        image: floraFaunaSoal2,
        options: [
          "Memiliki ukuran yang sangat besar",
          "Tumbuh tinggi seperti pohon kelapa",
          "Memiliki banyak daun kecil",
          "Selalu berwarna biru terang"
        ],
        correctAnswer: 0,
        qrImage: qrFlora2,
        qrLink: "https://www.youtube.com/watch?si=hGnHPvyLRjYkUimy&v=h10Phg3UuKg&feature=youtu.be"
      },
      {
        id: "q3",
        text: "Gajah Sumatra adalah hewan bertubuh besar yang memiliki belalai panjang. Belalai digunakan untuk mengambil makanan, minum, dan menyentuh benda di sekitarnya. Selain itu, gajah memiliki telinga lebar dan kaki yang kuat. Meskipun tubuhnya besar, gajah dapat berjalan perlahan di hutan untuk mencari makanan.\n\nBagian tubuh gajah yang paling membantu untuk mengambil makanan adalah ...",
        image: floraFaunaSoal3,
        options: [
          "Belalai",
          "Ekor",
          "Kuku",
          "Telinga"
        ],
        correctAnswer: 0,
        qrImage: qrFlora3,
        qrLink: "https://www.youtube.com/watch?si=kvCnqrTaKXm_3HaM&v=FBO51lR2t4E&feature=youtu.be"
      },
      {
        id: "q4",
        text: "Pohon kelapa banyak tumbuh di daerah pantai. Batangnya tinggi dan daunnya panjang menjuntai. Buah kelapa berbentuk bulat dan dapat dimanfaatkan air serta daging buahnya. Di daerah pesisir, pohon kelapa sering terlihat berjejer di dekat pasir pantai. Keberadaannya membuat suasana pantai tampak lebih teduh dan alami.\n\nBerdasarkan teks tersebut, pohon kelapa banyak tumbuh di daerah ...",
        image: floraFaunaSoal4,
        options: [
          "Pantai",
          "Kutub bersalju",
          "Gurun pasir tanpa air",
          "Dalam gua yang gelap"
        ],
        correctAnswer: 0,
        qrImage: qrFlora4,
        qrLink: "https://www.youtube.com/watch?si=E1f_gX6fH4iFYG1X&v=zlqz9Aq5Pxk&feature=youtu.be"
      },
      {
        id: "q5",
        text: "Harimau Sumatra memiliki tubuh kuat dan gerakan yang lincah. Tubuhnya ditutupi bulu berwarna oranye dengan belang hitam. Belang tersebut membantu harimau menyamar di antara pepohonan dan semak-semak saat berada di hutan. Dengan cara itu, harimau dapat bergerak lebih tenang ketika mencari mangsa.\n\nApa fungsi belang pada tubuh harimau Sumatra?",
        image: floraFaunaSoal5,
        options: [
          "Membantu harimau menyamar di lingkungan hutan",
          "Membuat harimau dapat terbang",
          "Membuat harimau hidup di dalam air",
          "Mengubah harimau menjadi hewan jinak"
        ],
        correctAnswer: 0,
        qrImage: qrFlora5,
        qrLink: "https://www.youtube.com/watch?si=xcJ-OoV3VbKZyHEu&v=5FvNc5qpOUc&feature=youtu.be"
      }
    ]
  },
  {
    id: "fenomena",
    title: "Fenomena Alam",
    description: "Pelajari peristiwa alam yang menakjubkan.",
    icon: "CloudLightning",
    color: "bg-blue-100",
    questions: [
      {
        id: "q1",
        text: "Gunung Bromo dikenal sebagai salah satu gunung yang memiliki pemandangan indah. Saat pagi hari, wisatawan sering datang untuk melihat matahari terbit dari kejauhan. Di sekitar gunung terdapat lautan pasir yang luas. Kawah Bromo juga menjadi daya tarik karena dari dalamnya tampak asap putih yang keluar perlahan.\n\nApa ciri khas Gunung Bromo berdasarkan teks tersebut?",
        image: fenomenaSoal1,
        options: [
          "Memiliki kawah yang mengeluarkan asap putih",
          "Memiliki air terjun yang sangat tinggi",
          "Dipenuhi gedung perkantoran",
          "Terletak di tengah laut"
        ],
        correctAnswer: 0,
        qrImage: qrFenomena1,
        qrLink: "https://www.youtube.com/watch?si=mUoUWRBuBTirkjvl&v=DxG1ZoMLOjo&feature=youtu.be"
      },
      {
        id: "q2",
        text: "Setelah hujan berhenti, langit yang semula gelap perlahan menjadi cerah. Sinar matahari mulai muncul dari balik awan. Tidak lama kemudian, terlihat warna-warni indah melengkung di langit. Warna itu disebut pelangi. Pelangi biasanya muncul ketika masih ada titik-titik air hujan di udara dan terkena cahaya matahari.\n\nBerdasarkan teks tersebut, pelangi biasanya muncul ketika ...",
        image: fenomenaSoal2,
        options: [
          "Hujan telah berhenti and ada cahaya matahari",
          "Langit gelap tanpa cahaya matahari",
          "Terjadi gempa bumi di malam hari",
          "Tidak ada air hujan sama sekali"
        ],
        correctAnswer: 0,
        qrImage: qrFenomena2,
        qrLink: "https://www.youtube.com/watch?si=qVtS4Y0a4rYVX1ui&v=Lj40EavbKKs&feature=youtu.be"
      },
      {
        id: "q3",
        text: "Air terjun mengalir dari tempat yang tinggi menuju tempat yang lebih rendah. Air yang jatuh dari tebing menghasilkan suara bergemuruh. Di sekitar air terjun biasanya terdapat bebatuan besar dan pepohonan yang membuat udara terasa sejuk. Percikan air yang terkena cahaya matahari membuat pemandangan terlihat indah.\n\nBerdasarkan deskripsi tersebut, suara air terjun yang deras dapat digambarkan sebagai ...",
        image: fenomenaSoal3,
        options: [
          "Bergemuruh karena air jatuh dari tempat tinggi",
          "Tidak terdengar sama sekali",
          "Sangat pelan seperti bisikan",
          "Sama seperti suara kendaraan di jalan raya"
        ],
        correctAnswer: 0,
        qrImage: qrFenomena3,
        qrLink: "https://www.youtube.com/watch?si=c56nVKnS_LbxIfXS&v=c0P6dyMt0nE&feature=youtu.be"
      },
      {
        id: "q4",
        text: "Danau adalah genangan air yang luas and dikelilingi daratan. Air danau biasanya tampak tenang, terutama ketika tidak ada angin kencang. Di sekitar danau sering tumbuh pepohonan yang membuat pemandangan terlihat asri. Banyak orang datang ke danau untuk menikmati udara segar dan melihat pantulan langit di permukaan air.\n\nApa daya tarik utama danau berdasarkan teks tersebut?",
        image: fenomenaSoal4,
        options: [
          "Airnya tenang dan pemandangannya asri",
          "Banyak kendaraan melaju cepat di tengah danau",
          "Permukaannya selalu dipenuhi api",
          "Tidak ada tumbuhan di sekitarnya"
        ],
        correctAnswer: 0,
        qrImage: qrFenomena4,
        qrLink: "https://www.youtube.com/watch?si=V_FtMWqk3x9-4tN8&v=Jj5JhwSkU8o&feature=youtu.be"
      },
      {
        id: "q5",
        text: "Pada siang hari, awan hitam mulai menutupi langit. Tidak lama kemudian, titik-titik air jatuh dari awan ke tanah. Semakin lama, hujan turun lebih deras dan terdengar suara rintik air di atap rumah. Tanah yang kering menjadi basah, dan udara terasa lebih sejuk setelah hujan turun.\n\nBerdasarkan teks tersebut, apa tanda bahwa hujan mulai turun?",
        image: fenomenaSoal5,
        options: [
          "Titik-titik air jatuh dari awan ke tanah",
          "Matahari bersinar sangat terik",
          "Tanah menjadi semakin kering",
          "Langit berubah menjadi sangat cerah tanpa awan"
        ],
        correctAnswer: 0,
        qrImage: qrFenomena5,
        qrLink: "https://www.youtube.com/watch?si=QBXUIlY0OAzNRTwV&v=BI_v4ewEYRQ&feature=youtu.be"
      }
    ]
  },
  {
    id: "tokoh",
    title: "Tokoh Karakter",
    description: "Pahami ciri-ciri dari berbagai tokoh.",
    icon: "User",
    color: "bg-purple-100",
    questions: [
      {
        id: "q1",
        text: "B.J. Habibie dikenal sebagai tokoh Indonesia yang cerdas dan tekun. Ia memiliki ketertarikan besar dalam bidang teknologi, terutama teknologi pesawat terbang. Berkat kemampuannya, ia banyak memberikan sumbangan pemikiran dalam dunia penerbangan. Selain dikenal sebagai ilmuwan, B.J. Habibie juga pernah menjadi Presiden Republik Indonesia.\n\nBerdasarkan teks tersebut, bidang yang sangat berkaitan dengan B.J. Habibie adalah ...",
        image: tokohSoal1,
        options: [
          "Teknologi penerbangan",
          "Seni tari tradisional",
          "Pertanian padi",
          "Olahraga sepak bola"
        ],
        correctAnswer: 0,
        qrImage: qrTokoh1,
        qrLink: "https://www.youtube.com/watch?si=gGXX_s9q_Ezs5Vv-&v=Ke0wBpbtFZk&feature=youtu.be"
      },
      {
        id: "q2",
        text: "R.A. Kartini dikenal sebagai tokoh perempuan Indonesia yang memperjuangkan pendidikan. Ia ingin perempuan memiliki kesempatan untuk belajar dan mengembangkan diri. Semangat Kartini membuat banyak orang menyadari pentingnya pendidikan bagi semua, baik laki-laki maupun perempuan. Hingga sekarang, perjuangannya masih dikenang oleh masyarakat Indonesia.\n\nApa perjuangan utama R.A. Kartini berdasarkan teks tersebut?",
        image: tokohSoal2,
        options: [
          "Memperjuangkan pendidikan bagi perempuan",
          "Membangun jembatan di banyak daerah",
          "Menjadi atlet olahraga internasional",
          "Mendirikan pasar tradisional"
        ],
        correctAnswer: 0,
        qrImage: qrTokoh2,
        qrLink: "https://www.youtube.com/watch?si=E0gD2Xscu_7zFFus&v=DenXOnMtsh0&feature=youtu.be"
      },
      {
        id: "q3",
        text: "Ki Hajar Dewantara adalah tokoh yang sangat berjasa dalam dunia pendidikan Indonesia. Ia percaya bahwa pendidikan penting untuk membentuk manusia yang cerdas dan berbudi pekerti. Karena perjuangannya, Ki Hajar Dewantara dikenal sebagai Bapak Pendidikan Nasional. Namanya selalu diingat ketika masyarakat membicarakan perkembangan pendidikan di Indonesia.\n\nBerdasarkan teks tersebut, Ki Hajar Dewantara dikenal sebagai ...",
        image: tokohSoal3,
        options: [
          "Bapak Pendidikan Nasional",
          "Bapak Teknologi Penerbangan",
          "Tokoh olahraga nasional",
          "Pendiri pasar tradisional"
        ],
        correctAnswer: 0,
        qrImage: qrTokoh3,
        qrLink: "https://www.youtube.com/watch?feature=shared&v=iXmTBZFv-rQ"
      },
      {
        id: "q4",
        text: "Cut Nyak Dien merupakan salah satu pahlawan perempuan dari Aceh. Ia dikenal memiliki keberanian besar dalam melawan penjajah. Semangat perjuangannya menunjukkan bahwa perempuan juga dapat berperan penting dalam membela bangsa. Karena keberanian dan pengorbanannya, Cut Nyak Dien dikenang sebagai tokoh pahlawan Indonesia.\n\nBerdasarkan deskripsi tersebut, Cut Nyak Dien dikenal sebagai ...",
        image: tokohSoal4,
        options: [
          "Pahlawan perempuan Indonesia",
          "Penyanyi terkenal dari Aceh",
          "Penjual hasil kebun",
          "Pelukis pemandangan alam"
        ],
        correctAnswer: 0,
        qrImage: qrTokoh4,
        qrLink: "https://www.youtube.com/watch?feature=shared&v=c7EYab-jSpE"
      },
      {
        id: "q5",
        text: "Ir. Soekarno adalah tokoh penting dalam sejarah Indonesia. Ia dikenal sebagai salah satu tokoh yang berperan dalam memperjuangkan kemerdekaan Indonesia. Soekarno juga menjadi Presiden pertama Republik Indonesia. Saat berpidato, ia dikenal memiliki suara yang lantang dan mampu membangkitkan semangat rakyat.\n\nBerdasarkan teks tersebut, Ir. Soekarno merupakan ...",
        image: tokohSoal5,
        options: [
          "Presiden pertama Republik Indonesia",
          "Presiden ketiga Republik Indonesia",
          "Tokoh teknologi penerbangan",
          "Penemu bunga Rafflesia"
        ],
        correctAnswer: 0,
        qrImage: qrTokoh5,
        qrLink: "https://www.youtube.com/watch?si=dUxkMmOJXulxn61n&v=SGWX9X5e7_M&feature=youtu.be"
      }
    ]
  },
];

export const kuisPemahaman = [
  {
    id: "k1",
    question: "Apa tujuan utama dari teks deskriptif?",
    options: ["Menceritakan dongeng", "Menjelaskan sesuatu secara rinci", "Membujuk orang", "Melaporkan berita"],
    correctAnswer: 1
  },
  {
    id: "k2",
    question: "Manakah yang BUKAN ciri-ciri teks deskriptif?",
    options: ["Menggambarkan objek", "Melibatkan panca indera", "Mengandung dialog panjang", "Membuat pembaca seolah merasakan langsung"],
    correctAnswer: 2
  },
  {
    id: "k3",
    question: "Struktur teks deskriptif terdiri dari...",
    options: ["Identifikasi dan Deskripsi Bagian", "Orientasi dan Resolusi", "Tesis dan Argumen", "Pernyataan Umum dan Urutan Sebab Akibat"],
    correctAnswer: 0
  }
];

export const evaluasiAkhir = [
  // Mixed questions
  ...missions[0].questions.slice(0, 2),
  ...missions[1].questions.slice(0, 2),
  ...missions[2].questions.slice(0, 1),
];
