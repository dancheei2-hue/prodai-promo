import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Check, Play, House, Camera, FileText, Phone, Handshake,
  Tag, MagnifyingGlass, ShieldCheck, ChartLineUp, ListChecks, X
} from "@phosphor-icons/react";
import "./styles.css";

const steps = [
  ["01","Подготовка к продаже","Не начинайте продажу, пока не знаете, что делать на старте.","Разберётесь, какие решения принять заранее и как подготовить план продажи."],
  ["02","Стратегия продажи","Продать дороже или продать быстрее?","Выберете стратегию и поймёте, какие действия соответствуют вашей цели."],
  ["03","Реальная цена квартиры","Узнайте, сколько за вашу квартиру действительно готовы платить.","Научитесь находить аналоги и определять обоснованную стартовую цену."],
  ["04","Подготовка квартиры","Не тратьте деньги на то, что не вернётся при продаже.","Поймёте, что действительно влияет на привлекательность объекта."],
  ["05","Фотографии","Сначала покупатель выбирает фотографию — и только потом квартиру.","Научитесь показывать квартиру так, чтобы объявление хотелось открыть."],
  ["06","Объявление","Сделайте объявление, после которого хочется посмотреть квартиру.","Соберёте заголовок, описание и структуру объявления."],
  ["07","Размещение","Опубликовали — но никто не звонит? Найдите причину.","Научитесь понимать, проблема в цене, подаче или стратегии."],
  ["08","Первые обращения","Не теряйте покупателя в первые минуты разговора.","Получите алгоритм общения и перевода обращения в следующий шаг."],
  ["09","Квалификация покупателя","Отделяйте реального покупателя от праздного интереса.","Научитесь быстро выяснять бюджет, сроки и готовность к покупке."],
  ["10","Подготовка к показу","Покажите квартиру так, чтобы покупатель начал представлять её своей.","Получите понятный алгоритм подготовки квартиры и встречи."],
  ["11","Проведение показа","Не просто откройте дверь — покажите ценность квартиры.","Поймёте, что говорить, что показывать и как завершать встречу."],
  ["12","Возражения","«Дорого». «Подумаем». «Нашли дешевле». Что отвечать?","Получите систему работы с типичными возражениями."],
  ["13","Торг","Как не отдать покупателю лишние деньги просто потому, что он попросил скидку.","Научитесь вести переговоры и принимать решение о скидке осознанно."],
  ["14","Выбор покупателя","Самая высокая цена — не всегда самый простой путь к деньгам.","Научитесь учитывать цену, сроки, способ расчёта и условия."],
  ["15","Договорённости","Договорились о цене? Теперь не дайте сделке развалиться.","Поймёте, что необходимо согласовать до перехода к сделке."],
  ["16","Документы","Найдите проблемы с документами до того, как их найдёт покупатель.","Разберётесь, что подготовить заранее и что проверить."],
  ["17","Подготовка сделки","Покупатель найден. Что делать дальше?","Получите последовательность действий до подписания документов."],
  ["18","Расчёты и передача","Последний этап — и здесь особенно важно не расслабиться.","Поймёте последовательность расчётов, передачи квартиры и ключей."],
  ["19","Регистрация","Что происходит после того, как вы поставили подпись?","Будете понимать, что происходит после подписания и что контролировать."],
  ["20","Завершение продажи","Квартира продана. Но работа ещё не закончена.","Получите финальный чек-лист закрытия сделки."]
];

