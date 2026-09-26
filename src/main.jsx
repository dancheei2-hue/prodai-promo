import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Check,
  Play,
  House,
  Camera,
  FileText,
  Phone,
  Handshake,
  Tag,
  MagnifyingGlass,
  ShieldCheck,
  X,
  ListChecks,
  CaretRight
} from "@phosphor-icons/react";
import "./styles.css";

const moduleImages = {
  "01": "/prodai-promo/photos/module-01.jpg",
  "02": "/prodai-promo/photos/module-02.jpg",
  "03": "/prodai-promo/photos/module-03.jpg",
  "04": "/prodai-promo/photos/module-04.jpg",
  "05": "/prodai-promo/photos/module-05.jpg",
  "06": "/prodai-promo/photos/module-06.jpg"
};

const siteImages = {
  hero: "/prodai-promo/photos/hero.jpg",
  intro: "/prodai-promo/photos/intro.jpg",
  lesson: "/prodai-promo/photos/lesson.jpg",
  deal: "/prodai-promo/photos/deal.jpg"
};

const modules = [
  {
    num: "01",
    title: "ПОДГОТОВЬТЕ",
    subtitle: "Квартира и документы",
    description:
      "Подготовьте квартиру к продаже и уберите проблемы ещё до появления первого покупателя.",
    lessons: [
      ["01.1", "Квартира и документы", "Что проверить и подготовить до выхода на рынок."],
      ["01.2", "Подготовка квартиры", "Что действительно влияет на первое впечатление и цену."]
    ]
  },
  {
    num: "02",
    title: "ОЦЕНИТЕ",
    subtitle: "Цена и стратегия",
    description:
      "Определите реальную цену и стратегию, с которой квартира выйдет на рынок.",
    lessons: [
      ["02.1", "Анализ рынка", "Как находить сопоставимые квартиры и читать рынок."],
      ["02.2", "Цена и стратегия", "Как определить стартовую цену и допустимый торг."]
    ]
  },
  {
    num: "03",
    title: "УПАКУЙТЕ",
    subtitle: "Фото, видео и объявление",
    description:
      "Сделайте подачу квартиры такой, чтобы покупателю захотелось открыть объявление и приехать на просмотр.",
    lessons: [
      ["03.1", "Фото и видео", "Как показать квартиру самостоятельно и не потерять ценность."],
      ["03.2", "Продающее объявление", "Как собрать заголовок, описание и структуру объявления."]
    ]
  },
  {
    num: "04",
    title: "ПРОДВИНЬТЕ",
    subtitle: "Площадки и покупатели",
    description:
      "Дайте объявлению охват и научитесь превращать просмотры в реальные обращения.",
    lessons: [
      ["04.1", "Площадки и размещение", "Где размещать объект и как контролировать результат."],
      ["04.2", "Обращения и покупатели", "Как отвечать, квалифицировать и не терять интерес."]
    ]
  },
  {
    num: "05",
    title: "ПРОДАВАЙТЕ",
    subtitle: "Показы и переговоры",
    description:
      "Проведите покупателя от первого просмотра до конкретного предложения.",
    lessons: [
      ["05.1", "Показы", "Как подготовить встречу и показать ценность квартиры."],
      ["05.2", "Переговоры и торг", "Как работать с возражениями, условиями и ценой."]
    ]
  },
  {
    num: "06",
    title: "ЗАКРОЙТЕ",
    subtitle: "Сделка, деньги и передача",
    description:
      "Согласуйте условия, подготовьте сделку и спокойно доведите продажу до передачи квартиры.",
    lessons: [
      ["06.1", "Документы и сделка", "Что проверить и согласовать перед подписанием."],
      ["06.2", "Расчёты и передача", "Как пройти расчёты, регистрацию и передачу квартиры."]
    ]
  }
];

