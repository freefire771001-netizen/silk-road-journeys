/* Silk Road Journeys — content layer.
   All monument facts, itineraries and prices are researched content for Uzbekistan.
   Contact details and exchange rates are the only values meant to be maintained. */

const CONFIG = {
  brand: "Silk Road Journeys",
  // Indicative reference rates (1 USD = X). Updated 9 Nov 2026 from open.er-api.com.
  rates: { USD: 1, EUR: 0.8969, UZS: 11894.54 },
  ratesDate: "2026-11-09",
  contact: {
    phone: "+998 66 200 00 00",
    phoneHref: "+998662000000",
    whatsapp: "+998 90 200 00 00",
    email: "hello@silkroadjourneys.uz",
    address: "Bibi-Khanym koʻchasi 12, Samarqand 140100, Oʻzbekiston",
    hours: "Mon–Sat, 09:00–19:00 (GMT+5)"
  },
  serviceFee: 0.05,
  depositRate: 0.2,
  maxGuests: 12,
  maxChildren: 6
};

/* Reusable inclusion / exclusion phrases, defined once and shared by tours. */
const INC = {
  hotel4: { en: "4-star hotels in twin/double rooms", uz: "4 yulduzli mehmonxonalarda 2 kishilik xona", ru: "Отели 4* в двухместном размещении", fr: "Hôtels 4* en chambre double" },
  hotel5: { en: "5-star and boutique hotels", uz: "5 yulduzli va butik mehmonxonalar", ru: "Отели 5* и бутик-отели", fr: "Hôtels 5* et boutique" },
  breakfast: { en: "Daily breakfast at the hotel", uz: "Har kuni mehmonxonada nonushta", ru: "Ежедневный завтрак в отеле", fr: "Petit-déjeuner quotidien à l'hôtel" },
  guide: { en: "Licensed English-speaking guide", uz: "Litsenziyali ingliz tilida soʻzlashuvchi gid", ru: "Лицензированный гид, говорящий по-английски", fr: "Guide licencié francophone ou anglophone" },
  transport: { en: "Air-conditioned transport with driver", uz: "Konditsionerli transport va haydovchi", ru: "Транспорт с кондиционером и водителем", fr: "Transport climatisé avec chauffeur" },
  train: { en: "Afrosiyob high-speed train tickets", uz: "Afrosiyob tezyurar poyezd chiptalari", ru: "Билеты на скоростной поезд «Афросиёб»", fr: "Billets pour le train à grande vitesse Afrosiyob" },
  flight: { en: "Domestic flight tickets", uz: "Ichki aviachiptalar", ru: "Билеты на внутренние авиарейсы", fr: "Billets d'avion intérieurs" },
  entrance: { en: "Entrance fees to all monuments listed", uz: "Roʻyxatdagi barcha obidalarga kirish chiptalari", ru: "Входные билеты во все указанные памятники", fr: "Droits d'entrée pour tous les monuments cités" },
  transfer: { en: "Airport transfers on arrival and departure", uz: "Kelish va joʻnashda aeroport transferlari", ru: "Трансферы аэропорт–отель", fr: "Transferts aéroport à l'arrivée et au départ" },
  water: { en: "Bottled water every day", uz: "Har kuni shisha suv", ru: "Питьевая вода каждый день", fr: "Eau en bouteille chaque jour" },
  yurt: { en: "Overnight in a furnished desert yurt camp", uz: "Choʻldagi jihozlangan oʻtov lagerida tunash", ru: "Ночёвка в обустроенном юртовом лагере", fr: "Nuit en camp de yourtes aménagé" },
  camel: { en: "Camel ride and local ranger", uz: "Tuya sayri va mahalliy yoʻlboshchi", ru: "Прогулка на верблюдах с местным проводником", fr: "Balade à dos de chameau avec guide local" },
  dinner: { en: "Welcome and farewell dinners", uz: "Xush kelibsiz va xayrlashuv kechki ovqatlari", ru: "Приветственный и прощальный ужины", fr: "Dîners de bienvenue et d'adieu" },
  private: { en: "Private guide and vehicle throughout", uz: "Butun sayohat davomida shaxsiy gid va avtomobil", ru: "Индивидуальный гид и автомобиль на весь тур", fr: "Guide et véhicule privés pendant tout le séjour" }
};

const EXC = {
  intlFlight: { en: "International flights", uz: "Xalqaro aviachiptalar", ru: "Международные авиабилеты", fr: "Vols internationaux" },
  visa: { en: "Visa fees, if applicable", uz: "Viza yigʻimlari (agar kerak boʻlsa)", ru: "Визовые сборы (при необходимости)", fr: "Frais de visa, le cas échéant" },
  insurance: { en: "Travel insurance", uz: "Sayohat sugʻurtasi", ru: "Страхование путешествия", fr: "Assurance voyage" },
  lunches: { en: "Lunches and dinners not mentioned", uz: "Koʻrsatilmagan tushlik va kechki ovqatlar", ru: "Обеды и ужины, не указанные в программе", fr: "Déjeuners et dîners non mentionnés" },
  tips: { en: "Tips for guides and drivers", uz: "Gid va haydovchilarga choychaqa", ru: "Чаевые гидам и водителям", fr: "Pourboires guides et chauffeurs" },
  personal: { en: "Personal expenses and souvenirs", uz: "Shaxsiy xarajatlar va suvenirlar", ru: "Личные расходы и сувениры", fr: "Dépenses personnelles et souvenirs" },
  single: { en: "Single room supplement", uz: "Bir kishilik xona uchun qoʻshimcha toʻlov", ru: "Доплата за одноместное размещение", fr: "Supplément chambre individuelle" }
};

