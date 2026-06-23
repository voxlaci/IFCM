const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
const priorities = document.querySelectorAll(".priority");
const modal = document.querySelector(".video-modal");
const form = document.querySelector(".voice-form");
const languageSelect = document.querySelector("#language-select");
const directorySearch = document.querySelector("#directory-search");
const directoryRegion = document.querySelector("#directory-region");
const calendarSearch = document.querySelector("#calendar-search");

const activityData = [
  { title:"Budapest Music Festival 2026", place:"Budapest, Hungary", start:"23", month:"JUN", year:"2026", range:"23–28 June 2026", type:"festival" },
  { title:"International Choral Celebration & Laurea Mundi Budapest 2026", place:"Budapest, Hungary", start:"02", month:"JUL", year:"2026", range:"2–6 July 2026", type:"competition" },
  { title:"Summa Cum Laude International Youth Music Festival 2026", place:"Vienna, Austria", start:"03", month:"JUL", year:"2026", range:"3–8 July 2026", type:"festival" },
  { title:"Toscana Music Festival 2026", place:"Montecatini Terme, Italy", start:"21", month:"JUL", year:"2026", range:"21–26 July 2026", type:"festival" },
  { title:"International Choral Conducting Summer School", place:"Limerick, Ireland", start:"30", month:"JUL", year:"2026", range:"30 July–7 August 2026", type:"learning" },
  { title:"International Cantemus Choral Festival 2026", place:"Nyíregyháza, Hungary", start:"15", month:"AUG", year:"2026", range:"15–21 August 2026", type:"festival" },
  { title:"Paris Music Festival 2026", place:"Paris, France", start:"18", month:"AUG", year:"2026", range:"18–23 August 2026", type:"festival" },
  { title:"Praha Music Festival 2026", place:"Prague, Czechia", start:"25", month:"AUG", year:"2026", range:"25–30 August 2026", type:"festival" },
  { title:"International Choir Festival Music and Sea", place:"Paralia / Katerini, Greece", start:"14", month:"SEP", year:"2026", range:"14–20 September 2026", type:"festival" },
  { title:"Per Musicam Ad Astra 2026", place:"Toruń, Poland", start:"16", month:"SEP", year:"2026", range:"16–21 September 2026", type:"festival" },
  { title:"Grieg International Choir Festival & NINA Solo Competition", place:"Bergen, Norway", start:"24", month:"SEP", year:"2026", range:"24–27 September 2026", type:"competition" },
  { title:"Beira Interior International Choir Festival & Competition", place:"Fundão, Portugal", start:"06", month:"OCT", year:"2026", range:"6–11 October 2026", type:"competition" },
  { title:"Venezia in Musica International Choir Festival & Competition", place:"Caorle & Venice, Italy", start:"22", month:"OCT", year:"2026", range:"22–27 October 2026", type:"competition" },
  { title:"Thailand International Senior Festival 2026", place:"Bangkok, Thailand", start:"19", month:"NOV", year:"2026", range:"19–24 November 2026", type:"festival" },
  { title:"Krakow Advent & Christmas Choir Festival", place:"Krakow, Poland", start:"04", month:"DEC", year:"2026", range:"4–6 December 2026", type:"festival" },
  { title:"International Gdansk Choir Festival", place:"Gdańsk, Poland", start:"12", month:"MAR", year:"2027", range:"12–14 March 2027", type:"festival" },
  { title:"International Children's & Youth Choir Festival", place:"Weimar, Germany", start:"01", month:"APR", year:"2027", range:"1–5 April 2027", type:"festival" },
  { title:"International Youth Choir Festival Basel", place:"Basel, Switzerland", start:"04", month:"MAY", year:"2027", range:"4–9 May 2027", type:"festival" }
];
try {
  const approvedEvents = JSON.parse(localStorage.getItem("ifcmApprovedEvents") || "[]");
  approvedEvents.forEach((event) => activityData.unshift(event));
} catch (error) {
  console.warn("Approved event cache could not be read.");
}
let activityFilter = "all";
function renderActivities() {
  const query = calendarSearch.value.trim().toLowerCase();
  const filtered = activityData.filter((item) => {
    const matchesText = `${item.title} ${item.place} ${item.range}`.toLowerCase().includes(query);
    const matchesFilter = activityFilter === "all" || item.type === activityFilter || item.year === activityFilter;
    return matchesText && matchesFilter;
  });
  document.querySelector(".activity-grid").innerHTML = filtered.length ? filtered.map((item) => `
    <article class="activity-card"${item.poster ? ` style="--event-poster:url('${item.poster}')"` : ""}>
      <div class="activity-top">
        <div class="activity-date"><strong>${item.start}</strong><span>${item.month}<br>${item.year}</span></div>
        <span class="activity-type">${item.type}</span>
      </div>
      <h3>${item.title}</h3>
      <p class="activity-place">${item.place}<br>${item.range}</p>
      <button type="button" data-event-title="${item.title.replace(/"/g, "&quot;")}"><span>View event details</span><span>→</span></button>
    </article>`).join("") : `<p class="activity-empty">No activities match this search.</p>`;
  document.querySelectorAll("[data-event-title]").forEach((button) => button.addEventListener("click", () => {
    const item = activityData.find((event) => event.title === button.dataset.eventTitle);
    if (item) openDetail(item.type.toUpperCase(), item.title, `${item.place} · ${item.range}`, item.description || "Full organiser information, programme, accessibility, participation conditions and approved contact details would appear here inside IFCM.");
  }));
}
calendarSearch.addEventListener("input", renderActivities);
document.querySelectorAll("[data-calendar-filter]").forEach((button) => button.addEventListener("click", () => {
  activityFilter = button.dataset.calendarFilter;
  document.querySelectorAll("[data-calendar-filter]").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  renderActivities();
}));
renderActivities();

const directoryData = [
  { name: "International Federation for Choral Music", country: "International", city: "Global", region: "Oceania", type: "Federation" },
  { name: "American Choral Directors Association", country: "United States", city: "Oklahoma City", region: "Americas", type: "National organisation" },
  { name: "A Cœur Joie International", country: "France", city: "Lyon", region: "Europe", type: "International organisation" },
  { name: "Asia Pacific Choral Council", country: "Asia-Pacific", city: "Regional network", region: "Asia", type: "Regional organisation" },
  { name: "Japan Choral Association", country: "Japan", city: "Tokyo", region: "Asia", type: "National organisation" },
  { name: "World Youth Choir", country: "International", city: "Global", region: "Oceania", type: "International choir" },
  { name: "China International Chorus Festival", country: "China", city: "Beijing", region: "Asia", type: "International festival" },
  { name: "Asociación Interamericana de Directores de Coros", country: "Venezuela", city: "Caracas", region: "Americas", type: "Regional organisation" },
  { name: "Musica International", country: "France", city: "Strasbourg", region: "Europe", type: "Choral repertoire database" },
  { name: "World Choral Census", country: "International", city: "Online", region: "Oceania", type: "Global research project" },
  { name: "African Confederation for Choral Music", country: "Africa", city: "Regional network", region: "Africa", type: "Regional choral network" },
  { name: "Nordisk Korforum", country: "Nordic region", city: "Scandinavia", region: "Europe", type: "Regional choral network" }
];

const symposiumData = [
  {name:"Vienna",country:"Austria",year:"1987",lat:48.2,lon:16.4},
  {name:"Stockholm · Helsinki · Tallinn",country:"Sweden · Finland · Estonia",year:"1990",lat:59.3,lon:21.0},
  {name:"Vancouver",country:"Canada",year:"1993",lat:49.3,lon:-123.1},
  {name:"Sydney",country:"Australia",year:"1996",lat:-33.9,lon:151.2},
  {name:"Rotterdam",country:"Netherlands",year:"1999",lat:51.9,lon:4.5},
  {name:"Minneapolis",country:"United States",year:"2002",lat:45.0,lon:-93.3},
  {name:"Kyoto",country:"Japan",year:"2005",lat:35.0,lon:135.8},
  {name:"Copenhagen",country:"Denmark",year:"2008",lat:55.7,lon:12.6},
  {name:"Puerto Madryn",country:"Argentina",year:"2011",lat:-42.8,lon:-65.0},
  {name:"Seoul",country:"Republic of Korea",year:"2014",lat:37.6,lon:127.0},
  {name:"Barcelona",country:"Spain",year:"2017",lat:41.4,lon:2.2},
  {name:"Auckland",country:"New Zealand · cancelled due to COVID-19",year:"2020",lat:-36.9,lon:174.8},
  {name:"Istanbul",country:"Türkiye",year:"2023",lat:41.0,lon:29.0},
  {name:"Macau",country:"China · 23–28 August · Reimagining the Future",year:"2026",lat:22.2,lon:113.5}
];

const ambassadorData = [
  {name:"Batavia Madrigal Singers",country:"Indonesia",lat:-6.2,lon:106.8,year:"2023",url:"https://www.bataviamadrigalsingers.com/"},
  {name:"Estonian Philharmonic Chamber Choir",country:"Estonia",lat:59.4,lon:24.8,year:"2023",url:"http://www.epcc.ee"},
  {name:"Fayha National Choir",country:"Lebanon",lat:34.4,lon:35.8,year:"2023"},
  {name:"Georgia State University Singers",country:"United States",lat:33.7,lon:-84.4,year:"2023",url:"https://music.gsu.edu/choir/"},
  {name:"Le Chant sur la Lowé",country:"Gabon",lat:0.4,lon:9.5,year:"2023"},
  {name:"Leioa Kantika Korala",country:"Spain",lat:43.3,lon:-2.99,year:"2023",url:"http://www.leioakantikakorala.com"},
  {name:"Orfeón San Juan Bautista",country:"Puerto Rico",lat:18.4,lon:-66.1,year:"2023",url:"https://orfeonsjb.org/en/sobre-el-conjunto-english/"},
  {name:"Sofia Vokalensemble",country:"Sweden",lat:59.3,lon:18.1,year:"2023",url:"http://www.sofiavokalensemble.com"},
  {name:"Taipei Philharmonic Chamber Choir",country:"Taiwan",lat:25.0,lon:121.6,year:"2023"},
  {name:"Vancouver Youth Choir",country:"Canada",lat:49.3,lon:-123.1,year:"2023",url:"https://vancouveryouthchoir.com/"},
  {name:"Cantabile Youth Singers",country:"United States",lat:37.3,lon:-121.9,year:"2020",url:"https://www.cantabile.org/"},
  {name:"Gondwana Choirs",country:"Australia",lat:-33.9,lon:151.2,year:"2020",url:"https://www.gondwana.org.au"},
  {name:"Müller Chamber Choir",country:"Taiwan",lat:25.0,lon:121.5,year:"2020",url:"https://www.muller.org.tw/english"},
  {name:"Nairobi Chamber Chorus",country:"Kenya",lat:-1.3,lon:36.8,year:"2020",url:"https://www.ncc.or.ke"},
  {name:"National Youth Choir of Great Britain",country:"United Kingdom",lat:51.5,lon:-0.1,year:"2020",url:"https://www.nycgb.org.uk"},
  {name:"Aleron",country:"Philippines",lat:14.6,lon:121.0,year:"2017",url:"https://www.aleron.ph/"},
  {name:"Ansan City Choir",country:"Republic of Korea",lat:37.3,lon:126.8,year:"2017",url:"http://www.ansanarts.com/chorus"},
  {name:"Elektra Women's Choir",country:"Canada",lat:49.3,lon:-123.1,year:"2017",url:"https://elektra.ca"},
  {name:"Estudio Coral Meridies",country:"Argentina",lat:-34.6,lon:-58.4,year:"2017",url:"http://www.ecmeridies.com.ar"},
  {name:"Riga Cathedral Girls' Choir TIARA",country:"Latvia",lat:56.9,lon:24.1,year:"2017",url:"http://www.girlschoir.lv"},
  {name:"University of Pretoria Camerata",country:"South Africa",lat:-25.7,lon:28.2,year:"2017",url:"http://www.tukscamerata.co.za/"},
  {name:"Youth Choir Cantemus",country:"Moldova",lat:47.0,lon:28.8,year:"2017",url:"https://www.facebook.com/ChoirCantemus/"},
  {name:"African Youth Choir",country:"Africa",lat:5.6,lon:12.4,year:"2014",url:"http://www.africanyouthchoir.org"},
  {name:"Hong Kong Children's Choir",country:"Hong Kong, China",lat:22.3,lon:114.2,year:"2014",url:"https://www.hkcchoir.org"},
  {name:"Moran Choir",country:"Israel",lat:31.8,lon:34.8,year:"2014",url:"http://www.moran-choir.co.il"},
  {name:"MusicaQuantica Voces de Cámara",country:"Argentina",lat:-34.6,lon:-58.4,year:"2014",url:"http://www.musicaquantica.com"},
  {name:"Túumben Paax",country:"Mexico",lat:19.4,lon:-99.1,year:"2014",url:"http://www.tuumbenpaax.com"},
  {name:"Estonian TV Girls Choir",country:"Estonia",lat:59.4,lon:24.8,year:"2011",url:"https://etvgirlschoir.ee/estonian-tv-girls-choir/"},
  {name:"Coro Calicantus",country:"Switzerland",lat:46.2,lon:8.8,year:"2008",url:"https://www.corocalicantus.org"},
  {name:"Choeur La Grâce",country:"DR Congo",lat:-4.3,lon:15.3,year:"2005"},
  {name:"Little Singers of Armenia",country:"Armenia",lat:40.2,lon:44.5,year:"2002",url:"https://www.als.am/en"},
  {name:"Cantoria de Mérida",country:"Venezuela",lat:8.6,lon:-71.1,year:"2002"},
  {name:"Vilnius Choir Jauna Muzika",country:"Lithuania",lat:54.7,lon:25.3,year:"1999",url:"https://jaunamuzika.lt/?lang=en"},
  {name:"Schola Cantorum de Caracas",country:"Venezuela",lat:10.5,lon:-66.9,year:"1990",url:"https://www.la-schola.org"},
  {name:"Elmer Iseler Singers",country:"Canada",lat:43.7,lon:-79.4,year:"1987",url:"https://www.elmeriselersingers.com"}
];

