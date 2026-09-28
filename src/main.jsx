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

function LandingPage() {
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

        <a className="nav-cta" href="#learn/01.1">
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

          <a className="primary" href="#learn/01.1" onClick={() => setMenu(false)}>
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
              <a className="primary hero-button" href="#program">
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
                            <button
                              className="lesson-row"
                              key={number}
                              onClick={() => { window.location.hash = `learn/${number}`; }}
                              type="button"
                            >
                              <span>{number}</span>

                              <span>
                                <strong>{title}</strong>
                                <small>{description}</small>
                              </span>

                              <ArrowRight size={16} />
                            </button>
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

            <a className="text-link" href="#learn/01.1">
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
                src="/prodai-promo/danil-cutout.webp"
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

              <h2>Продай квартиру сам</h2>

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
                ЕСЛИ НУЖНА ПОМОЩЬ
              </div>

              <h2>
                Не обязательно
                <br />
                <span>делать всё самому.</span>
              </h2>
            </div>

            <p>
              Курс закрывает весь путь продажи. А если какой-то этап
              не хочется делать самостоятельно, его можно делегировать отдельно —
              от подготовки квартиры до полной продажи.
            </p>

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
              Курс и услуги не нужно покупать вместе. Сначала можно пройти
              систему самостоятельно, а помощь подключить только там, где она нужна.
            </strong>

            <span>
              Нужна помощь на одном этапе — выбирайте одну услугу.
              Хотите передать весь процесс — есть продажа под ключ.
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


const COURSE = {"01.1": {"module": "01", "moduleTitle": "ПОДГОТОВЬТЕ", "title": "Квартира и документы", "duration": "5–6 мин", "taskTitle": "Задание 1. Соберите папку продавца", "kind": "checklist-docs", "outcome": "Вы понимаете, кто продаёт квартиру, какие документы уже есть и какие вопросы нужно проверить.", "script": "00:00–00:30 — Вступление\n\nПрежде чем выставлять квартиру на продажу, нужно подготовить не только\nсаму квартиру, но и документы.\n\nНачинаем не с объявления и не с цены.\n\nСначала нужно понять, кто продаёт квартиру, какие у неё особенности и\nкакие документы уже есть.\n\nВ этом уроке соберём основу, с которой можно спокойно выходить на рынок.\n\n00:30–01:20 — Собственники\n\nПервое — проверьте собственников.\n\nПосмотрите, кто указан собственником квартиры и на каком основании\nвозникло право собственности.\n\nЕсли собственников несколько, заранее определите, кто участвует в\nпродаже.\n\nОтдельно обратите внимание на доли.\n\nЕсли среди собственников есть несовершеннолетний, нужно заранее\nразобраться с дополнительными требованиями к сделке.\n\nТакже проверьте ситуацию с супругом, если квартира приобреталась в\nбраке.\n\nЗдесь не нужно самостоятельно становиться юристом.\n\nВаша задача — найти обстоятельства, которые могут повлиять на продажу, и\nне обнаружить их в последний день перед сделкой.\n\n01:20–02:30 — Основные документы\n\nТеперь соберите всё, что уже есть.\n\nДокумент, на основании которого возникло право собственности.\n\nДокументы собственников.\n\nАктуальную информацию об объекте и зарегистрированном праве.\n\nДокументы по долям, супругам или несовершеннолетним, если это применимо.\n\nЕсли была перепланировка — документы, которые подтверждают её законность\nили статус.\n\nНе нужно сразу заказывать всё, что когда-либо может понадобиться для\nсделки.\n\nСначала разберитесь со своей ситуацией.\n\n02:30–03:40 — Проверяем риски\n\nТеперь задайте себе несколько вопросов.\n\nЕсть ли ипотека?\n\nЕсть ли обременения, аресты или запреты?\n\nЕсть ли доли?\n\nЕсть ли несовершеннолетние собственники?\n\nЕсть ли вопросы по зарегистрированным жильцам?\n\nСоответствует ли фактическая планировка документам?\n\nЕсть ли другие обстоятельства, о которых покупатель должен будет узнать?\n\nЕсли на какой-то вопрос вы не знаете ответа — запишите его.\n\nНе оставляйте такие вопросы «на потом».\n\n03:40–04:40 — Папка продавца\n\nСоздайте одну папку «Продажа квартиры».\n\nВнутри сделайте разделы:\n\nПраво собственности.\n\nЛичные документы.\n\nДокументы на квартиру.\n\nИпотека, обременения и ограничения.\n\nСогласия и дополнительные документы.\n\nВопросы, которые нужно проверить.\n\nТак вы не будете искать документы по телефону, почте и старым папкам в\nтот момент, когда покупатель уже готов выходить на сделку.\n\n04:40–05:20 — Что важно запомнить\n\nНа этом этапе ваша задача не собрать идеальную папку для сделки.\n\nВаша задача — понять свою квартиру с документальной стороны.\n\nЧто есть?\n\nЧего нет?\n\nКакие вопросы нужно проверить?\n\nЕсли это понятно, можно переходить к подготовке самой квартиры.\n\n05:20–05:50 — Задание\n\nСоберите документы в одну папку.\n\nПроверьте собственников.\n\nОтметьте ипотеку, обременения, доли и другие особенности.\n\nИ составьте список вопросов, на которые пока нет ответа.\n\nПосле этого переходите к уроку 01.2."}, "01.2": {"module": "01", "moduleTitle": "ПОДГОТОВЬТЕ", "title": "Подготовка квартиры", "duration": "5 мин", "taskTitle": "Задание 2. Подготовьте квартиру к съёмке", "kind": "checklist-prep", "outcome": "Квартира подготовлена так, чтобы на фото были видны пространство, свет и состояние.", "script": "00:00–00:25 — Вступление\n\nПеред фотографированием не нужно просто убрать квартиру.\n\nНужно подготовить её так, чтобы на фотографиях было видно главное:\nплощадь, свет, планировку и состояние.\n\nСейчас пройдём по квартире и проверим, что конкретно нужно убрать, что\nисправить и что оставить.\n\n00:25–01:20 — Комнаты\n\nНачните с комнат.\n\nУберите с поверхностей документы, зарядки, провода, лекарства и мелкие\nпредметы.\n\nОдежду уберите в шкаф.\n\nКровать заправьте.\n\nС подоконников уберите всё лишнее.\n\nЕсли на мебели много декора — оставьте только несколько предметов.\n\nГлавное правило: покупатель должен видеть комнату, а не ваши вещи.\n\n01:20–02:10 — Кухня\n\nНа кухне обычно больше всего визуального шума.\n\nУберите с рабочей поверхности посуду, губки, тряпки, бытовую химию и\nпродукты.\n\nОставьте только то, что выглядит аккуратно и не мешает оценить\nпространство.\n\nОчистите столешницу.\n\nВымойте мойку и смеситель.\n\nПротрите фасады и технику от заметных следов и отпечатков.\n\nХолодильник тоже проверьте: магниты, записки и фотографии лучше убрать.\n\n02:10–02:55 — Ванная\n\nВ ванной оставьте минимум предметов.\n\nЗубные щётки, косметику, шампуни и бытовую химию уберите.\n\nЗакройте крышку унитаза.\n\nПротрите зеркало, стекло душевой, смесители и другие блестящие\nповерхности.\n\nПроверьте углы и швы: именно там чаще всего заметны грязь и налёт.\n\n02:55–03:30 — Прихожая и балкон\n\nВ прихожей оставьте минимум обуви и верхней одежды.\n\nЗеркало протрите.\n\nНа балконе уберите коробки, пакеты, сушилки и всё, что превращает его в\nсклад.\n\nЕсли балкон можно использовать как дополнительное пространство —\nпокажите это.\n\n03:30–04:05 — Свет и окна\n\nТеперь проверьте свет.\n\nЗамените перегоревшие лампы.\n\nОткройте шторы и жалюзи.\n\nЕсли окна грязные — помойте их.\n\nФотографируйте квартиру днём, когда в ней достаточно естественного\nсвета.\n\nПеред съёмкой включите освещение во всех комнатах.\n\n04:05–04:40 — Контрольный кадр\n\nТеперь возьмите телефон.\n\nВстаньте в дверном проёме каждой комнаты и сделайте пробный снимок.\n\nПосмотрите на фотографию.\n\nЕсли в глаза первым делом бросается провод, пакет, сушилка, куча вещей\nили грязная поверхность — исправьте это.\n\nСделайте второй снимок.\n\nПовторите для каждой комнаты.\n\n04:40–05:10 — Задание\n\nПройдите квартиру по пяти зонам:\n\nКомнаты. Кухня. Ванная. Прихожая. Балкон.\n\nВ каждой зоне сделайте пробный снимок.\n\nЗатем уберите всё, что мешает восприятию, и снимите ещё раз.\n\nСохраните лучшие фотографии.\n\nВ следующем модуле начнём работать с рынком и ценой."}, "02.1": {"module": "02", "moduleTitle": "ОЦЕНИТЕ", "title": "Анализ рынка", "duration": "5 мин", "taskTitle": "Задание 3. Найдите аналоги", "kind": "market-table", "outcome": "У вас есть таблица сопоставимых квартир и понимание диапазона рынка.", "script": "00:00–00:30 — Вступление\n\nОдна из главных ошибок продавца — определить цену только потому, что\nименно столько хочется получить.\n\nРынку всё равно, сколько вы потратили на ремонт или сколько вам нужно\nполучить на руки.\n\nПокупатель сравнивает вашу квартиру с другими предложениями.\n\nПоэтому сейчас научимся смотреть на рынок его глазами.\n\n00:30–01:30 — Ищем аналоги\n\nОткройте площадки с объявлениями и найдите квартиры, похожие на вашу.\n\nСначала задайте основные параметры: район, количество комнат, площадь.\n\nЗатем смотрите этаж, состояние, тип дома, наличие балкона, ремонт и\nдругие характеристики.\n\nНе берите для сравнения первую попавшуюся квартиру.\n\nНам нужны именно сопоставимые объекты.\n\n01:30–02:30 — Что сравнивать\n\nСравнивайте не только цену за квадратный метр.\n\nСмотрите на итоговую цену квартиры.\n\nОцените состояние.\n\nРемонт.\n\nЭтаж.\n\nПлощадь кухни.\n\nПланировку.\n\nДом.\n\nЛокацию.\n\nИ дополнительные преимущества.\n\nДве квартиры одинаковой площади могут иметь совершенно разную рыночную\nцену.\n\n02:30–03:30 — Смотрим не только объявления\n\nОбъявление показывает цену, которую продавец хочет получить.\n\nНо это ещё не означает, что квартира будет продана за эту сумму.\n\nПоэтому обращайте внимание на срок размещения.\n\nЕсли объект долго находится на рынке, цена или само предложение могут\nбыть неконкурентными.\n\nСмотрите, как меняются цены похожих объектов.\n\nЕсли похожие квартиры постоянно снижают цену, это важный сигнал.\n\n03:30–04:30 — Таблица аналогов\n\nСоберите хотя бы 10 сопоставимых квартир.\n\nЗапишите адрес или название ЖК, площадь, этаж, состояние, цену и\nосновные преимущества.\n\nОтдельно отметьте квартиры, которые похожи на вашу максимально сильно.\n\nПосле этого у вас будет не ощущение «моя квартира стоит примерно\nстолько», а конкретная картина рынка.\n\n04:30–05:15 — Задание\n\nНайдите минимум 10 аналогов.\n\nРазделите их на три группы:\n\nдешевле вашей предполагаемой цены;\n\nпримерно в вашем диапазоне;\n\nдороже.\n\nДля каждой группы запишите, чем эти квартиры отличаются от вашей.\n\nЭто понадобится в следующем уроке, когда будем устанавливать цену."}, "02.2": {"module": "02", "moduleTitle": "ОЦЕНИТЕ", "title": "Цена и стратегия", "duration": "5 мин", "taskTitle": "Задание 4. Определите цену", "kind": "price-strategy", "outcome": "У вас записаны желаемая, рыночная и минимальная цены и причины выбора квартиры покупателем.", "script": "00:00–00:30 — Вступление\n\nТеперь у нас есть рынок.\n\nСледующий вопрос — какую цену поставить именно вашей квартире.\n\nЦена должна быть не просто желаемой.\n\nОна должна соответствовать стратегии продажи.\n\n00:30–01:30 — Три цены\n\nПолезно разделять три цифры.\n\nПервая — желаемая цена.\n\nЭто сумма, которую вы хотели бы получить.\n\nВторая — рыночная цена.\n\nЭто диапазон, в котором ваша квартира выглядит конкурентоспособно\nотносительно аналогов.\n\nТретья — минимально приемлемая цена.\n\nЭто сумма, ниже которой вы не готовы продавать с учётом своих условий.\n\nНе путайте эти три значения.\n\n01:30–02:30 — Стартовая цена\n\nСтартовая цена должна учитывать конкурентов.\n\nЕсли поставить слишком высоко, вы можете потерять первые обращения.\n\nЕсли слишком низко — получите много интереса, но оставите деньги на\nстоле.\n\nПоэтому не спрашивайте себя только: «Сколько я хочу?»\n\nСпросите: «Почему покупатель выберет мою квартиру по этой цене, если\nрядом есть другие?»\n\n02:30–03:30 — Торг\n\nЗаранее определите диапазон торга.\n\nНапример, вы хотите получить определённую сумму, но готовы обсуждать\nусловия.\n\nВажно понимать не только максимальную скидку, но и за что вы готовы её\nдать.\n\nБыстрый выход на сделку?\n\nПолная сумма без сложных условий?\n\nУдобная дата освобождения?\n\nХороший покупатель?\n\nТорг должен быть обменом, а не автоматической скидкой.\n\n03:30–04:30 — Стратегия проверки\n\nПосле публикации цена должна проверяться по реакции рынка.\n\nЕсли есть просмотры, но почти нет обращений — проблема может быть в цене\nили упаковке.\n\nЕсли обращений много, но люди отказываются после просмотра — ищите\nпричину в самом объекте, описании или ожиданиях.\n\nЕсли показов мало — не спешите сразу снижать цену. Сначала проверьте\nкачество объявления и продвижение.\n\n04:30–05:15 — Задание\n\nЗапишите три цифры:\n\nжелаемая цена;\n\nрабочий рыночный диапазон;\n\nминимально приемлемая цена.\n\nЗатем запишите три причины, почему покупатель должен выбрать вашу\nквартиру среди аналогов.\n\nТеперь у вас есть основа для объявления."}, "03.1": {"module": "03", "moduleTitle": "УПАКУЙТЕ", "title": "Фото и видео", "duration": "4–5 мин", "taskTitle": "Задание 5. Снимите квартиру", "kind": "checklist-photo", "outcome": "У вас есть последовательный набор фотографий квартиры без визуального шума.", "script": "00:00–00:30 — Вступление\n\nПокупатель сначала видит не квартиру.\n\nОн видит фотографии.\n\nПоэтому задача фотографии — не просто показать комнаты.\n\nОна должна помочь человеку быстро понять планировку, состояние и\nпреимущества квартиры.\n\n00:30–01:30 — С чего начать\n\nСнимайте после подготовки квартиры.\n\nИспользуйте дневной свет и включённое освещение.\n\nТелефон держите примерно на уровне груди.\n\nНе наклоняйте его вверх или вниз.\n\nСтарайтесь держать вертикали ровными.\n\nНе используйте сильный цифровой зум.\n\nЛучше отойти немного назад.\n\n01:30–02:30 — Какие кадры нужны\n\nПокажите каждую комнату.\n\nОтдельно кухню.\n\nВанную.\n\nПрихожую.\n\nБалкон или лоджию.\n\nВид из окна, если он является преимуществом.\n\nПланировку можно дополнительно показать схемой.\n\nНе нужно делать двадцать похожих фотографий одной комнаты.\n\nЛучше меньше кадров, но каждый должен что-то показывать.\n\n02:30–03:30 — Что должно быть первым\n\nПервые фотографии должны продавать квартиру.\n\nНе начинайте с маленького коридора или фотографии санузла.\n\nПервым ставьте самое сильное помещение.\n\nЕсли квартира выигрывает кухней, видом, планировкой или состоянием —\nпокажите это сразу.\n\nПорядок фотографий должен создавать желание посмотреть дальше.\n\n03:30–04:20 — Видео\n\nВидео должно быть коротким и спокойным.\n\nНачните с входа и проведите человека по квартире.\n\nНе вращайте камеру резко.\n\nНе используйте слишком много переходов.\n\nПокажите планировку целиком.\n\nЦель видео — дать ощущение пространства, которое фотографии не всегда\nпередают.\n\n04:20–05:00 — Задание\n\nСнимите квартиру заново по этому списку.\n\nКаждая основная зона — минимум один хороший общий кадр.\n\nОтберите лучшие фотографии.\n\nСоставьте последовательность от самого сильного кадра к дополнительным.\n\nПосле этого переходите к объявлению."}, "03.2": {"module": "03", "moduleTitle": "УПАКУЙТЕ", "title": "Продающее объявление", "duration": "4–5 мин", "taskTitle": "Задание 6. Соберите объявление", "kind": "listing-template", "outcome": "Готов черновик объявления: заголовок, характеристики, преимущества и условия.", "script": "00:00–00:30 — Вступление\n\nХорошее объявление отвечает на вопросы покупателя ещё до звонка.\n\nЧто продаётся?\n\nГде находится?\n\nПочему стоит обратить внимание?\n\nСколько стоит?\n\nИ что важно знать до просмотра?\n\n00:30–01:20 — Заголовок\n\nНе пишите просто «1-комнатная квартира».\n\nЗаголовок должен быстро показать ключевое преимущество.\n\nНапример: «1-комнатная квартира с ремонтом у парка».\n\nИспользуйте только реальные преимущества.\n\nНе нужно писать «лучшая квартира в городе», если доказать это\nневозможно.\n\n01:20–02:20 — Первые строки\n\nПервые строки особенно важны.\n\nНачните с трёх–четырёх главных фактов.\n\nПлощадь.\n\nЭтаж.\n\nСостояние.\n\nЛокация.\n\nКлючевое преимущество.\n\nЧеловек должен понять объект, даже если прочитал только начало.\n\n02:20–03:30 — Описание\n\nДальше раскройте квартиру подробнее.\n\nСначала планировка и состояние.\n\nПотом кухня, комнаты, санузел, хранение.\n\nЗатем дом и район.\n\nПосле этого — условия продажи.\n\nПишите конкретно.\n\nВместо «уютная квартира» лучше написать, что именно делает её удобной.\n\nВместо «развитая инфраструктура» перечислите реальные объекты рядом.\n\n03:30–04:20 — Что не скрывать\n\nНе нужно делать вид, что недостатков нет.\n\nЕсли есть шумная дорога, первый этаж или другая особенность, лучше\nправильно её объяснить.\n\nПокупатель всё равно увидит это на просмотре.\n\nЧестное объявление отсекает неподходящих людей и повышает доверие тех,\nкому объект действительно подходит.\n\n04:20–05:10 — Задание\n\nСоставьте объявление по структуре:\n\nзаголовок;\n\nключевые факты;\n\nописание квартиры;\n\nдом и район;\n\nусловия продажи;\n\nчто остаётся в квартире.\n\nПосле этого перечитайте текст и уберите все фразы, которые ничего\nконкретного не сообщают."}, "04.1": {"module": "04", "moduleTitle": "ПРОДВИНЬТЕ", "title": "Площадки и размещение", "duration": "5 мин", "taskTitle": "Задание 7. Начните аналитику рекламы", "kind": "ad-table", "outcome": "Вы отслеживаете площадки, цену, просмотры, обращения и изменения.", "script": "00:00–00:30 — Вступление\n\nРазместить объявление — не значит закончить работу.\n\nПосле публикации начинается наблюдение за рынком.\n\nНужно понимать, где объявление показывается, сколько людей его видит и\nкак они реагируют.\n\n00:30–01:20 — Где размещать\n\nНачните с площадок, где покупатели реально ищут квартиры.\n\nНе распыляйтесь на десятки каналов, если не можете их нормально вести.\n\nЛучше несколько качественно оформленных размещений, чем множество\nзаброшенных объявлений.\n\n01:20–02:20 — Единое предложение\n\nНа всех площадках используйте одну актуальную цену, фотографии и\nинформацию.\n\nЕсли меняете цену — обновите данные везде.\n\nПроверяйте контакты.\n\nСледите, чтобы разные объявления не противоречили друг другу.\n\n02:20–03:20 — Смотрим статистику\n\nОтслеживайте просмотры и обращения.\n\nМного просмотров, мало звонков — проверьте цену, первые фотографии и\nзаголовок.\n\nМало просмотров — проверьте размещение, категорию, цену и продвижение.\n\nЕсть звонки, но нет показов — возможно, проблема уже в общении или\nквалификации покупателей.\n\n03:20–04:20 — Обновление\n\nНе меняйте объявление каждый час.\n\nСоберите достаточно данных.\n\nПосле изменения одного элемента дайте ему время показать результат.\n\nЕсли корректируете цену — фиксируйте дату и новую сумму.\n\nТак вы сможете понять, что действительно влияет на спрос.\n\n04:20–05:00 — Задание\n\nРазместите объявление на выбранных площадках.\n\nСоздайте таблицу:\n\nплощадка;\n\nдата публикации;\n\nцена;\n\nпросмотры;\n\nобращения;\n\nпоказы;\n\nрезультат.\n\nНачните вести её с первого дня."}, "04.2": {"module": "04", "moduleTitle": "ПРОДВИНЬТЕ", "title": "Обращения и покупатели", "duration": "5 мин", "taskTitle": "Задание 8–9. Ведите покупателей", "kind": "buyers-table", "outcome": "Каждое обращение фиксируется, а следующий шаг понятен заранее.", "script": "00:00–00:30 — Вступление\n\nКаждый звонок или сообщение — это ещё не покупатель.\n\nВаша задача — быстро понять, подходит ли человеку квартира и насколько\nон готов к покупке.\n\n00:30–01:20 — Первые вопросы\n\nНе превращайте разговор в допрос.\n\nУточните, какую квартиру человек ищет.\n\nКогда планирует покупку.\n\nНужна ли ипотека.\n\nПродаёт ли он свою квартиру, если это необходимо для покупки.\n\nИ подходит ли ему ваша цена.\n\n01:20–02:20 — Не рассказывайте всё сразу\n\nСначала задайте несколько вопросов.\n\nПосле этого отвечайте именно на то, что важно этому покупателю.\n\nЕсли человек спрашивает только цену, не нужно сразу читать ему всё\nобъявление.\n\nЦель разговора — понять ситуацию и договориться о следующем шаге.\n\n02:20–03:20 — Показ\n\nЕсли покупатель подходит, предложите конкретное время.\n\nНе переписывайтесь бесконечно.\n\n«Когда вам удобно?» — хуже, чем два конкретных варианта времени.\n\nНапример: сегодня в 19:00 или завтра в 11:00.\n\n03:20–04:10 — После разговора\n\nЗаписывайте обращения.\n\nИмя.\n\nТелефон.\n\nЧто ищет.\n\nЧто понравилось.\n\nЧто смутило.\n\nКогда договорились связаться.\n\nТак вы не будете через неделю вспоминать, кто уже смотрел квартиру и что\nему не подошло.\n\n04:10–05:00 — Задание\n\nСоздайте простую таблицу покупателей.\n\nСегодня обработайте все входящие обращения по одной схеме.\n\nПосле каждого разговора запишите результат.\n\nВ следующем модуле будем превращать интерес в показ и сделку."}, "05.1": {"module": "05", "moduleTitle": "ПРОДАВАЙТЕ", "title": "Показы", "duration": "5 мин", "taskTitle": "Задание 10. Подготовьте показ", "kind": "showing-checklist", "outcome": "Перед каждым показом вы проходите один и тот же короткий чек-лист.", "script": "00:00–00:30 — Вступление\n\nПоказ — это не экскурсия по квартире.\n\nВаша задача — помочь покупателю понять, подходит ли ему объект.\n\nПоэтому заранее подготовьте маршрут и порядок разговора.\n\n00:30–01:20 — До прихода покупателя\n\nПроветрите квартиру.\n\nВключите свет.\n\nУберите лишние вещи.\n\nПодготовьте документы, если покупатель хочет задать вопросы.\n\nЗаранее решите, что обязательно показать.\n\n01:20–02:20 — Как проводить показ\n\nНе нужно идти впереди покупателя и непрерывно рассказывать.\n\nДайте человеку осмотреться.\n\nПосле каждой зоны обращайте внимание на её главное преимущество.\n\nНапример: «Здесь помещается полноценная система хранения».\n\nПоказывайте факты, а не рекламные эпитеты.\n\n02:20–03:20 — Вопросы покупателя\n\nЕсли человек задаёт неудобный вопрос, не уходите от ответа.\n\nНе знаете — скажите, что уточните.\n\nНе придумывайте.\n\nЕсли покупатель сравнивает вашу квартиру с другой, спросите, что именно\nдля него важно.\n\nТак вы узнаете, что реально влияет на решение.\n\n03:20–04:15 — Завершение показа\n\nНе заканчивайте словами «ну, подумайте».\n\nСпросите, что человеку понравилось и что смущает.\n\nЕсли квартира подходит, обсудите следующий шаг.\n\nЕсли не подходит — выясните причину.\n\nЭто информация для дальнейшей продажи.\n\n04:15–05:00 — Задание\n\nПеред следующим показом подготовьте список из пяти преимуществ вашей\nквартиры.\n\nДля каждого преимущества придумайте один конкретный факт.\n\nПосле показа запишите минимум три реакции покупателя.\n\nОни пригодятся для переговоров и корректировки объявления."}, "05.2": {"module": "05", "moduleTitle": "ПРОДАВАЙТЕ", "title": "Переговоры и торг", "duration": "5 мин", "taskTitle": "Задание 11. Подготовьте переговоры", "kind": "negotiation-template", "outcome": "Вы заранее знаете нижнюю границу, аргументы и условия торга.", "script": "00:00–00:30 — Вступление\n\nТорг начинается не тогда, когда покупатель говорит: «Сделаете скидку?»\n\nОн начинается намного раньше — с того, насколько хорошо вы понимаете\nсвою цену и позицию.\n\n00:30–01:30 — Не называйте скидку первым\n\nЕсли покупатель сразу спрашивает: «А торг есть?», не обязательно сразу\nназывать максимальную скидку.\n\nСначала выясните, что ему нравится, что смущает и насколько он готов\nдвигаться дальше.\n\n01:30–02:30 — Скидка за что-то\n\nЛюбая скидка должна иметь причину.\n\nНапример, покупатель готов быстро выйти на сделку.\n\nИли принимает удобные для вас условия.\n\nИли берёт на себя определённые расходы, если это заранее согласовано\nсторонами.\n\nНе отдавайте скидку просто потому, что её попросили.\n\n02:30–03:30 — Возражения\n\nЕсли человек говорит: «Дорого», не отвечайте автоматически: «Сколько\nготовы дать?»\n\nСначала спросите: «С чем сравниваете?»\n\nВозможно, он сравнивает с другой квартирой.\n\nВозможно, проблема в состоянии.\n\nВозможно, ему просто нужно снизить цену.\n\nПричина возражения важнее самого возражения.\n\n03:30–04:20 — Минимальная цена\n\nДо переговоров вы должны знать свою нижнюю границу.\n\nНе придумывайте её во время разговора.\n\nЗапишите её заранее.\n\nИ отдельно запишите условия, при которых вы готовы сделать уступку.\n\n04:20–05:00 — Задание\n\nЗапишите:\n\nжелаемую цену;\n\nминимальную цену;\n\nтри причины держать цену;\n\nтри условия, при которых возможен торг.\n\nТеперь вы готовы вести переговоры не на эмоциях, а по заранее выбранной\nстратегии."}, "06.1": {"module": "06", "moduleTitle": "ЗАКРОЙТЕ", "title": "Документы и сделка", "duration": "5 мин", "taskTitle": "Задание 12. Финальная проверка сделки", "kind": "deal-checklist", "outcome": "Перед подписанием вы проверяете участников, объект, договор и безопасность расчётов.", "script": "00:00–00:30 — Вступление\n\nКогда покупатель найден, продажа не заканчивается.\n\nНаоборот, начинается этап, где ошибка может стоить гораздо дороже, чем\nнеудачная фотография или неправильная цена.\n\nПоэтому здесь особенно важно не торопиться.\n\n00:30–01:30 — Проверяем стороны\n\nДо подписания документов нужно понимать, кто участвует в сделке.\n\nКто собственник.\n\nКто покупатель.\n\nЕсть ли представители.\n\nЕсть ли несовершеннолетние.\n\nЕсть ли супруги и дополнительные согласия.\n\nВсе существенные обстоятельства должны быть понятны до момента\nподписания.\n\n01:30–02:30 — Проверяем объект\n\nСверьте данные квартиры с документами.\n\nАдрес.\n\nПлощадь.\n\nХарактеристики.\n\nПраво собственности.\n\nОбременения.\n\nПерепланировки.\n\nЕсли есть ипотека, отдельно выясните порядок её погашения и снятия\nобременения.\n\n02:30–03:30 — Договор\n\nНе подписывайте договор, который вы не понимаете.\n\nПроверьте цену.\n\nСроки.\n\nПорядок расчётов.\n\nСрок освобождения квартиры.\n\nЧто остаётся в квартире.\n\nОтветственность сторон.\n\nПорядок передачи.\n\nЕсли есть сложные юридические обстоятельства, используйте помощь\nспециалиста.\n\n03:30–04:30 — Безопасность\n\nНе передавайте оригиналы документов посторонним без необходимости.\n\nНе соглашайтесь на непонятные схемы расчётов.\n\nНе ориентируйтесь только на слова покупателя или посредника.\n\nВсе существенные договорённости фиксируйте письменно.\n\n04:30–05:10 — Задание\n\nСоставьте список всех участников сделки.\n\nСоберите документы.\n\nОтдельно запишите вопросы по расчётам, срокам и передаче квартиры.\n\nИ только после того, как все ключевые вопросы понятны, переходите к\nоформлению сделки."}, "06.2": {"module": "06", "moduleTitle": "ЗАКРОЙТЕ", "title": "Расчёты и передача", "duration": "5 мин", "taskTitle": "Финальный чек-лист передачи", "kind": "handover-checklist", "outcome": "Расчёты, регистрация, ключи, акт и показания счётчиков собраны в одном месте.", "script": "00:00–00:30 — Вступление\n\nПоследний этап — получить деньги, зарегистрировать переход права и\nпередать квартиру.\n\nЗдесь главное — последовательность.\n\nНе нужно пытаться сделать всё одновременно.\n\n00:30–01:30 — Расчёты\n\nДо сделки заранее определите, как будут проходить расчёты.\n\nКакая сумма.\n\nКогда она передаётся.\n\nЧерез какой безопасный механизм.\n\nКакие условия должны быть выполнены.\n\nЕсли используется ипотека или другой специальный способ расчётов,\nзаранее разберите его порядок с банком и участниками сделки.\n\n01:30–02:30 — Регистрация\n\nПосле подписания документов важно понимать, когда и каким способом\nдокументы передаются на регистрацию.\n\nСохраняйте подтверждения подачи.\n\nСледите за статусом.\n\nНе считайте сделку полностью завершённой только потому, что договор\nподписан.\n\n02:30–03:30 — Передача квартиры\n\nЗаранее согласуйте дату освобождения.\n\nПодготовьте ключи.\n\nСнимите показания счётчиков.\n\nЗафиксируйте состояние квартиры.\n\nСоставьте акт приёма-передачи.\n\nУкажите, что передано покупателю вместе с квартирой.\n\n03:30–04:20 — Финальная проверка\n\nПеред передачей проверьте:\n\nденьги получены в соответствии с условиями;\n\nрегистрационные действия завершены в нужном объёме;\n\nключи готовы;\n\nдокументы и акт оформлены;\n\nпоказания счётчиков зафиксированы.\n\nНе торопитесь закрывать последний этап только потому, что уже хочется\nзакончить.\n\n04:20–05:00 — Финальное задание\n\nСоставьте собственный чек-лист передачи квартиры.\n\nОтдельно запишите:\n\nрасчёты;\n\nрегистрацию;\n\nключи;\n\nакт;\n\nсчётчики;\n\nимущество, которое передаётся вместе с квартирой.\n\nПоздравляю.\n\nВы прошли всю систему: подготовили квартиру, определили цену, упаковали\nобъект, нашли покупателей, провели переговоры и дошли до сделки.\n\nТеперь у вас есть не просто набор советов, а последовательность\nдействий, которую можно использовать для продажи своей квартиры."}};
const LEARNING_MODULES = [
  { num: "01", title: "ПОДГОТОВЬТЕ", subtitle: "Квартира и документы", lessons: ["01.1", "01.2"] },
  { num: "02", title: "ОЦЕНИТЕ", subtitle: "Цена и стратегия", lessons: ["02.1", "02.2"] },
  { num: "03", title: "УПАКУЙТЕ", subtitle: "Фото, видео и объявление", lessons: ["03.1", "03.2"] },
  { num: "04", title: "ПРОДВИНЬТЕ", subtitle: "Площадки и покупатели", lessons: ["04.1", "04.2"] },
  { num: "05", title: "ПРОДАВАЙТЕ", subtitle: "Показы и переговоры", lessons: ["05.1", "05.2"] },
  { num: "06", title: "ЗАКРОЙТЕ", subtitle: "Сделка, деньги и передача", lessons: ["06.1", "06.2"] }
];

const CHECKLISTS = {
  "checklist-docs": [
    "Документ-основание права собственности собран",
    "Проверены все собственники и доли",
    "Документы собственников собраны",
    "Проверена актуальная информация об объекте и праве",
    "Проверена ситуация с супругом / супружеской собственностью",
    "Проверены несовершеннолетние собственники",
    "Проверена ипотека и порядок её погашения",
    "Проверены обременения, аресты и запреты",
    "Проверены зарегистрированные жильцы и вопросы выписки",
    "Перепланировка сверена с документами",
    "Все неизвестные вопросы вынесены в отдельный список"
  ],
  "checklist-prep": [
    "Убраны документы, лекарства, зарядки, провода и мелкие предметы",
    "Одежда убрана в шкаф, кровати заправлены",
    "С подоконников убрано лишнее",
    "Личный декор и фотографии сокращены",
    "Кухонные поверхности освобождены",
    "Убраны посуда, губки, тряпки, химия и продукты",
    "Вымыты мойка, смеситель, фасады и техника",
    "В ванной убраны косметика, шампуни и бытовая химия",
    "Протёрты зеркало, стекло душевой и смесители",
    "В прихожей оставлено минимум обуви и верхней одежды",
    "Балкон освобождён от коробок, пакетов и сушилок",
    "Заменены перегоревшие лампы",
    "Окна и зеркала чистые",
    "Подготовлены шторы/жалюзи и дневной свет",
    "Сделан контрольный кадр каждой зоны"
  ],
  "checklist-photo": [
    "Съёмка проводится днём",
    "Во всех комнатах включён свет",
    "Камера протёрта",
    "Фото сделаны из дверного проёма или удобной точки",
    "Вертикали не завалены",
    "Комнаты показаны целиком",
    "Отдельно снята кухня",
    "Отдельно снята ванная",
    "Снят санузел",
    "Снята прихожая",
    "Снят балкон/лоджия",
    "Показаны сильные стороны квартиры",
    "Нет личных документов и чувствительных данных в кадре",
    "Нет проводов, пакетов и бытового шума",
    "Выбраны лучшие кадры, а дубли удалены"
  ],
  "showing-checklist": [
    "Квартира проветрена",
    "Во всех помещениях включён свет",
    "Лишние вещи убраны",
    "В ванной и кухне чистые поверхности",
    "Подготовлены документы для ответов на вопросы",
    "Определены 5 главных преимуществ квартиры",
    "Для каждого преимущества подготовлен конкретный факт",
    "Покупателю дают спокойно осмотреться",
    "После показа зафиксированы вопросы и возражения",
    "Договорён следующий шаг или причина отказа записана"
  ],
  "deal-checklist": [
    "Определены все участники сделки",
    "Проверены собственники и представители",
    "Проверены супруги и необходимые согласия",
    "Проверены несовершеннолетние участники",
    "Сверены адрес, площадь и характеристики объекта",
    "Проверено право собственности и обременения",
    "Отдельно проверен порядок погашения ипотеки, если она есть",
    "Проверены цена и сроки в договоре",
    "Проверен порядок расчётов",
    "Согласована дата освобождения квартиры",
    "Понятно, что остаётся в квартире",
    "Существенные договорённости зафиксированы письменно"
  ],
  "handover-checklist": [
    "Согласована сумма и порядок расчётов",
    "Понятен безопасный механизм расчётов",
    "Сохранено подтверждение подачи документов на регистрацию",
    "Проверен статус регистрации",
    "Согласована дата освобождения квартиры",
    "Подготовлены все ключи",
    "Сняты показания счётчиков",
    "Составлен акт приёма-передачи",
    "Зафиксировано состояние квартиры",
    "Составлен список передаваемого имущества",
    "Деньги получены в соответствии с условиями сделки",
    "Документы, акт и ключи переданы"
  ]
};

const EMPTY_ROWS = (n, cols) => Array.from({length:n}, () => Array(cols).fill(""));

function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
}