const DESTINATIONS = [
  {
    id: "samarkand",
    img: "assets/img/registan.jpg",
    gallery: ["assets/img/registan.jpg", "assets/img/gur-emir.jpg", "assets/img/shah-i-zinda.jpg", "assets/img/bibi-khanym.jpg"],
    name: { en: "Samarkand", uz: "Samarqand", ru: "Самарканд", fr: "Samarcande" },
    region: { en: "Samarkand region", uz: "Samarqand viloyati", ru: "Самаркандская область", fr: "Région de Samarcande" },
    tagline: {
      en: "The jewel of Timur's empire",
      uz: "Amir Temur imperiyasining javohiri",
      ru: "Жемчужина империи Тимура",
      fr: "Le joyau de l'empire de Tamerlan"
    },
    desc: {
      en: "Founded more than 2,700 years ago, Samarkand was the capital of Timur's empire and the richest city on the Silk Road. Its Registan ensemble — three towering madrasahs facing one square — is the defining image of Central Asia, while the blue-tiled necropolis of Shah-i-Zinda and Timur's own mausoleum of Gur-e-Amir rank among the finest monuments of the Islamic world.",
      uz: "2700 yildan ortiq tarixga ega Samarqand Amir Temur imperiyasining poytaxti va Buyuk ipak yoʻlining eng boy shahri boʻlgan. Uchta hashamatli madrasa jamlangan Registon ansambli Markaziy Osiyoning timsoliga aylangan, koʻk koshinkor Shahi-Zinda maqbaralari va Amir Temurning Gur-Emir maqbarasi esa islom meʼmorchiligining eng goʻzal namunalaridan hisoblanadi.",
      ru: "Самарканд, основанный более 2 700 лет назад, был столицей империи Тимура и самым богатым городом Шёлкового пути. Ансамбль Регистан с тремя величественными медресе — визитная карточка Центральной Азии, а голубые мавзолеи Шахи-Зинда и усыпальница Тимура Гур-Эмир относятся к лучшим памятникам исламского зодчества.",
      fr: "Fondée il y a plus de 2 700 ans, Samarcande fut la capitale de l'empire de Tamerlan et la ville la plus riche de la Route de la Soie. L'ensemble du Réghistan et ses trois médersas monumentales incarnent l'Asie centrale, tandis que la nécropole bleue de Chah-i-Zinda et le mausolée de Tamerlan, Gour-Emir, comptent parmi les plus beaux monuments de l'art islamique."
    },
    highlights: {
      en: ["Registan Square — Ulugbek, Sher-Dor and Tilya-Kori madrasahs", "Gur-e-Amir, the mausoleum of Timur and his descendants", "Shah-i-Zinda, a lane of 11th–15th-century tombs", "Bibi-Khanym Mosque, built for Timur's favourite wife", "Siab Bazaar for warm non bread, dried fruit and spices", "Ulugbek Observatory, founded in the 1420s"],
      uz: ["Registon maydoni — Ulugʻbek, Sherdor va Tillakori madrasalari", "Gur-Emir — Amir Temur va avlodlari maqbarasi", "Shahi-Zinda — XI–XV asr maqbaralari koʻchasi", "Bibi-Xonim masjidi — Temurning suyukli xotiniga atalgan", "Siab bozori — issiq non, quritilgan meva va ziravorlar", "Ulugʻbek rasadxonasi (1420-yillar)"],
      ru: ["Площадь Регистан — медресе Улугбека, Шер-Дор и Тиля-Кори", "Гур-Эмир — мавзолей Тимура и его потомков", "Шахи-Зинда — улица мавзолеев XI–XV веков", "Мечеть Биби-Ханым, построенная для любимой жены Тимура", "Базар Сиаб — горячие лепёшки, сухофрукты и специи", "Обсерватория Улугбека, основанная в 1420-х годах"],
      fr: ["Place du Réghistan — médersas Ouloug-Beg, Cher-Dor et Tilla-Kari", "Gour-Emir, mausolée de Tamerlan et de ses descendants", "Chah-i-Zinda, allée de tombeaux des XIe–XVe siècles", "Mosquée Bibi-Khanym, bâtie pour l'épouse préférée de Tamerlan", "Bazar Siab : pain tandyr, fruits secs et épices", "Observatoire d'Ouloug-Beg, fondé dans les années 1420"]
    },
    best: {
      en: "April–May and September–October",
      uz: "Aprel–may va sentabr–oktabr",
      ru: "Апрель–май и сентябрь–октябрь",
      fr: "Avril–mai et septembre–octobre"
    },
    stay: { en: "2–3 days", uz: "2–3 kun", ru: "2–3 дня", fr: "2–3 jours" }
  },
  {
    id: "bukhara",
    img: "assets/img/po-i-kalyan.jpg",
    gallery: ["assets/img/po-i-kalyan.jpg", "assets/img/bukhara-ark.jpg", "assets/img/lyabi-hauz.jpg"],
    name: { en: "Bukhara", uz: "Buxoro", ru: "Бухара", fr: "Boukhara" },
    region: { en: "Bukhara region", uz: "Buxoro viloyati", ru: "Бухарская область", fr: "Région de Boukhara" },
    tagline: {
      en: "A living museum of the Silk Road",
      uz: "Buyuk ipak yoʻlining tirik muzeyi",
      ru: "Живой музей Шёлкового пути",
      fr: "Un musée vivant de la Route de la Soie"
    },
    desc: {
      en: "For centuries Bukhara was the intellectual heart of the Muslim world — home to the physician Avicenna and libraries of manuscripts. Its old city is a UNESCO World Heritage Site where nearly every lane opens onto a monument: the Ark Fortress, the 47-metre Kalyan Minaret that Genghis Khan ordered spared, and the tranquil Lyabi-Hauz plaza framed by 17th-century madrasahs.",
      uz: "Asrlar davomida Buxoro musulmon dunyosining ilm markazi boʻlgan — bu yerda Ibn Sino yashab ijod qilgan, qoʻlyozma kutubxonalari saqlangan. Eski shahar YuNESKO roʻyxatiga kiritilgan: har bir koʻchada obida bor — Ark qalʼasi, Chingizxon saqlab qolgan 47 metrli Minorai Kalon va XVII asr madrasalari oʻrab turgan sokin Labi Hovuz maydoni.",
      ru: "На протяжении веков Бухара была интеллектуальным центром мусульманского мира: здесь работал Авиценна, хранились библиотеки рукописей. Старый город включён в список ЮНЕСКО, и почти каждый переулок выводит к памятнику: крепость Арк, 47-метровый минарет Калон, который пощадил Чингисхан, и тихая площадь Ляби-Хауз в обрамлении медресе XVII века.",
      fr: "Pendant des siècles, Boukhara fut le cœur intellectuel du monde musulman, patrie d'Avicenne et de bibliothèques de manuscrits. Sa vieille ville, inscrite à l'UNESCO, offre un monument à chaque ruelle : la forteresse Ark, le minaret Kalon de 47 mètres épargné par Gengis Khan et la paisible place Liab-i-Haouz bordée de médersas du XVIIe siècle."
    },
    highlights: {
      en: ["Ark Fortress, the emirs' residence from the 5th century", "Po-i-Kalyan: the Kalyan Minaret of 1127 and its mosque", "Lyabi-Hauz plaza and the Nadir Divan-Begi madrasah", "Samanid Mausoleum, a 10th-century brick masterpiece", "Chor Minor, the four-towered gatehouse of 1807", "Sitorai Mokhi-Khosa, the emir's summer palace"],
      uz: ["Ark qalʼasi — V asrdan buyon amirlar qarorgohi", "Poi Kalon: 1127-yildagi Minorai Kalon va masjid", "Labi Hovuz maydoni va Nadir Devonbegi madrasasi", "Ismoili Somoniy maqbarasi — X asr gʻisht meʼmorchiligi", "Chor Minor — 1807-yildagi toʻrt minorali darvoza", "Sitorai Mohi Xosa — amirning yozgi saroyi"],
      ru: ["Крепость Арк — резиденция эмиров с V века", "Пои-Калон: минарет Калон 1127 года и соборная мечеть", "Площадь Ляби-Хауз и медресе Надир Диван-Беги", "Мавзолей Саманидов — кирпичный шедевр X века", "Чор-Минор — четырёхминаретная надвратная постройка 1807 года", "Ситараи Мохи-Хоса — летний дворец эмира"],
      fr: ["Forteresse Ark, résidence des émirs depuis le Ve siècle", "Po-i-Kalon : minaret Kalon de 1127 et sa mosquée", "Place Liab-i-Haouz et médersa Nadir Divan-Begi", "Mausolée des Samanides, chef-d'œuvre de brique du Xe siècle", "Tchor-Minor, porterie à quatre minarets de 1807", "Sitorai Mokhi-Khossa, palais d'été de l'émir"]
    },
    best: { en: "April–June and September–October", uz: "Aprel–iyun va sentabr–oktabr", ru: "Апрель–июнь и сентябрь–октябрь", fr: "Avril–juin et septembre–octobre" },
    stay: { en: "2 days", uz: "2 kun", ru: "2 дня", fr: "2 jours" }
  },
  {
    id: "khiva",
    img: "assets/img/kalta-minor.jpg",
    gallery: ["assets/img/kalta-minor.jpg", "assets/img/khiva.jpg", "assets/img/tash-khauli.jpg"],
    name: { en: "Khiva", uz: "Xiva", ru: "Хива", fr: "Khiva" },
    region: { en: "Khorezm region", uz: "Xorazm viloyati", ru: "Хорезмская область", fr: "Région du Khorezm" },
    tagline: {
      en: "A walled city frozen in the 19th century",
      uz: "XIX asrda qotib qolgan qalʼa shahar",
      ru: "Город-крепость, застывший в XIX веке",
      fr: "Une cité fortifiée figée au XIXe siècle"
    },
    desc: {
      en: "Khiva is the most complete medieval city in Central Asia. Within the mud-brick walls of Itchan Kala — a UNESCO site since 1990 — more than 50 monuments and some 250 old houses still stand. The turquoise-banded Kalta Minor minaret, the harem of Tash Khauli and the Juma Mosque with its forest of carved elm columns are the signature sights.",
      uz: "Xiva Markaziy Osiyodagi eng yaxlit saqlangan oʻrta asr shahri. 1990-yildan YuNESKO roʻyxatidagi Ichan Qalʼa devorlari ichida 50 dan ortiq obida va 250 ga yaqin qadimiy uy saqlanib qolgan. Koʻk koshinli Kalta Minor, Toshhovli harami va oʻymakor ustunlari bilan mashhur Juma masjidi — shaharning timsoli.",
      ru: "Хива — наиболее цельно сохранившийся средневековый город Центральной Азии. Внутри глинобитных стен Ичан-Калы (объект ЮНЕСКО с 1990 года) стоят более 50 памятников и около 250 старых домов. Визитные карточки города — бирюзовый минарет Кальта-Минор, гарем Таш-Хаули и Джума-мечеть с лесом резных деревянных колонн.",
      fr: "Khiva est la cité médiévale la mieux préservée d'Asie centrale. Derrière les murs de terre d'Itchan Kala, inscrite à l'UNESCO depuis 1990, subsistent plus de 50 monuments et quelque 250 maisons anciennes. Le minaret Kalta Minor cerclé de turquoise, le harem de Tach-Khaouli et la mosquée Djouma aux forêts de colonnes sculptées en sont les emblèmes."
    },
    highlights: {
      en: ["Itchan Kala, the walled inner city", "Kalta Minor, the unfinished turquoise minaret of 1855", "Tash Khauli palace and its carved harem court", "Juma Mosque with more than 200 wooden columns", "Islam Khodja minaret, 57 m tall, built in 1910", "Kunya-Ark citadel and the evening view from the walls"],
      uz: ["Ichan Qalʼa — devor bilan oʻralgan ichki shahar", "Kalta Minor — 1855-yildagi tugallanmagan feruza minora", "Toshhovli saroyi va oʻymakor haram hovlisi", "Juma masjidi — 200 dan ortiq yogʻoch ustun", "Islomxoʻja minorasi — 1910-yilda qurilgan, 57 metr", "Qoʻna Ark qalʼasi va devordan kechki manzara"],
      ru: ["Ичан-Кала — внутренний город за стенами", "Кальта-Минор — незавершённый бирюзовый минарет 1855 года", "Дворец Таш-Хаули и его резной гаремный двор", "Джума-мечеть с более чем 200 деревянными колоннами", "Минарет Ислам-Ходжи высотой 57 м, построен в 1910 году", "Цитадель Куня-Арк и вид со стен вечером"],
      fr: ["Itchan Kala, la ville intérieure fortifiée", "Kalta Minor, minaret turquoise inachevé de 1855", "Palais Tach-Khaouli et sa cour de harem sculptée", "Mosquée Djouma et ses plus de 200 colonnes de bois", "Minaret Islam Khodja, 57 m, édifié en 1910", "Citadelle Kounia-Ark et vue du haut des remparts au soir"]
    },
    best: { en: "April–May and September–October", uz: "Aprel–may va sentabr–oktabr", ru: "Апрель–май и сентябрь–октябрь", fr: "Avril–mai et septembre–octobre" },
    stay: { en: "1–2 days", uz: "1–2 kun", ru: "1–2 дня", fr: "1–2 jours" }
  },
  {
    id: "tashkent",
    img: "assets/img/tashkent.jpg",
    gallery: ["assets/img/tashkent.jpg", "assets/img/chorsu.jpg"],
    name: { en: "Tashkent", uz: "Toshkent", ru: "Ташкент", fr: "Tachkent" },
    region: { en: "Capital city", uz: "Poytaxt", ru: "Столица", fr: "Capitale" },
    tagline: {
      en: "Where the Silk Road meets the metro",
      uz: "Ipak yoʻli metro bilan uchrashadigan shahar",
      ru: "Где Шёлковый путь встречается с метро",
      fr: "Là où la Route de la Soie croise le métro"
    },
    desc: {
      en: "Tashkent is a city of contrasts. The Hazrati Imam complex safeguards the 7th-century Uthman Quran, one metro ride from Soviet mosaics and the vaulted halls of Chorsu Bazaar. Tree-lined avenues, a rebuilt old town and Central Asia's first metro make the capital a comfortable, affordable introduction to Uzbekistan.",
      uz: "Toshkent — qarama-qarshiliklar shahri. Hazrati Imom majmuasida VII asrga oid Usmon Qurʼoni saqlanadi, bir bekat narida esa sovet mozaikalari va Chorsu bozorining gumbazli zallari. Soyabonli xiyobonlar, qayta tiklangan eski shahar va Markaziy Osiyodagi birinchi metro poytaxtni Oʻzbekistonga qulay kirish eshigiga aylantiradi.",
      ru: "Ташкент — город контрастов. В комплексе Хазрати Имам хранится Коран Усмана VII века, а в одной остановке метро — советские мозаики и сводчатые залы базара Чорсу. Тенистые проспекты, восстановленный старый город и первое метро Центральной Азии делают столицу удобной и недорогой отправной точкой.",
      fr: "Tachkent est une ville de contrastes. Le complexe Hazrati Imam conserve le Coran d'Othman, daté du VIIe siècle, à une station de métro des mosaïques soviétiques et des halles voûtées du bazar Tchorsou. Grands boulevards ombragés, vieille ville reconstruite et premier métro d'Asie centrale font de la capitale une entrée en matière agréable et abordable."
    },
    highlights: {
      en: ["Hazrati Imam complex and the Uthman Quran", "Chorsu Bazaar, the city's oldest market", "Kosmonavtlar metro station, a Soviet-era mosaic gallery", "Amir Timur Square and the Navoi Theatre", "Museum of Applied Arts in a 19th-century mansion", "Independence Square and the Earthquake Memorial"],
      uz: ["Hazrati Imom majmuasi va Usmon Qurʼoni", "Chorsu bozori — shaharning eng qadimiy bozori", "Kosmonavtlar bekati — sovet davri mozaikalari", "Amir Temur maydoni va Navoiy teatri", "XIX asr qasridagi Amaliy sanʼat muzeyi", "Mustaqillik maydoni va Zilzila yodgorligi"],
      ru: ["Комплекс Хазрати Имам и Коран Усмана", "Базар Чорсу — старейший рынок города", "Станция «Космонавтов» — галерея советских мозаик", "Площадь Амира Темура и театр Навои", "Музей прикладного искусства в особняке XIX века", "Площадь Независимости и Мемориал землетрясения"],
      fr: ["Complexe Hazrati Imam et Coran d'Othman", "Bazar Tchorsou, le plus ancien de la ville", "Station Kosmonavtlar, galerie de mosaïques soviétiques", "Place Amir Timur et théâtre Navoi", "Musée des arts appliqués dans un hôtel particulier du XIXe siècle", "Place de l'Indépendance et mémorial du séisme"]
    },
    best: { en: "April–May and September–November", uz: "Aprel–may va sentabr–noyabr", ru: "Апрель–май и сентябрь–ноябрь", fr: "Avril–mai et septembre–novembre" },
    stay: { en: "1–2 days", uz: "1–2 kun", ru: "1–2 дня", fr: "1–2 jours" }
  },
  {
    id: "fergana",
    img: "assets/img/margilan.jpg",
    gallery: ["assets/img/margilan.jpg", "assets/img/nurata.jpg"],
    name: { en: "Fergana Valley", uz: "Fargʻona vodiysi", ru: "Ферганская долина", fr: "Vallée de Ferghana" },
    region: { en: "Fergana, Namangan and Andijan", uz: "Fargʻona, Namangan, Andijon", ru: "Фергана, Наманган, Андижан", fr: "Ferghana, Namangan, Andijan" },
    tagline: {
      en: "Silk, ceramics and the greenest valley in Asia",
      uz: "Ipak, kulolchilik va Osiyoning eng yam-yashil vodiysi",
      ru: "Шёлк, керамика и самая зелёная долина Азии",
      fr: "Soie, céramique et la vallée la plus verte d'Asie"
    },
    desc: {
      en: "The Fergana Valley is Uzbekistan's craft heartland. In Margilan, silk is still reeled and woven at the Yodgorlik workshop using khan-atlas techniques; in Rishtan, potters glaze bowls with the valley's signature turquoise; and in Kokand the 1871 Khudoyar Khan Palace recalls the last khanate. The Kamchik Pass road over the mountains is a spectacle in itself.",
      uz: "Fargʻona vodiysi — Oʻzbekistonning hunarmandchilik yuragi. Margʻilonda «Yodgorlik» ustaxonasida ipak xon-atlas usulida yigirilib toʻqiladi, Rishtonda kulollar feruza rangli sopol yaratadi, Qoʻqonda esa 1871-yilda qurilgan Xudoyorxon saroyi soʻnggi xonlikni eslatadi. Togʻlar ustidagi Kamchiq dovoni ham alohida manzara.",
      ru: "Ферганская долина — ремесленное сердце Узбекистана. В Маргилане на фабрике «Ёдгорлик» шёлк до сих пор прядут и ткут в технике хан-атлас, в Риштане гончары покрывают посуду фирменной бирюзой, а в Коканде дворец Худояр-хана 1871 года напоминает о последнем ханстве. Дорога через перевал Камчик — отдельное зрелище.",
      fr: "La vallée de Ferghana est le cœur artisanal de l'Ouzbékistan. À Marguilan, la soie est encore filée et tissée à l'atelier Yodgorlik selon la technique khan-atlas ; à Richten, les potiers émaillent leurs bols du turquoise local ; à Kokand, le palais de Khoudoyar Khan (1871) rappelle le dernier khanat. La route du col de Kamtchik est un spectacle à elle seule."
    },
    highlights: {
      en: ["Khudoyar Khan Palace in Kokand, built 1860–1871", "Yodgorlik silk factory in Margilan", "Rishtan ceramics workshops and their blue glaze", "Kuva bazaar and craft centre", "Fergana city's Russian-era quarter", "Valley cuisine: plov, tandyr samsa and fresh apricots"],
      uz: ["Qoʻqondagi Xudoyorxon saroyi (1860–1871)", "Margʻilondagi «Yodgorlik» ipak fabrikasi", "Rishton kulolchilik ustaxonalari va koʻk sirlari", "Quva bozori va hunarmandchilik markazi", "Fargʻona shahrining rus davri mahallasi", "Vodiy taomlari: osh, tandir somsa va yangi oʻrik"],
      ru: ["Дворец Худояр-хана в Коканде (1860–1871)", "Шёлковая фабрика «Ёдгорлик» в Маргилане", "Гончарные мастерские Риштана и их синяя глазурь", "Базар и ремесленный центр Кувы", "Русский квартал Ферганы", "Кухня долины: плов, самса из тандыра, свежие абрикосы"],
      fr: ["Palais de Khoudoyar Khan à Kokand (1860–1871)", "Fabrique de soie Yodgorlik à Marguilan", "Ateliers de céramique de Richten et leur émail bleu", "Bazar et centre artisanal de Kouva", "Quartier russe de Ferghana", "Cuisine de la vallée : plov, samsa au tandyr, abricots frais"]
    },
    best: { en: "April–June and September–October", uz: "Aprel–iyun va sentabr–oktabr", ru: "Апрель–июнь и сентябрь–октябрь", fr: "Avril–juin et septembre–octobre" },
    stay: { en: "2 days", uz: "2 kun", ru: "2 дня", fr: "2 jours" }
  }
];

