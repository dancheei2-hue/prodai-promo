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

const modules = [
  {
    num: "01",
    title: "ПОДГОТОВЬТЕ",
    subtitle: "Квартира и документы",
    description:
      "Подготовьте квартиру к продаже и уберите проблемы ещё до появления первого покупателя.",
    lessons: [
      [
        "01.1",
        "Квартира и документы",
        "Что проверить и подготовить до выхода на рынок."
      ],
      [
        "01.2",
        "Подготовка квартиры",
        "Что действительно влияет на первое впечатление и цену."
      ]
    ]
  },
  {
    num: "02",
    title: "ОЦЕНИТЕ",
    subtitle: "Цена и стратегия",
    description:
      "Определите реальную цену и стратегию, с которой квартира выйдет на рынок.",
    lessons: [
      [
        "02.1",
        "Анализ рынка",
        "Как находить сопоставимые квартиры и читать рынок."
      ],
      [
        "02.2",
        "Цена и стратегия",
        "Как определить стартовую цену и допустимый торг."
      ]
    ]
  },
  {
    num: "03",
    title: "УПАКУЙТЕ",
    subtitle: "Фото, видео и объявление",
    description:
      "Сделайте подачу квартиры такой, чтобы покупателю захотелось открыть объявление и приехать на просмотр.",
    lessons: [
      [
        "03.1",
        "Фото и видео",
        "Как показать квартиру самостоятельно и не потерять ценность."
      ],
      [
        "03.2",
        "Продающее объявление",
        "Как собрать заголовок, описание и структуру объявления."
      ]
    ]
  },
  {
    num: "04",
    title: "ПРОДВИНЬТЕ",
    subtitle: "Площадки и покупатели",
    description:
      "Дайте объявлению охват и научитесь превращать просмотры в реальные обращения.",
    lessons: [
      [
        "04.1",
        "Площадки и размещение",
        "Где размещать объект и как контролировать результат."
      ],
      [
        "04.2",
        "Обращения и покупатели",
        "Как отвечать, квалифицировать и не терять интерес."
      ]
    ]
  },
  {
    num: "05",
    title: "ПРОДАВАЙТЕ",
    subtitle: "Показы и переговоры",
    description:
      "Проведите покупателя от первого просмотра до конкретного предложения.",
    lessons: [
      [
        "05.1",
        "Показы",
        "Как подготовить встречу и показать ценность квартиры."
      ],
      [
        "05.2",
        "Переговоры и торг",
        "Как работать с возражениями, условиями и ценой."
      ]
    ]
  },
  {
    num: "06",
    title: "ЗАКРОЙТЕ",
    subtitle: "Сделка, деньги и передача",
    description:
      "Согласуйте условия, подготовьте сделку и спокойно доведите продажу до передачи квартиры.",
    lessons: [
      [
        "06.1",
        "Документы и сделка",
        "Что проверить и согласовать перед подписанием."
      ],
      [
        "06.2",
        "Расчёты и передача",
        "Как пройти расчёты, регистрацию и передачу квартиры."
      ]
    ]
  }
];