const officialAmbassadorArchive = `
2023|Batavia Madrigal Singers|Indonesia
2023|Estonian Philharmonic Chamber Choir|Estonia
2023|Fayha National Choir|Lebanon
2023|Georgia State University Singers|USA
2023|Le Chant sur la Lomé|Gabon
2023|Leoia Kantika Korala|Spain
2023|Orfeón San Juan Bautista|Puerto Rico
2023|Sofia Vokalensemble|Sweden
2023|Taipei Philharmonic Chamber Choir|Taiwan
2023|Turkish State Choir|Türkiye
2023|Vancouver Youth Choir|Canada
2020|Batavia Madrigal Singers|Indonesia
2020|Cantabile Youth Singers of Silicon Valley|USA
2020|Collegium Musicale|Estonia
2020|Ensemble Vocapella Limburg|Germany
2020|Ewha Chamber Choir|Republic of Korea
2020|Gondwana Choirs|Australia
2020|Hamilton Children's Choir|Canada
2020|Houston Chamber Choir|USA
2020|Kammerchor Stuttgart|Germany
2020|Müller Chamber Choir|Taiwan
2020|Nairobi Chamber Chorus|Kenya
2020|National Youth Choir of Great Britain|United Kingdom
2020|New Zealand Youth Choir|New Zealand
2020|NOTUS Contemporary Vocal Ensemble|USA
2020|Norwegian National Youth Choir & Nordic Voices|Norway
2020|Pop-Up Detmold|Germany
2020|Portland State Chamber Choir|USA
2020|Shenzhen Senior High School Lily Children's Choir|China
2020|Stockholms Musikgymnasiums Kammarkör|Sweden
2020|Voz en Punto|Mexico
2020|Xara Choral Theatre|Canada
2020|Zürcher Sing-Akademie|Switzerland
2017|Aleron|Philippines
2017|Ansan City Choir|Republic of Korea
2017|Cor Infantil Amics de la Unió|Spain
2017|Cor Vivaldi - Petits Cantors de Catalunya|Spain
2017|Dopplers|Denmark
2017|Elektra Women's Choir|Canada
2017|Ensemble Vine|Japan
2017|Estudio Coral Meridies|Argentina
2017|Kammerchor Saarbrücken|Germany
2017|KUP taldea|Spain
2017|New Dublin Voices|Ireland
2017|Riga Cathedral Girls' Choir TIARA|Latvia
2017|Salt Lake Vocal Artists|USA
2017|Sankt Jacobs Ungdomskör|Sweden
2017|Sonux Ensemble and Stefan Kuchel|Germany
2017|St. Stanislav Girls' Choir Ljubljana|Slovenia
2017|Tajimi Choir|Japan
2017|The Rose Ensemble|USA
2017|Toronto Children's Chorus|Canada
2017|The University of Pretoria Camerata Choir|South Africa
2017|Vocal Art Ensemble of Sweden|Sweden
2017|Westminster Choir College of Rider University|USA
2017|Wishful Singing|The Netherlands
2017|Youth Choir Cantemus|Moldova
2014|Choeur Africain des Jeunes - African Youth Choir|Africa
2014|Choeur des Jeunes de Casablanca - Casablanca Youth Choir|Morocco
2014|Choir of the John Paul II Catholic University of Lublin|Poland
2014|Fusion Vocal Ensemble|Australia
2014|Hamilton Children's Choir|Canada
2014|harmonia ensemble|Japan
2014|Hong Kong Children's Choir|Hong Kong China
2014|Ikeda Junior Choir|Japan
2014|Incheon City Chorale|Republic of Korea
2014|Inner Mongolian Youth Choir|China
2014|Kammerchor Stuttgart|Germany
2014|Leioa Kantika Korala Children’s Choir|Spain
2014|Manado State University Choir|Indonesia
2014|Moran Choir|Israel
2014|MusicaQuantica Voces de Cámara|Argentina
2014|Naniwa Choraliers|Japan
2014|Oslo Chamber Choir|Norway
2014|Roomful of Teeth|USA
2014|Sofia Vokalensemble|Sweden
2014|Túumben Paax|Mexico
2014|University of Maryland Chamber Singers|USA
2014|University South California Thornton Chamber Singers|USA
2014|VocalEssence|USA
2014|Voz en Punto|Mexico
2011|Camerata Musica Limburg|Germany
2011|Estonian TV Girls Choir|Estonia
2011|Grupo Vocal KEA|Spain
2011|Voces Nordicae/VoNo|Sweden
2011|Witloof Bay|Belgium
2008|Adolf Fredriks Girls' Choir|Denmark
2008|Coro Calicantus|Switzerland
2008|EMO Ensemble|Finland
2008|Hamrahlídarkórinn|Iceland
2008|Indonesian Children and Youth Choir – Cordana|Indonesia
2008|Rundfunkchor Berlin|Germany
2008|Vocal Line|Denmark
2008|Voci Nobili - Bergen College Youth Choir|Norway
2008|VoxNorth|Denmark
2005|Chamber Choir VOX GAUDIOSA|Japan
2005|Choeur La Grâce|DR Congo
2005|Little Singers of Tokyo & LSOT Senior|Japan
2005|Nathaniel Dett Chorale|USA
2005|Oslo Chamber Choir|Norway
2005|Tajimi Choir|Japan
2005|The Netherlands Youth Choir|The Netherlands
2005|The Young People's Chorus of New York City|USA
2005|Vocal Line|Denmark
2005|Winnipeg Singers|Canada
2002|Cantoria de Mérida|Venezuela
2002|Chamber Choir of the Moscow State Conservatory|Russian Federation
2002|Choeur de Chambre de Namur|Belgium
2002|Gifu High School Music Club OB Chorus|Japan
2002|Little Singers of Armenia|Armenia
2002|National Folk Dance Ensemble of Croatia LADO|Croatia
2002|Norwegian Soloists Choir / Det Norske Solistkor|Norway
2002|Vienna Chamber Choir|Austria
1999|Accentus|France
1999|Gondwana Choirs|Australia
1999|Sirin Choir|Russian Federation
1999|Talla Vocal Ensemble|Finland
1999|Tapiola Choir|Finland
1999|The Netherlands National Children’s Choir|The Netherlands
1999|Vilnius Municipality Choir JAUNA MUZIKA|Lithuania
1999|VocalEssence|USA
1996|Cantoria Alberto Grau|Venezuela
1996|Coro Hodeiertz|Spain
1996|Gondwana Choirs|Australia
1993|Choeur de Chambre de Namur|Belgium
1993|GCC - Grupo de Canto Coral|Argentina
1993|Hong Kong Children's Choir|Hong Kong China
1993|Vancouver Bach Family of Choirs|Canada
1993|Vancouver Chamber Choir|Canada
1990|Adolf Fredriks Girls' Choir|Denmark
1990|The Little Singers of Tokyo|Japan
1990|Orphei Drangär|Sweden
1990|Schola Cantorum de Caracas|Venezuela
1987|Elmer Iseler Singers|Canada
1987|Liszt Academy Choir|Hungary
1987|Tölzer Knabenchor|Germany
`;

const ambassadorCountryPoints = {
  Indonesia:[-6.2,106.8], Estonia:[59.4,24.8], Lebanon:[33.9,35.5], USA:[39.8,-98.6],
  Gabon:[-0.8,11.6], Spain:[40.4,-3.7], "Puerto Rico":[18.2,-66.5], Sweden:[60.1,18.6],
  Taiwan:[23.7,121], Türkiye:[39,35], Canada:[56.1,-106.3], Germany:[51.2,10.4],
  "Republic of Korea":[36.5,127.9], Australia:[-25.3,133.8], Kenya:[-0.02,37.9],
  "United Kingdom":[55.4,-3.4], "New Zealand":[-41.2,174.8], Norway:[60.5,8.5],
  China:[35.9,104.2], Mexico:[23.6,-102.5], Switzerland:[46.8,8.2], Philippines:[12.9,121.8],
  Denmark:[56.3,9.5], Japan:[36.2,138.3], Argentina:[-38.4,-63.6], Ireland:[53.1,-8.2],
  Latvia:[56.9,24.6], Slovenia:[46.2,14.8], "South Africa":[-30.6,22.9],
  "The Netherlands":[52.1,5.3], Moldova:[47.4,28.4], Africa:[3,20], Morocco:[31.8,-7.1],
  Poland:[51.9,19.1], "Hong Kong China":[22.3,114.2], Israel:[31,34.8], Belgium:[50.5,4.5],
  Finland:[61.9,25.7], Iceland:[64.9,-19], "DR Congo":[-4,21.8], Venezuela:[6.4,-66.6],
  "Russian Federation":[61.5,105.3], Armenia:[40.1,45], Croatia:[45.1,15.2],
  Austria:[47.5,14.6], France:[46.2,2.2], Lithuania:[55.2,23.9], Hungary:[47.2,19.5]
};
const curatedAmbassadorLinks = new Map(ambassadorData.map((item) => [`${item.year}|${item.name.toLowerCase()}`, item.url || ""]));
ambassadorData.length = 0;
officialAmbassadorArchive.trim().split("\n").forEach((row, index) => {
  const [year, name, country] = row.split("|");
  const point = ambassadorCountryPoints[country] || [((index * 19) % 120) - 60, ((index * 47) % 320) - 160];
  ambassadorData.push({
    name,
    country,
    year,
    lat: point[0] + ((index % 5) - 2) * 0.45,
    lon: point[1] + ((index % 7) - 3) * 0.65,
    url: curatedAmbassadorLinks.get(`${year}|${name.toLowerCase()}`) || ""
  });
});

const organisationPinData = [
  {name:"American Choral Directors Association",country:"United States",lat:35.5,lon:-97.5,status:"IFCM founding organisation",url:"https://acda.org/"},
  {name:"A Cœur Joie International",country:"France",lat:45.8,lon:4.8,status:"IFCM founding organisation",url:"https://www.choralies.org/"},
  {name:"Japan Choral Association",country:"Japan",lat:35.7,lon:139.7,status:"IFCM founding organisation",url:"https://jcanet.or.jp/"},
  {name:"Nordisk Korforum",country:"Nordic region",lat:59.3,lon:18.1,status:"IFCM founding organisation",url:"https://nordiskkorforum.org/"},
  {name:"Asociación Interamericana de Directores de Coros",country:"Venezuela",lat:10.5,lon:-66.9,status:"International choral network",url:"https://www.ifcm.net/about-us/structure"},
  {name:"African Confederation for Choral Music",country:"Africa",lat:0.5,lon:20,status:"Regional choral network",url:"https://www.ifcm.net/service/access-to-members-database"},
  {name:"Asia Pacific Choral Council",country:"Asia-Pacific",lat:14.6,lon:121,status:"Regional choral network",url:"https://www.ifcm.net/service/access-to-members-database"}
];

const ifcmPeopleData = [
  {name:"Michael J. Anderson",country:"United States",lat:40,lon:-100,status:"IFCM Honorary Member"},
  {name:"Lore Auerbach",country:"Germany",lat:51,lon:10,status:"IFCM Honorary Member"},
  {name:"Alberto Grau",country:"Venezuela",lat:10.5,lon:-66.9,status:"IFCM Honorary Member · Lifetime Achievement Award"},
  {name:"María Guinand",country:"Venezuela",lat:10.7,lon:-67.2,status:"IFCM Honorary Member · Lifetime Achievement Award"},
  {name:"Lupwishi Mbuyamba",country:"Mozambique",lat:-25.9,lon:32.6,status:"IFCM Honorary Member"},
  {name:"Noël Minet",country:"Belgium",lat:50.8,lon:4.4,status:"IFCM Honorary Member"},
  {name:"Royce Saltzman",country:"United States",lat:44,lon:-123,status:"IFCM Honorary Member · Lifetime Achievement Award"},
  {name:"Jutta Tagger",country:"France",lat:48.9,lon:2.3,status:"IFCM Honorary Member · Lifetime Achievement Award"}
];