const TOURS = [
  {
    id: "samarkand-weekend",
    img: "assets/img/registan.jpg",
    title: { en: "Samarkand Weekend", uz: "Samarqand dam olish kunlari", ru: "Самарканд на выходные", fr: "Week-end à Samarcande" },
    cities: ["tashkent", "samarkand"],
    style: ["cultural"],
    days: 3,
    nights: 2,
    price: 420,
    oldPrice: 495,
    rating: 4.8,
    reviewCount: 96,
    group: "2–14",
    hotel: "hotel4",
    badge: "weekend",
    summary: {
      en: "Three days, one high-speed train and the greatest square in Central Asia. A compact itinerary for travellers who want Samarkand without a long absence from work.",
      uz: "Uch kun, bitta tezyurar poyezd va Markaziy Osiyoning eng ulugʻ maydoni. Ishdan uzoq ketmasdan Samarqandni koʻrmoqchi boʻlganlar uchun ixcham marshrut.",
      ru: "Три дня, один скоростной поезд и главная площадь Центральной Азии. Компактный маршрут для тех, кто хочет увидеть Самарканд, не пропадая надолго с работы.",
      fr: "Trois jours, un train à grande vitesse et la plus belle place d'Asie centrale. Un itinéraire compact pour voir Samarcande sans s'absenter longtemps."
    },
    itinerary: [
      {
        d: 1,
        t: { en: "Tashkent → Samarkand", uz: "Toshkent → Samarqand", ru: "Ташкент → Самарканд", fr: "Tachkent → Samarcande" },
        x: {
          en: "Morning Afrosiyob train (2 h 10 min). Hotel check-in, then Registan Square in the late afternoon light, when the three madrasahs turn amber.",
          uz: "Ertalab Afrosiyob poyezdi (2 soat 10 daqiqa). Mehmonxonaga joylashib, kechga yaqin Registon maydoniga boramiz — uch madrasa oltin rangga kiradi.",
          ru: "Утренний «Афросиёб» (2 ч 10 мин). Заселение в отель, затем площадь Регистан в предвечернем свете, когда медресе становятся янтарными.",
          fr: "Train Afrosiyob du matin (2 h 10). Installation à l'hôtel, puis la place du Réghistan dans la lumière de fin d'après-midi, quand les médersas se teintent d'ambre."
        }
      },
      {
        d: 2,
        t: { en: "Samarkand: Timur's city", uz: "Samarqand: Temur shahri", ru: "Самарканд: город Тимура", fr: "Samarcande, la ville de Tamerlan" },
        x: {
          en: "Gur-e-Amir mausoleum, Bibi-Khanym Mosque and the Siab Bazaar in the morning; Shah-i-Zinda and a silk-carpet workshop after lunch.",
          uz: "Ertalab Gur-Emir maqbarasi, Bibi-Xonim masjidi va Siab bozori; tushlikdan soʻng Shahi-Zinda va ipak gilam ustaxonasi.",
          ru: "Утром — мавзолей Гур-Эмир, мечеть Биби-Ханым и базар Сиаб; после обеда — Шахи-Зинда и мастерская шёлковых ковров.",
          fr: "Le matin, mausolée Gour-Emir, mosquée Bibi-Khanym et bazar Siab ; l'après-midi, Chah-i-Zinda et un atelier de tapis de soie."
        }
      },
      {
        d: 3,
        t: { en: "Samarkand → Tashkent", uz: "Samarqand → Toshkent", ru: "Самарканд → Ташкент", fr: "Samarcande → Tachkent" },
        x: {
          en: "Ulugbek Observatory and the Konigil paper mill, where paper is still made from mulberry bark. Afternoon train back to Tashkent.",
          uz: "Ulugʻbek rasadxonasi va Konigil qogʻoz tegirmoni — bu yerda qogʻoz hanuz tut daraxti poʻstlogʻidan tayyorlanadi. Tushdan keyin Toshkentga qaytish.",
          ru: "Обсерватория Улугбека и бумажная мельница Конигил, где бумагу до сих пор делают из тутового луба. Дневной поезд обратно в Ташкент.",
          fr: "Observatoire d'Ouloug-Beg et moulin à papier de Konigil, où l'on fabrique encore du papier d'écorce de mûrier. Train de l'après-midi pour Tachkent."
        }
      }
    ],
    includes: ["hotel4", "breakfast", "train", "guide", "entrance", "transfer"],
    excludes: ["intlFlight", "lunches", "insurance", "single"]
  },
  {
    id: "fergana-craft-trail",
    img: "assets/img/margilan.jpg",
    title: { en: "Fergana Craft Trail", uz: "Fargʻona hunarmandlar yoʻli", ru: "Ремесленный путь Ферганы", fr: "Route des artisans de Ferghana" },
    cities: ["tashkent", "fergana"],
    style: ["cultural"],
    days: 3,
    nights: 2,
    price: 480,
    oldPrice: 0,
    rating: 4.9,
    reviewCount: 61,
    group: "2–10",
    hotel: "hotel4",
    badge: "crafts",
    summary: {
      en: "A maker's journey over the Kamchik Pass: silk workshops in Margilan, blue-glazed pottery in Rishtan and the palace of the last Kokand khan.",
      uz: "Kamchiq dovoni ortidagi hunarmandlar safari: Margʻilon ipak ustaxonalari, Rishton koʻk sopolchiligi va soʻnggi Qoʻqon xonining saroyi.",
      ru: "Путешествие к мастерам за перевалом Камчик: шёлковые мастерские Маргилана, синяя керамика Риштана и дворец последнего кокандского хана.",
      fr: "Un voyage chez les artisans par le col de Kamtchik : ateliers de soie de Marguilan, céramique bleue de Richten et palais du dernier khan de Kokand."
    },
    itinerary: [
      {
        d: 1,
        t: { en: "Tashkent → Kokand", uz: "Toshkent → Qoʻqon", ru: "Ташкент → Коканд", fr: "Tachkent → Kokand" },
        x: {
          en: "Drive over the Kamchik Pass with a stop for mountain tea. Afternoon at the Khudoyar Khan Palace and the Jami Mosque.",
          uz: "Kamchiq dovoni orqali yoʻl, togʻda choy dam olish. Tushdan keyin Xudoyorxon saroyi va Jome masjidi.",
          ru: "Переезд через перевал Камчик с остановкой на горный чай. Днём — дворец Худояр-хана и Джума-мечеть.",
          fr: "Route par le col de Kamtchik avec une halte thé en montagne. L'après-midi, palais de Khoudoyar Khan et mosquée Djami."
        }
      },
      {
        d: 2,
        t: { en: "Margilan & Rishtan", uz: "Margʻilon va Rishton", ru: "Маргилан и Риштан", fr: "Marguilan et Richten" },
        x: {
          en: "Yodgorlik silk factory in the morning to see ikat dyeing and handlooms, then a master potter's studio in Rishtan.",
          uz: "Ertalab «Yodgorlik» fabrikasida abr-bandi boʻyash va qoʻl dastgohlarini koʻramiz, soʻng Rishtonda kulol ustaxonasi.",
          ru: "Утром — фабрика «Ёдгорлик»: окраска иката и ручные станки; затем мастерская гончара в Риштане.",
          fr: "Le matin, fabrique Yodgorlik : teinture ikat et métiers manuels ; puis l'atelier d'un maître potier à Richten."
        }
      },
      {
        d: 3,
        t: { en: "Fergana → Tashkent", uz: "Fargʻona → Toshkent", ru: "Фергана → Ташкент", fr: "Ferghana → Tachkent" },
        x: {
          en: "Kuva bazaar and craft centre, lunch in Fergana city, then the return drive over the pass.",
          uz: "Quva bozori va hunarmandchilik markazi, Fargʻonada tushlik, soʻng dovon orqali qaytish.",
          ru: "Базар и ремесленный центр Кувы, обед в Фергане, обратный путь через перевал.",
          fr: "Bazar et centre artisanal de Kouva, déjeuner à Ferghana, puis retour par le col."
        }
      }
    ],
    includes: ["hotel4", "breakfast", "transport", "guide", "entrance", "transfer"],
    excludes: ["intlFlight", "lunches", "insurance", "tips"]
  },
  {
    id: "classic-silk-road",
    img: "assets/img/po-i-kalyan.jpg",
    title: { en: "Classic Silk Road", uz: "Klassik ipak yoʻli", ru: "Классический Шёлковый путь", fr: "Route de la Soie classique" },
    cities: ["tashkent", "samarkand", "bukhara"],
    style: ["cultural"],
    days: 6,
    nights: 5,
    price: 890,
    oldPrice: 1040,
    rating: 4.9,
    reviewCount: 214,
    group: "2–16",
    hotel: "hotel4",
    badge: "bestseller",
    summary: {
      en: "Our most booked journey: the three UNESCO cities of Uzbekistan linked by the Afrosiyob train, with two full days in Samarkand and Bukhara.",
      uz: "Eng koʻp band qilinadigan marshrut: Oʻzbekistonning uchta YuNESKO shahri Afrosiyob poyezdi bilan, Samarqand va Buxoroda ikki toʻliq kun.",
      ru: "Самый популярный маршрут: три города ЮНЕСКО, связанные «Афросиёбом», с двумя полными днями в Самарканде и Бухаре.",
      fr: "Notre circuit le plus réservé : trois villes UNESCO reliées par l'Afrosiyob, avec deux journées complètes à Samarcande et Boukhara."
    },
    itinerary: [
      {
        d: 1,
        t: { en: "Arrival in Tashkent", uz: "Toshkentga yetib kelish", ru: "Прибытие в Ташкент", fr: "Arrivée à Tachkent" },
        x: {
          en: "Airport transfer, Hazrati Imam complex and Chorsu Bazaar, welcome dinner with a local family in the old town.",
          uz: "Aeroportdan transfer, Hazrati Imom majmuasi va Chorsu bozori, eski shaharda mahalliy oila bilan xush kelibsiz kechki ovqati.",
          ru: "Трансфер из аэропорта, комплекс Хазрати Имам и базар Чорсу, приветственный ужин в местной семье в старом городе.",
          fr: "Transfert aéroport, complexe Hazrati Imam et bazar Tchorsou, dîner de bienvenue chez une famille du vieux quartier."
        }
      },
      {
        d: 2,
        t: { en: "Tashkent → Samarkand", uz: "Toshkent → Samarqand", ru: "Ташкент → Самарканд", fr: "Tachkent → Samarcande" },
        x: {
          en: "High-speed train at 08:00. Afternoon at the Registan and Gur-e-Amir; evening free on the pedestrian street.",
          uz: "Ertalab 08:00 da tezyurar poyezd. Tushdan keyin Registon va Gur-Emir; kechqurun piyodalar koʻchasida erkin vaqt.",
          ru: "Скоростной поезд в 08:00. Днём — Регистан и Гур-Эмир; вечером свободное время на пешеходной улице.",
          fr: "Train à grande vitesse à 08 h 00. L'après-midi, Réghistan et Gour-Emir ; soirée libre sur la rue piétonne."
        }
      },
      {
        d: 3,
        t: { en: "Samarkand, full day", uz: "Samarqand, toʻliq kun", ru: "Самарканд, полный день", fr: "Samarcande, journée complète" },
        x: {
          en: "Shah-i-Zinda at opening time, Bibi-Khanym Mosque, Siab Bazaar and the Ulugbek Observatory with an astronomy talk.",
          uz: "Ochilish paytida Shahi-Zinda, Bibi-Xonim masjidi, Siab bozori va Ulugʻbek rasadxonasida astronomiya suhbati.",
          ru: "Шахи-Зинда к открытию, мечеть Биби-Ханым, базар Сиаб и обсерватория Улугбека с рассказом об астрономии.",
          fr: "Chah-i-Zinda à l'ouverture, mosquée Bibi-Khanym, bazar Siab et observatoire d'Ouloug-Beg avec une causerie d'astronomie."
        }
      },
      {
        d: 4,
        t: { en: "Samarkand → Bukhara", uz: "Samarqand → Buxoro", ru: "Самарканд → Бухара", fr: "Samarcande → Boukhara" },
        x: {
          en: "Morning train to Bukhara (about 1 h 35 min), then Lyabi-Hauz and a walk through the old trading domes.",
          uz: "Ertalab Buxoroga poyezd (taxminan 1 soat 35 daqiqa), soʻng Labi Hovuz va qadimiy savdo gumbazlari boʻylab sayr.",
          ru: "Утренний поезд в Бухару (около 1 ч 35 мин), затем Ляби-Хауз и прогулка по старым торговым куполам.",
          fr: "Train du matin pour Boukhara (environ 1 h 35), puis Liab-i-Haouz et promenade dans les anciens dômes marchands."
        }
      },
      {
        d: 5,
        t: { en: "Bukhara, full day", uz: "Buxoro, toʻliq kun", ru: "Бухара, полный день", fr: "Boukhara, journée complète" },
        x: {
          en: "Ark Fortress, Po-i-Kalyan and the Samanid Mausoleum; late afternoon at the emir's summer palace of Sitorai Mokhi-Khosa.",
          uz: "Ark qalʼasi, Poi Kalon va Ismoili Somoniy maqbarasi; kechga yaqin Sitorai Mohi Xosa yozgi saroyi.",
          ru: "Крепость Арк, Пои-Калон и мавзолей Саманидов; ближе к вечеру — летний дворец Ситараи Мохи-Хоса.",
          fr: "Forteresse Ark, Po-i-Kalon et mausolée des Samanides ; en fin d'après-midi, le palais d'été Sitorai Mokhi-Khossa."
        }
      },
      {
        d: 6,
        t: { en: "Bukhara → Tashkent", uz: "Buxoro → Toshkent", ru: "Бухара → Ташкент", fr: "Boukhara → Tachkent" },
        x: {
          en: "Chor Minor and the covered bazaars, then a domestic flight or the afternoon train to Tashkent for departure.",
          uz: "Chor Minor va yopiq bozorlar, soʻng ichki reys yoki tushdan keyingi poyezd bilan Toshkentga.",
          ru: "Чор-Минор и крытые базары, затем внутренний рейс или дневной поезд в Ташкент.",
          fr: "Tchor-Minor et les bazars couverts, puis vol intérieur ou train de l'après-midi vers Tachkent."
        }
      }
    ],
    includes: ["hotel4", "breakfast", "train", "flight", "guide", "entrance", "transfer", "dinner"],
    excludes: ["intlFlight", "visa", "lunches", "insurance", "single"]
  },
  {
    id: "kyzylkum-nomad",
    img: "assets/img/desert-yurts.jpg",
    title: { en: "Kyzylkum Nomad Adventure", uz: "Qizilqum koʻchmanchilar sarguzashti", ru: "Приключение в Кызылкумах", fr: "Aventure nomade au Kyzylkoum" },
    cities: ["tashkent", "nurata", "bukhara"],
    style: ["adventure"],
    days: 5,
    nights: 4,
    price: 760,
    oldPrice: 880,
    rating: 4.7,
    reviewCount: 73,
    group: "2–12",
    hotel: "hotel4",
    badge: "adventure",
    summary: {
      en: "Nurata's fortress walls, a night in a Kyzylkum yurt camp beside Aydarkul Lake and the monuments of Bukhara — desert and city in one arc.",
      uz: "Nurota qalʼa devorlari, Aydarkoʻl boʻyidagi Qizilqum oʻtov lagerida tunash va Buxoro obidalari — sahro va shahar bir marshrutda.",
      ru: "Стены нуратинской крепости, ночь в юртовом лагере Кызылкума у озера Айдаркуль и памятники Бухары — пустыня и город в одном маршруте.",
      fr: "Les remparts de Nourata, une nuit en camp de yourtes du Kyzylkoum au bord du lac Aïdarkoul et les monuments de Boukhara : désert et cité en un seul arc."
    },
    itinerary: [
      {
        d: 1,
        t: { en: "Tashkent → Nurata", uz: "Toshkent → Nurota", ru: "Ташкент → Нурата", fr: "Tachkent → Nourata" },
        x: {
          en: "Drive through the steppe to Nurata: the remains of Alexander's fortress and the Chashma spring with its sacred fish.",
          uz: "Dasht orqali Nurotaga: Aleksandr qalʼasi xarobalari va muqaddas baliqlari bilan mashhur Chashma bulogʻi.",
          ru: "Дорога через степь в Нурату: остатки крепости Александра и источник Чашма со священными рыбами.",
          fr: "Route à travers la steppe vers Nourata : vestiges de la forteresse d'Alexandre et source de Tchachma aux poissons sacrés."
        }
      },
      {
        d: 2,
        t: { en: "Kyzylkum Desert & Aydarkul", uz: "Qizilqum va Aydarkoʻl", ru: "Кызылкум и Айдаркуль", fr: "Kyzylkoum et Aïdarkoul" },
        x: {
          en: "Camel ride to the yurt camp, sunset over the dunes, plov cooked in a kazan and a night under the stars.",
          uz: "Tuya bilan oʻtov lageriga, qum tepalari ustida quyosh botishi, qozonda osh va yulduzlar ostida tunash.",
          ru: "Прогулка на верблюдах до юртового лагеря, закат над барханами, плов в казане и ночь под звёздами.",
          fr: "Balade à dos de chameau jusqu'au camp, coucher de soleil sur les dunes, plov au kazan et nuit sous les étoiles."
        }
      },
      {
        d: 3,
        t: { en: "Aydarkul → Bukhara", uz: "Aydarkoʻl → Buxoro", ru: "Айдаркуль → Бухара", fr: "Aïdarkoul → Boukhara" },
        x: {
          en: "Swim or walk the lake shore in the morning, then cross the desert by 4×4 to Bukhara (about 4 hours).",
          uz: "Ertalab koʻlda choʻmilish yoki qirgʻoq boʻylab sayr, soʻng 4×4 bilan sahro orqali Buxoroga (taxminan 4 soat).",
          ru: "Утром купание или прогулка по берегу, затем переход через пустыню на 4×4 в Бухару (около 4 часов).",
          fr: "Baignade ou promenade au bord du lac le matin, puis traversée du désert en 4×4 vers Boukhara (environ 4 h)."
        }
      },
      {
        d: 4,
        t: { en: "Bukhara, full day", uz: "Buxoro, toʻliq kun", ru: "Бухара, полный день", fr: "Boukhara, journée complète" },
        x: {
          en: "Ark Fortress, Po-i-Kalyan, the Samanid Mausoleum and Lyabi-Hauz, with dinner in a courtyard restaurant.",
          uz: "Ark qalʼasi, Poi Kalon, Ismoili Somoniy maqbarasi va Labi Hovuz; kechki ovqat hovli restoranida.",
          ru: "Крепость Арк, Пои-Калон, мавзолей Саманидов и Ляби-Хауз, ужин во внутреннем дворе.",
          fr: "Forteresse Ark, Po-i-Kalon, mausolée des Samanides et Liab-i-Haouz, dîner dans une cour."
        }
      },
      {
        d: 5,
        t: { en: "Bukhara → Tashkent", uz: "Buxoro → Toshkent", ru: "Бухара → Ташкент", fr: "Boukhara → Tachkent" },
        x: {
          en: "Free morning in the bazaars, then the afternoon flight or train back to Tashkent.",
          uz: "Ertalab bozorlarda erkin vaqt, soʻng tushdan keyingi reys yoki poyezd bilan Toshkentga.",
          ru: "Свободное утро на базарах, затем дневной рейс или поезд в Ташкент.",
          fr: "Matinée libre dans les bazars, puis vol ou train de l'après-midi vers Tachkent."
        }
      }
    ],
    includes: ["hotel4", "yurt", "camel", "breakfast", "transport", "guide", "entrance", "water"],
    excludes: ["intlFlight", "lunches", "insurance", "tips", "single"]
  },
  {
    id: "golden-ring",
    img: "assets/img/kalta-minor.jpg",
    title: { en: "Golden Ring of Uzbekistan", uz: "Oʻzbekistonning oltin halqasi", ru: "Золотое кольцо Узбекистана", fr: "Anneau d'or d'Ouzbékistan" },
    cities: ["tashkent", "khiva", "bukhara", "samarkand"],
    style: ["cultural"],
    days: 8,
    nights: 7,
    price: 1290,
    oldPrice: 1490,
    rating: 4.8,
    reviewCount: 158,
    group: "2–14",
    hotel: "hotel4",
    badge: "grand",
    summary: {
      en: "The full Uzbekistan arc: Tashkent, Khiva's walled Itchan Kala, Bukhara and Samarkand, with a domestic flight into Khorezm to save a day of driving.",
      uz: "Oʻzbekistonning toʻliq yoyi: Toshkent, Xivaning Ichan Qalʼasi, Buxoro va Samarqand; Xorazmga ichki reys yoʻl vaqtini tejaydi.",
      ru: "Полная дуга Узбекистана: Ташкент, Ичан-Кала в Хиве, Бухара и Самарканд; внутренний перелёт в Хорезм экономит день дороги.",
      fr: "L'arc complet de l'Ouzbékistan : Tachkent, Itchan Kala à Khiva, Boukhara et Samarcande, avec un vol intérieur vers le Khorezm qui épargne un jour de route."
    },
    itinerary: [
      {
        d: 1,
        t: { en: "Arrival in Tashkent", uz: "Toshkentga yetib kelish", ru: "Прибытие в Ташкент", fr: "Arrivée à Tachkent" },
        x: {
          en: "Transfer and a gentle first afternoon: Hazrati Imam, Chorsu Bazaar and the Kosmonavtlar metro station.",
          uz: "Transfer va yengil birinchi kun: Hazrati Imom, Chorsu bozori va Kosmonavtlar bekati.",
          ru: "Трансфер и спокойный первый день: Хазрати Имам, базар Чорсу и станция «Космонавтов».",
          fr: "Transfert et premier après-midi tranquille : Hazrati Imam, bazar Tchorsou et station Kosmonavtlar."
        }
      },
      {
        d: 2,
        t: { en: "Tashkent → Khiva", uz: "Toshkent → Xiva", ru: "Ташкент → Хива", fr: "Tachkent → Khiva" },
        x: {
          en: "Morning flight to Urgench (about 1 h 40 min) and a 35-minute drive to Khiva. First walk inside Itchan Kala at sunset.",
          uz: "Ertalab Urganchga reys (taxminan 1 soat 40 daqiqa), 35 daqiqalik yoʻl Xivaga. Quyosh botishida Ichan Qalʼa boʻylab ilk sayr.",
          ru: "Утренний рейс в Ургенч (около 1 ч 40 мин) и 35 минут до Хивы. Первая прогулка по Ичан-Кале на закате.",
          fr: "Vol matinal vers Ourgentch (environ 1 h 40) puis 35 minutes de route jusqu'à Khiva. Première promenade dans Itchan Kala au coucher du soleil."
        }
      },
      {
        d: 3,
        t: { en: "Khiva, full day", uz: "Xiva, toʻliq kun", ru: "Хива, полный день", fr: "Khiva, journée complète" },
        x: {
          en: "Kalta Minor, Tash Khauli, the Juma Mosque and Islam Khodja minaret; free time to climb the city walls.",
          uz: "Kalta Minor, Toshhovli, Juma masjidi va Islomxoʻja minorasi; shahar devorlariga chiqish uchun erkin vaqt.",
          ru: "Кальта-Минор, Таш-Хаули, Джума-мечеть и минарет Ислам-Ходжи; свободное время, чтобы подняться на стены.",
          fr: "Kalta Minor, Tach-Khaouli, mosquée Djouma et minaret Islam Khodja ; temps libre pour monter sur les remparts."
        }
      },
      {
        d: 4,
        t: { en: "Khiva → Bukhara by desert road", uz: "Xiva → Buxoro, choʻl yoʻli bilan", ru: "Хива → Бухара через пустыню", fr: "Khiva → Boukhara par la route du désert" },
        x: {
          en: "A 450 km drive across the Khorezm sands with a stop at the Amu Darya. Arrive in Bukhara by early evening.",
          uz: "Xorazm qumlari boʻylab 450 km yoʻl, Amudaryo boʻyida toʻxtash. Kechqurun Buxoroga yetib kelamiz.",
          ru: "450 км через хорезмские пески с остановкой на Амударье. Прибытие в Бухару к вечеру.",
          fr: "450 km à travers les sables du Khorezm avec une halte sur l'Amou-Daria. Arrivée à Boukhara en début de soirée."
        }
      },
      {
        d: 5,
        t: { en: "Bukhara, full day", uz: "Buxoro, toʻliq kun", ru: "Бухара, полный день", fr: "Boukhara, journée complète" },
        x: {
          en: "Ark, Po-i-Kalyan, the Samanid Mausoleum and Chor Minor; evening at the Lyabi-Hauz cafés.",
          uz: "Ark, Poi Kalon, Ismoili Somoniy maqbarasi va Chor Minor; kechqurun Labi Hovuz choyxonalarida.",
          ru: "Арк, Пои-Калон, мавзолей Саманидов и Чор-Минор; вечер в кафе на Ляби-Хаузе.",
          fr: "Ark, Po-i-Kalon, mausolée des Samanides et Tchor-Minor ; soirée dans les cafés de Liab-i-Haouz."
        }
      },
      {
        d: 6,
        t: { en: "Bukhara → Samarkand", uz: "Buxoro → Samarqand", ru: "Бухара → Самарканд", fr: "Boukhara → Samarcande" },
        x: {
          en: "Morning train to Samarkand, afternoon at the Registan and Gur-e-Amir, evening at a traditional music performance.",
          uz: "Ertalab Samarqandga poyezd, tushdan keyin Registon va Gur-Emir, kechqurun anʼanaviy musiqa kechasi.",
          ru: "Утренний поезд в Самарканд, днём Регистан и Гур-Эмир, вечером концерт традиционной музыки.",
          fr: "Train du matin pour Samarcande, Réghistan et Gour-Emir l'après-midi, concert de musique traditionnelle le soir."
        }
      },
      {
        d: 7,
        t: { en: "Samarkand, full day", uz: "Samarqand, toʻliq kun", ru: "Самарканд, полный день", fr: "Samarcande, journée complète" },
        x: {
          en: "Shah-i-Zinda, Bibi-Khanym, Siab Bazaar and the Ulugbek Observatory; farewell dinner in a courtyard house.",
          uz: "Shahi-Zinda, Bibi-Xonim, Siab bozori va Ulugʻbek rasadxonasi; hovli uyda xayrlashuv kechki ovqati.",
          ru: "Шахи-Зинда, Биби-Ханым, базар Сиаб и обсерватория Улугбека; прощальный ужин в доме с двором.",
          fr: "Chah-i-Zinda, Bibi-Khanym, bazar Siab et observatoire d'Ouloug-Beg ; dîner d'adieu dans une maison à cour."
        }
      },
      {
        d: 8,
        t: { en: "Samarkand → Tashkent", uz: "Samarqand → Toshkent", ru: "Самарканд → Ташкент", fr: "Samarcande → Tachkent" },
        x: {
          en: "Free morning for the bazaar, then the Afrosiyob back to Tashkent and your departure transfer.",
          uz: "Ertalab bozor uchun erkin vaqt, soʻng Afrosiyob bilan Toshkentga va aeroportga transfer.",
          ru: "Свободное утро на базаре, затем «Афросиёб» в Ташкент и трансфер в аэропорт.",
          fr: "Matinée libre au bazar, puis l'Afrosiyob vers Tachkent et le transfert à l'aéroport."
        }
      }
    ],
    includes: ["hotel4", "breakfast", "flight", "train", "transport", "guide", "entrance", "transfer", "dinner"],
    excludes: ["intlFlight", "visa", "lunches", "insurance", "single"]
  },
  {
    id: "imperial-private",
    img: "assets/img/tash-khauli.jpg",
    title: { en: "Imperial Silk Road — Private", uz: "Imperator ipak yoʻli — xususiy", ru: "Императорский Шёлковый путь — приват", fr: "Route de la Soie impériale — privé" },
    cities: ["tashkent", "fergana", "khiva", "bukhara", "samarkand"],
    style: ["luxury", "cultural"],
    days: 10,
    nights: 9,
    price: 2850,
    oldPrice: 3200,
    rating: 5.0,
    reviewCount: 44,
    group: "2–6",
    hotel: "hotel5",
    badge: "luxury",
    summary: {
      en: "A private, ten-day journey with five-star and boutique stays, a dedicated guide and driver, and access to craftsmen's workshops closed to groups.",
      uz: "Xususiy oʻn kunlik sayohat: 5 yulduzli va butik mehmonxonalar, shaxsiy gid va haydovchi, guruhlarga yopiq hunarmand ustaxonalariga kirish.",
      ru: "Частное десятидневное путешествие: отели 5* и бутик, личный гид и водитель, доступ в мастерские ремесленников, закрытые для групп.",
      fr: "Un voyage privé de dix jours : hôtels 5* et boutique, guide et chauffeur dédiés, accès à des ateliers d'artisans fermés aux groupes."
    },
    itinerary: [
      {
        d: 1,
        t: { en: "Arrival in Tashkent", uz: "Toshkentga yetib kelish", ru: "Прибытие в Ташкент", fr: "Arrivée à Tachkent" },
        x: {
          en: "Private transfer, suite check-in, Hazrati Imam at closing time and dinner at a restored merchant's house.",
          uz: "Shaxsiy transfer, lyuks xonaga joylashish, yopilish oldidan Hazrati Imom va tiklangan savdogar uyida kechki ovqat.",
          ru: "Личный трансфер, заселение в люкс, Хазрати Имам перед закрытием и ужин в отреставрированном купеческом доме.",
          fr: "Transfert privé, installation en suite, Hazrati Imam à l'heure de la fermeture et dîner dans une maison de marchand restaurée."
        }
      },
      {
        d: 2,
        t: { en: "Tashkent → Fergana", uz: "Toshkent → Fargʻona", ru: "Ташкент → Фергана", fr: "Tachkent → Ferghana" },
        x: {
          en: "Short flight to Fergana, afternoon in the Russian-era quarter and the regional museum.",
          uz: "Fargʻonaga qisqa reys, tushdan keyin rus davri mahallasi va viloyat muzeyi.",
          ru: "Короткий перелёт в Фергану, днём русский квартал и областной музей.",
          fr: "Vol court vers Ferghana, l'après-midi dans le quartier russe et le musée régional."
        }
      },
      {
        d: 3,
        t: { en: "Margilan & Rishtan", uz: "Margʻilon va Rishton", ru: "Маргилан и Риштан", fr: "Marguilan et Richten" },
        x: {
          en: "Private visits to a khan-atlas master and a Rishtan ceramic dynasty, with lunch in a potter's garden.",
          uz: "Xon-atlas ustasi va Rishton kulolchilik sulolasiga shaxsiy tashrif, kulol bogʻida tushlik.",
          ru: "Частные визиты к мастеру хан-атласа и гончарной династии Риштана, обед в саду керамиста.",
          fr: "Visites privées chez un maître du khan-atlas et une dynastie de céramistes de Richten, déjeuner dans le jardin du potier."
        }
      },
      {
        d: 4,
        t: { en: "Fergana → Khiva", uz: "Fargʻona → Xiva", ru: "Фергана → Хива", fr: "Ferghana → Khiva" },
        x: {
          en: "Fly via Tashkent to Urgench and transfer to Khiva; evening on the terrace above the old city.",
          uz: "Toshkent orqali Urganchga reys va Xivaga transfer; kechqurun eski shahar ustidagi ayvonda.",
          ru: "Перелёт через Ташкент в Ургенч и трансфер в Хиву; вечер на террасе над старым городом.",
          fr: "Vol via Tachkent vers Ourgentch et transfert à Khiva ; soirée sur la terrasse dominant la vieille ville."
        }
      },
      {
        d: 5,
        t: { en: "Khiva, private access", uz: "Xiva, shaxsiy tashrif", ru: "Хива, частный доступ", fr: "Khiva, accès privé" },
        x: {
          en: "Itchan Kala before the gates open to day visitors: Kalta Minor, Tash Khauli and the Juma Mosque columns.",
          uz: "Darvoza kunlik mehmonlarga ochilishidan oldin Ichan Qalʼa: Kalta Minor, Toshhovli va Juma masjidi ustunlari.",
          ru: "Ичан-Кала до открытия ворот для туристов: Кальта-Минор, Таш-Хаули и колонны Джума-мечети.",
          fr: "Itchan Kala avant l'ouverture des portes : Kalta Minor, Tach-Khaouli et les colonnes de la mosquée Djouma."
        }
      },
      {
        d: 6,
        t: { en: "Khiva → Bukhara", uz: "Xiva → Buxoro", ru: "Хива → Бухара", fr: "Khiva → Boukhara" },
        x: {
          en: "Cross the Kyzylkum by private 4×4 with a picnic at an abandoned fortress, arriving in Bukhara at dusk.",
          uz: "Qizilqumni shaxsiy 4×4 da kesib oʻtish, tashlandiq qalʼada piknik, kechqurun Buxoroga yetib kelish.",
          ru: "Переход Кызылкума на частном 4×4 с пикником у заброшенной крепости, прибытие в Бухару в сумерках.",
          fr: "Traversée du Kyzylkoum en 4×4 privé avec pique-nique près d'une forteresse abandonnée, arrivée à Boukhara au crépuscule."
        }
      },
      {
        d: 7,
        t: { en: "Bukhara, full day", uz: "Buxoro, toʻliq kun", ru: "Бухара, полный день", fr: "Boukhara, journée complète" },
        x: {
          en: "Ark, Po-i-Kalyan, the Samanid Mausoleum and a private calligraphy lesson in a working madrasah.",
          uz: "Ark, Poi Kalon, Ismoili Somoniy maqbarasi va faoliyat yuritayotgan madrasada shaxsiy xattotlik darsi.",
          ru: "Арк, Пои-Калон, мавзолей Саманидов и частный урок каллиграфии в действующем медресе.",
          fr: "Ark, Po-i-Kalon, mausolée des Samanides et cours privé de calligraphie dans une médersa en activité."
        }
      },
      {
        d: 8,
        t: { en: "Bukhara → Samarkand", uz: "Buxoro → Samarqand", ru: "Бухара → Самарканд", fr: "Boukhara → Samarcande" },
        x: {
          en: "First-class train to Samarkand, Registan at golden hour with a historian, dinner on a rooftop.",
          uz: "Birinchi klassda Samarqandga, tarixchi bilan oltin soatlarda Registon, tomdagi restoranda kechki ovqat.",
          ru: "Поезд первого класса в Самарканд, Регистан в золотой час с историком, ужин на крыше.",
          fr: "Train première classe pour Samarcande, Réghistan à l'heure dorée avec un historien, dîner sur un toit."
        }
      },
      {
        d: 9,
        t: { en: "Samarkand, full day", uz: "Samarqand, toʻliq kun", ru: "Самарканд, полный день", fr: "Samarcande, journée complète" },
        x: {
          en: "Shah-i-Zinda at dawn, Bibi-Khanym, a private paper-making session in Konigil and a farewell dinner.",
          uz: "Tongda Shahi-Zinda, Bibi-Xonim, Konigilda shaxsiy qogʻoz tayyorlash mashgʻuloti va xayrlashuv kechki ovqati.",
          ru: "Шахи-Зинда на рассвете, Биби-Ханым, частное занятие по изготовлению бумаги в Конигиле и прощальный ужин.",
          fr: "Chah-i-Zinda à l'aube, Bibi-Khanym, atelier privé de fabrication de papier à Konigil et dîner d'adieu."
        }
      },
      {
        d: 10,
        t: { en: "Samarkand → Tashkent", uz: "Samarqand → Toshkent", ru: "Самарканд → Ташкент", fr: "Samarcande → Tachkent" },
        x: {
          en: "Ulugbek Observatory, then a private transfer or the train to Tashkent airport.",
          uz: "Ulugʻbek rasadxonasi, soʻng shaxsiy transfer yoki poyezd bilan Toshkent aeroportiga.",
          ru: "Обсерватория Улугбека, затем личный трансфер или поезд в аэропорт Ташкента.",
          fr: "Observatoire d'Ouloug-Beg, puis transfert privé ou train vers l'aéroport de Tachkent."
        }
      }
    ],
    includes: ["hotel5", "breakfast", "private", "flight", "train", "entrance", "transfer", "dinner"],
    excludes: ["intlFlight", "visa", "insurance", "tips"]
  }
];

