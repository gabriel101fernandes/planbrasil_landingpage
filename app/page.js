"use client";

/* eslint-disable @next/next/no-img-element -- hero: logo SVG e mockup PNG carregam de forma confiável só com <img> */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  BenefitMotionList,
  ChipRail,
  easePremium,
  FiscalMotionLi,
  FiscalMotionUl,
  HeroBlock,
  HeroSequence,
  LiftArticle,
  LiftLi,
  Reveal
} from "@/app/components/LandingMotion.js";

const CONTACT_EMAIL = "planbrasilweb@gmail.com";
const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Demonstração — Plan Brasil")}`;

const PLAN_APP_BASE = (
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_PLAN_APP_URL
    ? String(process.env.NEXT_PUBLIC_PLAN_APP_URL).replace(/\/$/, "")
    : ""
).trim();

const PLAN_SIGN_UP_HREF = PLAN_APP_BASE ? `${PLAN_APP_BASE}/sign-up` : "";
const PLAN_LOGIN_HREF = PLAN_APP_BASE ? `${PLAN_APP_BASE}/login` : "";

const trustChips = [
  "Celular, tablet ou PC",
  "Notas fiscais organizadas",
  "PDV e delivery",
  "Código de barras na câmera",
  "Na nuvem",
  "Relatórios para quem manda na loja"
];

const fiscalHighlightBullets = [
  {
    tag: "Importação do XML",
    body:
      "Você importa o arquivo XML da nota — aquele que já passou pela Secretaria da Fazenda. O sistema preenche os dados para você, sem ficar digitando tudo de novo."
  },
  {
    tag: "Busca e organização",
    body:
      "Fica fácil achar nota por chave, fornecedor ou data. Tudo guardado em um só lugar, junto com sua operação."
  },
  {
    tag: "Integração na loja",
    body:
      "Compras, estoque e relatórios passam a conversar entre si: menos divergência entre o que entrou na loja e o que está na nota."
  }
];

const valuePillars = [
  {
    title: "Suas NF-e sem dor de cabeça",
    description:
      "Quando você coloca o XML da nota no Plan, os dados entram certinhos no sistema — quem vendeu, valores e datas. Você não precisa copiar nota por nota à mão."
  },
  {
    title: "Use no celular, tablet ou computador",
    description:
      "O Plan abre no navegador: no bolso no celular, atrás do balcão no tablet ou no PC do escritório. É a mesma conta e os mesmos dados, onde for mais prático para você."
  },
  {
    title: "Venda rápido no balcão",
    description:
      "Busca por nome ou código, código de barras com a câmera e poucos toques para fechar a venda. Pensado para quando a fila aperta."
  },
  {
    title: "Estoque e caixa em dia",
    description:
      "Vendas e entradas atualizam o que você vê de estoque e dinheiro no caixa. Menos planilha espalhada e menos surpresa na hora de conferir."
  }
];