const globalChoirData = [
  {name:"Soweto Gospel Choir",country:"South Africa",lat:-26.2,lon:27.9,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.sowetogospelchoir.com/"},
  {name:"Kenya Boys Choir",country:"Kenya",lat:-1.3,lon:36.8,status:"Independent global choir · no IFCM affiliation implied",url:"https://kenyaboyschoir.com/"},
  {name:"Drakensberg Boys Choir",country:"South Africa",lat:-29.1,lon:29.4,status:"Independent global choir · no IFCM affiliation implied",url:"https://dbchoir.com/"},
  {name:"Philippine Madrigal Singers",country:"Philippines",lat:14.6,lon:121,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.philippinemadrigalsingers.com/"},
  {name:"Singapore Youth Choir",country:"Singapore",lat:1.35,lon:103.8,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.singaporeyouthchoir.org.sg/"},
  {name:"The Sixteen",country:"United Kingdom",lat:51.5,lon:-0.1,status:"Independent global choir · no IFCM affiliation implied",url:"https://thesixteen.com/"},
  {name:"Monteverdi Choir",country:"United Kingdom",lat:51.7,lon:-0.3,status:"Independent global choir · no IFCM affiliation implied",url:"https://monteverdi.co.uk/"},
  {name:"Latvian Radio Choir",country:"Latvia",lat:56.95,lon:24.1,status:"Independent global choir · no IFCM affiliation implied",url:"https://radiokoris.lv/en/"},
  {name:"Swedish Radio Choir",country:"Sweden",lat:59.3,lon:18.1,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.berwaldhallen.se/en/ensembles/the-swedish-radio-choir/"},
  {name:"RIAS Kammerchor Berlin",country:"Germany",lat:52.5,lon:13.4,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.rias-kammerchor.de/en/"},
  {name:"Los Angeles Master Chorale",country:"United States",lat:34.05,lon:-118.25,status:"Independent global choir · no IFCM affiliation implied",url:"https://lamasterchorale.org/"},
  {name:"Toronto Mendelssohn Choir",country:"Canada",lat:43.65,lon:-79.38,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.tmchoir.org/"},
  {name:"VocalEssence",country:"United States",lat:44.98,lon:-93.27,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.vocalessence.org/"},
  {name:"Coro Nacional de Cuba",country:"Cuba",lat:23.1,lon:-82.4,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.facebook.com/Coronacionaldecuba/"},
  {name:"Coro da Osesp",country:"Brazil",lat:-23.55,lon:-46.63,status:"Independent global choir · no IFCM affiliation implied",url:"https://osesp.art.br/osesp/coro-da-osesp"},
  {name:"Gondwana Choirs",country:"Australia",lat:-33.87,lon:151.21,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.gondwana.org.au/"},
  {name:"Voices New Zealand Chamber Choir",country:"New Zealand",lat:-41.29,lon:174.78,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.choirsnz.co.nz/voices-nz/"},
  {name:"National Youth Choir of Great Britain",country:"United Kingdom",lat:52.5,lon:-1.9,status:"Independent global choir · no IFCM affiliation implied",url:"https://www.nycgb.org.uk/"}
];

function initialiseAmbassadorGlobe() {
  const globe = document.querySelector(".rotating-globe");
  const world = document.querySelector(".ambassador-world");
  const pinsLayer = document.querySelector(".ambassador-pins");
  const surface = document.querySelector(".globe-surface");
  if (!globe || !pinsLayer) return;
  const globePoints = [
    ...ifcmPeopleData.map((item) => ({...item,kind:"person",url:"https://www.ifcm.net/about-us/people"})),
    ...symposiumData.map((item) => ({...item,kind:"symposium"})),
    ...organisationPinData.map((item) => ({...item,kind:"organisation"})),
    ...ambassadorData.map((item) => ({...item,kind:"ambassador"})),
    ...globalChoirData.map((item) => ({...item,kind:"choir"}))
  ];
  pinsLayer.innerHTML = globePoints.map((item,index)=>`<button class="ambassador-pin ${item.kind}-pin" type="button" data-point="${index}" aria-label="${item.name}, ${item.country}"></button>`).join("");
  const alphabeticalAmbassadors = [...ambassadorData].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }) || b.year.localeCompare(a.year));
  document.querySelector(".ambassador-marquee").innerHTML = alphabeticalAmbassadors.map((item)=>`<article class="ambassador-mini" translate="no"><span>${item.country} · WSCM ${item.year}</span><strong>${item.name}</strong><small>IFCM Ambassador</small><a href="${item.url || webResearchUrl(`${item.name} choir ${item.country}`)}" target="_blank" rel="noreferrer" aria-label="Open ${item.name}">↗</a></article>`).join("");
  document.querySelector(".symposium-rail").innerHTML = symposiumData.map((item)=>`<article><span>WSCM ${item.year}</span><strong>${item.name}</strong><small>${item.country}</small><a href="${webResearchUrl(`World Symposium on Choral Music ${item.year} ${item.name}`)}" target="_blank" rel="noreferrer">Symposium more info ↗</a></article>`).join("");
  let angle = 8;
  let running = true;
  let previous = performance.now();
  function selectPoint(index) {
    const item = globePoints[index];
    document.querySelector(".ambassador-name").textContent = item.name;
    const label = {person:"IFCM PEOPLE",symposium:"WORLD SYMPOSIUM",organisation:"IFCM ORGANISATION",ambassador:"IFCM AMBASSADOR CHOIR",choir:"GLOBAL CHOIR"}[item.kind];
    const detail = item.kind === "symposium" ? `${item.country} · World Symposium ${item.year}` : item.kind === "ambassador" ? `${item.country} · IFCM Ambassador · WSCM ${item.year}` : `${item.country} · ${item.status}`;
    document.querySelector(".ambassador-location").textContent = detail;
    document.querySelector(".ambassador-card > span").textContent = label;
    document.querySelector(".ambassador-link").dataset.detailIndex = String(index);
    pinsLayer.querySelectorAll(".ambassador-pin").forEach(pin=>pin.classList.toggle("active",Number(pin.dataset.point)===index));
  }
  pinsLayer.querySelectorAll(".ambassador-pin").forEach(pin=>pin.addEventListener("click",()=>selectPoint(Number(pin.dataset.point))));
  document.querySelector(".ambassador-link").addEventListener("click", (event) => {
    const item = globePoints[Number(event.currentTarget.dataset.detailIndex || 0)];
    const query = item.kind === "symposium" ? `World Symposium on Choral Music ${item.year} ${item.name}` : ["ambassador","choir"].includes(item.kind) ? `${item.name} choir ${item.country}` : `${item.name} IFCM`;
    openDetail(
      item.kind === "symposium" ? `WSCM ${item.year}` : item.kind === "choir" ? "GLOBAL CHOIR" : item.kind === "organisation" ? "IFCM ORGANISATION" : item.kind === "person" ? "IFCM PEOPLE" : "IFCM AMBASSADOR",
      item.name,
      item.country,
      item.kind === "symposium" ? "A global meeting for performances, seminars, workshops, exhibitions, reading sessions and international exchange." : item.kind === "ambassador" ? "A publicly recognised choir connected to an IFCM World Symposium." : item.kind === "choir" ? "A choir included to broaden discovery across the worldwide choral community. Its presence on this prototype does not imply IFCM membership or affiliation." : item.kind === "organisation" ? "A public organisation connected to the IFCM network. Open its website or the official IFCM source for more information." : "A person publicly listed by IFCM as an Honorary Member, with the status shown above. IFCM’s public page is the source for this prototype.",
      item.url,
      query
    );
  });
  selectPoint(0);
  function animate(now) {
    if (running) angle = (angle + (now-previous)*.0065) % 360;
    previous = now;
    surface.style.backgroundPosition = `${50 + angle*.24}% 50%`;
    pinsLayer.querySelectorAll(".ambassador-pin").forEach((pin,index)=>{
      const item=globePoints[index];
      const lat=item.lat*Math.PI/180;
      const relative=(item.lon-angle)*Math.PI/180;
      const depth=Math.cos(lat)*Math.cos(relative);
      const x=50+Math.cos(lat)*Math.sin(relative)*43;
      const y=50-Math.sin(lat)*43;
      pin.style.left=`${x}%`; pin.style.top=`${y}%`;
      pin.style.opacity=depth>0 ? Math.max(.25,depth) : "0";
      pin.style.pointerEvents=depth>.08 ? "auto" : "none";
      pin.style.zIndex=String(Math.round(depth*100));
    });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  document.querySelector(".globe-motion").addEventListener("click",(event)=>{
    running=!running; world.classList.toggle("paused",!running);
    event.currentTarget.textContent=running?"Pause rotation":"Resume rotation";
    event.currentTarget.setAttribute("aria-pressed",String(!running));
  });
}

function renderDirectory() {
  const query = directorySearch.value.trim().toLowerCase();
  const region = directoryRegion.value;
  const filtered = directoryData.filter((item) => {
    const matchesQuery = [item.name, item.country, item.city, item.type].join(" ").toLowerCase().includes(query);
    return matchesQuery && (region === "all" || item.region === region);
  }).sort((a, b) => {
    if (a.name === "International Federation for Choral Music") return -1;
    if (b.name === "International Federation for Choral Music") return 1;
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
  document.querySelector(".directory-count").textContent = `${filtered.length} public records`;
  document.querySelector(".directory-grid").innerHTML = filtered.length ? filtered.map((item) => `
    <article class="directory-card">
      <div class="card-top"><span>${item.region}</span><span>${item.type}</span></div>
      <h3>${item.name}</h3>
      <p>${item.city} · ${item.country}</p>
      <button type="button" data-directory-name="${item.name.replace(/"/g, "&quot;")}">View IFCM profile →</button>
    </article>`).join("") : `<p class="directory-empty">No public records match this search.</p>`;
  document.querySelectorAll("[data-directory-name]").forEach((button) => button.addEventListener("click", () => {
    const item = directoryData.find((record) => record.name === button.dataset.directoryName);
    if (item) openDetail(item.type, item.name, `${item.city} · ${item.country}`, "This internal profile can contain its biography, events, media, projects, contact permissions and membership status without sending visitors to another website.");
  }));
}

directorySearch.addEventListener("input", renderDirectory);
directoryRegion.addEventListener("change", renderDirectory);
renderDirectory();
initialiseAmbassadorGlobe();

document.querySelectorAll("[data-dashboard-view]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-dashboard-view]").forEach((item) => item.classList.remove("selected"));
    document.querySelectorAll(".dashboard-view").forEach((view) => view.classList.remove("active"));
    button.classList.add("selected");
    document.querySelector(`.dashboard-view[data-view="${button.dataset.dashboardView}"]`).classList.add("active");
  });
});

document.querySelectorAll(".people-list button").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("connected");
    button.textContent = button.classList.contains("connected") ? "Connected ✓" : "Connect";
  });
});

document.querySelector(".ai-demo").addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = document.querySelector("#ai-question").value.trim();
  if (!question) return;
  const answer = document.querySelector(".ai-answer");
  answer.innerHTML = "<strong>IFCM AI</strong><br>Consulting the prototype and public online sources…";
  answer.innerHTML = `<strong>IFCM AI</strong><br>${await buildConnectedAnswer(question)}`;
});

document.querySelectorAll("[data-scroll-rail]").forEach((button) => button.addEventListener("click", () => {
  const rail = document.querySelector(`[data-rail="${button.dataset.scrollRail}"]`);
  if (rail) rail.scrollBy({left:Number(button.dataset.direction) * Math.min(680, rail.clientWidth * .8), behavior:"smooth"});
}));

document.querySelectorAll("[data-dashboard-jump]").forEach((button) => button.addEventListener("click", () => {
  document.querySelector("#services").scrollIntoView({behavior:"smooth"});
  const target = document.querySelector(`[data-dashboard-view="${button.dataset.dashboardJump}"]`);
  if (target) target.click();
}));