const REVIEWS = [
  {
    id: "r1", name: "Sophie Marchand", country: "France", tour: "classic-silk-road", rating: 5, date: "2026-10-18", initials: "SM",
    text: {
      en: "The Registan at sunset was worth the flight alone, but what stayed with me was our guide Dilnoza explaining the tilework for an hour without once sounding rehearsed.",
      uz: "Quyosh botayotgan Registonning oʻzi parvozga arziydi, lekin esimda qolgani — gidimiz Dilnoza bir soat davomida koshinlar haqida yodaki emas, jonli gapirgani.",
      ru: "Регистан на закате стоит одного перелёта, но больше всего запомнилась гид Дильноза, которая час рассказывала о мозаике — живо, без единой заученной фразы.",
      fr: "Le Réghistan au coucher du soleil valait à lui seul le vol, mais ce qui reste, c'est Dilnoza, notre guide, expliquant les céramiques pendant une heure sans jamais paraître récitée."
    }
  },
  {
    id: "r2", name: "James Whitfield", country: "United Kingdom", tour: "kyzylkum-nomad", rating: 5, date: "2026-09-27", initials: "JW",
    text: {
      en: "Two nights in the yurt camp and not a single other vehicle on the desert road. The team handled every detail, including the very early train.",
      uz: "Oʻtov lagerida ikki kecha va choʻl yoʻlida boshqa birorta mashina yoʻq. Jamoa hamma tafsilotni, jumladan juda erta poyezdni ham hal qildi.",
      ru: "Две ночи в юртовом лагере и ни одной другой машины на дороге через пустыню. Команда продумала всё, включая очень ранний поезд.",
      fr: "Deux nuits en camp de yourtes et aucun autre véhicule sur la piste. L'équipe a géré chaque détail, jusqu'au train très matinal."
    }
  },
  {
    id: "r3", name: "Elena Kovalenko", country: "Germany", tour: "golden-ring", rating: 5, date: "2026-08-14", initials: "EK",
    text: {
      en: "Eight days, four cities and no moment where we felt rushed. The drive from Khiva to Bukhara is long but the Amu Darya stop made it memorable.",
      uz: "Sakkiz kun, toʻrt shahar va hech qayerda shoshilish hissi yoʻq. Xivadan Buxoroga yoʻl uzoq, ammo Amudaryo boʻyidagi toʻxtash uni yodda qoldirdi.",
      ru: "Восемь дней, четыре города и ни одной спешки. Дорога из Хивы в Бухару длинная, но остановка на Амударье сделала её запоминающейся.",
      fr: "Huit jours, quatre villes et jamais l'impression de courir. La route de Khiva à Boukhara est longue, mais la halte sur l'Amou-Daria l'a rendue mémorable."
    }
  },
  {
    id: "r4", name: "Aiko Sato", country: "Japan", tour: "fergana-craft-trail", rating: 5, date: "2026-06-05", initials: "AS",
    text: {
      en: "I came for the silk and left with three bowls from Rishtan wrapped in my suitcase. Small group, generous pace, excellent food.",
      uz: "Ipak uchun kelgandim, chamadonimda Rishtondan olingan uchta kosa bilan qaytdim. Kichik guruh, bemahal sur'at va ajoyib taomlar.",
      ru: "Приехала за шёлком, а уехала с тремя риштанскими чашами в чемодане. Маленькая группа, спокойный темп, прекрасная еда.",
      fr: "Je suis venue pour la soie et repartie avec trois bols de Richten dans ma valise. Petit groupe, rythme doux, cuisine excellente."
    }
  },
  {
    id: "r5", name: "Marco Bellini", country: "Italy", tour: "imperial-private", rating: 5, date: "2026-05-22", initials: "MB",
    text: {
      en: "Private access to Itchan Kala before the gates opened was extraordinary. The five-star hotels were genuinely five-star, not local four.",
      uz: "Darvoza ochilishidan oldin Ichan Qalʼaga shaxsiy kirish ajoyib edi. Besh yulduzli mehmonxonalar chindan ham besh yulduzli, mahalliy «toʻrt» emas.",
      ru: "Частный доступ в Ичан-Калу до открытия ворот был исключительным. Отели 5* действительно пять звёзд, а не местные «четыре».",
      fr: "L'accès privé à Itchan Kala avant l'ouverture était extraordinaire. Les hôtels cinq étoiles l'étaient vraiment, pas des « quatre » locaux."
    }
  }
];