function VideoBox({ id }) {
  const fileName = id.replace('.', '-') + '.mp4';
  const [available, setAvailable] = useState(true);
  const src = `/prodai-promo/videos/${fileName}`;
  return (
    <div className="learning-video">
      {available ? (
        <video
          className="learning-video-player"
          controls
          preload="metadata"
          poster={siteImages.lesson}
          src={src}
          onError={() => setAvailable(false)}
        />
      ) : (
        <div className="learning-video-placeholder">
          <div className="learning-video-icon"><Play size={28} weight="fill" /></div>
          <strong>Видео урока {id}</strong>
          <span>Добавь файл <code>public/videos/{fileName}</code> — после загрузки он появится здесь автоматически.</span>
        </div>
      )}
    </div>
  );
}

function Checklist({ items, storageKey }) {
  const [done, setDone] = usePersistentState(storageKey, Array(items.length).fill(false));
  const toggle = (i) => setDone(prev => prev.map((v, idx) => idx === i ? !v : v));
  return <div className="work-card">
    <div className="work-card-head"><strong>Чек-лист</strong><span>{done.filter(Boolean).length} / {items.length}</span></div>
    <div className="checklist-work">
      {items.map((item, i) => <label key={item} className={done[i] ? 'checked' : ''}><input type="checkbox" checked={!!done[i]} onChange={() => toggle(i)} /><span>{item}</span></label>)}
    </div>
  </div>;
}