function Reveal({ children, className = "", id }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [openModule, setOpenModule] = useState(null);
  const [selfCheck, setSelfCheck] = useState([null, null, null, null, null]);

  const selfCheckQuestions = [
    {
      q: "Сколько времени вы готовы уделять продаже?",
      options: [["few", "Почти нет времени"], ["some", "Есть несколько часов в неделю"], ["much", "Готов заниматься регулярно"]]
    },
    {
      q: "Готовы сами определить цену и следить за рынком?",
      options: [["yes", "Да"], ["help", "Хочу помощь"], ["no", "Нет"]]
    },
    {
      q: "Готовы принимать звонки, проводить показы и вести переговоры?",
      options: [["yes", "Да"], ["part", "Часть дел готов делать"], ["no", "Нет"]]
    },
    {
      q: "Готовы самостоятельно заниматься документами и сделкой?",
      options: [["yes", "Да"], ["help", "Хочу помощь"], ["no", "Нет"]]
    },
    {
      q: "Насколько срочно нужно продать квартиру?",
      options: [["slow", "Срок не критичен"], ["normal", "Есть обычный срок"], ["fast", "Нужно максимально быстро"]]
    }
  ];

  const selfCheckResult = selfCheck.filter(Boolean).length < 5
    ? null
    : (() => {
        const counts = selfCheck.reduce((acc, value) => {
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});
        if ((counts.no || 0) >= 2 || (counts.few || 0) >= 2) return "delegate";
        if ((counts.help || 0) >= 2 || (counts.part || 0) >= 2 || (counts.some || 0) >= 2) return "mixed";
        return "self";
      })();

  return (
    <div className="site">

      <header className="nav">
        <a className="brand" href="#top">
          <span>ПРОДАЙ САМ</span>
          <small>СИСТЕМА ПРОДАЖИ КВАРТИРЫ</small>
        </a>

        <nav className="desktop-nav">
          <a href="#program">Программа</a>
          <a href="#inside">Как проходит</a>
          <a href="#author">Об авторе</a>
          <a href="#services">Помощь</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a className="nav-cta" href="#buy">
          Получить доступ
          <ArrowRight size={17} />
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenu(!menu)}
          aria-label="Открыть меню"
        >
          {menu ? <X size={24} /> : <ListChecks size={24} />}
        </button>
      </header>

      {menu && (
        <div className="mobile-panel">
          <a href="#program" onClick={() => setMenu(false)}>Программа</a>
          <a href="#inside" onClick={() => setMenu(false)}>Как проходит</a>
          <a href="#author" onClick={() => setMenu(false)}>Об авторе</a>
          <a href="#services" onClick={() => setMenu(false)}>Помощь</a>
          <a href="#faq" onClick={() => setMenu(false)}>FAQ</a>

          <a className="primary" href="#buy" onClick={() => setMenu(false)}>
            Получить доступ
            <ArrowRight />
          </a>
        </div>
      )}

      <main id="top">

        <section className="hero">
          <div className="hero-copy">

            <div className="eyebrow">
              ДЛЯ СОБСТВЕННИКА, КОТОРЫЙ ХОЧЕТ ПРОДАТЬ САМ
            </div>

            <h1>
              Продай
              <br />
              квартиру <em>сам.</em>
            </h1>

            <div className="hero-values">
              <span>СИСТЕМНО</span>
              <i>·</i>
              <span>ВЫГОДНО</span>
              <i>·</i>
              <span>БЕЗОПАСНО</span>
            </div>

            <p className="hero-lead">
              Не хотите отдавать продажу риелтору? Не нужно. Здесь вся работа
              разложена по шагам: от подготовки квартиры и определения цены
              до переговоров, сделки и передачи ключей.
            </p>

            <div className="hero-actions">
              <a className="primary hero-button" href="#buy">
                Посмотреть, что предстоит сделать
                <ArrowRight size={19} />
              </a>

              <a className="hero-secondary" href="#program">
                6 этапов · 65+ действий
              </a>
            </div>

            <div className="hero-proof">
              <span><strong>6</strong>этапов</span>
              <span><strong>65+</strong>действий</span>
              <span><strong>20–44</strong>часа*</span>
            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-photo">
              <img src={siteImages.hero} alt="Современный интерьер квартиры" />
              <span>КВАРТИРА · ПЕРВЫЙ ВЗГЛЯД</span>
            </div>

            <div className="sale-map">

              <div className="sale-map-head">
                <span>МАРШРУТ ПРОДАЖИ</span>
                <b>01 → 06</b>
              </div>

              <div className="sale-path">
                {[
                  ["01", "Подготовка", "Что сделать"],
                  ["02", "Цена", "Сколько просить"],
                  ["03", "Подача", "Как показать"],
                  ["04", "Покупатели", "Где найти"],
                  ["05", "Переговоры", "Как договориться"],
                  ["06", "Сделка", "Деньги и ключи"]
                ].map((step, index) => (
                  <React.Fragment key={step[0]}>

                    <div
                      className={`path-step ${
                        index === 0 ? "active" : ""
                      } ${index === 5 ? "final" : ""}`}
                    >
                      <b>{step[0]}</b>
                      <strong>{step[1]}</strong>
                      <small>{step[2]}</small>
                    </div>

                    {index < 5 && <div className="path-line" />}

                  </React.Fragment>
                ))}
              </div>

              <div className="sale-map-foot">
                <span>ПОДГОТОВКА</span>
                <span>ЦЕНА</span>
                <span>ПОКУПАТЕЛИ</span>
                <span>СДЕЛКА</span>
              </div>

            </div>
          </div>
        </section>


        <Reveal className="intro section">

          <div className="section-kicker">ПОЧЕМУ ЭТО ВАЖНО</div>

          <div className="intro-grid">

            <div>
              <h2>
                Продать квартиру —
                <br />
                <span>это не просто</span>
                <br />
                разместить объявление.
              </h2>

              <p>
                Между решением «продаю» и получением денег есть десятки
                решений. Один неверный шаг может стоить времени,
                покупателя или денег.
              </p>

              <a className="text-link" href="#program">
                Посмотреть систему
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="intro-visual">

              <div className="intro-photo">
                <img
                  src={siteImages.intro}
                  alt="Современный интерьер квартиры"
                />
                <span>
                  Подача квартиры начинается с первого впечатления.
                </span>
              </div>

              <div className="icon-grid">
                {[
                  [Tag, "Цена"],
                  [House, "Подготовка"],
                  [Camera, "Фотографии"],
                  [FileText, "Объявление"],
                  [Phone, "Звонки"],
                  [MagnifyingGlass, "Покупатели"],
                  [Handshake, "Переговоры"],
                  [ShieldCheck, "Сделка"]
                ].map(([Icon, label]) => (
                  <div className="icon-item" key={label}>
                    <Icon size={22} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </Reveal>


        <Reveal className="honest section">
          <div className="section-kicker">ЧЕСТНЫЙ ПОДХОД</div>

          <div className="honest-grid">
            <div>
              <h2>Вы можете сделать<br /><span>всё сами.</span></h2>
              <p>
                Я не буду убеждать вас, что без риелтора квартиру продать невозможно.
                Возможно. Но сначала стоит увидеть весь процесс целиком и понять,
                сколько работы вы готовы взять на себя.
              </p>
            </div>

            <div className="honest-cards">
              <article>
                <b>01</b>
                <strong>Разобраться</strong>
                <span>Понять, что делать на каждом этапе и в какой последовательности.</span>
              </article>
              <article>
                <b>02</b>
                <strong>Сделать самостоятельно</strong>
                <span>Получить инструкции, чек-листы и пройти путь самому.</span>
              </article>
              <article>
                <b>03</b>
                <strong>Делегировать нужное</strong>
                <span>Если какой-то этап неудобен или сложен, подключить помощь.</span>
              </article>
            </div>
          </div>
        </Reveal>

        <Reveal className="workload section">
          <div className="section-kicker">СКОЛЬКО ЭТО ЗАЙМЁТ</div>

          <div className="workload-grid">
            <div>
              <h2>Самостоятельная продажа —<br /><span>это реальная работа.</span></h2>
              <p>
                Ориентиры показывают активную работу собственника.
                Время ожидания покупателей не включено.
              </p>
            </div>

            <div className="workload-stats">
              <div><strong>20–44</strong><span>часа активной работы*</span></div>
              <div><strong>65+</strong><span>конкретных действий</span></div>
              <div><strong>∞</strong><span>обращения, показы и переговоры</span></div>
            </div>
          </div>
        </Reveal>

        <Reveal className="selfcheck section">
          <div className="section-kicker">БЫСТРАЯ САМОДИАГНОСТИКА</div>

          <div className="selfcheck-head">
            <div>
              <h2>Стоит ли вам<br /><span>продавать самому?</span></h2>
              <p>Пять вопросов. Примерно одна минута. Ответ покажет, какой объём работы вам ближе.</p>
            </div>
            <div className="selfcheck-progress">{selfCheck.filter(Boolean).length} / 5</div>
          </div>

          <div className="selfcheck-list">
            {selfCheckQuestions.map((item, qi) => (
              <div className="selfcheck-question" key={item.q}>
                <strong>{qi + 1}. {item.q}</strong>
                <div>
                  {item.options.map(([value, label]) => (
                    <button
                      type="button"
                      key={value}
                      className={selfCheck[qi] === value ? "selected" : ""}
                      onClick={() => setSelfCheck(prev => {
                        const next = [...prev];
                        next[qi] = value;
                        return next;
                      })}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selfCheckResult && (
            <div className="selfcheck-result">
              {selfCheckResult === "self" && (
                <>
                  <b>Похоже, вам подходит самостоятельный путь.</b>
                  <span>У вас есть время и готовность брать основные этапы на себя. Система поможет пройти их последовательно.</span>
                </>
              )}
              {selfCheckResult === "mixed" && (
                <>
                  <b>Похоже, вам подойдёт смешанный формат.</b>
                  <span>Основную часть можно сделать самостоятельно, а сложные или неудобные этапы — делегировать.</span>
                </>
              )}
              {selfCheckResult === "delegate" && (
                <>
                  <b>Похоже, часть работы вам удобнее передать.</b>
                  <span>Самостоятельная продажа возможна, но часть этапов вы не готовы брать на себя. Можно выбрать только нужную помощь.</span>
                </>
              )}
              <a className="text-link" href="#services">
                Посмотреть варианты <ArrowRight size={17} />
              </a>
            </div>
          )}

          <small className="workload-note">
            * Ориентир для активной работы по основным этапам. Реальный объём зависит от объекта и ситуации на рынке.
          </small>
        </Reveal>

        <section id="program" className="program section dark-section">

          <div className="program-head">

            <div>
              <div className="section-kicker light">ПРОГРАММА</div>

              <h2>
                6 модулей —
                <br />
                <span>от решения до сделки.</span>
              </h2>
            </div>

            <p>
              Шесть понятных этапов. Внутри каждого — два урока, чек-листы
              и конкретный результат, который должен появиться по вашей квартире.
            </p>

          </div>

          <div className="modules-grid">

            {modules.map((module, index) => {
              const isOpen = openModule === index;

              return (
                <div
                  className={`module-card ${isOpen ? "is-open" : ""}`}
                  key={module.num}
                >

                  <div className="module-thumb">
                    <img
                      src={moduleImages[module.num]}
                      alt={module.subtitle}
                      loading="lazy"
                    />
                    <span>{module.num} / 06</span>
                  </div>

                  <button
                    className="module-trigger"
                    onClick={() =>
                      setOpenModule(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                  >
                    <span className="module-index">
                      {module.num}
                    </span>

                    <span className="module-title-wrap">
                      <strong>{module.title}</strong>
                      <small>{module.subtitle}</small>
                    </span>

                    <span className="module-count">
                      2 УРОКА
                    </span>

                    <CaretRight
                      className="module-arrow"
                      size={20}
                    />
                  </button>

                  <div className="module-content">
                    <div>

                      <p className="module-description">
                        {module.description}
                      </p>

                      <div className="lesson-list">

                        {module.lessons.map(
                          ([number, title, description]) => (
                            <div
                              className="lesson-row"
                              key={number}
                            >
                              <span>{number}</span>

                              <span>
                                <strong>{title}</strong>
                                <small>{description}</small>
                              </span>

                              <ArrowRight size={16} />
                            </div>
                          )
                        )}

                      </div>

                    </div>
                  </div>

                </div>
              );
            })}

          </div>

          <div className="program-footer-note">
            <span>6 ЭТАПОВ</span>
            <i>•</i>
            <span>12 УРОКОВ</span>
            <i>•</i>
            <span>65+ ДЕЙСТВИЙ</span>
            <i>•</i>
            <span>ЧЕК-ЛИСТЫ</span>
          </div>

        </section>


        <Reveal id="inside" className="inside section">

          <div className="inside-copy">

            <div className="section-kicker">
              КАК ЭТО ВЫГЛЯДИТ
            </div>

            <h2>
              Понятный формат.
              <br />
              <span>Реальные действия.</span>
              <br />
              Измеримый результат.
            </h2>

            <p>
              Вы не просто смотрите уроки. После каждого этапа у вас
              появляется конкретный результат по вашей квартире.
            </p>

            <ul>
              {[
                "Короткое видео с объяснением",
                "Пошаговая инструкция",
                "Чек-лист действий",
                "Шаблоны и рабочие материалы",
                "Практическое задание"
              ].map((item) => (
                <li key={item}>
                  <Check size={18} />
                  {item}
                </li>
              ))}
            </ul>

            <a className="text-link" href="#buy">
              Получить доступ
              <ArrowRight size={17} />
            </a>

          </div>

          <div className="course-preview">

            <div className="browser-bar">
              <span />
              <span />
              <span />
              <b>Продай сам / Модуль 02</b>
            </div>

            <div className="course-ui">

              <aside>
                {modules.map((module) => (
                  <div
                    className={
                      module.num === "02" ? "active" : ""
                    }
                    key={module.num}
                  >
                    <b>{module.num}</b>
                    {module.subtitle}
                  </div>
                ))}
              </aside>

              <div className="lesson">

                <div className="lesson-media">
                  <img
                    src={siteImages.lesson}
                    alt="Урок о продаже квартиры"
                  />

                  <div className="lesson-play">
                    <Play size={24} weight="fill" />
                  </div>

                  <span>12:34</span>
                </div>

                <h4>Определяем реальную цену</h4>

                <div className="check-panel">
                  <b>Что нужно сделать</b>

                  {[
                    "Найти аналоги",
                    "Сравнить характеристики",
                    "Определить диапазон",
                    "Установить стартовую цену"
                  ].map((item) => (
                    <span key={item}>
                      <Check size={14} />
                      {item}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </Reveal>


        <Reveal id="author" className="author section">

          <div className="author-image">
            <div className="author-photo-wrap">

              <img
                className="author-photo"
                src="/prodai-promo/danil.webp"
                alt="Данил Аверин"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="portrait-placeholder">
                ДА
              </div>

            </div>
          </div>

          <div className="author-copy">

            <div className="section-kicker">
              КАК ЭТО СОЗДАНО
            </div>

            <h2>Данил Аверин</h2>

            <p className="author-role">
              Специалист по недвижимости
            </p>

            <p>
              Я собрал в одной системе последовательность действий,
              которую собственнику приходится проходить при продаже
              квартиры. Задача «Продай сам» — не убедить вас в
              необходимости риелтора, а дать понимание процесса
              и возможность действовать осознанно.
            </p>

            <div className="author-note">
              «Сложные вещи можно делать проще, если разложить их
              на правильные действия.»
            </div>

          </div>

        </Reveal>


        <section id="buy" className="buy section">

          <div className="buy-main">

            <div className="buy-photo">
              <img
                src={siteImages.deal}
                alt="Квартира и ключи"
                loading="lazy"
              />

              <div>
                <span>ПРОДАЖА КВАРТИРЫ</span>
                <strong>
                  От первого решения до передачи ключей.
                </strong>
              </div>
            </div>

            <div className="buy-main-copy">

              <div className="section-kicker light">
                ВЕСЬ ПУТЬ — В ОДНОЙ СИСТЕМЕ
              </div>

              <h2>Продай сам</h2>

              <div className="price">
                5 990 ₽
              </div>

              <p>
                Получите систему и пройдите весь путь самостоятельно.
                Не нужно собирать информацию по кусочкам —
                последовательность уже собрана за вас.
              </p>

              <div className="buy-meta">
                6 этапов · 12 уроков · 65+ действий · чек-листы · шаблоны
              </div>

              <a className="light-button" href="#contact">
                Получить систему
                <ArrowRight size={19} />
              </a>

            </div>
          </div>

          <div className="buy-side">

            <div className="section-kicker">
              ЕСЛИ НЕ ХОТИТЕ ДЕЛАТЬ ВСЁ САМИ
            </div>

            <h3>
              Не хотите делать всё самостоятельно?
            </h3>

            <p>
              Сделать всё самому — нормально. Делегировать часть или всю работу —
              тоже. Если в процессе поймёте, что какой-то этап проще передать,
              помощь можно подключить отдельно.
            </p>

            <a className="outline-button" href="#services">
              Посмотреть варианты помощи
            </a>

          </div>

        </section>


        <Reveal id="services" className="services section">

          <div className="services-intro">

            <div>
              <div className="section-kicker">
                СДЕЛАТЬ САМОМУ ИЛИ ДЕЛЕГИРОВАТЬ
              </div>

              <h2>
                Самостоятельно
                <br />
                <span>или с моей помощью.</span>
              </h2>
            </div>

            <p>
              Здесь нет обязательной последовательности. Сначала можно пройти
              систему самостоятельно, а затем подключить помощь только там,
              где она действительно нужна. Или сразу передать весь процесс.
            </p>

          </div>


          <div className="services-choice">

            <div className="choice-label">
              <span>ХОЧУ РАЗОБРАТЬСЯ САМ</span>
              <i>01</i>
            </div>

            <div className="course-choice">

              <div className="course-choice-main">
                <div className="choice-kicker">
                  САМОСТОЯТЕЛЬНО
                </div>

                <h3>
                  Продай квартиру
                  <br />
                  самостоятельно
                </h3>

                <p>
                  Получите систему и пройдите весь путь продажи
                  самостоятельно. Курс подходит тем, кто хочет
                  понимать каждый этап и принимать решения самому.
                </p>
              </div>

              <div className="course-choice-side">
                <strong>5 990 ₽</strong>

                <span>
                  6 модулей · 12 уроков
                  <br />
                  чек-листы · шаблоны
                </span>

                <a className="choice-button" href="#contact">
                  Получить систему
                  <ArrowRight size={17} />
                </a>
              </div>

            </div>

          </div>


          <div className="services-divider">
            <span>ИЛИ</span>
          </div>


          <div className="services-choice">

            <div className="choice-label">
              <span>ХОЧУ ДЕЛЕГИРОВАТЬ ЧАСТЬ ИЛИ ВСЮ РАБОТУ</span>
              <i>02</i>
            </div>

            <div className="services-grid">

              <article className="service-card">

                <span className="service-number">
                  01
                </span>

                <h3>
                  Разбор квартиры
                  <br />
                  и стратегии
                </h3>

                <div className="service-price">
                  5 900 ₽
                </div>

                <p>
                  Анализ вашей квартиры и рынка: цена,
                  позиционирование, стратегия выхода на рынок
                  и торга.
                </p>

                <a href="#contact" className="service-link">
                  Заказать
                  <ArrowRight size={16} />
                </a>

              </article>


              <article className="service-card">

                <span className="service-number">
                  02
                </span>

                <h3>
                  Подготовка
                  <br />
                  к продаже
                </h3>

                <div className="service-price">
                  14 900 ₽
                </div>

                <p>
                  Я приеду на объект, помогу подготовить квартиру,
                  сам сделаю фотографии и составлю текст объявления.
                </p>

                <a href="#contact" className="service-link">
                  Заказать
                  <ArrowRight size={16} />
                </a>

              </article>


              <article className="service-card service-card-featured">

                <span className="service-number">
                  03
                </span>

                <div className="service-badge">
                  ПОКУПАТЕЛЯ НАХОДИТЕ ВЫ
                </div>

                <h3>
                  Сопровождение
                  <br />
                  сделки
                </h3>

                <div className="service-price">
                  63 000 ₽
                </div>

                <p>
                  Покупателя находите вы. Я занимаюсь подготовкой
                  сделки, юридической проверкой документов и
                  участников, расчётами и регистрацией.
                </p>

                <a href="#contact" className="service-link">
                  Обсудить
                  <ArrowRight size={16} />
                </a>

              </article>


              <article className="service-card service-card-dark">

                <span className="service-number">
                  04
                </span>

                <div className="service-badge">
                  ПОЛНОЕ СОПРОВОЖДЕНИЕ
                </div>

                <h3>
                  Продажа
                  <br />
                  под ключ
                </h3>

                <div className="service-price">
                  105 000 ₽
                </div>

                <p>
                  Я беру на себя весь процесс: подготовку,
                  продвижение, поиск покупателя, показы,
                  переговоры и сделку.
                </p>

                <a href="#contact" className="service-link">
                  Обсудить продажу
                  <ArrowRight size={16} />
                </a>

              </article>

            </div>
          </div>


          <div className="services-note">
            <strong>
              Не нужно покупать курс и услуги вместе. Сначала можете разобраться
              самостоятельно. Если передумаете — помощь можно подключить
              на нужном этапе.
            </strong>

            <span>
              Хотите сделать всё самостоятельно — берите систему.
              Нужна помощь — выбирайте только нужную услугу.
            </span>
          </div>

        </Reveal>


        <Reveal id="faq" className="faq section">

          <div>
            <div className="section-kicker">FAQ</div>

            <h2>
              Вопросы,
              <br />
              <span>которые возникают</span>
              <br />
              перед покупкой.
            </h2>
          </div>

          <div className="faq-list">

            {[
              [
                "Подойдёт ли система, если я никогда не продавал квартиру?",
                "Да. Модули выстроены последовательно: от подготовки квартиры до завершения сделки."
              ],
              [
                "Что я получаю после оплаты?",
                "Доступ к 6 модулям и 12 урокам, видео, инструкциям, чек-листам, материалам и практическим заданиям."
              ],
              [
                "Обязательно ли покупать курс перед услугой?",
                "Нет. Курс и услуги — самостоятельные варианты. Вы выбираете тот формат, который вам подходит."
              ],
              [
                "Можно ли заказать только часть работы?",
                "Да. Можно выбрать отдельный разбор, подготовку квартиры или сопровождение сделки."
              ],
              [
                "Сколько времени занимает самостоятельная продажа?",
                "Ориентир — около 20–44 часов активной работы по основным этапам. Это не включает ожидание покупателей и регулярную работу с обращениями, показами и переговорами."
              ],
              [
                "Это юридическая консультация?",
                "Нет. Курс объясняет процесс продажи квартиры. При сопровождении конкретной сделки проводится отдельная юридическая проверка документов и участников сделки."
              ]
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span>+</span>
                </summary>

                <p>{answer}</p>
              </details>
            ))}

          </div>

        </Reveal>


        <section id="contact" className="contact section">

          <div>

            <div className="section-kicker light">
              ФИНАЛЬНЫЙ ШАГ
            </div>

            <h2>
              Выберите, как
              <br />
              <span>продавать квартиру.</span>
            </h2>

          </div>

          <div className="contact-actions">

            <a
              className="light-button"
              href="tel:+79956441700"
            >
              Получить систему
              <ArrowRight size={19} />
            </a>

            <a
              className="contact-link"
              href="tel:+79956441700"
            >
              Обсудить продажу квартиры →
            </a>

          </div>

        </section>

      </main>


      <footer>

        <div className="brand">
          <span>ПРОДАЙ САМ</span>
          <small>СИСТЕМА ПРОДАЖИ КВАРТИРЫ</small>
        </div>

        <span>© 2026 Данил Аверин</span>

      </footer>

    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);