function webResearchUrl(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function openDetail(kicker, title, meta, copyText, sourceUrl = "", researchQuery = "") {
  const detail = document.querySelector(".detail-modal");
  detail.querySelector(".detail-kicker").textContent = kicker;
  detail.querySelector(".detail-title").textContent = title;
  detail.querySelector(".detail-meta").textContent = meta;
  detail.querySelector(".detail-copy").textContent = copyText;
  const source = detail.querySelector(".detail-source");
  source.href = sourceUrl || "#";
  source.hidden = !sourceUrl;
  detail.querySelector(".detail-research").href = webResearchUrl(researchQuery || `${title} ${meta}`);
  detail.classList.add("open");
  detail.setAttribute("aria-hidden", "false");
}
function closeDetail() {
  const detail = document.querySelector(".detail-modal");
  detail.classList.remove("open");
  detail.setAttribute("aria-hidden", "true");
}
document.querySelector(".detail-close").addEventListener("click", closeDetail);
document.querySelector(".detail-modal").addEventListener("click", (event) => {
  if (event.target.classList.contains("detail-modal")) closeDetail();
});
document.querySelector("[data-featured-event]").addEventListener("click", () => {
  const item = activityData[0];
  openDetail(item.type.toUpperCase(), item.title, `${item.place} · ${item.range}`, "Programme, participation information and verified organiser contacts would be presented inside this event page. The external research link opens current public information about the event.", item.url || "", `${item.title} ${item.place}`);
});

const requestModal = document.querySelector(".request-modal");
document.querySelectorAll("[data-open-form]").forEach((button) => button.addEventListener("click", () => {
  const advertising = button.dataset.openForm === "advertise";
  const legacy = button.dataset.openForm === "legacy";
  requestModal.querySelector(".request-kicker").textContent = legacy ? "THE NEXT VOICE" : advertising ? "ADVERTISING" : "PARTNERSHIP";
  requestModal.querySelector(".request-title").textContent = legacy ? "Gift three years of membership" : advertising ? "Request advertising options" : "Become an IFCM Partner";
  requestModal.querySelector('input[name="organisation"]').placeholder = legacy ? "Your name or member organisation" : "Organisation";
  requestModal.querySelector('textarea[name="request"]').placeholder = legacy ? "Who would you like to support, and why?" : "Tell us what you would like to achieve";
  requestModal.classList.add("open");
  requestModal.setAttribute("aria-hidden", "false");
}));
document.querySelector(".request-close").addEventListener("click", () => {
  requestModal.classList.remove("open");
  requestModal.setAttribute("aria-hidden", "true");
});
document.querySelector(".request-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector(".request-status").textContent = "Request prepared. The production site would send it to the authorised IFCM team and open a secure checkout when relevant.";
});

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector(".newsletter-note").textContent = "Thank you. This demonstration is ready to connect to the official IFCM mailing platform.";
  event.currentTarget.reset();
});

const conciergeCopy = {
  en: { hello: "Welcome. Ask me about a symposium, choir, country, event, membership, media, contacts or an IFCM project. If this prototype does not hold enough verified detail, I will offer a focused external research link.", member: "Every member is an ambassador. Membership can include the directory, recordings, publications, international contacts, projects, opportunities and participation. You can start the three-step prototype process in the Membership section.", project: "IFCM projects include the World Symposium on Choral Music, World Choral Day, YOUNG Programme, Conductors Beyond Borders, World Choral Expo and the Choral Composition Competition.", nearby: "The Global Calendar can be searched by destination, year and event type. For local recommendations, tell me a city or country and I will prepare a focused current web search.", fallback: "I do not want to invent an answer. This prototype can still help: use the research link below to look for current, public information about your exact question." },
  pt: { hello: "Bem-vindo. Pergunte-me sobre um simpósio, coro, país, evento, adesão, media, contactos ou projeto do IFCM. Se o protótipo não tiver detalhe verificado suficiente, ofereço uma pesquisa externa focada.", member: "Cada membro é um embaixador. A adesão pode incluir diretório, gravações, publicações, contactos internacionais, projetos, oportunidades e participação. Pode iniciar o processo de três etapas na secção Membership.", project: "Os projetos incluem World Symposium on Choral Music, World Choral Day, YOUNG Programme, Conductors Beyond Borders, World Choral Expo e o Concurso de Composição Coral.", nearby: "O Calendário Global pode ser pesquisado por destino, ano e tipo. Diga-me uma cidade ou país e prepararei uma pesquisa atual e focada.", fallback: "Não quero inventar uma resposta. Este protótipo pode ainda ajudar: use a ligação de pesquisa abaixo para procurar informação pública e atual sobre a sua pergunta exata." },
  fr: { hello: "Bienvenue. Interrogez-moi sur un symposium, un chœur, un pays, un événement, l’adhésion, les médias, les contacts ou un projet IFCM. Si le prototype manque de détails vérifiés, je proposerai une recherche externe ciblée.", member: "Chaque membre est un ambassadeur. L’adhésion peut inclure annuaire, enregistrements, publications, contacts, projets, possibilités et participation.", project: "Les projets comprennent le Symposium mondial, la Journée mondiale du chant choral, YOUNG, Conductors Beyond Borders, World Choral Expo et le concours de composition.", nearby: "Le calendrier mondial permet une recherche par destination, année et type. Indiquez une ville ou un pays pour une recherche actuelle ciblée.", fallback: "Je préfère ne pas inventer de réponse. Utilisez le lien ci-dessous pour rechercher des informations publiques et actuelles sur votre question précise." },
  es: { hello: "Bienvenido. Pregúntame sobre un simposio, coro, país, evento, membresía, medios, contactos o proyecto de la IFCM. Si faltan detalles verificados, ofreceré una búsqueda externa específica.", member: "Cada miembro es un embajador. La membresía puede incluir directorio, grabaciones, publicaciones, contactos, proyectos, oportunidades y participación.", project: "Los proyectos incluyen el Simposio Mundial, el Día Mundial del Canto Coral, YOUNG, Conductors Beyond Borders, World Choral Expo y el concurso de composición.", nearby: "El Calendario Global permite buscar por destino, año y tipo. Indica una ciudad o país para preparar una búsqueda actual.", fallback: "Prefiero no inventar una respuesta. Utiliza el enlace inferior para buscar información pública y actual sobre tu pregunta exacta." },
  zh: { hello: "欢迎。您可以询问研讨会、合唱团、国家、活动、会员、媒体、联系方式或IFCM项目。如果缺少经核实的信息，我会提供有针对性的外部搜索。", member: "每位会员都是大使。会员服务可包括名录、录音、出版物、国际联系、项目、机会及参与。", project: "IFCM项目包括世界合唱音乐研讨会、世界合唱日、YOUNG计划、跨越国界的指挥家、世界合唱博览会和合唱作曲比赛。", nearby: "全球日历可按地点、年份和类型搜索。告诉我城市或国家，我会准备当前的针对性搜索。", fallback: "我不想编造答案。请使用下方链接搜索与您问题完全对应的最新公开信息。" },
  de: { hello: "Willkommen. Fragen Sie mich nach einem Symposium, Chor, Land, Ereignis, einer Mitgliedschaft, Medien, Kontakten oder einem IFCM-Projekt. Fehlen bestätigte Angaben, biete ich eine gezielte externe Suche an.", member: "Jedes Mitglied ist ein Botschafter. Die Mitgliedschaft verbindet Verzeichnis, Aufnahmen, Publikationen, internationale Kontakte, Projekte, Chancen und Mitwirkung.", project: "Zu den IFCM-Projekten gehören das World Symposium on Choral Music, World Choral Day, das YOUNG Programme, Conductors Beyond Borders, die World Choral Expo und der Kompositionswettbewerb.", nearby: "Der globale Kalender kann nach Ort, Jahr und Art durchsucht werden. Nennen Sie eine Stadt oder ein Land für eine aktuelle, gezielte Suche.", fallback: "Ich möchte keine Antwort erfinden. Nutzen Sie den Link unten, um aktuelle öffentliche Informationen zu Ihrer genauen Frage zu suchen." },
  it: { hello: "Benvenuto. Chiedimi informazioni su un simposio, un coro, un paese, un evento, l’adesione, i media, i contatti o un progetto IFCM. Se il prototipo non contiene dati verificati sufficienti, proporrò una ricerca esterna mirata.", member: "Ogni membro è un ambasciatore. L’adesione può offrire accesso all’elenco, alle registrazioni, alle pubblicazioni, ai contatti internazionali, ai progetti, alle opportunità e alla partecipazione.", project: "I progetti includono il World Symposium on Choral Music, la Giornata Mondiale del Canto Corale, il programma YOUNG, Conductors Beyond Borders, la World Choral Expo e il concorso di composizione.", nearby: "Il calendario globale consente di cercare per destinazione, anno e tipologia. Indica una città o un paese per una ricerca attuale e mirata.", fallback: "Preferisco non inventare una risposta. Utilizza il collegamento qui sotto per cercare informazioni pubbliche e aggiornate sulla tua domanda specifica." }
};
let conciergeLanguage = "en";
let lastConciergeAnswer = conciergeCopy.en.hello;
const concierge = document.querySelector(".concierge");
const conciergeMessages = document.querySelector(".concierge-messages");
function openConcierge() { concierge.classList.add("open"); concierge.setAttribute("aria-hidden", "false"); document.querySelector(".concierge-launcher").setAttribute("aria-expanded", "true"); }
function closeConcierge() { concierge.classList.remove("open"); concierge.setAttribute("aria-hidden", "true"); document.querySelector(".concierge-launcher").setAttribute("aria-expanded", "false"); }
function conciergeAnswer(question) {
  const text = question.toLowerCase();
  const c = conciergeCopy[conciergeLanguage] || conciergeCopy.en;
  const symposium = symposiumData.find((item) => text.includes(item.name.toLowerCase()) || text.includes(item.year));
  if (symposium && /symposium|simpos|wscm|研讨会/.test(text)) {
    const macau = symposium.year === "2026";
    const detail = macau
      ? "The next World Symposium on Choral Music is scheduled for Macau, China, from 23–28 August 2026, under the theme “Reimagining the Future”."
      : `${symposium.name} hosted the World Symposium on Choral Music in ${symposium.year}. ${symposium.country}.`;
    return `${detail} <a href="${webResearchUrl(`World Symposium on Choral Music ${symposium.year} ${symposium.name}`)}" target="_blank" rel="noreferrer">Research current public information ↗</a>`;
  }
  if (/symposium|simpos|wscm|研讨会/.test(text)) {
    return `The World Symposium has travelled through Vienna (1987), Stockholm–Helsinki–Tallinn (1990), Vancouver, Sydney, Rotterdam, Minneapolis, Kyoto, Copenhagen, Puerto Madryn, Seoul, Barcelona and Istanbul. Auckland 2020 was cancelled because of COVID-19; Macau hosts the 2026 edition. Tell me a city or year, or <a href="#symposium">open the complete timeline →</a>`;
  }
  const choir = ambassadorData.find((item) => text.includes(item.name.toLowerCase()));
  if (choir) {
    const destination = choir.url || webResearchUrl(`${choir.name} choir ${choir.country}`);
    return `${choir.name} is listed in this prototype as an IFCM Ambassador connected with WSCM ${choir.year}. It is based in ${choir.country}. <a href="${destination}" target="_blank" rel="noreferrer">${choir.url ? "Open the choir’s public website" : "Research this choir online"} ↗</a>`;
  }
  if (/history|história|histoire|historia|历史|1982/.test(text)) return `IFCM was founded in 1982 after major choral organisations met in Namur, Belgium, to make international communication and exchange possible. Its history includes world symposia, the World Youth Choir, World Choral Day, publications and cooperation. <a href="${webResearchUrl("IFCM history International Federation for Choral Music")}" target="_blank" rel="noreferrer">Research IFCM history ↗</a>`;
  if (/login|log in|sign in|entrar|connexion|iniciar sesión|登录/.test(text)) return `The official members login is managed by IFCM. <a href="https://www.ifcm.net/#login" target="_blank" rel="noreferrer">Open the official IFCM Login Portal ↗</a>`;
  if (/board|president|leadership|direção|dirección|président|honorary|honorário|荣誉/.test(text)) return `The globe shows people whose public IFCM status can be verified, including Honorary Members and Lifetime Achievement recipients. The official site does not currently expose a complete text list of all former presidents and board members, so this prototype does not invent those roles. <a href="https://www.ifcm.net/about-us/people" target="_blank" rel="noreferrer">Open the official IFCM People page ↗</a>`;
  if (/database|directory|member list|base de dados|directorio|annuaire|数据库/.test(text)) return `Protected member information belongs in the official IFCM members area. <a href="https://www.ifcm.net/service/access-to-members-database" target="_blank" rel="noreferrer">Open the official Members Database information ↗</a>`;
  if (/contact|office|email|contacto|contato|bureau|联系/.test(text)) return `IFCM’s administrative office is listed in Austin, United States, and its main office in Lisbon, Portugal. General contact: <a href="mailto:office@ifcm.net">office@ifcm.net</a>. Editorial contact: <a href="mailto:communication@ifcm.net">communication@ifcm.net</a>.`;
  if (/media|video|youtube|recording|grava|podcast|媒体/.test(text)) return `The Media area brings together IFCM videos, Online Cafés, performances, interviews and future member recordings. <a href="#media">Open the IFCM Media area →</a>`;
  if (/job|opportun|grant|residen|vaga|bolsa|empleo|机会/.test(text)) return `The prototype proposes one worldwide board for jobs, grants, residencies, calls for scores, juries and mentorship. <a href="#services">Open Member Home opportunities →</a>`;
  if (/member|membro|adhésion|membresía|会员/.test(text)) return c.member;
  if (/project|projeto|projet|项目/.test(text)) return c.project;
  if (/near|perto|près|cerca|附近|event|evento/.test(text)) return c.nearby;
  return `${c.fallback} <a href="${webResearchUrl(`${question} IFCM choral music`)}" target="_blank" rel="noreferrer">Research this question online ↗</a>`;
}

function safeText(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[character]));
}