function EditableTable({ storageKey, columns, rows=8, compact=false }) {
  const [data, setData] = usePersistentState(storageKey, EMPTY_ROWS(rows, columns.length));
  const update = (r,c,v) => setData(prev => prev.map((row,ri) => ri === r ? row.map((x,ci) => ci === c ? v : x) : row));
  const add = () => setData(prev => [...prev, Array(columns.length).fill("")]);
  return <div className={`work-card table-work ${compact ? 'compact' : ''}`}>
    <div className="work-card-head"><strong>Рабочая таблица</strong><span>Данные сохраняются автоматически</span></div>
    <div className="table-scroll"><table><thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead><tbody>{data.map((row,r)=><tr key={r}>{columns.map((c,col)=><td key={c}><input value={row[col] || ''} onChange={e => update(r,col,e.target.value)} /></td>)}</tr>)}</tbody></table></div>
    <button className="table-add" type="button" onClick={add}>+ Добавить строку</button>
  </div>;
}

function TextFields({ storageKey, fields }) {
  const [data, setData] = usePersistentState(storageKey, {});
  return <div className="work-card fields-work">
    {fields.map(({key,label,placeholder,multi}) => <label key={key}><span>{label}</span>{multi ? <textarea value={data[key] || ''} placeholder={placeholder || ''} onChange={e=>setData({...data,[key]:e.target.value})} /> : <input value={data[key] || ''} placeholder={placeholder || ''} onChange={e=>setData({...data,[key]:e.target.value})} />}</label>)}
  </div>;
}

