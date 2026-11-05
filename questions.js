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
  { id: "m3", type: "match", cat: "Párosítás – köszönések", q: "Párosítsd a köszönéseket!", pairs: [["Доброе утро", "Jó reggelt"], ["Добрый день", "Jó napot"], ["Добрый вечер", "Jó estét"], ["Привет!", "Szia! (találkozáskor)"], ["Пока!", "Szia! (búcsúzáskor)"], ["До свидания", "Viszontlátásra"]], explain: "Fontos különbség: a Привет! csak találkozáskor, a Пока! csak búcsúzáskor használható. Biztos elköszönés mindig a До свидания." },
  { id: "m4", type: "match", cat: "Párosítás – ábécés szavak", q: "Párosítsd az ábécé példaszavait!", pairs: [["дверь", "ajtó"], ["книга", "könyv"], ["чай", "tea"], ["нос", "orr"], ["солнце", "nap"], ["рыба", "hal"]], explain: "Ezek a szavak a 8–9. oldalon egy-egy cirill betű példaszavai: Д – дверь, К – книга, Й – чай, Н – нос, Ц – солнце, Ы – рыба." },

  // ---------- Számok 1-100 (automatikusan, 10 párosítós feladat) ----------
  ...numberMatchTasks()
];