function Reveal({ children, className = "", id }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    io.observe(el);

    return () => io.disconnect();
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
          <a href="#program" onClick={() => setMenu(false)}>
            Программа
          </a>
          <a href="#inside" onClick={() => setMenu(false)}>
            Как проходит
          </a>
          <a href="#author" onClick={() => setMenu(false)}>
            Об авторе
          </a>
          <a href="#faq" onClick={() => setMenu(false)}>
            FAQ
          </a>

          <a
            className="primary"
            href="#buy"
            onClick={() => setMenu(false)}
          >
            Получить доступ
            <ArrowRight />
          </a>
        </div>
      )}

      <main id="top">
        {/* HERO */}

        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              СИСТЕМА ПРОДАЖИ КВАРТИРЫ · 6 МОДУЛЕЙ
            </div>

            <h1>
              Продай
              <br />
              квартиру <em>сам.</em>
            </h1>

            <div
              className="hero-values"
              aria-label="Преимущества системы"
            >
              <span>СИСТЕМНО</span>
              <i>·</i>
              <span>ВЫГОДНО</span>
              <i>·</i>
              <span>БЕЗОПАСНО</span>
            </div>

            <p className="hero-lead">
              Пошаговая система для собственника: от подготовки квартиры
              и определения цены до переговоров, сделки и получения денег.
            </p>

            <div className="hero-actions">
              <a className="primary hero-button" href="#buy">
                Посмотреть систему
                <ArrowRight size={19} />
              </a>

              <a className="hero-secondary" href="#program">
                6 модулей · 12 уроков
              </a>
            </div>

            <div className="hero-proof">
              <span>
                <strong>6</strong>
                модулей
              </span>

              <span>
                <strong>12</strong>
                уроков
              </span>

              <span>
                <strong>1</strong>
                понятный маршрут
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="sale-map">
              <div className="sale-map-head">
                <span>МАРШРУТ ПРОДАЖИ</span>
                <b>01 → 06</b>
              </div>

              <div className="sale-path">
                <div className="path-step active">
                  <b>01</b>
                  <strong>Подготовка</strong>
                  <small>Что сделать</small>
                </div>

                <div className="path-line" />

                <div className="path-step">
                  <b>02</b>
                  <strong>Цена</strong>
                  <small>Сколько просить</small>
                </div>

                <div className="path-line" />

                <div className="path-step">
                  <b>03</b>
                  <strong>Подача</strong>
                  <small>Как показать</small>
                </div>

                <div className="path-line" />

                <div className="path-step">
                  <b>04</b>
                  <strong>Покупатели</strong>
                  <small>Где найти</small>
                </div>

                <div className="path-line" />

                <div className="path-step">
                  <b>05</b>
                  <strong>Переговоры</strong>
                  <small>Как договориться</small>
                </div>

                <div className="path-line" />

                <div className="path-step final">
                  <b>06</b>
                  <strong>Сделка</strong>
                  <small>Деньги и ключи</small>
                </div>
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

        {/* INTRO */}

        <Reveal className="intro section">
          <div className="section-kicker">
            ПОЧЕМУ ЭТО ВАЖНО
          </div>

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
                Между решением «продаю» и получением денег есть
                десятки решений. Один неверный шаг может стоить
                времени, покупателя или денег.
              </p>

              <a className="text-link" href="#program">
                Посмотреть систему
                <ArrowRight size={17} />
              </a>
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
        </Reveal>

        {/* PROGRAM */}

        <section
          id="program"
          className="program section dark-section"
        >
          <div className="program-head">
            <div>
              <div className="section-kicker light">
                ПРОГРАММА
              </div>

              <h2>
                6 модулей —
                <br />
                <span>от решения до сделки.</span>
              </h2>
            </div>

            <p>
              Не длинный список из 20 пунктов, а шесть понятных
              этапов. Внутри каждого — два практических урока.
            </p>
          </div>

          <div className="modules-grid">
            {modules.map((module, index) => {
              const isOpen = openModule === index;

              return (
                <div
                  className={`module-card ${
                    isOpen ? "is-open" : ""
                  }`}
                  key={module.num}
                >
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
                          ([lessonNum, title, description]) => (
                            <div
                              className="lesson-row"
                              key={lessonNum}
                            >
                              <span>{lessonNum}</span>

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
            <span>6 МОДУЛЕЙ</span>
            <i>•</i>
            <span>12 УРОКОВ</span>
            <i>•</i>
            <span>ЧЕК-ЛИСТЫ</span>
            <i>•</i>
            <span>ПРАКТИЧЕСКИЕ ЗАДАНИЯ</span>
          </div>
        </section>

        {/* INSIDE */}

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
              Вы не просто смотрите уроки. После каждого этапа
              у вас появляется конкретный результат по вашей квартире.
            </p>

            <ul>
              {[
                "Короткое видео с объяснением",
                "Пошаговая инструкция",
                "Чек-лист действий",
                "Шаблоны и рабочие материалы",
                "Практическое задание"
              ].map((x) => (
                <li key={x}>
                  <Check size={18} />
                  {x}
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
                  <Play size={36} />
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
                  ].map((x) => (
                    <span key={x}>
                      <Check size={14} />
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* AUTHOR */}

        <Reveal id="author" className="author section">
          <div className="author-image">
            <div className="portrait-placeholder">
              ДА
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
              квартиры. Задача «Продай сам» — не убедить вас
              в необходимости риелтора, а дать понимание процесса
              и возможность действовать осознанно.
            </p>

            <div className="author-note">
              «Сложные вещи можно делать проще, если разложить
              их на правильные действия.»
            </div>
          </div>
        </Reveal>

        {/* BUY */}

        <section id="buy" className="buy section">
          <div className="buy-main">
            <div className="section-kicker light">
              ПОЛНЫЙ ДОСТУП
            </div>

            <h2>Продай сам</h2>

            <div className="price">
              2 990 ₽
            </div>

            <p>
              6 модулей, 12 уроков, материалы
              и практические задания.
            </p>

            <a className="light-button" href="#contact">
              Получить доступ
              <ArrowRight size={19} />
            </a>
          </div>

          <div className="buy-side">
            <div className="section-kicker">
              ВТОРОЙ ВАРИАНТ
            </div>

            <h3>
              Не хотите заниматься продажей самостоятельно?
            </h3>

            <p>
              Я могу взять весь процесс на себя —
              от подготовки квартиры до сделки.
            </p>

            <a
              className="outline-button"
              href="#contact"
            >
              Обсудить продажу квартиры
            </a>
          </div>
        </section>

        {/* FAQ */}

        <Reveal id="faq" className="faq section">
          <div>
            <div className="section-kicker">
              FAQ
            </div>

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
                "Можно ли обратиться к вам за помощью?",
                "Да. Если в процессе вы решите делегировать продажу, можно обсудить вашу ситуацию отдельно."
              ],
              [
                "Это юридическая консультация?",
                "Нет. Система объясняет процесс и действия собственника. Конкретные юридические вопросы зависят от обстоятельств сделки и требуют отдельной проверки."
              ]
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>

                <p>{a}</p>
              </details>
            ))}
          </div>
        </Reveal>

        {/* CONTACT */}

        <section id="contact" className="contact section">
          <div>
            <div className="section-kicker light">
              ФИНАЛЬНЫЙ ШАГ
            </div>

            <h2>
              Начните с системы.
              <br />
              <span>Решение останется за вами.</span>
            </h2>
          </div>

          <div className="contact-actions">
            <a
              className="light-button"
              href="tel:+79956441700"
            >
              Получить доступ
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

createRoot(document.getElementById("root")).render(
  <App />
);