function LessonMaterials({ kind, id }) {
  const key = `prodai-${id}`;
  if (CHECKLISTS[kind]) return <Checklist items={CHECKLISTS[kind]} storageKey={`${key}-checklist`} />;
  if (kind === 'market-table') return <>
    <EditableTable storageKey={`${key}-market`} rows={10} columns={["№","Квартира / адрес","Площадь","Цена","Цена м²","Этаж / дом","Состояние / отличие","Ссылка"]} />
    <TextFields storageKey={`${key}-notes`} fields={[{key:'cheap',label:'Дешевле моей предполагаемой цены',multi:true},{key:'range',label:'В моём диапазоне',multi:true},{key:'expensive',label:'Дороже',multi:true}]} />
  </>;
  if (kind === 'price-strategy') return <>
    <TextFields storageKey={`${key}-price`} fields={[{key:'desired',label:'Желаемая цена',placeholder:'₽'},{key:'marketFrom',label:'Рыночный диапазон — от',placeholder:'₽'},{key:'marketTo',label:'Рыночный диапазон — до',placeholder:'₽'},{key:'minimum',label:'Минимально приемлемая цена',placeholder:'₽'},{key:'reason1',label:'Почему покупатель должен выбрать мою квартиру — причина 1'},{key:'reason2',label:'Причина 2'},{key:'reason3',label:'Причина 3'},{key:'bargain',label:'Условия, при которых возможен торг',multi:true}]} />
  </>;
  if (kind === 'listing-template') return <TextFields storageKey={`${key}-listing`} fields={[{key:'headline',label:'Заголовок объявления'},{key:'first',label:'Первые 2–3 предложения',multi:true},{key:'characteristics',label:'Характеристики квартиры',multi:true},{key:'advantages',label:'Преимущества',multi:true},{key:'conditions',label:'Условия сделки / важные детали',multi:true},{key:'call',label:'Призыв к действию'}]} />;
  if (kind === 'ad-table') return <EditableTable storageKey={`${key}-ads`} rows={10} columns={["Дата","Площадка","Цена","Просмотры","Избранное","Обращения","Показы","Что изменил"]} />;
  if (kind === 'buyers-table') return <>
    <EditableTable storageKey={`${key}-buyers`} rows={12} columns={["Дата","Имя","Телефон","Источник","Что ищет","Бюджет","Ипотека","Срок покупки","Своя квартира","Подходит цена","Следующий шаг","Комментарий"]} />
    <Checklist items={["Что именно ищет покупатель?","Когда планирует покупку?","Нужна ли ипотека?","Есть ли своя квартира, которую нужно продать?","Подходит ли цена?","Что понравилось?","Что смутило?","Когда следующий контакт / показ?"]} storageKey={`${key}-questions`} />
  </>;
  if (kind === 'negotiation-template') return <>
    <TextFields storageKey={`${key}-neg`} fields={[{key:'desired',label:'Желаемая цена',placeholder:'₽'},{key:'minimum',label:'Минимальная цена',placeholder:'₽'},{key:'reasons',label:'Три причины держать цену',multi:true},{key:'conditions',label:'Три условия, при которых возможен торг',multi:true},{key:'objection',label:'Возражение покупателя'},{key:'response',label:'Мой ответ / аргумент',multi:true},{key:'next',label:'Следующий шаг'}]} />
  </>;
  return null;
}