async function researchPublicSource(question) {
  const wikiLanguage = { en:"en", pt:"pt", fr:"fr", es:"es", zh:"zh", de:"de", it:"it", hi:"hi", ar:"ar", bn:"bn", ru:"ru", ur:"ur" }[conciergeLanguage] || "en";
  const cleanedQuestion = question
    .replace(/^(who|what|where|when|why|how)\s+(is|are|was|were|did|does|do)\s+/i, "")
    .replace(/^(quem|o que|onde|quando|por que|porque|como)\s+(é|são|foi|foram)\s+/i, "")
    .replace(/[?!.]+$/g, "")
    .trim();
  const searchQuery = `"${cleanedQuestion || question}"`;
  const endpoint = `https://${wikiLanguage}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&srlimit=1&format=json&origin=*`;
  try {
    const searchResponse = await fetch(endpoint, {headers:{"Accept":"application/json"}});
    if (!searchResponse.ok) return "";
    const searchData = await searchResponse.json();
    const result = searchData?.query?.search?.[0];
    if (!result?.title) return "";
    const summaryEndpoint = `https://${wikiLanguage}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(result.title)}`;
    const summaryResponse = await fetch(summaryEndpoint, {headers:{"Accept":"application/json"}});
    if (!summaryResponse.ok) return "";
    const summary = await summaryResponse.json();
    if (!summary?.extract) return "";
    const shortExtract = summary.extract.length > 520 ? `${summary.extract.slice(0, 517)}…` : summary.extract;
    const sourceUrl = summary?.content_urls?.desktop?.page || `https://${wikiLanguage}.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;
    return `<span class="online-result"><small>PUBLIC ONLINE SOURCE · ${safeText(result.title)}</small>${safeText(shortExtract)}<a href="${sourceUrl}" target="_blank" rel="noreferrer">Open source ↗</a></span>`;
  } catch (error) {
    return "";
  }
}

async function buildConnectedAnswer(question) {
  const localAnswer = conciergeAnswer(question);
  const onlineAnswer = await researchPublicSource(question);
  if (onlineAnswer) return `${localAnswer}${onlineAnswer}`;
  return `${localAnswer}<span class="online-result unavailable"><small>LIVE RESEARCH</small>No concise public-source result was found automatically. The focused research link above remains available.</span>`;
}

async function addConciergeExchange(question) {
  conciergeMessages.insertAdjacentHTML("beforeend", `<p class="user-message">${safeText(question)}</p>`);
  const pendingId = `ifcm-pending-${Date.now()}`;
  conciergeMessages.insertAdjacentHTML("beforeend", `<p class="assistant-message researching" id="${pendingId}">Consulting the IFCM prototype and public online sources…</p>`);
  conciergeMessages.scrollTop = conciergeMessages.scrollHeight;
  lastConciergeAnswer = await buildConnectedAnswer(question);
  const pending = document.getElementById(pendingId);
  if (pending) {
    pending.classList.remove("researching");
    pending.innerHTML = lastConciergeAnswer;
  }
  conciergeMessages.scrollTop = conciergeMessages.scrollHeight;
}
document.querySelector(".concierge-launcher").addEventListener("click", openConcierge);
document.querySelector(".concierge-close").addEventListener("click", closeConcierge);
document.querySelectorAll("[data-concierge-lang]").forEach((button) => button.addEventListener("click", () => {
  conciergeLanguage = button.dataset.conciergeLang;
  document.querySelectorAll("[data-concierge-lang]").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  lastConciergeAnswer = (conciergeCopy[conciergeLanguage] || conciergeCopy.en).hello;
  conciergeMessages.innerHTML = `<p class="assistant-message">${lastConciergeAnswer}</p>`;
}));
document.querySelectorAll(".concierge-quick button").forEach((button) => button.addEventListener("click", () => addConciergeExchange(button.textContent)));
document.querySelector(".concierge-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  if (!input.value.trim()) return;
  addConciergeExchange(input.value.trim());
  input.value = "";
});
document.querySelector(".concierge-read").addEventListener("click", () => {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(lastConciergeAnswer.replace(/<[^>]+>/g, ""));
  utterance.lang = { en:"en-US", zh:"zh-CN", hi:"hi-IN", es:"es-ES", fr:"fr-FR", ar:"ar-SA", bn:"bn-BD", ru:"ru-RU", pt:"pt-PT", ur:"ur-PK", de:"de-DE", it:"it-IT" }[conciergeLanguage] || "en-US";
  speechSynthesis.speak(utterance);
});
document.querySelector(".concierge-listen").addEventListener("click", (event) => {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) { addConciergeExchange("Voice recognition is not available in this browser."); return; }
  const recognition = new Recognition();
  recognition.lang = { en:"en-US", zh:"zh-CN", hi:"hi-IN", es:"es-ES", fr:"fr-FR", ar:"ar-SA", bn:"bn-BD", ru:"ru-RU", pt:"pt-PT", ur:"ur-PK", de:"de-DE", it:"it-IT" }[conciergeLanguage] || "en-US";
  event.currentTarget.classList.add("listening");
  recognition.onresult = (result) => addConciergeExchange(result.results[0][0].transcript);
  recognition.onend = () => event.currentTarget.classList.remove("listening");
  recognition.start();
});

const shareLauncher = document.querySelector(".share-launcher");
const sharePanel = document.querySelector(".share-panel");
const shareUrl = encodeURIComponent(window.location.href);
const shareTitle = encodeURIComponent(document.title);
document.querySelector('[data-share-link="facebook"]').href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
document.querySelector('[data-share-link="linkedin"]').href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
document.querySelector('[data-share-link="whatsapp"]').href = `https://wa.me/?text=${shareTitle}%20${shareUrl}`;
document.querySelector('[data-share-link="x"]').href = `https://x.com/intent/post?url=${shareUrl}&text=${shareTitle}`;
document.querySelector('[data-share-link="email"]').href = `mailto:?subject=${shareTitle}&body=${shareUrl}`;
shareLauncher.addEventListener("click", () => {
  const open = sharePanel.classList.toggle("open");
  sharePanel.setAttribute("aria-hidden", String(!open));
  shareLauncher.setAttribute("aria-expanded", String(open));
});
document.querySelector('[data-share="native"]').addEventListener("click", async () => {
  if (navigator.share) {
    try { await navigator.share({title:document.title,url:window.location.href}); } catch (error) {}
  } else {
    document.querySelector(".share-status").textContent = "Use one of the sharing options below.";
  }
});
document.querySelector('[data-share="copy"]').addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    document.querySelector(".share-status").textContent = "Link copied.";
  } catch (error) {
    document.querySelector(".share-status").textContent = "Copy the address from your browser.";
  }
});