function Reveal({children, className=""}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, {threshold: 0.12});
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [openStep, setOpenStep] = useState(null);

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
        <a className="nav-cta" href="#buy">Получить доступ <ArrowRight size={17}/></a>
        <button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Открыть меню">{menu ? <X/> : <ListChecks/>}</button>
      </header>

      {menu && <div className="mobile-panel">
        <a href="#program" onClick={()=>setMenu(false)}>Программа</a>
        <a href="#inside" onClick={()=>setMenu(false)}>Как проходит</a>
        <a href="#author" onClick={()=>setMenu(false)}>Об авторе</a>
        <a href="#faq" onClick={()=>setMenu(false)}>FAQ</a>
        <a className="primary" href="#buy" onClick={()=>setMenu(false)}>Получить доступ <ArrowRight/></a>
      </div>}

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">ОНЛАЙН-СИСТЕМА · 20 ЭТАПОВ</div>
            <h1>Продайте квартиру<br/><em>самостоятельно.</em></h1>
            <p className="hero-lead">Не набор советов. Понятный маршрут от подготовки квартиры и определения цены до переговоров и завершения сделки.</p>
            <a className="primary hero-button" href="#buy">Получить доступ <ArrowRight size={19}/></a>
            <div className="metrics">
              <div><strong>20</strong><span>практических<br/>этапов</span></div>
              <div><strong>100+</strong><span>готовых<br/>материалов</span></div>
              <div><strong>∞</strong><span>доступ<br/>к системе</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-window">
              <div className="window-top"><span>ПРОДАЖА КВАРТИРЫ</span><span>01—20</span></div>
              <div className="apartment-scene">
                <div className="window-city"></div>
                <div className="sofa"></div>
                <div className="table"></div>
                <div className="plant"></div>
                <div className="lamp"></div>
              </div>
              <div className="visual-caption">Большие результаты<br/><strong>начинаются с правильных действий.</strong></div>
            </div>
          </div>
        </section>

        <Reveal className="intro section">
          <div className="section-kicker">ПОЧЕМУ ЭТО ВАЖНО</div>
          <div className="intro-grid">
            <div>
              <h2>Продать квартиру —<br/><span>это не просто</span><br/>разместить объявление.</h2>
              <p>Между решением «продаю» и получением денег есть десятки решений. Один неверный шаг может стоить времени, покупателя или денег.</p>
              <a className="text-link" href="#program">Посмотреть все 20 этапов <ArrowRight size={17}/></a>
            </div>
            <div className="icon-grid">
              {[
                [Tag,"Цена"],[House,"Подготовка"],[Camera,"Фотографии"],[FileText,"Объявление"],
                [Phone,"Звонки"],[MagnifyingGlass,"Покупатели"],[Handshake,"Переговоры"],[ShieldCheck,"Сделка"]
              ].map(([Icon,label]) => <div className="icon-item" key={label}><Icon size={22}/><span>{label}</span></div>)}
            </div>
          </div>
        </Reveal>

        <section id="program" className="program section dark-section">
          <div className="program-head">
            <div>
              <div className="section-kicker light">ПРОГРАММА</div>
              <h2>20 шагов —<br/><span>от решения до сделки.</span></h2>
            </div>
            <p>Каждый этап заканчивается конкретным результатом, который приближает вас к продаже.</p>
          </div>
          <div className="featured-step">
            <div className="featured-number">03</div>
            <div>
              <div className="small-label">КЛЮЧЕВОЙ ЭТАП</div>
              <h3>Сколько за вашу квартиру действительно готовы заплатить?</h3>
              <p>Научитесь анализировать рынок, находить сопоставимые объекты и определять стартовую цену без слепой ориентации на объявления.</p>
            </div>
            <div className="featured-visual">
              <div className="price-line"><span>Квартира</span><b>7 420 000 ₽</b></div>
              <div className="price-line"><span>Аналог 01</span><b>7 350 000 ₽</b></div>
              <div className="price-line"><span>Аналог 02</span><b>7 510 000 ₽</b></div>
              <div className="price-line accent"><span>Старт</span><b>7 490 000 ₽</b></div>
            </div>
          </div>
          <div className="steps-grid">
            {steps.map(([num,title,hook,result],i) => (
              <button className={`step-row ${openStep===i ? "open":""}`} key={num} onClick={()=>setOpenStep(openStep===i?null:i)}>
                <span className="step-num">{num}</span>
                <span className="step-main"><strong>{title}</strong><small>{hook}</small>{openStep===i && <em>{result}</em>}</span>
                <ArrowRight className="step-arrow" size={19}/>
              </button>
            ))}
          </div>
        </section>

        <Reveal id="inside" className="inside section">
          <div className="inside-copy">
            <div className="section-kicker">КАК ЭТО ВЫГЛЯДИТ</div>
            <h2>Понятный формат.<br/><span>Реальные действия.</span><br/>Измеримый результат.</h2>
            <p>Вы не просто смотрите уроки. После каждого этапа у вас появляется конкретный результат по вашей квартире.</p>
            <ul>
              {["Короткое видео с объяснением","Пошаговая инструкция","Чек-лист действий","Шаблоны и рабочие материалы","Практическое задание"].map(x=><li key={x}><Check size={18}/>{x}</li>)}
            </ul>
            <a className="text-link" href="#buy">Получить доступ <ArrowRight size={17}/></a>
          </div>
          <div className="course-preview">
            <div className="browser-bar"><span></span><span></span><span></span><b>Продай сам / Этап 03</b></div>
            <div className="course-ui">
              <aside>
                {steps.slice(0,7).map(([n,t])=><div className={n==="03"?"active":""} key={n}><b>{n}</b>{t}</div>)}
              </aside>
              <div className="lesson">
                <div className="lesson-media"><Play size={36}/><span>12:34</span></div>
                <h4>Определяем реальную цену</h4>
                <div className="check-panel">
                  <b>Что нужно сделать</b>
                  {["Найти аналоги","Сравнить характеристики","Определить диапазон","Установить стартовую цену"].map(x=><span key={x}><Check size={14}/>{x}</span>)}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal id="author" className="author section">
          <div className="author-image"><div className="portrait-placeholder">ДА</div></div>
          <div className="author-copy">
            <div className="section-kicker">КАК ЭТО СОЗДАНО</div>
            <h2>Данил Аверин</h2>
            <p className="author-role">Специалист по недвижимости</p>
            <p>Я собрал в одной системе последовательность действий, которую собственнику приходится проходить при продаже квартиры. Задача «Продай сам» — не убедить вас в необходимости риелтора, а дать понимание процесса и возможность действовать осознанно.</p>
            <div className="author-note">«Сложные вещи можно делать проще, если разложить их на правильные действия.»</div>
          </div>
        </Reveal>

        <section id="buy" className="buy section">
          <div className="buy-main">
            <div className="section-kicker light">ПОЛНЫЙ ДОСТУП</div>
            <h2>Продай сам</h2>
            <div className="price">2 990 ₽</div>
            <p>Вся система из 20 этапов, материалы и практические задания.</p>
            <a className="light-button" href="#contact">Получить доступ <ArrowRight size={19}/></a>
          </div>
          <div className="buy-side">
            <div className="section-kicker">ВТОРОЙ ВАРИАНТ</div>
            <h3>Не хотите заниматься продажей самостоятельно?</h3>
            <p>Я могу взять весь процесс на себя — от подготовки квартиры до сделки.</p>
            <a className="outline-button" href="#contact">Обсудить продажу квартиры</a>
          </div>
        </section>

        <Reveal id="faq" className="faq section">
          <div>
            <div className="section-kicker">FAQ</div>
            <h2>Вопросы,<br/><span>которые возникают</span><br/>перед покупкой.</h2>
          </div>
          <div className="faq-list">
            {[
              ["Подойдёт ли система, если я никогда не продавал квартиру?","Да. Этапы выстроены последовательно: от подготовки к продаже до завершения сделки."],
              ["Что я получаю после оплаты?","Доступ к 20 этапам, видео, инструкциям, чек-листам, материалам и практическим заданиям."],
              ["Можно ли обратиться к вам за помощью?","Да. Если в процессе вы решите делегировать продажу, можно обсудить вашу ситуацию отдельно."],
              ["Это юридическая консультация?","Нет. Система объясняет процесс и действия собственника. Конкретные юридические вопросы зависят от обстоятельств сделки и требуют отдельной проверки."]
            ].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
          </div>
        </Reveal>

        <section id="contact" className="contact section">
          <div>
            <div className="section-kicker light">ФИНАЛЬНЫЙ ШАГ</div>
            <h2>Начните с системы.<br/><span>Решение останется за вами.</span></h2>
          </div>
          <div className="contact-actions">
            <a className="light-button" href="tel:+79956441700">Получить доступ <ArrowRight size={19}/></a>
            <a className="contact-link" href="tel:+79956441700">Обсудить продажу квартиры →</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand"><span>ПРОДАЙ САМ</span><small>СИСТЕМА ПРОДАЖИ КВАРТИРЫ</small></div>
        <span>© 2026 Данил Аверин</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