const COURSE_PASSWORD = "PRODAI2026";

function CourseGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (password === COURSE_PASSWORD) {
      localStorage.setItem("prodai-course-access", "1");
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="course-gate">
      <div className="course-gate-card">
        <div className="course-gate-mark">ПРОДАЙ САМ</div>
        <div className="course-gate-kicker">ЗАКРЫТЫЙ РАЗДЕЛ</div>
        <h1>Доступ к обучению</h1>
        <p>
          Введите пароль, который вы получили для доступа к курсу.
        </p>

        <form onSubmit={submit} className="course-gate-form">
          <label>
            <span>Пароль</span>
            <input
              autoFocus
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Введите пароль"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div className="course-gate-error">
              Неверный пароль. Проверьте введённые данные.
            </div>
          )}

          <button type="submit">
            Войти в обучение
            <ArrowRight size={18} />
          </button>
        </form>

        <a className="course-gate-back" href="#top">
          ← Вернуться на сайт
        </a>
      </div>
    </div>
  );
}

function LearningApp() {
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem("prodai-course-access") === "1"
  );

  if (!unlocked) {
    return <CourseGate onUnlock={() => setUnlocked(true)} />;
  }

  const initialLesson = window.location.hash.startsWith('#learn/') ? window.location.hash.slice(7) : '01.1';
  const [lessonId, setLessonId] = useState(COURSE[initialLesson] ? initialLesson : '01.1');
  const [completed, setCompleted] = usePersistentState('prodai-completed-lessons', []);
  const lesson = COURSE[lessonId];
  const module = LEARNING_MODULES.find(m => m.lessons.includes(lessonId));
  const lessonIndex = Object.keys(COURSE).indexOf(lessonId);

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.slice(7);
      if (COURSE[id]) setLessonId(id);
    };
    window.addEventListener('hashchange', onHash);
    window.scrollTo(0,0);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (id) => { window.location.hash = `learn/${id}`; window.scrollTo(0,0); };
  const markDone = () => setCompleted(prev => prev.includes(lessonId) ? prev.filter(x => x !== lessonId) : [...prev, lessonId]);
  const prev = Object.keys(COURSE)[lessonIndex - 1];
  const next = Object.keys(COURSE)[lessonIndex + 1];
  const progress = Math.round((completed.length / 12) * 100);

  return <div className="learning-app">
    <header className="learning-header">
      <a className="learning-brand" href="#top" onClick={() => { window.location.hash=''; }}>ПРОДАЙ САМ <span>ОБУЧЕНИЕ</span></a>
      <div className="learning-progress"><span>Прогресс курса</span><strong>{completed.length} / 12</strong><div><i style={{width:`${progress}%`}} /></div></div>
      <a className="learning-exit" href="#top">← Вернуться на сайт</a>
    </header>
    <div className="learning-layout">
      <aside className="learning-sidebar">
        <div className="sidebar-top"><span>ПРОГРАММА</span><strong>12 уроков</strong></div>
        {LEARNING_MODULES.map(m => <div className="learning-module" key={m.num}>
          <div className="learning-module-title"><span>{m.num}</span><div><b>{m.title}</b><small>{m.subtitle}</small></div></div>
          {m.lessons.map(id => <button key={id} className={`learning-lesson ${id===lessonId?'active':''} ${completed.includes(id)?'done':''}`} onClick={()=>go(id)}><span>{id}</span><div><b>{COURSE[id].title}</b><small>{COURSE[id].duration}</small></div><i>{completed.includes(id)?'✓':''}</i></button>)}
        </div>)}
      </aside>
      <main className="learning-main">
        <div className="learning-breadcrumb">МОДУЛЬ {module.num} · {module.title} <span>/</span> УРОК {lessonId}</div>
        <div className="learning-title-row"><div><h1>{lesson.title}</h1><p>{lesson.outcome}</p></div><span className="learning-duration">{lesson.duration}</span></div>
        <VideoBox id={lessonId} />
        <section className="learning-section"><div className="learning-section-kicker">ЧТО ВЫ СДЕЛАЕТЕ</div><div className="outcome-grid"><div><Check size={20}/><span>Посмотрите короткий видеоурок</span></div><div><Check size={20}/><span>Выполните практическое задание</span></div><div><Check size={20}/><span>Сохраните результат в рабочем материале</span></div></div></section>
        <section className="learning-section script-section"><div className="learning-section-kicker">СЦЕНАРИЙ УРОКА</div><details><summary>Открыть текст урока <span>+</span></summary><div className="script-text">{lesson.script.split('\n').map((line,i)=>line ? <p key={i}>{line}</p> : <br key={i}/>)}</div></details></section>
        <section className="learning-section"><div className="learning-section-kicker">ПРАКТИКА</div><h2>{lesson.taskTitle}</h2><p className="practice-intro">Сделайте задание прямо здесь. Введённые данные сохраняются в браузере автоматически.</p><LessonMaterials kind={lesson.kind} id={lessonId} /></section>
        <div className="lesson-complete"><button className={completed.includes(lessonId)?'completed':''} onClick={markDone}>{completed.includes(lessonId)?'✓ Урок пройден':'Отметить урок пройденным'}</button></div>
        <nav className="learning-next"><button disabled={!prev} onClick={()=>prev&&go(prev)}>← {prev ? `${prev} ${COURSE[prev].title}` : 'Это первый урок'}</button><button disabled={!next} onClick={()=>next&&go(next)}>{next ? `${next} ${COURSE[next].title}` : 'Курс завершён'} →</button></nav>
      </main>
    </div>
  </div>;
}

function Root() {
  const [learning, setLearning] = useState(() => window.location.hash.startsWith('#learn/'));
  useEffect(() => { const fn=()=>setLearning(window.location.hash.startsWith('#learn/')); window.addEventListener('hashchange',fn); return ()=>window.removeEventListener('hashchange',fn); },[]);
  return learning ? <LearningApp /> : <LandingPage />;
}

createRoot(document.getElementById("root")).render(<Root />);