const copy = {
  en: {
    title: "IFCM — Creators Transforming the World",
    concept: "<strong>Presidential candidate proposal</strong> · Independent concept · Not an official IFCM website", proposal: "IFCM Official ↗",
    nav: ["About us", "Projects", "Cooperations", "Services", "Membership", "eMedia", "eNews", "IFCM Login Portal", "Join IFCM"],
    eyebrow: "International Federation for Choral Music", hero: "Creators<br><em>transforming the world.</em>",
    intro: "A digital home where the worldwide choral community can discover, connect, learn, participate and build what comes next.",
    see: "Become a member <span>↗</span>", film: "<i>◎</i> Explore the world", now: "IFCM worldwide", oneWorld: "One world.<br>Many ways to belong.", scroll: "Discover the story <span>↓</span>",
    visionLabel: "Why IFCM exists", manifesto: "Born to connect<br>a world that <span>sings.</span>",
    future: "In 1982, five major choral organisations came together in Namur, Belgium, with one purpose: make communication and exchange possible across borders.",
    commons: "Since then, IFCM has connected musicians through world symposia, the World Youth Choir, World Choral Day, publications, mentoring, databases and international cooperation.",
    values: ["Founded in 1982", "Global cooperation", "Cultural diversity", "Creators transforming the world"],
    movesLabel: "A living global network", moves: "From organisation<br>to <em>living network.</em>",
    movesIntro: "Four practical commitments to make IFCM more relevant, more representative and more connected.",
    priorities: [
      ["A useful membership", "One personal dashboard for opportunities, events, peer exchange, recordings and resources — tailored to each member's interests and region.", "Global opportunity board|Mentoring and peer circles|Member-only learning library"],
      ["Every region at the table", "Regional councils with a direct route into decision-making, translation, programming and visibility across the whole federation.", "Regional listening assemblies|Multilingual communication|Transparent representation"],
      ["Knowledge in motion", "A global learning platform where conductors, composers, singers, managers and researchers can teach, discover and collaborate.", "Open multilingual resources|Monthly digital studios|Emerging leader programme"],
      ["Trust through clarity", "Clear priorities, accessible budgets, visible decisions and regular reporting — making members partners in IFCM's direction.", "Public strategy dashboard|Open calls and criteria|Annual member assembly"]
    ],
    worldLabel: "The connected world", worldTitle: "What if the whole choral world were <em>one click away?</em>",
    worldText: "Discover choirs, conductors, composers, festivals and opportunities by place, language and interest — a global choral map built by the community itself.",
    worldLink: "Imagine your place on the map <span>→</span>", regions: ["North America", "South America", "Europe", "Africa", "Asia", "Oceania"], regionStat: "regions<br>in one conversation",
    digital: "Member Home", aside: ["For you", "Calendar", "Network", "Opportunities", "IFCM AI"],
    morning: "WELCOME BACK", dashboardTitle: "Your choral world,<br>in one place.",
    live: "LIVE THIS WEEK", conductor: "Reimagining the role of the conductor", connections: "NEW CONNECTIONS", people: "12 people share your interests", meet: "Meet them →", calls: "OPEN CALLS", opportunities: "8 opportunities selected for you", explore: "Explore →",
    listen: "Listen · Connect · Serve", candidateLabel: "IFCM eNews",
    lead: "Projects, calls, events, publications and voices from across the international choral community.",
    quote: "“Leadership begins by listening deeply enough for a new harmony to become possible.”",
    bio: "Stay connected with the worldwide choral community.",
    joinLabel: "Join the conversation", joinTitle: "The future sounds<br>better with <em>your voice.</em>",
    labels: ["Your name", "Your email", "What should IFCM become?"], placeholders: ["How should we call you?", "you@example.org", "Add your voice to the vision…"],
    send: "Send your idea <span>↗</span>", thanks: "Thank you — this prototype is ready to connect to your chosen mailing or campaign platform.",
    footer: "A digital-home concept for a more connected International Federation for Choral Music.", official: "Current IFCM website ↗", copyright: "© 2026 Digital concept",
    modalEye: "The vision in 90 seconds", modalTitle: "A film can live here.", modalText: "This space is ready for a concise campaign film: your voice, interwoven with choral communities from every continent."
  },
  pt: {
    title: "IFCM — Criadores que transformam o mundo",
    concept: "<strong>Proposta de candidato à presidência</strong> · Conceito independente · Não é o site oficial do IFCM", proposal: "IFCM Official ↗",
    nav: ["Sobre nós", "Projetos", "Cooperações", "Serviços", "Membership", "eMedia", "eNews", "Portal Login IFCM", "Aderir ao IFCM"],
    eyebrow: "Federação Internacional para a Música Coral", hero: "Criadores que<br><em>transformam o mundo.</em>",
    intro: "Uma casa digital onde a comunidade coral mundial pode descobrir, ligar-se, aprender, participar e construir o que vem a seguir.",
    see: "Tornar-se membro <span>↗</span>", film: "<i>◎</i> Explorar o mundo", now: "IFCM mundial", oneWorld: "Um mundo.<br>Muitas formas de pertencer.", scroll: "Descobrir a história <span>↓</span>",
    visionLabel: "Porque existe o IFCM", manifesto: "Nasceu para ligar<br>um mundo que <span>canta.</span>",
    future: "Em 1982, cinco grandes organizações corais reuniram-se em Namur, Bélgica, para tornar possível a comunicação e o intercâmbio além-fronteiras.",
    commons: "Desde então, o IFCM liga músicos através de simpósios mundiais, World Youth Choir, World Choral Day, publicações, mentoria, bases de dados e cooperação internacional.",
    values: ["Fundado em 1982", "Cooperação global", "Diversidade cultural", "Criadores que transformam o mundo"],
    movesLabel: "Uma rede global viva", moves: "Da organização<br>à <em>rede viva.</em>",
    movesIntro: "Quatro compromissos práticos para tornar o IFCM mais relevante, representativo e conectado.",
    priorities: [
      ["Uma adesão útil", "Um painel pessoal com oportunidades, eventos, intercâmbio, gravações e recursos — adaptado aos interesses e à região de cada membro.", "Quadro global de oportunidades|Mentoria e círculos de pares|Biblioteca de aprendizagem para membros"],
      ["Todas as regiões à mesa", "Conselhos regionais com acesso direto às decisões, tradução, programação e visibilidade em toda a federação.", "Assembleias regionais de escuta|Comunicação multilingue|Representação transparente"],
      ["Conhecimento em movimento", "Uma plataforma global onde maestros, compositores, cantores, gestores e investigadores podem ensinar, descobrir e colaborar.", "Recursos multilingues abertos|Estúdios digitais mensais|Programa para líderes emergentes"],
      ["Confiança pela clareza", "Prioridades claras, orçamentos acessíveis, decisões visíveis e informação regular — tornando os membros parceiros na direção do IFCM.", "Painel público da estratégia|Concursos e critérios abertos|Assembleia anual de membros"]
    ],
    worldLabel: "O mundo conectado", worldTitle: "E se todo o mundo coral estivesse <em>à distância de um clique?</em>",
    worldText: "Descubra coros, maestros, compositores, festivais e oportunidades por local, língua e interesse — um mapa coral global construído pela própria comunidade.",
    worldLink: "Imagine o seu lugar no mapa <span>→</span>", regions: ["América do Norte", "América do Sul", "Europa", "África", "Ásia", "Oceânia"], regionStat: "regiões<br>numa só conversa",
    digital: "Área do membro", aside: ["Para si", "Calendário", "Rede", "Oportunidades", "IFCM AI"],
    morning: "BEM-VINDO", dashboardTitle: "O seu mundo coral,<br>num só lugar.",
    live: "EM DIRETO ESTA SEMANA", conductor: "Reimaginar o papel do maestro", connections: "NOVAS LIGAÇÕES", people: "12 pessoas partilham os seus interesses", meet: "Conheça-as →", calls: "CANDIDATURAS ABERTAS", opportunities: "8 oportunidades selecionadas para si", explore: "Explorar →",
    listen: "Escutar · Ligar · Servir", candidateLabel: "O candidato",
    lead: "Projetos, oportunidades, eventos, publicações e vozes da comunidade coral internacional.",
    quote: "“Liderar começa por escutar com profundidade suficiente para que uma nova harmonia se torne possível.”",
    bio: "A minha candidatura assenta na prática artística, na colaboração internacional e na convicção de que uma instituição se fortalece quando mais pessoas se conseguem reconhecer nela.",
    joinLabel: "Junte-se à conversa", joinTitle: "O futuro soa melhor<br>com <em>a sua voz.</em>",
    labels: ["O seu nome", "O seu email", "Em que se deve tornar o IFCM?"], placeholders: ["Como devemos tratá-lo?", "voce@exemplo.org", "Junte a sua voz à visão…"],
    send: "Enviar a sua ideia <span>↗</span>", thanks: "Obrigado — este protótipo está preparado para ser ligado à plataforma de campanha ou de email escolhida.",
    footer: "Um conceito de candidatura para uma Federação Internacional de Música Coral mais conectada.", official: "Site atual do IFCM ↗", copyright: "© 2026 Conceito de visão",
    modalEye: "A visão em 90 segundos", modalTitle: "Aqui pode viver um filme.", modalText: "Este espaço está preparado para um filme de campanha conciso: a sua voz entrelaçada com comunidades corais de todos os continentes."
  },
  fr: {
    title: "IFCM — Des créateurs qui transforment le monde", concept: "<strong>Proposition d’un candidat à la présidence</strong> · Concept indépendant · Ceci n’est pas le site officiel de l’IFCM", proposal: "IFCM Official ↗",
    nav: ["À propos", "Projets", "Coopérations", "Services", "Adhésion", "eMedia", "eNews", "Portail IFCM", "Rejoindre l’IFCM"], eyebrow: "Fédération internationale pour la musique chorale", hero: "Des créateurs qui<br><em>transforment le monde.</em>",
    intro: "L’IFCM peut devenir le lieu où la communauté chorale mondiale se retrouve chaque jour — pas seulement lors d’événements, mais par le savoir, les possibilités et des liens authentiques.",
    see: "Découvrir la vision <span>↘</span>", film: "<i>▶</i> La vision en 90 s", now: "L’IFCM aujourd’hui", oneWorld: "Un monde.<br>Des millions de voix.", scroll: "Faire défiler pour écouter <span>↓</span>",
    visionLabel: "Pourquoi l’IFCM existe", manifesto: "Née pour relier<br>un monde qui <span>chante.</span>", future: "En 1982, cinq grandes organisations chorales se sont réunies à Namur, en Belgique, pour faciliter la communication et les échanges au-delà des frontières.",
    commons: "Depuis, l’IFCM relie les musiciens par les symposiums mondiaux, le World Youth Choir, la Journée mondiale du chant choral, les publications, le mentorat et la coopération internationale.",
    values: ["Fondée en 1982", "Coopération mondiale", "Diversité culturelle", "Des créateurs qui transforment le monde"], movesLabel: "Un réseau mondial vivant", moves: "De l’organisation<br>au <em>réseau vivant.</em>", movesIntro: "Quatre engagements concrets pour rendre l’IFCM plus pertinente, représentative et connectée.",
    priorities: [
      ["Une adhésion utile", "Un tableau de bord personnel réunissant possibilités, événements, échanges, enregistrements et ressources — adapté aux intérêts et à la région de chaque membre.", "Tableau mondial des possibilités|Mentorat et cercles de pairs|Bibliothèque d’apprentissage des membres"],
      ["Chaque région à la table", "Des conseils régionaux directement reliés aux décisions, à la traduction, à la programmation et à la visibilité de toute la fédération.", "Assemblées régionales d’écoute|Communication multilingue|Représentation transparente"],
      ["Le savoir en mouvement", "Une plateforme mondiale où chefs, compositeurs, chanteurs, administrateurs et chercheurs peuvent enseigner, découvrir et collaborer.", "Ressources multilingues ouvertes|Studios numériques mensuels|Programme pour jeunes leaders"],
      ["La confiance par la clarté", "Des priorités claires, des budgets accessibles, des décisions visibles et des rapports réguliers — pour faire des membres de véritables partenaires.", "Tableau public de la stratégie|Appels et critères ouverts|Assemblée annuelle des membres"]
    ],
    worldLabel: "Le monde connecté", worldTitle: "Et si tout le monde choral était <em>à un clic?</em>", worldText: "Découvrez chœurs, chefs, compositeurs, festivals et possibilités par lieu, langue et intérêt — une carte chorale mondiale créée par la communauté.",
    worldLink: "Imaginez votre place sur la carte <span>→</span>", regions: ["Amérique du Nord", "Amérique du Sud", "Europe", "Afrique", "Asie", "Océanie"], regionStat: "régions<br>dans une conversation",
    digital: "Espace membre", aside: ["Pour vous", "Calendrier", "Réseau", "Possibilités", "IFCM AI"], morning: "BIENVENUE", dashboardTitle: "Votre monde choral,<br>en un seul lieu.",
    live: "EN DIRECT CETTE SEMAINE", conductor: "Réinventer le rôle du chef", connections: "NOUVEAUX LIENS", people: "12 personnes partagent vos intérêts", meet: "Rencontrez-les →", calls: "APPELS OUVERTS", opportunities: "8 possibilités sélectionnées pour vous", explore: "Explorer →",
    listen: "Écouter · Relier · Servir", candidateLabel: "IFCM eNews", lead: "Projets, appels, événements, publications et voix de la communauté chorale internationale.",
    quote: "« Diriger commence par une écoute assez profonde pour qu’une nouvelle harmonie devienne possible. »", bio: "Ma candidature s’appuie sur la pratique artistique, la collaboration internationale et la conviction qu’une institution se renforce lorsque davantage de personnes peuvent s’y reconnaître.",
    joinLabel: "Rejoignez la conversation", joinTitle: "L’avenir sonne mieux<br>avec <em>votre voix.</em>", labels: ["Votre nom", "Votre e-mail", "Que devrait devenir l’IFCM ?"], placeholders: ["Comment devons-nous vous appeler ?", "vous@exemple.org", "Ajoutez votre voix à la vision…"],
    send: "Envoyer votre idée <span>↗</span>", thanks: "Merci — ce prototype est prêt à être relié à la plateforme de campagne ou d’e-mail de votre choix.", footer: "Un concept de candidature pour une Fédération internationale pour la musique chorale plus connectée.", official: "Site actuel de l’IFCM ↗", copyright: "© 2026 Concept de vision",
    modalEye: "La vision en 90 secondes", modalTitle: "Un film peut vivre ici.", modalText: "Cet espace est prêt pour un film de campagne concis : votre voix, entrelacée avec des communautés chorales de tous les continents."
  },
  es: {
    title: "IFCM — Creadores que transforman el mundo", concept: "<strong>Propuesta de un candidato a la presidencia</strong> · Concepto independiente · No es el sitio oficial de la IFCM", proposal: "IFCM Official ↗",
    nav: ["Quiénes somos", "Proyectos", "Cooperaciones", "Servicios", "Membresía", "eMedia", "eNews", "Portal IFCM", "Únete a la IFCM"], eyebrow: "Federación Internacional para la Música Coral", hero: "Creadores que<br><em>transforman el mundo.</em>",
    intro: "La IFCM puede convertirse en el lugar donde la comunidad coral mundial se reúne cada día — no solo en eventos, sino a través del conocimiento, las oportunidades y una conexión auténtica.",
    see: "Conocer la visión <span>↘</span>", film: "<i>▶</i> Visión en 90 s", now: "La IFCM ahora", oneWorld: "Un mundo.<br>Millones de voces.", scroll: "Desplázate para escuchar <span>↓</span>",
    visionLabel: "Por qué existe la IFCM", manifesto: "Nació para conectar<br>un mundo que <span>canta.</span>", future: "En 1982, cinco grandes organizaciones corales se reunieron en Namur, Bélgica, para facilitar la comunicación y el intercambio más allá de las fronteras.",
    commons: "Desde entonces, la IFCM conecta músicos mediante simposios mundiales, World Youth Choir, World Choral Day, publicaciones, mentoría, bases de datos y cooperación internacional.",
    values: ["Fundada en 1982", "Cooperación global", "Diversidad cultural", "Creadores que transforman el mundo"], movesLabel: "Una red mundial viva", moves: "De organización<br>a <em>red viva.</em>", movesIntro: "Cuatro compromisos prácticos para hacer que la IFCM sea más relevante, representativa y conectada.",
    priorities: [
      ["Una afiliación útil", "Un panel personal con oportunidades, eventos, intercambio, grabaciones y recursos — adaptado a los intereses y la región de cada miembro.", "Tablón global de oportunidades|Mentoría y círculos de pares|Biblioteca de aprendizaje para miembros"],
      ["Todas las regiones en la mesa", "Consejos regionales con acceso directo a decisiones, traducción, programación y visibilidad en toda la federación.", "Asambleas regionales de escucha|Comunicación multilingüe|Representación transparente"],
      ["Conocimiento en movimiento", "Una plataforma global donde directores, compositores, cantantes, gestores e investigadores puedan enseñar, descubrir y colaborar.", "Recursos multilingües abiertos|Estudios digitales mensuales|Programa para líderes emergentes"],
      ["Confianza mediante claridad", "Prioridades claras, presupuestos accesibles, decisiones visibles e informes regulares — haciendo a los miembros socios de la dirección de la IFCM.", "Panel público de estrategia|Convocatorias y criterios abiertos|Asamblea anual de miembros"]
    ],
    worldLabel: "El mundo conectado", worldTitle: "¿Y si todo el mundo coral estuviera <em>a un clic?</em>", worldText: "Descubre coros, directores, compositores, festivales y oportunidades por lugar, idioma e interés — un mapa coral global construido por la propia comunidad.",
    worldLink: "Imagina tu lugar en el mapa <span>→</span>", regions: ["Norteamérica", "Sudamérica", "Europa", "África", "Asia", "Oceanía"], regionStat: "regiones<br>en una conversación",
    digital: "Área de miembro", aside: ["Para ti", "Calendario", "Red", "Oportunidades", "IFCM AI"], morning: "BIENVENIDO", dashboardTitle: "Tu mundo coral,<br>en un solo lugar.",
    live: "EN DIRECTO ESTA SEMANA", conductor: "Reimaginar el papel del director", connections: "NUEVAS CONEXIONES", people: "12 personas comparten tus intereses", meet: "Conócelas →", calls: "CONVOCATORIAS ABIERTAS", opportunities: "8 oportunidades seleccionadas para ti", explore: "Explorar →",
    listen: "Escuchar · Conectar · Servir", candidateLabel: "IFCM eNews", lead: "Proyectos, convocatorias, eventos, publicaciones y voces de la comunidad coral internacional.",
    quote: "«Liderar comienza por escuchar con suficiente profundidad para que una nueva armonía sea posible.»", bio: "Mi candidatura se basa en la práctica artística, la colaboración internacional y la convicción de que una institución se fortalece cuando más personas pueden verse reflejadas en ella.",
    joinLabel: "Únete a la conversación", joinTitle: "El futuro suena mejor<br>con <em>tu voz.</em>", labels: ["Tu nombre", "Tu correo", "¿En qué debería convertirse la IFCM?"], placeholders: ["¿Cómo debemos llamarte?", "tu@ejemplo.org", "Suma tu voz a la visión…"],
    send: "Enviar tu idea <span>↗</span>", thanks: "Gracias — este prototipo está listo para conectarse a la plataforma de campaña o correo que elijas.", footer: "Un concepto de candidatura para una Federación Internacional para la Música Coral más conectada.", official: "Sitio actual de la IFCM ↗", copyright: "© 2026 Concepto de visión",
    modalEye: "La visión en 90 segundos", modalTitle: "Aquí puede vivir una película.", modalText: "Este espacio está preparado para una película de campaña concisa: tu voz, entrelazada con comunidades corales de todos los continentes."
  },
  zh: {
    title: "IFCM — 创作者改变世界", concept: "<strong>主席候选人提案</strong> · 独立概念 · 非IFCM官方网站", proposal: "IFCM Official ↗",
    nav: ["关于我们", "项目", "合作", "服务", "会员", "数字媒体", "电子新闻", "IFCM登录入口", "加入IFCM"], eyebrow: "国际合唱音乐联合会", hero: "创作者<br><em>改变世界。</em>",
    intro: "IFCM可以成为全球合唱界每天相聚的地方——不仅在活动中，更通过知识、机会和真诚的连接。",
    see: "了解愿景 <span>↘</span>", film: "<i>▶</i> 90秒愿景", now: "此刻的IFCM", oneWorld: "同一个世界。<br>数百万个声音。", scroll: "向下聆听 <span>↓</span>",
    visionLabel: "IFCM为何存在", manifesto: "为连接一个<br><span>歌唱的世界</span>而生。", future: "1982年，五个重要合唱组织在比利时那慕尔相聚，旨在促进跨越国界的沟通与交流。",
    commons: "此后，IFCM通过世界研讨会、世界青年合唱团、世界合唱日、出版物、导师计划、数据库及国际合作连接全球音乐家。",
    values: ["创立于1982年", "全球合作", "文化多样性", "创作者改变世界"], movesLabel: "充满活力的全球网络", moves: "从组织<br>走向<em>活跃网络。</em>", movesIntro: "四项切实承诺，让IFCM更具相关性、代表性和连接力。",
    priorities: [
      ["有价值的会员体验", "一个汇集机会、活动、同行交流、录音和资源的个人平台——根据每位会员的兴趣和地区量身定制。", "全球机会平台|导师与同行交流圈|会员专属学习资料库"],
      ["让每个地区参与决策", "建立区域理事会，直接参与决策、翻译、节目策划及整个联合会的传播展示。", "区域倾听大会|多语言交流|透明的代表机制"],
      ["让知识流动起来", "一个全球学习平台，让指挥家、作曲家、歌唱者、管理者和研究者能够教学、探索与合作。", "开放的多语言资源|每月数字工作室|新生代领导者计划"],
      ["以清晰建立信任", "明确的重点、可查阅的预算、公开的决策和定期报告——让会员成为IFCM发展方向的合作伙伴。", "公开战略仪表板|公开征集与评选标准|年度会员大会"]
    ],
    worldLabel: "互联的世界", worldTitle: "如果整个合唱世界都能<em>一键抵达？</em>", worldText: "按地点、语言和兴趣发现合唱团、指挥家、作曲家、艺术节和机会——一张由社区共同创建的全球合唱地图。",
    worldLink: "想象您在地图上的位置 <span>→</span>", regions: ["北美洲", "南美洲", "欧洲", "非洲", "亚洲", "大洋洲"], regionStat: "个地区<br>同在一场对话中",
    digital: "会员主页", aside: ["为您推荐", "日历", "网络", "机会", "IFCM AI"], morning: "欢迎回来", dashboardTitle: "您的合唱世界，<br>尽在一处。",
    live: "本周直播", conductor: "重新想象指挥家的角色", connections: "新的连接", people: "12人与您兴趣相投", meet: "认识他们 →", calls: "公开征集", opportunities: "为您精选的8个机会", explore: "探索 →",
    listen: "倾听 · 连接 · 服务", candidateLabel: "IFCM电子新闻", lead: "来自国际合唱社区的项目、征集、活动、出版物和声音。",
    quote: "“领导力始于深刻的倾听，直到一种新的和声成为可能。”", bio: "我的候选理念植根于艺术实践、国际合作，以及这样一个信念：当更多人能在一个机构中看见自己时，这个机构就会更强大。",
    joinLabel: "加入对话", joinTitle: "有了<em>您的声音，</em><br>未来会更动听。", labels: ["您的姓名", "您的电子邮箱", "IFCM应该成为什么？"], placeholders: ["我们应如何称呼您？", "you@example.org", "为这份愿景加入您的声音……"],
    send: "发送您的想法 <span>↗</span>", thanks: "谢谢——此原型已准备好连接到您选择的邮件或竞选平台。", footer: "一个旨在建设更紧密相连的国际合唱音乐联合会的候选人构想。", official: "当前IFCM网站 ↗", copyright: "© 2026 愿景构想",
    modalEye: "90秒愿景", modalTitle: "这里可以呈现一部影片。", modalText: "此空间已为一部简洁的竞选影片做好准备：您的声音，与来自各大洲的合唱社区交织在一起。"
  }
};

