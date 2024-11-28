import aldar from "../../audio/aldar_kose.jpeg";
import aldarQr from "../../audio/qr-aldar.png";

import maqtaQyz from "../../audio/maqta-qyz.png";
import qanbaqShal from "../../audio/qanbaq-shal.png";
import maqtaQyzQr from "../../audio/qr-maqta-qyz.png";
import qanbaqShalQr from "../../audio/qr-qanbak.png";
import tazshaBalaQr from "../../audio/qr-tazsha.png";
import tolagaiQr from "../../audio/qr-tolagai.png";
import tazshaBala from "../../audio/tazsha-bala.png";

import tolagay from "../../audio/tolagay.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PuzzleCard from "../../components/PuzzleCard";

export const data = [
  {
    title: "Тау көтерген Толағай",
    image: tolagay,
    link: "tolagai",
    qr: tolagaiQr,
    text: "Бұрынғы өткен заманда, үлкен өзен бойында Саржан деген аңшы өмір сүреді, Жылдар жылжып, күндер өткенде оның әйелі Айсұлу өмірге ұл әкеліп, қуанған әке-шеше дүбірлетіп той өткізіп, балаға Толағай деген ат қояды. Толағай ай санап емес, күн санап өсіп, төрт жасында нағыз батырға айналып, жетіге келгенде белдесуге шақ адам табылмайды. Әкесімен бірге аңға шығып, атақты аңшыға айналады.",
  },
  {
    title: "Қаңбақ шал",
    image: qanbaqShal,
    qr: qanbaqShalQr,
    link: "qanbaq-shal",
    text: "Бұрын, бұрын, бұрында Қаңбақ шал деген шал болыпты. Мал мен басқа зар болыпты. Кедейліктен шықпапты. Ол ау салып, балық ұстап, тамақ асырапты. Жел соқса, шал домалап жөнеледі екен. Содан оған Қаңбақ шал деп ат қойылған екен. Күн сайын ауына ілінген екі балығының біреуін бір түлкі әлімжеттік қып тартып жей береді екен. ",
  },

  {
    title: "Мақта қыз бен мысық",
    image: maqtaQyz,
    qr: maqtaQyzQr,
    link: "maqta-qyz-ben-mysyk",
    text: "Баяғыда Мақта қыз болыпты. Мақта қыз үйін жинап жүріп, бір мейіз тауып алады да, мысықты шақырады, Мысық келмейді. Қыз: – Келмесең келме! – деп, мейізді өзі жеп қояды.",
  },
  {
    title: "Тазша бала",
    image: tazshaBala,
    qr: tazshaBalaQr,
    link: "tazsha-bala",
    text: "Ертеде бір шал мен кемпір болыпты. Олардың үш баласы, бес ешкісі бар екен. Бір күні үлкен баласы басқа жерден пайда кәсіп қылуға талап етіп, өзіне тиген енші ешкісін сойып алып, етінен кемпір мен шалға бір түйір де берместен, арқалап кетіпті. Келе жатса, бір өнерші байдікіне келеді.",
  },

  {
    title: "Алдар Көсе",
    image: aldar,
    qr: aldarQr,
    link: "aldar",
    text: "Алдар көсе байдың қойын жайыпты. Жайып жүріп, бір күні шықпақ болыпты. Байдың баласы жоқ екен. Қойнына ыстық нанды тығып, қойына кетіп бара жатса, Алдар көсе келіп:",
  },
];
const Puzzles = () => {
  return (
    <>
      <Header />
      <div className="puzzles-page">
        <div className="container">
          <div className="page__wrapper puzzles_page_wrapper">
            <h1>Пазл ойыны каталогы</h1>
            <div className="puzzles_wrapper">
              {data.map((el, idx) => (
                <PuzzleCard
                  key={idx}
                  title={el.title}
                  img={el.image}
                  link={el.link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Puzzles;