const features = [
  {
    title: "Notas fiscais alinhadas ao Fisco",
    carouselEssence: "XML da NF-e no painel",
    description:
      "Traga o XML da NF-e autorizada pela Secretaria da Fazenda. O Plan organiza tudo no painel para você consultar quando precisar — e você pode exportar ou importar um backup dos dados da loja."
  },
  {
    title: "Mesmo sistema em qualquer aparelho",
    carouselEssence: "Só o navegador",
    description:
      "Não precisa instalar app à parte no celular: use Chrome, Safari ou Edge no telefone, tablet ou computador. A tela se adapta — do balcão ao escritório."
  },
  {
    title: "PDV completo",
    carouselEssence: "Balcão e delivery",
    description:
      "Vendas no balcão e no delivery, troca de operador no caixa, abrir e fechar o dia com histórico simples de consultar."
  },
  {
    title: "Código de barras na câmera",
    carouselEssence: "Leitura pelo celular",
    description:
      "Aponte a câmera para o código do produto e ele entra no pedido. Prático quando você está só com o celular na mão."
  },
  {
    title: "Cupom para o cliente",
    carouselEssence: "Comprovante claro",
    description:
      "Imprime ou mostra um comprovante claro com itens e valores, e a venda já fica registrada por aqui."
  },
  {
    title: "Cadastro de clientes",
    carouselEssence: "Histórico de quem compra",
    description:
      "Guarde quem compra com você, veja histórico e atenda melhor em próximas compras."
  },
  {
    title: "Estoque que acompanha o dia",
    carouselEssence: "Saldo junto da operação",
    description:
      "Quando vende ou recebe mercadoria, o saldo muda junto. Ajuda a saber o que está acabando antes de faltar na prateleira."
  },
  {
    title: "Entregas",
    carouselEssence: "Pedido até a entrega",
    description:
      "Acompanhe pedidos para sair na moto ou carro, do pedido pronto até chegar ao cliente."
  },
  {
    title: "Relatórios para o gestor",
    carouselEssence: "Caixa e o que vende mais",
    description:
      "Gráficos e números sobre caixa, produtos que mais vendem, fiados e formas de pagamento — para quem precisa decidir com calma."
  },
  {
    title: "Conta e assinatura online",
    carouselEssence: "Cadastro e plano na web",
    description:
      "Você cria sua conta, configura a loja e ativa o plano pela internet. Tudo em poucos passos."
  }
];

/** Ícones decorativos do carrossel (mesma ordem que `features`). */
const FEATURE_DECK_ICONS = ["📋", "📱", "🏪", "📷", "🧾", "👥", "📦", "🛵", "📊", "✨"];

const steps = [
  {
    title: "Crie sua conta",
    description: "É pelo navegador, rápido. Em poucos minutos você já entra no Plan Brasil."
  },
  {
    title: "Coloque sua loja no sistema",
    description: "Organize sua equipe e seus dados no mesmo lugar — celular, tablet ou PC."
  },
  {
    title: "Ative seu plano",
    description: "Assine online e libere PDV, estoque, notas e o restante dos módulos."
  },
  {
    title: "Comece a usar no mesmo dia",
    description:
      "Abra o caixa, cadastre produtos e clientes, importe suas NF-e quando quiser e consulte relatórios conforme seu papel na loja."
  }
];

const benefits = [
  {
    tag: "NF-e organizadas",
    body: "As notas entram pelo XML oficial — o sistema atualiza os dados para você, sem retrabalho manual."
  },
  {
    tag: "Um fluxo só",
    body: "Do caixa ao estoque no mesmo lugar: menos ida e volta entre sistemas e planilhas para o time."
  },
  {
    tag: "PDV ágil",
    body: "Tela limpa e rápida para vender sem travar no meio do movimento — especialmente quando a fila aperta."
  },
  {
    tag: "Papéis claros",
    body: "Quem está no caixa vê o essencial para vender; quem gerencia vê relatórios — cada um no seu acesso."
  },
  {
    tag: "Onde você estiver",
    body: "Celular, tablet ou computador — a mesma conta e os mesmos dados no aparelho que for mais prático."
  }
];

const navLinks = [
  { href: "#pilares", label: "Por que escolher" },
  { href: "#nf-e", label: "Notas fiscais" },
  { href: "#funcionalidades", label: "O que tem" },
  { href: "#comecar", label: "Como começar" },
  { href: "#vantagens", label: "No dia a dia" },
  { href: "#contato", label: "Contato" }
];

