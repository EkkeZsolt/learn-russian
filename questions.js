// Kérdésbank — Orosz nyelvkönyv 1-22. oldal (1. lecke + 2. lecke eleje)
// + az összes szám 1-100-ig párosítós feladatokban (10 feladat x 10 szám).
// Magyarázat mindenhol csak magyarul. Nincs TTS / hang.

function numberRu(n) {
  const ones = ["", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
  const teens = { 11: "одиннадцать", 12: "двенадцать", 13: "тринадцать", 14: "четырнадцать", 15: "пятнадцать", 16: "шестнадцать", 17: "семнадцать", 18: "восемнадцать", 19: "девятнадцать" };
  const tens = { 10: "десять", 20: "двадцать", 30: "тридцать", 40: "сорок", 50: "пятьдесят", 60: "шестьдесят", 70: "семьдесят", 80: "восемьдесят", 90: "девяносто" };
  if (n === 100) return "сто";
  if (n <= 10) return n === 10 ? tens[10] : ones[n];
  if (n < 20) return teens[n];
  const t = Math.floor(n / 10) * 10, o = n % 10;
  return o === 0 ? tens[t] : tens[t] + " " + ones[o];
}

function numberMatchTasks() {
  const tasks = [];
  for (let start = 1; start <= 91; start += 10) {
    const end = Math.min(start + 9, 100);
    const pairs = [];
    for (let n = start; n <= end; n++) pairs.push([String(n), numberRu(n)]);
    tasks.push({
      id: "num" + start, type: "match", cat: "Számok " + start + "–" + end,
      q: "Párosítsd a számokat! (" + start + "–" + end + ")",
      pairs: pairs,
      explain: "A tízesek: 20 двадцать, 30 тридцать, 40 сорок, 50 пятьдесят, 60 шестьдесят, 70 семьдесят, 80 восемьдесят, 90 девяносто, 100 сто. Az összetett számokat egyszerűen egymás után mondjuk, például 42 = сорок два."
    });
  }
  return tasks;
}

const QUESTIONS = [
  // ---------- Feleletválasztós: orosz -> magyar (1. lecke szavai) ----------
  { id: "c1", type: "choice", cat: "Szókincs", q: "Mit jelent: машина?", options: ["autó", "villamos", "busz", "bőrönd"], answer: 0, explain: "A машина jelentése: autó. A könyvben: Это машина? – Ez autó?" },
  { id: "c2", type: "choice", cat: "Szókincs", q: "Mit jelent: собака?", options: ["macska", "kutya", "nyúl", "hal"], answer: 1, explain: "A собака jelentése: kutya. A С betű példaszava a 9. oldalon." },
  { id: "c3", type: "choice", cat: "Szókincs", q: "Mit jelent: чемодан?", options: ["ablak", "tea", "bőrönd", "könyv"], answer: 2, explain: "A чемодан jelentése: bőrönd. A Ч betű példaszava a 9. oldalon." },
  { id: "c4", type: "choice", cat: "Szókincs", q: "Mit jelent: окно?", options: ["ajtó", "nap", "alma", "ablak"], answer: 3, explain: "Az окно jelentése: ablak. Semlegesnemű szó, ezért: это окно." },
  { id: "c5", type: "choice", cat: "Szókincs", q: "Mit jelent: хлеб?", options: ["kenyér", "tej", "sajt", "szappan"], answer: 0, explain: "A хлеб jelentése: kenyér. A Х betű példaszava a 9. oldalon." },
  { id: "c6", type: "choice", cat: "Szókincs", q: "Mit jelent: молоко?", options: ["alma", "tej", "tea", "hal"], answer: 1, explain: "A молоко jelentése: tej. Az О betű példaszava a 9. oldalon." },

  // ---------- Feleletválasztós: magyar -> orosz ----------
  { id: "c7", type: "choice", cat: "Szókincs", q: "Hogy van oroszul: „anya”?", options: ["отец", "сестра", "мать", "жена"], answer: 2, explain: "Az anya oroszul мать, becézve мама. A папа, дядя és дедушка szavak a természetes nemük miatt hímneműek." },
  { id: "c8", type: "choice", cat: "Kifejezések", q: "Hogy köszöntöd reggel: „Jó reggelt”?", options: ["Добрый вечер", "Доброе утро", "До свидания", "Пока"], answer: 1, explain: "Jó reggelt = Доброе утро. Este: Добрый вечер, elköszönéskor: До свидания." },
  { id: "c9", type: "choice", cat: "Nyelvtan", q: "Személyre melyik kérdőszóval kérdezünk: „Ki ez?”", options: ["Что это?", "Кто это?", "Это кто?", "Он это?"], answer: 1, explain: "Személyre a кто, dologra a что kérdőszóval kérdezünk. Érdekesség: oroszul állatokra is a кто használatos." },
  { id: "c10", type: "choice", cat: "Nyelvtan", q: "Melyik névmás illik ide: машина → ___", options: ["он", "она", "оно", "они"], answer: 1, explain: "A машина nőnemű (а-ra végződik), ezért она. Hímnemű főnevet az он, semlegesneműt az оно helyettesít." },
  { id: "c11", type: "choice", cat: "Nyelvtan", q: "Melyik névmás illik ide: окно → ___", options: ["он", "она", "оно", "они"], answer: 2, explain: "Az окно semlegesnemű (о-ra végződik), ezért оно. Többes számban minden nemre: они." },
  { id: "c12", type: "choice", cat: "Nyelvtan", q: "Mi a машина többes száma?", options: ["машино", "машина", "машин", "машины"], answer: 3, explain: "Nő- és semlegesnemben a többes szám végződése az egyes számú а/о/е végződés helyén áll: машина → машины, окно → окна." },

  // ---------- Mondatkiegészítés ----------
  { id: "f1", type: "fill", cat: "Mondatkiegészítés", q: "___ это? – Это Павел. (Ki ez?)", options: ["Что", "Кто", "Это", "Он"], answer: 1, explain: "Mivel személyről (Павел) van szó, a Кто kérdőszó kell. Dolognál Что это? lenne a kérdés." },
  { id: "f2", type: "fill", cat: "Mondatkiegészítés", q: "Это ___ машина. (Ez az én autóm.)", options: ["мой", "моя", "моё", "мои"], answer: 1, explain: "A машина nőnemű, ezért a birtokos névmás nőnemű alakja kell: моя. Hímnemben мой, semlegesnemben моё, többes számban мои lenne." },
  { id: "f3", type: "fill", cat: "Mondatkiegészítés", q: "Это ___ брат. (Ez a mi fivérünk.)", options: ["наша", "наше", "наш", "наши"], answer: 2, explain: "A брат hímnemű, ezért a „miénk” hímnemű alakja kell: наш. Nőnemben наша, semlegesnemben наше, többesben наши lenne." },
  { id: "f4", type: "fill", cat: "Mondatkiegészítés", q: "___ ваша машина? (Ez a ti / az Ön autója?) – a машина szó előtt:", options: ["ваш", "ваша", "ваше", "ваши"], answer: 1, explain: "A машина nőnemű, ezért ваша. A ваш alak egyszerre jelenti azt is, hogy „a tietek”, „az Öné” és „az Önöké”." },
  { id: "f5", type: "fill", cat: "Mondatkiegészítés", q: "Este így köszönünk: Добрый ___!", options: ["утро", "день", "вечер", "пока"], answer: 2, explain: "Jó estét = Добрый вечер. Reggel: Доброе утро, napközben: Добрый день." },
  { id: "f6", type: "fill", cat: "Mondatkiegészítés", q: "Többes számba téve: вилка → ___", options: ["вилки", "вилку", "вилка", "вилке"], answer: 0, explain: "A вилка (villa) nőnemű, többes száma вилки. Hím- és nőnemben kemény mássalhangzó után leggyakrabban -ы, lágy mássalhangzó után -и a többes jel." },

  // ---------- Igaz / hamis ----------
  { id: "b1", type: "bool", cat: "Igaz vagy hamis", q: "Igaz-e: az oroszban nincs névelő (a, az, egy).", answer: true, explain: "Igaz. A könyv 13. oldala szerint az oroszban névelő nincs, ezért az Это заяц egyszerre jelentheti azt, hogy „Ez nyúl” vagy „Ez egy nyúl”." },
  { id: "b2", type: "bool", cat: "Igaz vagy hamis", q: "Igaz-e: a вы névmás csak azt jelenti, hogy „ti”.", answer: false, explain: "Hamis. A вы a magázó alak is: jelenti azt is, hogy „Ön” és „Önök”. Az orosznak nincs külön Ön/Maga párja." },
  { id: "b3", type: "bool", cat: "Igaz vagy hamis", q: "Igaz-e: a кто kérdőszót állatokra is használjuk oroszul.", answer: true, explain: "Igaz. A könyv külön kiemeli: az oroszban nemcsak emberekre, hanem állatokra is a Кто kérdőszót használjuk, például Кто это? – Это заяц." },
  { id: "b4", type: "bool", cat: "Igaz vagy hamis", q: "Igaz-e: a солнце (nap) hímnemű főnév.", answer: false, explain: "Hamis. A солнце е-re végződik, ezért semlegesnemű, így: это солнце, és az оно névmás helyettesíti." },

  // ---------- Beírós ----------
  { id: "i1", type: "input", cat: "Beírós", q: "Írd le oroszul: kutya", answer: "собака", accept: ["собака"], explain: "Kutya oroszul: собака. Ugyanez a szó a С betű példája is a könyvben." },
  { id: "i2", type: "input", cat: "Beírós", q: "Írd le oroszul a hivatalos köszönést: Szervusztok / Jó napot (Здравствуйте)", hint: "Cirill betűkkel írd, így kezdődik: Здрав…", answer: "Здравствуйте", accept: ["Здравствуйте", "здравствуйте"], explain: "A Здравствуйте a hivatalos, magázó köszönés. Tegeződve csak ennyi: Здравствуй." },
  { id: "i3", type: "input", cat: "Beírós", q: "Írd le magyarul: бабушка", answer: "nagymama", accept: ["nagymama", "nagyanya", "mama"], explain: "A бабушка jelentése: nagymama. A nagypapa párja: дедушка." },
  { id: "i4", type: "input", cat: "Beírós", q: "Írd le oroszul: apa (a rövidebb, családi alak is jó)", answer: "отец", accept: ["отец", "папа"], explain: "Apa oroszul отец, családi alakban папа. Mindkettő hímnemű." },
  { id: "i5", type: "input", cat: "Beírós", q: "Írd le számjeggyel: пятнадцать", answer: "15", accept: ["15"], explain: "A пятнадцать jelentése 15. A 11–19 közötti számok mind -надцать végződésűek, például 13 = тринадцать." },

  // ---------- Szórend-kirakás ----------
  { id: "o1", type: "order", cat: "Rakd sorrendbe", q: "Rakd ki a mondatot: „Ez az én anyukám.”", words: ["Это", "моя", "мама"], explain: "A mondat: Это моя мама. A мама nőnemű, ezért моя a helyes birtokos alak." },
  { id: "o2", type: "order", cat: "Rakd sorrendbe", q: "Rakd ki a kérdést: „Ki ez?”", words: ["Кто", "это?"], explain: "A kérdés: Кто это? Személyre a кто, dologra a что kérdőszót használjuk." },
  { id: "o3", type: "order", cat: "Rakd sorrendbe", q: "Rakd ki a mondatot: „Ez az én fivérem, Vitya.”", words: ["Это", "мой", "брат,", "Витя"], explain: "A mondat: Это мой брат, Витя. A брат hímnemű, ezért мой kell, nem моя." },

  // ---------- Párosítás (nem számok) ----------
  { id: "m1", type: "match", cat: "Párosítás – család", q: "Párosítsd a családtagokat!", pairs: [["мать", "anya"], ["отец", "apa"], ["сестра", "lánytestvér"], ["брат", "fiútestvér"], ["бабушка", "nagymama"], ["дедушка", "nagypapa"]], explain: "Család: мать (anya), отец (apa), сестра (lánytestvér), брат (fiútestvér), бабушка (nagymama), дедушка (nagypapa). A szülők: родители, a gyerekek: дети." },
  { id: "m2", type: "match", cat: "Párosítás – foglalkozások", q: "Párosítsd a foglalkozásokat!", pairs: [["доктор", "orvos"], ["инженер", "mérnök"], ["учитель", "tanár"], ["повар", "szakács"], ["пилот", "pilóta"], ["почтальон", "postás"]], explain: "Foglalkozások a 20–21. oldalról. Figyeld meg: egyes szakmáknak külön női alakja van, például артист – артистка, másoké közös: инженер férfiakra és nőkre is mondható." },
  { id: "m3", type: "match", cat: "Párosítás – köszönések", q: "Párosítsd a köszönéseket!", pairs: [["Доброе утро", "Jó reggelt"], ["Добрый день", "Jó napot"], ["Добрый вечер", "Jó estét"], ["Привет!", "Szia! (találkozáskor)"], ["Пока!", "Szia! (búcsúzáskor)"], ["До свидания", "Viszontlátásra"], ["Здравствуйте", "Jó napot (hivatalos)"], ["Всего доброго", "Minden jót!"], ["До завтра", "Viszlát holnapig"]], explain: "Fontos különbség: a Привет! csak találkozáskor, a Пока! csak búcsúzáskor használható. Biztos elköszönés mindig a До свидания. A Здравствуйте a hivatalos köszönés, tegeződve röviden: Здравствуй." },
  { id: "m4", type: "match", cat: "Párosítás – ábécés szavak", q: "Párosítsd az ábécé példaszavait!", pairs: [["дверь", "ajtó"], ["книга", "könyv"], ["чай", "tea"], ["нос", "orr"], ["солнце", "nap"], ["рыба", "hal"]], explain: "Ezek a szavak a 8–9. oldalon egy-egy cirill betű példaszavai: Д – дверь, К – книга, Й – чай, Н – нос, Ц – солнце, Ы – рыба." },

  // ---------- Számok 1-100 (automatikusan, 10 párosítós feladat) ----------
  ...numberMatchTasks()
];

// =====================================================================
// MUNKAFÜZET (Шаг за шагом 1 – orosz munkafüzet) 1-16. oldal összes anyaga
// 3-8. old: 1. lecke gyakorlatai | 11-16. old: 2. lecke gyakorlatai
// (Az 1-2. oldal csak címlap és impresszum, tananyag nincs rajtuk.)
// =====================================================================
const WORKBOOK_QUESTIONS = [
  // ---------- Párosítások (csoportos, hogy 1 óra alatt maradjon) ----------
  { id: "w-m1", type: "match", cat: "Munkafüzet – országok és fővárosok", q: "Párosítsd az országokat a fővárosukkal! (1. rész)", pairs: [["Норвегия", "Осло (Oslo)"], ["Аргентина", "Буэнос-Айрес"], ["Чили", "Сантьяго"], ["Куба", "Гавана (Havanna)"], ["Финляндия", "Хельсинки"], ["Дания", "Копенгаген"], ["Ирландия", "Дублин"]], explain: "Ez a munkafüzet 3. oldalának feladata. Figyeld meg: a külföldi nevekben a „h” hangot oroszul gyakran „г” betű adja vissza, például Гавана (Havanna) vagy Гамбург." },
  { id: "w-m2", type: "match", cat: "Munkafüzet – országok és fővárosok", q: "Párosítsd az országokat a fővárosukkal! (2. rész)", pairs: [["Канада", "Оттава"], ["Америка (США)", "Вашингтон"], ["Австралия", "Канберра"], ["Япония", "Токио"], ["Китай", "Пекин"], ["Эстония", "Таллин"], ["Литва", "Вильнюс"]], explain: "A munkafüzet 3. oldalának folytatása. Érdekesség: Ausztrália fővárosa nem Sydney, hanem Канберра (Canberra)." },
  { id: "w-m3", type: "match", cat: "Munkafüzet – autómárkák", q: "Olvasd el a cirill autómárkákat, és párosítsd a nevükkel!", pairs: [["Лада", "Lada"], ["Форд", "Ford"], ["Рено", "Renault"], ["Опель", "Opel"], ["Порш", "Porsche"], ["Ауди", "Audi"], ["Ниссан", "Nissan"], ["Мерседес", "Mercedes"]], explain: "A nemzetközi márkaneveket oroszul is cirillel írják, kiejtés szerint: például a Renault oroszul Рено, a Porsche pedig Порш." },
  { id: "w-m4", type: "match", cat: "Munkafüzet – városok", q: "Mit jelentenek ezek a városnevek magyarul?", pairs: [["Лос-Анджелес", "Los Angeles"], ["Гонконг", "Hongkong"], ["Нью-Йорк", "New York"], ["Рио-де-Жанейро", "Rio de Janeiro"], ["Мельбурн", "Melbourne"], ["Санкт-Петербург", "Szentpétervár"]], explain: "A városneveket is átírják cirillre. A Нью-Йорк végén a „к” betű van, a Санкт-Петербург pedig Oroszország egyik legismertebb városa." },
  { id: "w-m5", type: "match", cat: "Munkafüzet – feliratok, boltok", q: "Párosítsd a bolt- és intézményfeliratokat a jelentésükkel!", pairs: [["Антиквариат", "régiségbolt"], ["Текстиль", "textilbolt"], ["Косметика", "kozmetikai üzlet"], ["Оптика", "optika / látszerész"], ["Супермаркет", "szupermarket"], ["Кино", "mozi"], ["Мебель", "bútorbolt"], ["Турфирма", "utazási iroda"]], explain: "Ezek a feliratok a munkafüzet 5. oldalán, fényképeken szerepelnek. Ha ezeket felismered, Oroszországban is elboldogulsz az utcán." },
  { id: "w-m6", type: "match", cat: "Munkafüzet – feliratok, ajánlatok", q: "Párosítsd a hirdetési feliratokat a jelentésükkel!", pairs: [["Акция", "akció"], ["Дисконт", "leárazás / diszkont"], ["Кредит", "hitel"], ["Фитнес", "fitnesz"], ["Бизнес-ланч", "üzleti ebéd"], ["Кура гриль", "grillcsirke"]], explain: "Az 5. oldal alsó feliratai. Vigyázz: az Акция nem „akciófilm”, hanem árengedményt, akciót jelent a boltokban." },
  { id: "w-m7", type: "match", cat: "Munkafüzet – állatok", q: "Párosítsd az állatneveket!", pairs: [["тигр", "tigris"], ["страус", "strucc"], ["лама", "láma"], ["медведь", "medve"], ["гиена", "hiéna"], ["шакал", "sakál"], ["кондор", "kondor"], ["бульдог", "buldog"]], explain: "A munkafüzet 6. és 8. oldalának állatai. A медведь szó szerint „mézevőt” jelent – így hívják a medvét oroszul." },
  { id: "w-m8", type: "match", cat: "Munkafüzet – szókincs", q: "Párosítsd a szavakat a jelentésükkel!", pairs: [["чашка", "csésze"], ["жизнь", "élet"], ["овощи", "zöldségek"], ["царь", "cár"], ["горло", "torok"], ["цирк", "cirkusz"], ["жена", "feleség"], ["попугай", "papagáj"]], explain: "A 6. és 12. oldal szavai – ezeket kézírással is meg kellett keresni a munkafüzetben. A жизнь (élet) és a жена (feleség) könnyen összekeverhető, figyelj rájuk!" },
  { id: "w-m9", type: "match", cat: "Munkafüzet – család többes száma", q: "Párosítsd a családtagokat a többes számukkal!", pairs: [["мама", "мамы"], ["сестра", "сёстры"], ["брат", "братья"], ["сын", "сыновья"], ["бабушка", "бабушки"], ["внук", "внуки"], ["тётя", "тёти"], ["дядя", "дяди"]], explain: "A 11. oldal feladata. Két rendhagyó alakot jegyezz meg: брат → братья és сын → сыновья. A hivatalosabb мать és дочь szavaké pedig: матери, дочери." },
  { id: "w-m10", type: "match", cat: "Munkafüzet – жить (él, lakik)", q: "Párosítsd a névmásokat a жить ige alakjaival!", pairs: [["я", "живу"], ["ты", "живёшь"], ["он", "живёт"], ["мы", "живём"], ["вы", "живёте"], ["они", "живут"]], explain: "A жить (él, lakik) ragozása a 13. oldalról: живу, живёшь, живёт, живём, живёте, живут. A végződések: -у, -ёшь, -ёт, -ём, -ёте, -ут." },
  { id: "w-m11", type: "match", cat: "Munkafüzet – любить (szeret)", q: "Párosítsd a névmásokat a любить ige alakjaival!", pairs: [["я", "люблю"], ["ты", "любишь"], ["он", "любит"], ["мы", "любим"], ["вы", "любите"], ["они", "любят"]], explain: "A любить (szeret) ragozása: люблю, любишь, любит, любим, любите, любят. Ebben az igében egyes szám első személyben a „б” után egy „л” is bekerül: люблю." },
  { id: "w-m12", type: "match", cat: "Munkafüzet – női foglalkozások", q: "Párosítsd a női foglalkozásneveket!", pairs: [["ученица", "tanuló (lány)"], ["официантка", "pincérnő"], ["медсестра", "ápolónő"], ["артистка", "színésznő"], ["учительница", "tanárnő"], ["домохозяйка", "háziasszony"], ["секретарша", "titkárnő"], ["продавщица", "eladónő"]], explain: "A 14. oldal összekevert betűs szavai. Sok foglalkozásnak külön női alakja van: a hímnemű alak -ка vagy -ница, -щица végződést kap, például учитель → учительница." },

  // ---------- Egyéb típusok ----------
  { id: "w-b1", type: "bool", cat: "Munkafüzet – átírás", q: "Igaz-e: az idegen nevekben a „h” hangot oroszul gyakran a „г” betűvel írják át (pl. Havanna → Гавана).", answer: true, explain: "Igaz. A munkafüzet 3. oldala hívja fel rá a figyelmet: Habsburg → Габсбург, huszár → гусар. Ezért lesz a Havanna oroszul Гавана, a Hamburg pedig Гамбург." },
  { id: "w-i1", type: "input", cat: "Munkafüzet – betűkeverék", q: "Melyik szó betűi keveredtek össze: нсетни? (egy sport)", answer: "теннис", accept: ["теннис"], explain: "нсетни → теннис, vagyis tenisz. A munkafüzet 4. oldalán ilyen betűkeverékekből kell szavakat kirakni." },
  { id: "w-i2", type: "input", cat: "Munkafüzet – betűkeverék", q: "Melyik szó betűi keveredtek össze: тлбуфо? (egy sport)", answer: "футбол", accept: ["футбол"], explain: "тлбуфо → футбол, vagyis futball (labdarúgás). Ugyanebben a feladatban szerepel még: афирж → жираф (zsiráf) és лкориокд → крокодил (krokodil)." },
  { id: "w-i3", type: "input", cat: "Munkafüzet – betűkeverék", q: "Melyik szó betűi keveredtek össze: мтьерпкю?", answer: "компьютер", accept: ["компьютер", "компютер"], explain: "мтьерпкю → компьютер, vagyis számítógép. Figyeld meg: az orosz szóban a „ью” betűkapcsolat adja a „ju” hangot." },
  { id: "w-f1", type: "fill", cat: "Munkafüzet – számolás 0–10", q: "восемь + ___ = десять (8 + ? = 10)", options: ["один", "два", "три", "пять"], answer: 1, explain: "8 + 2 = 10, oroszul: восемь + два = десять. Ez a munkafüzet 8. oldalának számtani feladata." },
  { id: "w-c1", type: "choice", cat: "Munkafüzet – számolás 0–10", q: "Mennyi: семь − два? (7 − 2)", options: ["четыре", "шесть", "пять", "три"], answer: 2, explain: "7 − 2 = 5, oroszul пять. Ugyaninnen: шесть − пять = один (6 − 5 = 1)." },
  { id: "w-i4", type: "input", cat: "Munkafüzet – számolás 0–20", q: "Számold ki, és írd be számjeggyel: семнадцать − двенадцать + восемь − шесть + двенадцать =", answer: "19", accept: ["19"], explain: "17 − 12 + 8 − 6 + 12 = 19, oroszul девятнадцать. Ez a 9. oldal egyik hosszabb számtani feladata." },
  { id: "w-i5", type: "input", cat: "Munkafüzet – számolás 0–20", q: "Számold ki, és írd be számjeggyel: пять + тринадцать − одиннадцать + тринадцать − восемнадцать =", answer: "2", accept: ["2"], explain: "5 + 13 − 11 + 13 − 18 = 2, oroszul два. Ha fejben számolsz oroszul, a számnevek is rögzülnek." },
  { id: "w-c2", type: "choice", cat: "Munkafüzet – többes szám", q: "Mi a лама (láma) többes száma?", options: ["ламу", "ламы", "лама", "ламов"], answer: 1, explain: "A лама nőnemű, többes száma ламы. Hasonlóan: зебра → зебры, гиена → гиены. Lágyságjel után viszont -и jár: például лошадь → лошади." },
  { id: "w-b2", type: "bool", cat: "Munkafüzet – többes szám", q: "Igaz-e: a шимпанзе (csimpánz) szó többes számban sem változik.", answer: true, explain: "Igaz. A munkafüzet 9. oldala jegyzi meg: az idegen eredetű, magánhangzóra végződő állatnevek egy része (pl. шимпанзе, кенгуру) alakilag változatlan egyes és többes számban is." },
  { id: "w-c3", type: "choice", cat: "Munkafüzet – család többes száma", q: "Mi a мать (anya, hivatalos alak) többes száma?", options: ["матьи", "мамы", "матери", "матов"], answer: 2, explain: "A мать rendhagyó: többes száma матери. Ugyanígy viselkedik a дочь (leánygyermek) is: дочери. A hétköznapi мама alak viszont szabályos: мамы." },
  { id: "w-i6", type: "input", cat: "Munkafüzet – család többes száma", q: "Írd le a дочь (leánygyermek) többes számát oroszul!", answer: "дочери", accept: ["дочери"], explain: "A дочь többes száma rendhagyóan дочери – ugyanúgy, ahogy a мать szóból матери lesz. Ezeket külön meg kell tanulni." },
  { id: "w-f2", type: "fill", cat: "Munkafüzet – családfa", q: "III. Sándor cár II. Sándor fia volt. Oroszul: Александр III – ___ Александра II.", options: ["дочь", "сын", "брат", "отец"], answer: 1, explain: "A „fia valakinek” szerkezetben előbb áll a birtok, utána a birtokos birtokos esetben: сын Александра, vagyis „Sándor fia”. Ez a 11–12. oldal családfás feladata." },
  { id: "w-c4", type: "choice", cat: "Munkafüzet – mondatfordítás", q: "Mit jelent: Я люблю молоко?", options: ["Tejet szeretek.", "Ő szereti a tejet.", "Mi szeretjük a tejet.", "Szereted a tejet?"], answer: 0, explain: "Я люблю молоко. = (Én) szeretem a tejet. Az oroszban a személyes névmást ki is lehet tenni: a люблю alakból látszik, hogy én-ről van szó. (13. oldal)" },
  { id: "w-c5", type: "choice", cat: "Munkafüzet – mondatfordítás", q: "Mit jelent: Он живёт в Лондоне?", options: ["Ti Londonban éltek.", "Ő (fiú/férfi) Londonban él.", "Mi Londonban élünk.", "Londonban élsz?"], answer: 1, explain: "Он живёт в Лондоне. = Ő Londonban él. A „hol lakik” kérdésre a в + elöljárós eset válaszol; a Лондон szóból Лондоне lesz. (13. oldal)" },
  { id: "w-c6", type: "choice", cat: "Munkafüzet – mondatfordítás", q: "Mit jelent: Вы любите чай?", options: ["Szeretem a teát.", "Szeretik a teát (ők).", "Szeretitek / Szereti a teát?", "Ő szereti a teát."], answer: 2, explain: "Вы любите чай? = Szeretitek a teát? – vagy magázva: Szereti a teát? A вы alak mindkettőt jelentheti, a helyzet dönti el. (13. oldal)" },
  { id: "w-o1", type: "order", cat: "Munkafüzet – szórend", q: "Rakd ki a mondatot: „Szeretem a tejet.”", words: ["Я", "люблю", "молоко"], explain: "A mondat: Я люблю молоко. Az orosz szórend alapja itt is alany – ige – tárgy, mint a magyarban." },
  { id: "w-o2", type: "order", cat: "Munkafüzet – szórend", q: "Rakd ki a mondatot: „Szeretjük a kenyeret.”", words: ["Мы", "любим", "хлеб"], explain: "A mondat: Мы любим хлеб. A любим alak a мы névmáshoz tartozik – a 13. oldal fordítós feladatából való." },
  { id: "w-o3", type: "order", cat: "Munkafüzet – ábécérend", q: "Koppints az állatokra ábécérendben! (Segítség: Ж < З < К < О < П)", words: ["жираф", "зебра", "крокодил", "орангутанг", "пингвин", "пума"], explain: "Az orosz ábécérend: жираф (Ж), зебра (З), крокодил (К), орангутанг (О), пингвин (П, „пи”), пума (П, „пу”). A munkafüzet 7–8. oldalán ilyen sorba rendezős feladatok vannak." },
  { id: "w-c7", type: "choice", cat: "Munkafüzet – ki ő?", q: "Egy nő a bankban dolgozik, ő a bankárnő. Melyik a helyes mondat róla?", options: ["Кто он? – Он банкир.", "Кто она? – Она банкир.", "Кто она? – Он банкир.", "Что это? – Это банкир."], answer: 1, explain: "A 14. oldal feladata: nőre az она névmással kérdezünk és válaszolunk: Кто она? – Она банкир. Férfira: Кто он? – Он шофёр (a példa szerint)." },
  { id: "w-c8", type: "choice", cat: "Munkafüzet – ki ő?", q: "Melyik válasz illik ide: – Твой отец врач? (Az apukád orvos?) – Nem, nem orvos, hanem sofőr.", options: ["Да, он врач.", "Нет, он не врач. Он шофёр.", "Нет, она не врач. Она шофёр.", "Да, они врачи."], answer: 1, explain: "Tagadáskor: Нет, он не врач. Он шофёр. Figyeld meg: az отец (apa) hímnemű, ezért он a névmás – ez a 15. oldal párbeszédes feladata." },
  { id: "w-f3", type: "fill", cat: "Munkafüzet – birtokos névmás", q: "___ бабушка (a mi nagymamánk)", options: ["наш", "наша", "наше", "наши"], answer: 1, explain: "A бабушка nőnemű, ezért a „miénk” nőnemű alakja kell: наша бабушка. Ugyanígy egyes számban a кошка előtt is ваша/наша áll. (15. oldal)" },
  { id: "w-f4", type: "fill", cat: "Munkafüzet – birtokos névmás", q: "___ деньги (a te pénzed – többes szám!)", options: ["твой", "твоя", "твоё", "твои"], answer: 3, explain: "A деньги csak többes számban használatos szó, ezért a birtokos névmás is többes alakot kap: твои деньги. Többesben a nemek már nem számítanak: мой/моя/моё helyett is мои áll." },
  { id: "w-f5", type: "fill", cat: "Munkafüzet – birtokos névmás", q: "___ дядя (az én nagybácsim) – vigyázz, csapda!", options: ["моя", "моё", "мой", "мои"], answer: 2, explain: "Bár a дядя -я-ra végződik, férfit jelent, ezért a természetes neme dönt: мой дядя. Ugyanígy мой папа is. A végződés ilyenkor félrevezető! (15. oldal)" },
  { id: "w-f6", type: "fill", cat: "Munkafüzet – birtokos névmás", q: "___ яблоко (a mi almánk)", options: ["наш", "наша", "наше", "наши"], answer: 2, explain: "Az яблоко semlegesnemű (о-ra végződik), ezért наше яблоко. Semlegesnemben az egyes számú birtokos alak mindig -е/-ё végű: моё, твоё, наше, ваше." },
  { id: "w-f7", type: "fill", cat: "Munkafüzet – hol van? (Где…? Вот…)", q: "– Где наша машина? – Вот ___ . (Itt van – az autóra mutatva)", options: ["он", "она", "оно", "они"], answer: 1, explain: "A машина nőnemű, ezért a válaszban она helyettesíti: Вот она. Hímnemű tárgynál Вот он, semlegesnél Вот оно, többesnél Вот они lenne. Ez a 16. oldal feladata." },
  { id: "w-f8", type: "fill", cat: "Munkafüzet – hol van? (Где…? Вот…)", q: "– Где ___ молоко? – Вот оно. (Hol a te tejed?)", options: ["мой", "моя", "моё", "твой"], answer: 2, explain: "A tej (молоко) semlegesnemű, a „te” birtokos semleges alakja pedig твоё – a mondat végén az оно névmás is ezt erősíti meg: Где твоё молоко? – Вот оно." }
];