const FAQS = [
  {
    id: "f1",
    q: {
      en: "Do I need a visa for Uzbekistan?",
      uz: "Oʻzbekistonga viza kerakmi?",
      ru: "Нужна ли виза в Узбекистан?",
      fr: "Faut-il un visa pour l'Ouzbékistan ?"
    },
    a: {
      en: "Citizens of many countries — including the EU, UK, Japan, Korea and most CIS states — can enter visa-free for up to 30 days. Others can apply for an e-visa online at e-visa.gov.uz, usually approved within three working days. Check the rules for your passport before booking.",
      uz: "Koʻplab davlatlar — Yevropa Ittifoqi, Buyuk Britaniya, Yaponiya, Koreya va MDH davlatlari — fuqarolari 30 kungacha vizasiz kirishi mumkin. Boshqalar e-visa.gov.uz saytida onlayn e-viza olishlari mumkin, odatda uch ish kunida tasdiqlanadi. Bron qilishdan oldin pasportingiz uchun qoidalarni tekshiring.",
      ru: "Граждане многих стран — ЕС, Великобритании, Японии, Кореи и большинства стран СНГ — могут въезжать без визы на срок до 30 дней. Остальные оформляют электронную визу на e-visa.gov.uz, обычно за три рабочих дня. Перед бронированием уточните правила для вашего паспорта.",
      fr: "Les ressortissants de nombreux pays — UE, Royaume-Uni, Japon, Corée, plupart des pays de la CEI — entrent sans visa jusqu'à 30 jours. Les autres demandent un e-visa sur e-visa.gov.uz, accordé en général en trois jours ouvrés. Vérifiez les règles applicables à votre passeport avant de réserver."
    }
  },
  {
    id: "f2",
    q: {
      en: "When is the best time to travel?",
      uz: "Sayohat uchun eng yaxshi vaqt qachon?",
      ru: "Когда лучше всего ехать?",
      fr: "Quelle est la meilleure période ?"
    },
    a: {
      en: "April to May and September to October bring 20–28 °C days and clear skies. July and August are dry but often above 40 °C in Samarkand and Bukhara, while December to February is cold, though Khiva and Bukhara are quiet and beautiful in low season.",
      uz: "Aprel–may va sentabr–oktabr oylarida havo 20–28 °C, osmon tiniq. Iyul-avgust quruq, ammo Samarqand va Buxoroda koʻpincha 40 °C dan yuqori; dekabrdan fevralgacha sovuq, lekin Xiva va Buxoro past mavsumda sokin va goʻzal.",
      ru: "В апреле–мае и сентябре–октябре 20–28 °C и ясное небо. Июль и август сухие, но в Самарканде и Бухаре часто выше 40 °C; декабрь–февраль холодные, зато Хива и Бухара в низкий сезон тихи и красивы.",
      fr: "D'avril à mai et de septembre à octobre, il fait 20–28 °C sous un ciel clair. Juillet et août sont secs mais dépassent souvent 40 °C à Samarcande et Boukhara ; de décembre à février il fait froid, mais Khiva et Boukhara sont calmes et superbes hors saison."
    }
  },
  {
    id: "f3",
    q: {
      en: "How much cash should I carry?",
      uz: "Qancha naqd pul olib yurishim kerak?",
      ru: "Сколько наличных брать с собой?",
      fr: "Combien d'espèces emporter ?"
    },
    a: {
      en: "Uzbekistan is still largely a cash economy outside hotels. Carry Uzbek som for bazaars, taxis and small cafés; cards are accepted in Tashkent and in most Samarkand and Bukhara hotels. ATMs exist but can be empty or offline outside the capital, so bring dollars or euros to exchange at official banks or hotel desks.",
      uz: "Mehmonxonalardan tashqarida Oʻzbekiston asosan naqd pul iqtisodiyoti. Bozorlar, taksi va kichik choyxonalar uchun soʻm olib yuring; Toshkentda va koʻpchilik Samarqand-Buxoro mehmonxonalarida kartalar qabul qilinadi. Bankomatlar bor, ammo poytaxtdan tashqarida boʻsh yoki ishlamasligi mumkin, shuning uchun dollar yoki yevro olib kelib rasmiy bankda ayirboshlang.",
      ru: "Вне отелей Узбекистан во многом остаётся страной наличных. Держите сумы для базаров, такси и небольших чайхан; карты принимают в Ташкенте и в большинстве отелей Самарканда и Бухары. Банкоматы есть, но за пределами столицы могут быть пусты или не работать, поэтому везите доллары или евро для обмена в банке или отеле.",
      fr: "Hors des hôtels, l'Ouzbékistan reste largement une économie de cash. Gardez des sums pour les bazars, les taxis et les petits cafés ; les cartes passent à Tachkent et dans la plupart des hôtels de Samarcande et Boukhara. Les distributeurs existent mais peuvent être vides hors de la capitale : emportez des dollars ou des euros à changer en banque ou à l'hôtel."
    }
  },
  {
    id: "f4",
    q: {
      en: "How do the trains work?",
      uz: "Poyezdlar qanday ishlaydi?",
      ru: "Как устроены поезда?",
      fr: "Comment fonctionnent les trains ?"
    },
    a: {
      en: "The Afrosiyob high-speed train links Tashkent, Samarkand and Bukhara: about 2 h 10 min to Samarkand and 1 h 35 min onward to Bukhara. Tickets go on sale roughly 45 days ahead and the best seats sell out in high season — all train tickets in our packages are booked in advance.",
      uz: "Afrosiyob tezyurar poyezdi Toshkent, Samarqand va Buxoroni bogʻlaydi: Samarqandgacha taxminan 2 soat 10 daqiqa, Buxorogacha yana 1 soat 35 daqiqa. Chiptalar taxminan 45 kun oldin sotuvga chiqadi, yuqori mavsumda yaxshi joylar tez tugaydi — paketlarimizdagi barcha chiptalar oldindan band qilinadi.",
      ru: "Скоростной «Афросиёб» связывает Ташкент, Самарканд и Бухару: около 2 ч 10 мин до Самарканда и ещё 1 ч 35 мин до Бухары. Билеты появляются примерно за 45 дней, в высокий сезон лучшие места быстро расходятся — в наших пакетах все билеты бронируются заранее.",
      fr: "L'Afrosiyob relie Tachkent, Samarcande et Boukhara : environ 2 h 10 jusqu'à Samarcande, puis 1 h 35 jusqu'à Boukhara. Les billets sont mis en vente environ 45 jours avant et les meilleures places partent vite en haute saison — tous les billets de nos circuits sont réservés à l'avance."
    }
  },
  {
    id: "f5",
    q: {
      en: "Is Uzbekistan safe and comfortable for families?",
      uz: "Oʻzbekiston oilaviy sayohat uchun xavfsizmi?",
      ru: "Безопасен ли Узбекистан для семей?",
      fr: "L'Ouzbékistan est-il sûr et adapté aux familles ?"
    },
    a: {
      en: "Uzbekistan is one of the safest countries in the region, with low street crime and a very welcoming culture. Tap water is not for drinking — bottled water is provided on all tours. In summer, plan monument visits for early morning and late afternoon, and keep children covered in the sun.",
      uz: "Oʻzbekiston mintaqadagi eng xavfsiz davlatlardan biri: koʻcha jinoyatchiligi past, madaniyat juda mehmondoʻst. Vodoprovod suvi ichishga yaroqli emas — barcha turlarda shisha suv beriladi. Yozda obidalarga erta tongda va kechqurun boring, bolalarni quyoshdan himoya qiling.",
      ru: "Узбекистан — одна из самых безопасных стран региона: уличная преступность низкая, культура очень гостеприимная. Водопроводную воду пить нельзя — на всех турах выдаётся бутилированная. Летом посещайте памятники рано утром и вечером, защищайте детей от солнца.",
      fr: "L'Ouzbékistan est l'un des pays les plus sûrs de la région : criminalité de rue faible, culture très accueillante. L'eau du robinet ne se boit pas — de l'eau en bouteille est fournie sur tous les circuits. En été, visitez les monuments tôt le matin et en fin d'après-midi, et protégez les enfants du soleil."
    }
  },
  {
    id: "f6",
    q: {
      en: "What should I wear at the monuments?",
      uz: "Obidalarda qanday kiyinish kerak?",
      ru: "Как одеваться у памятников?",
      fr: "Comment s'habiller sur les sites ?"
    },
    a: {
      en: "Shoulders and knees covered is expected in working mosques and necropolises such as Shah-i-Zinda. Light long trousers, a scarf for women and comfortable shoes for uneven stone paving are enough; there is no strict dress code at the Registan or in the fortresses.",
      uz: "Shahi-Zinda kabi faoliyat yuritayotgan masjid va maqbaralarda yelka va tizzalar yopiq boʻlishi kerak. Yengil uzun shim, ayollar uchun roʻmol va notekis tosh yoʻlaklar uchun qulay poyabzal yetarli; Registon va qalʼalarda qatʼiy kiyim talabi yoʻq.",
      ru: "В действующих мечетях и некрополях, например в Шахи-Зинда, плечи и колени должны быть закрыты. Достаточно лёгких длинных брюк, платка для женщин и удобной обуви для неровной каменной мостовой; на Регистане и в крепостях строгого дресс-кода нет.",
      fr: "Épaules et genoux couverts sont attendus dans les mosquées en activité et les nécropoles comme Chah-i-Zinda. Un pantalon long léger, un foulard pour les femmes et des chaussures confortables pour les pavés suffisent ; pas de code strict au Réghistan ni dans les forteresses."
    }
  }
];