copy.de = {
  ...copy.en,
  title: "IFCM — Kreative verändern die Welt",
  concept: "<strong>Vorschlag eines Präsidentschaftskandidaten</strong> · Unabhängiges Konzept · Keine offizielle IFCM-Website",
  proposal: "IFCM offiziell ↗",
  nav: ["Über uns", "Projekte", "Kooperationen", "Dienste", "Mitgliedschaft", "eMedia", "eNews", "IFCM Login-Portal", "IFCM beitreten"],
  eyebrow: "Internationale Föderation für Chormusik",
  hero: "Kreative<br><em>verändern die Welt.</em>",
  intro: "Ein digitales Zuhause, in dem die weltweite Chorgemeinschaft entdecken, Kontakte knüpfen, lernen, mitwirken und die Zukunft gestalten kann.",
  see: "Mitglied werden <span>↗</span>",
  film: "<i>◎</i> Die Verbindungen entdecken",
  scroll: "Die Geschichte entdecken <span>↓</span>",
  visionLabel: "Warum es die IFCM gibt",
  manifesto: "Geboren, um eine<br><span>singende Welt</span> zu verbinden.",
  future: "1982 kamen in Namur, Belgien, bedeutende Chororganisationen zusammen, um Kommunikation und Austausch über Grenzen hinweg zu ermöglichen.",
  commons: "Seitdem verbindet die IFCM Musikerinnen und Musiker durch Weltsymposien, den World Youth Choir, den World Choral Day, Publikationen, Mentoring, Datenbanken und internationale Zusammenarbeit.",
  values: ["Gegründet 1982", "Globale Zusammenarbeit", "Kulturelle Vielfalt", "Kreative verändern die Welt"],
  movesLabel: "Ein lebendiges globales Netzwerk",
  moves: "Von der Organisation<br>zum <em>lebendigen Netzwerk.</em>",
  movesIntro: "Vier praktische Verpflichtungen für eine relevantere, repräsentativere und stärker vernetzte IFCM.",
  priorities: [
    ["Eine wertvolle Mitgliedschaft", "Ein persönlicher Bereich für Chancen, Veranstaltungen, Austausch, Aufnahmen und Ressourcen — abgestimmt auf Interessen und Region.", "Globale Chancenbörse|Mentoring und Peer-Gruppen|Lernbibliothek für Mitglieder"],
    ["Jede Region am Tisch", "Regionale Gremien mit direktem Zugang zu Entscheidungen, Übersetzung, Programmgestaltung und Sichtbarkeit.", "Regionale Dialogforen|Mehrsprachige Kommunikation|Transparente Vertretung"],
    ["Wissen in Bewegung", "Eine globale Lernplattform für Dirigierende, Komponierende, Singende, Management und Forschung.", "Offene mehrsprachige Ressourcen|Monatliche digitale Studios|Programm für junge Führungskräfte"],
    ["Vertrauen durch Klarheit", "Klare Prioritäten, zugängliche Budgets, sichtbare Entscheidungen und regelmäßige Berichte.", "Öffentliches Strategie-Dashboard|Offene Ausschreibungen und Kriterien|Jährliche Mitgliederversammlung"]
  ],
  digital: "Mitgliederbereich",
  aside: ["Für Sie", "Kalender", "Netzwerk", "Chancen", "IFCM AI"],
  morning: "WILLKOMMEN",
  dashboardTitle: "Ihre Chorwelt,<br>an einem Ort.",
  joinLabel: "Am Gespräch teilnehmen",
  joinTitle: "Die Zukunft klingt besser<br>mit <em>Ihrer Stimme.</em>",
  labels: ["Ihr Name", "Ihre E-Mail", "Was soll aus der IFCM werden?"],
  placeholders: ["Wie dürfen wir Sie ansprechen?", "sie@beispiel.org", "Bringen Sie Ihre Stimme in die Vision ein…"],
  send: "Idee senden <span>↗</span>",
  footer: "Ein unabhängiges digitales Konzept für eine stärker vernetzte Internationale Föderation für Chormusik.",
  copyright: "© 2026 Digitales Konzept"
};

const extendedCopy = {
  en: {
    calendarLabel: "Global choral calendar", calendarTitle: "Where will the<br>choral world meet <em>next?</em>",
    directoryLabel: "Global choral directory", directoryTitle: "Find the people<br>who make the world <em>sing.</em>", directoryText: "This public prototype begins with verified organisations and projects. The protected IFCM Members Database can later be imported by an authorised administrator.", search: "Search choir, organisation or country…",
    membershipLabel: "Membership", membershipTitle: "Join more than a list.<br>Join a <em>working community.</em>", membershipText: "Every member is an ambassador. Membership connects people and organisations to international projects, professional knowledge, recordings, opportunities and democratic participation.", joinMember: "Become a member <span>↗</span>",
    mediaLabel: "Listen, watch, follow", mediaTitle: "The federation<br>should always feel <em>alive.</em>",
    productTitle: "Your useful IFCM space.<br>A weekly <em>habit.</em>", productText: "A glimpse of what a logged-in member could experience: relevant information, real people and useful actions in one calm space."
  },
  pt: {
    calendarLabel: "Calendário coral global", calendarTitle: "Onde se encontrará<br>o mundo coral <em>a seguir?</em>",
    directoryLabel: "Diretório coral global", directoryTitle: "Encontre quem faz<br>o mundo <em>cantar.</em>", directoryText: "Este protótipo público começa com organizações e projetos verificáveis. A base protegida de membros do IFCM poderá depois ser importada por um administrador autorizado.", search: "Procurar coro, organização ou país…",
    membershipLabel: "Membership", membershipTitle: "Junte-se a mais do que uma lista.<br>Junte-se a uma <em>comunidade ativa.</em>", membershipText: "Cada membro é um embaixador. A adesão liga pessoas e organizações a projetos internacionais, conhecimento profissional, gravações, oportunidades e participação democrática.", joinMember: "Tornar-se membro <span>↗</span>",
    mediaLabel: "Escutar, ver, acompanhar", mediaTitle: "A federação<br>deve sentir-se sempre <em>viva.</em>",
    productTitle: "O seu espaço IFCM útil.<br>Um <em>hábito semanal.</em>", productText: "Um vislumbre da experiência de um membro autenticado: informação relevante, pessoas reais e ações úteis num único espaço sereno."
  },
  fr: {
    calendarLabel: "Calendrier choral mondial", calendarTitle: "Où le monde choral<br>se retrouvera-t-il <em>ensuite?</em>",
    directoryLabel: "Annuaire choral mondial", directoryTitle: "Trouvez celles et ceux<br>qui font <em>chanter le monde.</em>", directoryText: "Ce prototype public commence par des organisations et projets vérifiables. La base protégée des membres de l’IFCM pourra ensuite être importée par un administrateur autorisé.", search: "Rechercher un chœur, une organisation ou un pays…",
    membershipLabel: "Adhésion", membershipTitle: "Rejoignez plus qu’une liste.<br>Rejoignez une <em>communauté active.</em>", membershipText: "Chaque membre est un ambassadeur. L’adhésion relie personnes et organisations aux projets internationaux, aux connaissances, aux enregistrements, aux possibilités et à la participation démocratique.", joinMember: "Devenir membre <span>↗</span>",
    mediaLabel: "Écouter, regarder, suivre", mediaTitle: "La fédération<br>doit toujours paraître <em>vivante.</em>",
    productTitle: "Votre espace IFCM utile.<br>Une <em>habitude hebdomadaire.</em>", productText: "Un aperçu de l’expérience d’un membre connecté : informations pertinentes, personnes réelles et actions utiles dans un espace serein."
  },
  es: {
    calendarLabel: "Calendario coral mundial", calendarTitle: "¿Dónde se reunirá<br>el mundo coral <em>después?</em>",
    directoryLabel: "Directorio coral mundial", directoryTitle: "Encuentra a quienes hacen<br>que el mundo <em>cante.</em>", directoryText: "Este prototipo público comienza con organizaciones y proyectos verificables. La base protegida de miembros de la IFCM podrá importarse después por un administrador autorizado.", search: "Buscar coro, organización o país…",
    membershipLabel: "Membresía", membershipTitle: "Únete a algo más que una lista.<br>Únete a una <em>comunidad activa.</em>", membershipText: "Cada miembro es un embajador. La membresía conecta a personas y organizaciones con proyectos internacionales, conocimiento profesional, grabaciones, oportunidades y participación democrática.", joinMember: "Hazte miembro <span>↗</span>",
    mediaLabel: "Escuchar, ver, seguir", mediaTitle: "La federación<br>siempre debe sentirse <em>viva.</em>",
    productTitle: "Tu espacio IFCM útil.<br>Un <em>hábito semanal.</em>", productText: "Un vistazo a la experiencia de un miembro conectado: información relevante, personas reales y acciones útiles en un espacio sereno."
  },
  zh: {
    calendarLabel: "全球合唱日历", calendarTitle: "合唱世界<br>下一站<em>在哪里相聚？</em>",
    directoryLabel: "全球合唱名录", directoryTitle: "寻找那些<br>让世界<em>歌唱的人。</em>", directoryText: "这个公开原型首先收录可核实的组织和项目。受保护的IFCM会员数据库之后可由授权管理员导入。", search: "搜索合唱团、组织或国家……",
    membershipLabel: "会员", membershipTitle: "加入的不只是一份名单。<br>而是一个<em>行动中的社区。</em>", membershipText: "每位会员都是大使。会员体系将个人与组织连接到国际项目、专业知识、录音、机会和民主参与。", joinMember: "成为会员 <span>↗</span>",
    mediaLabel: "聆听、观看、关注", mediaTitle: "联合会<br>应该始终充满<em>活力。</em>",
    productTitle: "实用的IFCM空间。<br>成为<em>每周习惯。</em>", productText: "展现会员登录后的体验：相关信息、真实的人和有用的行动，都集中在一个宁静的空间。"
  },
  de: {
    calendarLabel: "Globaler Chorkalender", calendarTitle: "Wo trifft sich<br>die Chorwelt <em>als Nächstes?</em>",
    directoryLabel: "Globales Chorverzeichnis", directoryTitle: "Finden Sie die Menschen,<br>die die Welt <em>zum Singen bringen.</em>", directoryText: "Dieser öffentliche Prototyp beginnt mit überprüfbaren Organisationen und Projekten. Geschützte Mitgliedsdaten bleiben im offiziellen IFCM-Portal.", search: "Chor, Organisation oder Land suchen…",
    membershipLabel: "Mitgliedschaft", membershipTitle: "Mehr als eine Liste.<br>Eine <em>aktive Gemeinschaft.</em>", membershipText: "Jedes Mitglied ist ein Botschafter. Die Mitgliedschaft verbindet Menschen und Organisationen mit internationalen Projekten, Wissen, Aufnahmen, Chancen und Mitwirkung.", joinMember: "Mitglied werden <span>↗</span>",
    mediaLabel: "Hören, sehen, folgen", mediaTitle: "Die Föderation<br>sollte sich immer <em>lebendig anfühlen.</em>",
    productTitle: "Ihr nützlicher IFCM-Bereich.<br>Eine <em>wöchentliche Gewohnheit.</em>", productText: "Ein Einblick in den persönlichen Mitgliederbereich: relevante Informationen, echte Menschen und nützliche Aktionen an einem ruhigen Ort."
  }
};