function FeatureAccordionRow({ feature, index, reduceMotion }) {
  const [open, setOpen] = useState(index === 0);
  const reactId = useId();
  const panelId = `${reactId}-panel`;
  const triggerId = `${reactId}-trigger`;

  const triggerInner = (
    <>
      <span className="featureAccordionBadge" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="featureAccordionMain">
        <span className="featureAccordionTitle">{feature.title}</span>
        <span className="featureAccordionHint" aria-hidden="true">
          Abrir detalhes
        </span>
      </span>
      <span className="featureAccordionChevron" aria-hidden />
    </>
  );

  return (
    <motion.li
      className="featureAccordionItem"
      layout={!reduceMotion}
      {...(!reduceMotion
        ? {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.06 },
            transition: { delay: index * 0.04, duration: 0.45, ease: easePremium }
          }
        : {})}
    >
      <div className="featureAccordionPanelRoot" data-expanded={open}>
        <motion.button
          type="button"
          id={triggerId}
          className="featureAccordionTrigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          whileTap={reduceMotion ? undefined : { scale: 0.994 }}
          transition={{ duration: 0.18, ease: easePremium }}
        >
          {triggerInner}
        </motion.button>
        {reduceMotion ? (
          open ? (
            <div
              id={panelId}
              className="featureAccordionCollapse"
              role="region"
              aria-labelledby={triggerId}
            >
              <p className="featureAccordionBody">{feature.description}</p>
            </div>
          ) : null
        ) : (
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                key="feature-acc-panel"
                id={panelId}
                className="featureAccordionCollapse"
                role="region"
                aria-labelledby={triggerId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.44, ease: easePremium }}
                style={{ overflow: "hidden" }}
              >
                <div className="featureAccordionCollapseInner">
                  <p className="featureAccordionBody">{feature.description}</p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        )}
      </div>
    </motion.li>
  );
}

function resolveItemsPerView() {
  if (typeof window === "undefined") return 1;
  if (window.matchMedia("(max-width: 639px)").matches) return 1;
  if (window.matchMedia("(max-width: 959px)").matches) return 2;
  return 3;
}

function subscribeItemsPerView(cb) {
  const mqSm = window.matchMedia("(max-width: 639px)");
  const mqMd = window.matchMedia("(max-width: 959px)");
  const onMq = () => cb();
  const onOrientation = () => window.requestAnimationFrame(cb);
  mqSm.addEventListener("change", onMq);
  mqMd.addEventListener("change", onMq);
  window.addEventListener("resize", cb, { passive: true });
  window.addEventListener("orientationchange", onOrientation);
  return () => {
    mqSm.removeEventListener("change", onMq);
    mqMd.removeEventListener("change", onMq);
    window.removeEventListener("resize", cb);
    window.removeEventListener("orientationchange", onOrientation);
  };
}

function useItemsPerView() {
  const [n, setN] = useState(1);

  useLayoutEffect(() => {
    const update = () => setN(resolveItemsPerView());
    update();
    return subscribeItemsPerView(update);
  }, []);

  return n;
}

/** Cards estáticos para medir altura máxima do carrossel (evita “pulo” entre páginas). */
function FeaturePeekMeasureCards({ slice }) {
  return slice.map((feature) => {
    const modIndex = features.findIndex((f) => f.title === feature.title);
    const safeIdx = modIndex >= 0 ? modIndex : 0;
    const icon = FEATURE_DECK_ICONS[safeIdx % FEATURE_DECK_ICONS.length];
    return (
      <article key={feature.title} className="featurePeekCard">
        <div className="featurePeekCardHead">
          <span className="featurePeekIcon" aria-hidden>
            {icon}
          </span>
          <span className="featurePeekChip">{feature.carouselEssence}</span>
        </div>
        <span className="featurePeekAccent" aria-hidden="true" />
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </article>
    );
  });
}

