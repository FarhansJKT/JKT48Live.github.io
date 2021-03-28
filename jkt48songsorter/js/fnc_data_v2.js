﻿﻿// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'img/';
// 0:順番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 3;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;

// Maximum number of result rows before being broken off into another table.
var maxRows = 35;

// * タイトル情報（編集可能。最後の行に”,”を付けないようにしてください）
var int_Colspan = 3;
var ary_TitleData = [
  "Senbatsu","Undergirls","Pajama Drive","Idol No Yoake","Ramune No Nomikata", "Renai Kinshi Jourei", "Seishun Girls", "Theater no Megami", "Boku no Taiyo", "Dareka no Tame ni", "Te Wo Tsunaginagara"
];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）, 
//   "タイトルID"（先頭から0, 1, 2...）, 
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
  //No,Judul Lagu,Senbatsu,Undergirls,Pajama Drive,Idol no Yoake,Ramune no Nomikata,Renai Kinshi Jourei,Seishun Girls,Theater no Megami,Boku no Taiyo,Dareka no Tame ni,Te Wo Tsunaginagara,Path Image
  [1,"RIVER",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Yuuhi wo Miteiru ka?  / Apakah Kau Melihat Mentari Senja?",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Koisuru Fortune Cookie  / Fortune Cookie Yang Mencinta",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Manatsu no Sounds Good!  / Musim Panas Sounds Good!",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Flying Get",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Gingham Check",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Kokoro no Placard  / Papan Penanda Isi Hati",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Kaze wa Fuiteiru  / Angin Sedang Berhembus",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Pareo wa Emerald  / Pareo Adalah Emerald",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Kibouteki Refrain  / Refrain Penuh Harapan",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Halloween Night",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Beginner",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Mae Shika Mukanee  / Hanya Lihat Kedepan",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"LOVE TRIP",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Saikou Ka yo  / Luar Biasa",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"So Long!",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Kimi no Hohoemi wo Yume ni Miru  / Indahnya Senyum Manismu dalam Mimpiku",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Kimi wa Melody  / Dirimu Melody",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Everyday, Kachuusha",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"UZA",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"High Tension",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Rapsodi",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Lantang",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Cinta Remaja",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Darashinai Aishikata / Cara Ceroboh untuk Mencinta ",[1,0,0,0,0,0,0,0,0,0,0],""]
  [1,"Hanikami Lollipop / Malu-malu Lollipop",[0,1,0,0,0,0,0,0,0,0,0],""]
  [1,"Utsukushii Inazuma / Kilat Yang Indah",[0,1,0,0,0,0,0,0,0,0,0],""]
  [1,"Kiss Datte Hidarikiki / Bahkan Ciuman Juga Kidal",[0,1,0,0,0,0,0,0,0,0,0],""]
  [1,"Bara no Kajitsu / Buah Mawar",[0,1,0,0,0,0,0,0,0,0,0],""]
  [1,"Boku Dake no value / Value Yang Hanya Milikku",[0,1,0,0,0,0,0,0,0,0,0],""]
  [1,"Kimi no Senaka / Punggung Milikmu",[0,1,0,0,0,0,0,0,0,0,0],""]
  [1,"Dakishimecha Ikenai / Tidak Boleh Pelukan",[0,1,0,0,0,0,0,0,0,0,0],""]
  [1,"Hikaeme I love you! / Sedikit Saja I Love You",[0,1,0,0,0,0,0,0,0,0,0],""]
  [1,"Tsugi no Season / Musim yang Selanjutnya",[0,1,0,0,0,0,0,0,0,0,0],""]
  [1,"Sweet & Bitter",[0,1,0,0,0,0,0,0,0,0,0],""]
  [1,"Idol No Yoake / Fajar Sang Idola ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Minasan Mo Go Issho Ni / Bersama-Sama Semuanya ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Haru Ichiban Ga Fuku Koro / Angin Musim Semi Pertama ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Kobushi No Seigi / Kebenaran Tinju Ini ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Zannen Shoujo / Gadis Yang Celaka ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Kuchi Utsushi No Chocolate / Berikan Coklat Dengan Bibir ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Kataomoi No Taikakusen / Garis Diagonal Cinta Searah ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Tengoku Yarou / Berandalan Di Surga ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Itoshiki Natasha / Natasha Yang Ku Cinta ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Joshikousei Wa Yamerarenai / Tak Bisa Berhenti Jadi Gadis Sma ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Suki To Ieba Yokatta / Andai Ku Dapat Ungkapkan Cinta ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Sobakasu No Kiss / Freckles' Kiss ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Tanpopo No Kesshin  / Keteguhan Hati Dandelion ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"J Stars",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Yokosuka Curve / Jalan Berkelok Yokosuka ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Arigatou / Terima Kasih ",[0,0,0,1,0,0,0,0,0,0,0],""]
  [1,"Kizashi / Pertanda ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Koutei No Koinu / Schoolyard Puppy ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Disco Hokenshitsu / Disco Di UKS ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Omatase Setlist / Setlist Yang Dinanti ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Cross",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Finland Miracle",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Manazashi, Sayonara / Menatapmu Sayonara ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Usotsuki Na Dachou / Burung Unta Si Pembohong ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Nice To Meet You!",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Kodoku Na Ballerina / Ballerina Dalam Sepi ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Ima Kimi To Irareru Koto / Sekarang Ku Bersama Denganmu ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Winning Ball",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Akushu No Ai / Cinta Dalam Handshake ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Bowling Ganbou / Harapan Bowling ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"16 Iro No Yume Crayon / 16 Warna Krayon Mimpi ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Ramune No Nomikata / Cara Meminum Ramune ",[0,0,0,0,1,0,0,0,0,0,0],""]
  [1,"Shonichi / Hari Pertama ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Hissatsu Teleport / Jurus Rahasia Teleport ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Gokigen Naname Na Mermaid / Putri Duyung Yang Sedang Sedih ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Futari Nori No Jitensha / Bersepeda Berdua ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Tenshi No Shippo / Ekor Malaikat ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Pajama Drive",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Junjou Shugi / Prinsip Kesucian Hati ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Temodemo No Namida / Air Mata Perasaan Yang Tak Tersampaikan ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Kagami No Naka No Jeanne D'Arc / Joan Of Arc Di Dalam Cermin ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Two Years Later",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Inochi No Tsukaimichi / Cara Menggunakan Hidup ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Kiss Shite Son Shichatta / Rugi Sudah Dicium ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Boku No Sakura / Bunga Sakuraku ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Wasshoi J!",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Suifu Wa Arashi Ni Yume Wo Miru / Pelaut Yang Melihat Mimpi Di Tengah Badai ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Shiroi Shirts / Baju Putih ",[0,0,1,0,0,0,0,0,0,0,0],""]
  [1,"Nagai Hikari / Cahaya Panjang ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Squall no Aida Ni / Di Tengah Hujan Badai Tiba-Tiba ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"JK Nemurihime / Gadis SMA Putri Tidur ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Kimi ni Au Tabi Koi wo Suru / Jatuh Cinta Setiap Bertemu Denganmu ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Kuroi Tenshi / Malaikat Hitam ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Heart Gata Virus / Virus Tipe Hati ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Renai Kinshi Jourei / Aturan Anti Cinta ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Tsundere!",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Manatsu no Christmas Rose / Mawar Natal Musim Panas ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Switch",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Marukyuu / 109",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Hikoukigumo / Jejak Awan Pesawat ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Ano Koro no Sneakers / Sneakers Waktu Itu ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"JKT Sanjou! / JKT Datang! ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Namida no Shinkokyuu / Nafas Dalam Air Mata ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Oogoe Diamond / Teriakan Berlian ",[0,0,0,0,0,1,0,0,0,0,0],""]
  [1,"Seishun Girls / Gadis Gadis Remaja ",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Beach Sandal",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Kimi Ga Hoshi Ni Naru Made / Sampai Dirimu Menjadi Bintang ",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Blue Rose",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Kinjirareta Futari / Dua Orang Yang Terlarang ",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Ame No Doubutsuen / Kebun Binatang Saat Hujan ",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Fushidara Na Natsu / Musim Panas Yang Kacau ",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Don't Disturb!",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Virgin Love",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Hizuke Henkousen / Garis Pergantian Hari Cinta ",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Boku No Uchiage Hanabi / Kembang Api Milikku ",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Yakusoku Yo / Janji Ya ",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Korogaru Ishi Ni Nare / Jadilah Batu Yang Berputar ",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Cinderella Wa Damasarenai / Cinderella Tak Akan Tertipu ",[0,0,0,0,0,0,1,0,0,0,0],""]
  [1,"Koi wo Kataru Shijin ni Narenakute / Ku Tak Pantas Jadi Seorang Pujangga Cinta ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Goukaku Kiss / Ciuman Kelulusan ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Antenna / Antena ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Seifuku No Me / Tunas Di Balik Seragam ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Omoide Ijou / Lebih dari Memori ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Ookami to Pride / Serigala dan Pride ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Onna no Ko no Dairokkan / Indra Keenam Seorang Gadis ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Kareha no Station / Stasiun Daun Kering ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Mangekyou / Kaleidoscope ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Jealousy no Alibi / Alibi Kecemburuan ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Doubt!",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Nakama no Uta / Lagu Sahabat ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Mizu no Nai Pool / Kolam yang Tak Ada Airnya ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Rakuen no Kaidan / Tangga Menuju Surga ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Pinocchio Gun / Pasukan Pinokio ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Tegami no Koto / Tentang Suratku ",[0,0,0,0,0,0,0,1,0,0,0],""]
  [1,"Dreamin' girls",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"RUN RUN RUN",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Mirai No Kajitsu / Buah Masa Depan ",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Viva! Hurricane",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Idol Nante Yobanaide / Jangan Panggil Diriku Idol ",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Boku to Juliette to Jet Coaster / Aku, Juliette dan Jet Coaster ",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Higurashi no Koi / Cinta Higurashi ",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Itoshisa no defense / Pertahanan dari Cinta ",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Himawari / Bunga Matahari ",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Takeuchi Senpai / Kakak Kelasku ",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Sonna Konna Wake de / Dengan Berbagai Alasan ",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Deja Vu",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Yuuhi wo miteiruka? / Apakah Kau Melihat Mentari Senja? ",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Lay Down",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"BINGO!",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Boku no Taiyou / Matahari Milikku ",[0,0,0,0,0,0,0,0,1,0,0],""]
  [1,"Tsukimisou / Evening Primrose ",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Warning",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Tanjoubi no Yoru / Malam Ulang Tahun ",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Bird",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Nage Kiss de Uchi Otose! / Jatuhkan dengan Kiss Bye! ",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Shinkirou / Khayalan ",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Rider",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Seifuku ga Jama wo Suru / Seragam Ini Sangat Mengganggu ",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Natsu ga Icchatta / Summer Has Gone ",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Koike / Adyth ",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Tsuki no Katachi / Bentuk Sang Rembulan ",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Dareka No Tame Ni / Demi Seseorang ",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Medley",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Namida Uri no Shoujo / Gadis Penjual Air Mata ",[0,0,0,0,0,0,0,0,0,1,0],""]
  [1,"Bokura no Kaze / Angin Kita ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Mango No.2",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Te Wo Tsunaginagara / Sambil Menggandeng Erat Tanganku ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Chime wa Love Song / Bel Sekolah Adalah Love Song ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Glory Days",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Kono Mune no Barcode / Barcode Hati Ini ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Wimbledon he Tsuretette / Ajak Aku Pergi Menuju ke Wimbledon ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Ame no Pianist / Sang Pianis Hujan ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Choco no Yukue / Keberadaan Coklat Itu ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Innocence",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Romance Rocket",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Koi no Keikou to Taisaku / Arah Sang Cinta dan Balasannya ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Daisuki / Aku Sangat Suka ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Rope no Yuujou / Tali Persahabatan ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Kayoubi no Yoru Suiyobi no Asa / Malam Hari Selasa, Pagi Hari Rabu ",[0,0,0,0,0,0,0,0,0,0,1],""]
  [1,"Tooku ni Ite mo / Di Tempat Yang Jauh pun ",[0,0,0,0,0,0,0,0,0,0,1],""]
];