function html(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.innerHTML = value;
}

function applyLocalLanguage(language) {
  const lang = copy[language] ? language : "en";
  const t = copy[lang];
  document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
  document.title = t.title;
  html(".concept-bar span", t.concept);
  html(".concept-bar a", t.proposal);
  document.querySelectorAll("#main-nav a").forEach((node, index) => node.textContent = t.nav[index]);
  html(".hero .eyebrow", t.eyebrow); html(".hero h1", t.hero); html(".hero-intro", t.intro);
  html(".hero-actions .button", t.see); html(".play-button", t.film); html(".live-card small", t.now); html(".live-card strong", t.oneWorld); html(".scroll-cue", t.scroll);
  html(".manifesto > .section-label", t.visionLabel); html(".manifesto-grid h2", t.manifesto); html(".manifesto-grid .large-copy", t.future);
  html(".manifesto-grid div p:last-child", t.commons);
  document.querySelectorAll(".manifesto-strip span").forEach((node, index) => node.textContent = t.values[index]);
  html(".priorities .section-label", t.movesLabel); html(".priorities .section-heading h2", t.moves); html(".priorities .section-heading > p", t.movesIntro);
  document.querySelectorAll(".priority").forEach((node, index) => {
    const item = t.priorities[index];
    node.querySelector(".priority-title").textContent = item[0];
    node.querySelector(".priority-content p").textContent = item[1];
    node.querySelectorAll("li").forEach((li, liIndex) => li.textContent = item[2].split("|")[liIndex]);
  });
  html(".world .section-label", t.worldLabel); html(".world h2", t.worldTitle); html(".world-copy > p:not(.section-label)", t.worldText); html(".world .text-link", t.worldLink);
  document.querySelectorAll(".map-point span").forEach((node, index) => node.textContent = t.regions[index]); html(".map-stat span", t.regionStat);
  const ex = extendedCopy[lang];
  html(".global-calendar .section-label", ex.calendarLabel); html(".calendar-heading h2", ex.calendarTitle);
  html(".directory .section-label", ex.directoryLabel); html(".directory h2", ex.directoryTitle); html(".directory-head > p", ex.directoryText); directorySearch.placeholder = ex.search;
  html(".membership .section-label", ex.membershipLabel); html(".membership h2", ex.membershipTitle); html(".membership-intro > p:not(.section-label)", ex.membershipText); html(".membership .button", ex.joinMember);
  html(".media-hub .section-label", ex.mediaLabel); html(".media-hub h2", ex.mediaTitle);
  html(".product-heading h2", ex.productTitle); html(".product-heading p", ex.productText);
  html(".platform > .section-label", t.digital); document.querySelectorAll(".dashboard aside button").forEach((node, index) => node.textContent = t.aside[index]);
  html(".welcome small", t.morning); html(".welcome h3", t.dashboardTitle); html(".feature small", t.live); html(".feature strong", t.conductor);
  html(".dash-card.coral small", t.connections); html(".dash-card.coral strong", t.people); html(".dash-card.coral span", t.meet);
  html(".dash-card.light small", t.calls); html(".dash-card.light strong", t.opportunities); html(".dash-card.light span", t.explore);
  html(".candidate-photo span", t.listen); html(".candidate .section-label", t.candidateLabel); html(".candidate-lead", t.lead); html(".candidate blockquote", t.quote); html(".candidate-copy > p:last-of-type", t.bio);
  html(".join .section-label", t.joinLabel); html(".join h2", t.joinTitle);
  document.querySelectorAll(".voice-form label > span").forEach((node, index) => node.textContent = t.labels[index]);
  document.querySelectorAll(".voice-form input, .voice-form textarea").forEach((node, index) => node.placeholder = t.placeholders[index]);
  html(".voice-form button", t.send); html("footer > p", t.footer); html("footer > div:last-child span", t.copyright);
  html(".modal-inner .eyebrow", t.modalEye); html(".modal-inner h2", t.modalTitle); html(".modal-inner > p:not(.eyebrow)", t.modalText);
  languageSelect.value = lang;
  localStorage.setItem("ifcm-language", lang);
}

const fullTranslationLanguages = {
  zh: "zh-CN",
  hi: "hi",
  es: "es",
  fr: "fr",
  ar: "ar",
  bn: "bn",
  ru: "ru",
  pt: "pt",
  ur: "ur",
  de: "de",
  it: "it"
};
let googleTranslateReady = false;
let queuedTranslation = "";
const residualTranslationCache = new Map();

async function translateResidualText(text, target) {
  const key = `${target}|${text}`;
  if (residualTranslationCache.has(key)) return residualTranslationCache.get(key);
  try {
    const endpoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);
    if (!response.ok) return text;
    const data = await response.json();
    const translated = data?.[0]?.map((part) => part?.[0] || "").join("") || text;
    residualTranslationCache.set(key, translated);
    return translated;
  } catch (error) {
    return text;
  }
}

async function completePageTranslation(language) {
  const target = fullTranslationLanguages[language];
  if (!target) return;
  const candidates = [];
  document.querySelectorAll("body *").forEach((element) => {
    if (element.closest('[translate="no"], .google-translate-host, script, style, select')) return;
    element.childNodes.forEach((node) => {
      if (node.nodeType !== 3) return;
      const text = node.textContent.replace(/\s+/g, " ").trim();
      if (
        text.length < 3 ||
        text.length > 480 ||
        !/[A-Za-z]{3}/.test(text) ||
        /^(IFCM|WSCM|eMedia|eNews|AI|EN|ES|FR|PT|DE)$/i.test(text) ||
        /^(https?:|www\.|[\w.+-]+@)/i.test(text)
      ) return;
      const priority = /^(H1|H2|H3|BUTTON|A|LABEL)$/.test(element.tagName) ? 2 : /^(P|STRONG|SMALL|SPAN)$/.test(element.tagName) ? 1 : 0;
      candidates.push({ node, text, priority });
    });
  });
  candidates.sort((a, b) => b.priority - a.priority);

  let cursor = 0;
  const workers = Array.from({ length: 7 }, async () => {
    while (cursor < candidates.length) {
      const current = candidates[cursor++];
      const translated = await translateResidualText(current.text, target);
      if (translated && translated !== current.text && current.node.isConnected) {
        current.node.nodeValue = current.node.nodeValue.replace(current.text, translated);
      }
    }
  });
  await Promise.all(workers);
}

function activateFullTranslation(language) {
  const target = fullTranslationLanguages[language];
  if (!target) return;
  queuedTranslation = language;
  const translate = () => {
    const combo = document.querySelector(".goog-te-combo");
    if (!combo) {
      window.setTimeout(translate, 200);
      return;
    }
    combo.value = target;
    combo.dispatchEvent(new Event("input", { bubbles: true }));
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    queuedTranslation = "";
    window.setTimeout(() => completePageTranslation(language), 1800);
  };
  if (googleTranslateReady) translate();
}

window.googleTranslateElementInit = () => {
  new window.google.translate.TranslateElement({
    pageLanguage: "en",
    includedLanguages: Object.values(fullTranslationLanguages).join(","),
    autoDisplay: false
  }, "google_translate_element");
  googleTranslateReady = true;
  if (queuedTranslation) window.setTimeout(() => activateFullTranslation(queuedTranslation), 100);
};

function loadFullPageTranslator() {
  if (document.querySelector('script[data-ifcm-translator]')) return;
  const script = document.createElement("script");
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  script.dataset.ifcmTranslator = "true";
  document.head.appendChild(script);
}

function applyLanguage(language) {
  const supported = languageSelect.querySelector(`option[value="${language}"]`) ? language : "en";
  conciergeLanguage = supported;
  document.querySelectorAll("[data-concierge-lang]").forEach((button) => button.classList.toggle("active", button.dataset.conciergeLang === supported));
  if (supported === "en") {
    document.cookie = "googtrans=; path=/; max-age=0; SameSite=Lax";
    applyLocalLanguage("en");
    document.documentElement.dir = "ltr";
    const combo = document.querySelector(".goog-te-combo");
    if (combo && combo.value) {
      combo.value = "";
      combo.dispatchEvent(new Event("input", { bubbles: true }));
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    }
    return;
  }

  if (copy[supported] && extendedCopy[supported]) applyLocalLanguage(supported);
  document.cookie = `googtrans=/en/${fullTranslationLanguages[supported]}; path=/; SameSite=Lax`;
  languageSelect.value = supported;
  document.documentElement.lang = supported === "zh" ? "zh-Hans" : supported;
  document.documentElement.dir = ["ar", "ur"].includes(supported) ? "rtl" : "ltr";
  localStorage.setItem("ifcm-language", supported);
  queuedTranslation = supported;
  loadFullPageTranslator();
  activateFullTranslation(supported);
}

const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
applyLanguage(requestedLanguage || "en");
if (requestedLanguage) {
  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete("lang");
  window.history.replaceState({}, "", `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
}
languageSelect.addEventListener("change", (event) => {
  const nextLanguage = event.target.value;
  const nextUrl = new URL(window.location.href);
  if (nextLanguage === "en") nextUrl.searchParams.delete("lang");
  else nextUrl.searchParams.set("lang", nextLanguage);
  window.location.assign(nextUrl.toString());
});

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

priorities.forEach((priority) => {
  priority.querySelector("button").addEventListener("click", () => {
    const wasActive = priority.classList.contains("active");
    priorities.forEach((item) => item.classList.remove("active"));
    if (!wasActive) priority.classList.add("active");
  });
});

const videoTrigger = document.querySelector("[data-video]");
if (videoTrigger) videoTrigger.addEventListener("click", () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = form.querySelector(".form-note");
  note.textContent = (copy[languageSelect.value] || copy.en).thanks;
  form.reset();
});