export default function Home() {
  const [parallaxY, setParallaxY] = useState(0);
  const [navDense, setNavDense] = useState(false);
  const [featureStart, setFeatureStart] = useState(0);
  const itemsPerView = useItemsPerView();
  const maxStart = Math.max(0, features.length - itemsPerView);
  const reduceMotion = useReducedMotion();

  const primaryCta = useMemo(
    () =>
      PLAN_SIGN_UP_HREF
        ? { href: PLAN_SIGN_UP_HREF, label: "Começar no Plan Brasil", external: true }
        : { href: CONTACT_MAILTO, label: "Agendar demonstração", external: true },
    []
  );

  const navPrimaryCta = useMemo(
    () =>
      PLAN_SIGN_UP_HREF
        ? { href: PLAN_SIGN_UP_HREF, label: "Começar agora", external: true }
        : { href: CONTACT_MAILTO, label: "Agendar demonstração", external: true },
    []
  );

  useEffect(() => {
    setFeatureStart((s) => Math.min(s, maxStart));
  }, [maxStart]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onScroll = () => {
      const y = window.scrollY;
      setNavDense(y > 18);
      if (mq.matches) setParallaxY(0);
      else setParallaxY(y * 0.12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onScroll);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || maxStart <= 0) return undefined;
    const id = window.setInterval(() => {
      setFeatureStart((prev) => (prev >= maxStart ? 0 : prev + 1));
    }, 6500);
    return () => window.clearInterval(id);
  }, [maxStart, reduceMotion]);

  const nextFeatures = useCallback(() => {
    setFeatureStart((prev) => (prev >= maxStart ? 0 : prev + 1));
  }, [maxStart]);

  const prevFeatures = useCallback(() => {
    setFeatureStart((prev) => (prev <= 0 ? maxStart : prev - 1));
  }, [maxStart]);

  const visibleFeatures = features.slice(featureStart, featureStart + itemsPerView);
  const dotCount = maxStart + 1;

  const carouselMeasureRef = useRef(null);
  const [carouselTrackMinHeight, setCarouselTrackMinHeight] = useState(null);

  const carouselMeasureSlices = useMemo(() => {
    return Array.from({ length: dotCount }, (_, start) =>
      features.slice(start, start + itemsPerView)
    );
  }, [dotCount, itemsPerView]);

  useLayoutEffect(() => {
    const root = carouselMeasureRef.current;
    if (!root) return undefined;

    const measure = () => {
      const rows = root.querySelectorAll(".featuresCarouselMeasureRow");
      let max = 0;
      rows.forEach((row) => {
        max = Math.max(max, row.getBoundingClientRect().height);
      });
      setCarouselTrackMinHeight(max > 0 ? Math.ceil(max) : null);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [dotCount, itemsPerView]);

  return (
    <main>
      <motion.nav
        className={`siteNav${navDense ? " siteNavDense" : ""}`}
        aria-label="Navegação principal"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: easePremium }}
      >
        <div className="container navLayout">
          <a href="#topo" className="navBrand">
            <img src="/images/logo.svg" alt="Plan Brasil" className="navLogo" width={80} height={80} />
            <span>Plan Brasil</span>
          </a>
          <div className="navLinks">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <motion.a
            href={navPrimaryCta.href}
            className="btn btnPrimary navCta"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            {...(navPrimaryCta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {navPrimaryCta.label}
          </motion.a>
        </div>
      </motion.nav>

      <header className="hero" id="topo">
        <div className="heroAurora" aria-hidden="true" />
        <div className="heroGrid" aria-hidden="true" />
        <div className="container heroLayout">
          <div className="heroContent">
            <HeroSequence>
              <HeroBlock className="heroBrand">
                <span className="heroLogoWrap">
                  <img
                    src="/images/logo.svg"
                    alt="Plan Brasil"
                    className="heroLogo"
                    width={200}
                    height={200}
                    decoding="async"
                    fetchPriority="high"
                  />
                </span>
                <div className="heroBrandText">
                  <span className="heroBrandName">Plan Brasil</span>
                  <span className="heroBrandTag">PDV · NF-e · estoque · onde você estiver</span>
                </div>
              </HeroBlock>
              <HeroBlock>
                <h1>Tudo da sua loja num só lugar — no celular, tablet ou computador.</h1>
              </HeroBlock>
              <HeroBlock>
                <p>
                  Venda com agilidade, organize suas notas fiscais com o arquivo oficial da Secretaria da Fazenda e
                  acompanhe estoque e relatórios sem complicação. Use no navegador: mesma conta na nuvem, no balcão ou no
                  escritório.
                </p>
              </HeroBlock>
              <HeroBlock>
                <ChipRail chips={trustChips} label="Destaques do produto" />
              </HeroBlock>
              <HeroBlock className="heroActions">
                <motion.a
                  href={primaryCta.href}
                  className="btn btnPrimary"
                  whileHover={{ scale: 1.03, boxShadow: "0 14px 36px rgba(228, 154, 15, 0.48)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  {...(primaryCta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {primaryCta.label}
                </motion.a>
                <motion.a
                  href="#comecar"
                  className="btn btnGhost"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.09)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                >
                  Ver como começar
                </motion.a>
              </HeroBlock>
            </HeroSequence>
          </div>
          <motion.div
            className="heroVisual"
            style={{ "--hero-parallax": `${parallaxY}px` }}
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: easePremium }}
          >
            <motion.div
              className="mockupStage"
              {...(!reduceMotion
                ? {
                    animate: { y: [0, -6, 0] },
                    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                  }
                : {})}
            >
              <img
                src="/images/mockup.PNG"
                alt="Interface do Plan Brasil em dispositivo móvel"
                className="mockupImage"
                width={1080}
                height={1080}
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
            <p className="platformNote">
              Celular no bolso, tablet no balcão ou PC na mesa — o Plan se adapta à tela e você continua de onde parou.
            </p>
          </motion.div>
        </div>
      </header>

      <section className="section sectionValueGrid" id="pilares" aria-labelledby="pilares-heading">
        <div className="container">
          <Reveal>
            <>
              <p className="sectionEyebrow">Por que escolher</p>
              <h2 id="pilares-heading">Feito para quem vende todo dia — com calma na gestão</h2>
              <p className="sectionLead">
                Você ganha tempo no caixa, suas NF-e ficam organizadas com base no que a Fazenda já autorizou, e ainda pode
                usar o sistema no celular, tablet ou computador. Simples assim.
              </p>
            </>
          </Reveal>
          <Reveal className="valueGridReveal" delay={0.08}>
            <div className="valueGrid">
              {valuePillars.map((pillar) => (
                <LiftArticle key={pillar.title} className="valueCard">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </LiftArticle>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section sectionFiscalHighlight" id="nf-e" aria-labelledby="nf-e-heading">
        <div className="container fiscalHighlightLayout">
          <Reveal>
            <div className="fiscalHighlightIntro">
              <p className="sectionEyebrow">Notas fiscais</p>
              <h2 id="nf-e-heading">Notas em dia, sem ficar digitando tudo na mão</h2>
              <p className="sectionLead">
                Quando a Secretaria da Fazenda autoriza uma NF-e, você recebe um arquivo XML. É esse arquivo que você traz
                para o Plan — e os dados da nota entram no sistema automaticamente. Menos erro, mais tempo para cuidar da
                loja.
              </p>
              <ul className="fiscalHighlightChips" aria-label="Em resumo">
                <li>XML autorizado</li>
                <li>Dados no painel</li>
                <li>Mesma chave e valores</li>
              </ul>
              <p className="fiscalHighlightEmphasis">
                Em outras palavras: o que está valendo no Fisco é o mesmo que você vê no painel — mesma chave, mesmo
                fornecedor, mesmos valores, prontos para consulta e relatórios.
              </p>
            </div>
          </Reveal>
          <FiscalMotionUl className="benefitsCards fiscalHighlightBenefits">
            {fiscalHighlightBullets.map((item) => (
              <FiscalMotionLi key={item.tag} className="benefitCard">
                <span className="benefitCardAccent" aria-hidden="true" />
                <div className="benefitCardBody">
                  <span className="benefitCardTag">{item.tag}</span>
                  <p className="benefitCardText">{item.body}</p>
                </div>
              </FiscalMotionLi>
            ))}
          </FiscalMotionUl>
        </div>
      </section>

      <section className="section sectionFeaturesCarousel" id="funcionalidades">
        <div className="container">
          <div className="featuresCarouselTop">
            <Reveal>
              <div className="featuresCarouselIntro">
                <p className="sectionEyebrow">Funcionalidades</p>
                <h2>O que você pode fazer com o Plan</h2>
                <p className="sectionLead">
                  Da venda à nota fiscal: PDV, código de barras, estoque, entregas e relatórios — tudo conversando junto, no
                  celular ou no computador.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="featuresCarouselControls" role="group" aria-label="Controles do carrossel">
                <motion.button
                  type="button"
                  className="carouselBtn"
                  onClick={prevFeatures}
                  aria-label="Itens anteriores"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 26 }}
                >
                  ←
                </motion.button>
                <motion.button
                  type="button"
                  className="carouselBtn"
                  onClick={nextFeatures}
                  aria-label="Próximos itens"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 26 }}
                >
                  →
                </motion.button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.04}>
            <p className="carouselRibbon" aria-live="polite">
              <span className="carouselRibbonLabel">Painel</span>
              <span className="carouselRibbonStats">
                <span className="carouselRibbonStrong">
                  {featureStart + 1}–{featureStart + visibleFeatures.length}
                </span>
                <span className="carouselRibbonMuted"> de {features.length} módulos</span>
              </span>
            </p>
          </Reveal>

          <div className="featuresCarouselViewport">
            <div ref={carouselMeasureRef} className="featuresCarouselMeasureLayer" aria-hidden="true">
              {carouselMeasureSlices.map((slice, start) => (
                <div
                  key={`measure-${start}`}
                  className="featuresCarouselRow featuresCarouselMeasureRow"
                  data-count={slice.length}
                >
                  <FeaturePeekMeasureCards slice={slice} />
                </div>
              ))}
            </div>
            <div
              className="featuresCarouselPresenceHost"
              style={
                carouselTrackMinHeight != null && carouselTrackMinHeight > 0
                  ? { minHeight: carouselTrackMinHeight }
                  : undefined
              }
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={featureStart}
                  className="featuresCarouselRow"
                  data-count={visibleFeatures.length}
                  initial={{
                    opacity: 0,
                    x: reduceMotion ? 0 : 44,
                    filter: reduceMotion ? "none" : "blur(5px)"
                  }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    x: reduceMotion ? 0 : -36,
                    filter: reduceMotion ? "none" : "blur(5px)"
                  }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.4, ease: easePremium }}
                >
                {visibleFeatures.map((feature) => {
                  const modIndex = features.findIndex((f) => f.title === feature.title);
                  const safeIdx = modIndex >= 0 ? modIndex : 0;
                  const icon = FEATURE_DECK_ICONS[safeIdx % FEATURE_DECK_ICONS.length];
                  return (
                    <LiftArticle key={feature.title} className="featurePeekCard">
                      <div className="featurePeekCardHead">
                        <span className="featurePeekIcon" aria-hidden>
                          {icon}
                        </span>
                        <span className="featurePeekChip">{feature.carouselEssence}</span>
                      </div>
                      <span className="featurePeekAccent" aria-hidden="true" />
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </LiftArticle>
                  );
                })}
              </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="carouselProgress" role="tablist" aria-label="Grupos do painel de funcionalidades">
            {Array.from({ length: dotCount }, (_, i) => (
              <motion.button
                key={i}
                type="button"
                role="tab"
                aria-selected={featureStart === i}
                aria-label={`Grupo ${i + 1} de ${dotCount}`}
                className={`carouselSegment ${featureStart === i ? "isActive" : ""}`}
                onClick={() => setFeatureStart(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 480, damping: 28 }}
              >
                <span className="carouselSegmentBar" aria-hidden />
                <span className="carouselSegmentNum">{i + 1}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="section sectionFeatureCatalog" aria-labelledby="catalogo-funcionalidades">
        <div className="container">
          <Reveal>
            <>
              <p className="sectionEyebrow">Catálogo</p>
              <h2 id="catalogo-funcionalidades">Veja cada parte com calma</h2>
              <p className="sectionLead">
                Clique para abrir e ler com tranquilidade — assim você sabe exatamente o que está levando.
              </p>
            </>
          </Reveal>
          <div className="featureAccordionShell">
            <ol className="featureAccordion">
              {features.map((feature, index) => (
                <FeatureAccordionRow key={feature.title} feature={feature} index={index} reduceMotion={reduceMotion} />
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section sectionSteps" id="comecar" aria-labelledby="comecar-heading">
        <div className="container">
          <Reveal>
            <>
              <p className="sectionEyebrow">Primeiros passos</p>
              <h2 id="comecar-heading">Começar é rápido</h2>
              <p className="sectionLead">
                Conta, loja configurada, plano ativo — e você já pode vender e organizar notas no mesmo sistema, no aparelho
                que preferir.
              </p>
            </>
          </Reveal>
          <Reveal delay={0.06}>
            <ol className="stepsGrid" aria-label="Passos para começar a usar o Plan Brasil">
              {steps.map((step, i) => (
                <li key={step.title} className="stepsGridItem">
                  <LiftArticle className="stepCard">
                    <span className="stepCardIndex" aria-hidden="true">
                      {i + 1}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </LiftArticle>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="stepsFoot">
              {PLAN_SIGN_UP_HREF ? (
                <motion.a
                  href={PLAN_SIGN_UP_HREF}
                  className="btn btnPrimary"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                >
                  Abrir cadastro
                </motion.a>
              ) : null}
              {PLAN_LOGIN_HREF ? (
                <motion.a
                  href={PLAN_LOGIN_HREF}
                  className="btn btnNeutral"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                >
                  Já tenho conta — entrar
                </motion.a>
              ) : null}
              <motion.a
                href={CONTACT_MAILTO}
                className={PLAN_SIGN_UP_HREF ? "btn btnNeutral" : "btn btnPrimary"}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
              >
                Falar com a equipe Plan Brasil
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section sectionDark sectionBenefits" id="vantagens">
        <div className="container benefitsLayout">
          <Reveal>
            <div className="benefitsIntro">
              <p className="sectionEyebrow">No dia a dia</p>
              <h2>O que melhora no seu dia a dia</h2>
              <p className="benefitsLead">
                Menos erro no caixa, notas e estoque mais alinhados, e uma visão clara para quem decide compras e preços — no
                celular ou no computador.
              </p>
            </div>
          </Reveal>
          <BenefitMotionList className="benefitsCards">
            {benefits.map((item) => (
              <LiftLi key={item.tag} className="benefitCard">
                <span className="benefitCardAccent" aria-hidden="true" />
                <div className="benefitCardBody">
                  <span className="benefitCardTag">{item.tag}</span>
                  <p className="benefitCardText">{item.body}</p>
                </div>
              </LiftLi>
            ))}
          </BenefitMotionList>
        </div>
      </section>

      <section className="section cta" id="contato">
        <div className="container">
          <Reveal>
            <>
              <p className="sectionEyebrow">Contato</p>
              <h2>Bora organizar sua loja?</h2>
              <p>
                Abra sua conta ou mande um e-mail pra gente. Mostramos o PDV, como entram as notas fiscais e como usar no
                celular ou no PC — do seu jeito.
              </p>
            </>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="ctaActions">
              {PLAN_SIGN_UP_HREF ? (
                <motion.a
                  href={PLAN_SIGN_UP_HREF}
                  className="btn btnPrimary"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, boxShadow: "0 14px 36px rgba(228, 154, 15, 0.48)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  Começar no Plan Brasil
                </motion.a>
              ) : null}
              <motion.a
                href={CONTACT_MAILTO}
                className={`btn ${PLAN_SIGN_UP_HREF ? "btnGhost" : "btnPrimary"}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                Quero conversar com vocês
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      <motion.footer
        className="siteFooter"
        {...(!reduceMotion
          ? {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.15 },
              transition: { duration: 0.5, ease: easePremium }
            }
          : {})}
      >
        <div className="container footerLayout">
          <div>
            <p className="footerBrand">Plan Brasil</p>
            <p className="footerCopy">
              PDV, notas fiscais e gestão no celular, tablet ou computador — da compra à venda.
            </p>
          </div>
          <div className="footerLinks">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <a href={CONTACT_MAILTO} className="footerMail">
            {CONTACT_EMAIL}
          </a>
        </div>
      </motion.footer>
    </main>
  );
}
