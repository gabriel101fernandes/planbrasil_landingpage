"use client";

/* eslint-disable @next/next/no-img-element -- hero: logo SVG e mockup PNG carregam de forma confiável só com <img> */
import { useCallback, useEffect, useState } from "react";

const features = [
  {
    title: "Operador de Caixa (PDV)",
    description:
      "Atendimento ágil no balcão e no delivery, com abertura e fechamento de caixa, controle por operador e histórico de vendas."
  },
  {
    title: "Impressão de Cupom Não Fiscal",
    description:
      "Emissão rápida de comprovantes para o cliente, com layout organizado, itens detalhados e registro automático no sistema."
  },
  {
    title: "Relatórios Inteligentes",
    description:
      "Visualize desempenho por período, produtos mais vendidos, ticket médio e horários de pico para tomar decisões com dados reais."
  },
  {
    title: "Estoque Dinâmico",
    description:
      "Atualização em tempo real a cada venda, entradas de mercadoria, alertas de reposição e rastreio completo de movimentações."
  },
  {
    title: "Fluxo de Caixa",
    description:
      "Controle entradas, saídas, sangrias e saldo diário com visão consolidada para manter a saúde financeira da operação."
  },
  {
    title: "Entregas Integradas",
    description:
      "Gerencie pedidos, status de entrega e operação de motoboys em uma rotina simples para o time e transparente para o cliente."
  },
  {
    title: "Gestão Centralizada",
    description:
      "Unifique vendas, estoque, financeiro e relatórios em um único painel, com acesso rápido para gestores e equipe."
  }
];

const benefits = [
  "Visual moderno com foco em velocidade no atendimento",
  "Processos padronizados para reduzir erros operacionais",
  "Mais controle da loja mesmo com equipes em turnos",
  "Escalável para uma loja ou múltiplas unidades"
];

const navLinks = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#catalogo-funcionalidades", label: "Módulos" },
  { href: "#vantagens", label: "Vantagens" },
  { href: "#contato", label: "Contato" }
];

function useItemsPerView() {
  const [n, setN] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setN(1);
      else if (w < 960) setN(2);
      else setN(3);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return n;
}

export default function Home() {
  const [parallaxY, setParallaxY] = useState(0);
  const [featureStart, setFeatureStart] = useState(0);
  const itemsPerView = useItemsPerView();
  const maxStart = Math.max(0, features.length - itemsPerView);

  useEffect(() => {
    setFeatureStart((s) => Math.min(s, maxStart));
  }, [maxStart]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onScroll = () => {
      if (mq.matches) {
        setParallaxY(0);
        return;
      }
      setParallaxY(window.scrollY * 0.12);
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
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || maxStart <= 0) return undefined;
    const id = window.setInterval(() => {
      setFeatureStart((prev) => (prev >= maxStart ? 0 : prev + 1));
    }, 6500);
    return () => window.clearInterval(id);
  }, [maxStart]);

  const nextFeatures = useCallback(() => {
    setFeatureStart((prev) => (prev >= maxStart ? 0 : prev + 1));
  }, [maxStart]);

  const prevFeatures = useCallback(() => {
    setFeatureStart((prev) => (prev <= 0 ? maxStart : prev - 1));
  }, [maxStart]);

  const visibleFeatures = features.slice(featureStart, featureStart + itemsPerView);
  const dotCount = maxStart + 1;

  return (
    <main>
      <nav className="siteNav" aria-label="Navegação principal">
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
          <a href="mailto:planbrasilweb@gmail.com" className="btn btnPrimary navCta">
            Agendar demonstração
          </a>
        </div>
      </nav>

      <header className="hero" id="topo">
        <div className="heroGrid" aria-hidden="true" />
        <div className="container heroLayout">
          <div className="heroContent">
            <div className="heroBrand">
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
                <span className="heroBrandTag">PDV · estoque · financeiro</span>
              </div>
            </div>
            <h1>A plataforma de última geração para operar e expandir sua loja.</h1>
            <p>
              O Plan Brasil une PDV, cupom não fiscal, estoque dinâmico, fluxo de caixa,
              relatórios e entregas em um sistema de alta performance para o varejo.
            </p>
            <div className="heroActions">
              <a href="#contato" className="btn btnPrimary">
                Solicitar demonstração
              </a>
              <a href="#funcionalidades" className="btn btnGhost">
                Ver funcionalidades
              </a>
            </div>
          </div>
          <div className="heroVisual" style={{ "--hero-parallax": `${parallaxY}px` }}>
            <div className="mockupStage">
              <img
                src="/images/mockup.PNG"
                alt="Interface do Plan Brasil em dispositivo móvel"
                className="mockupImage"
                width={1080}
                height={1080}
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <p className="platformNote">
              Excelência em desktop, notebook e dispositivos móveis — mesma operação, onde você
              estiver.
            </p>
          </div>
        </div>
      </header>

      <section className="section sectionFeaturesCarousel" id="funcionalidades">
        <div className="container">
          <div className="featuresCarouselTop">
            <div className="featuresCarouselIntro">
              <p className="sectionEyebrow">Funcionalidades</p>
              <h2>Pontos estratégicos em foco</h2>
              <p className="sectionLead">
                Navegue pelos pilares do produto — até três por vez, com o detalhamento completo na
                seção seguinte.
              </p>
            </div>
            <div className="featuresCarouselControls" role="group" aria-label="Controles do carrossel">
              <button type="button" className="carouselBtn" onClick={prevFeatures} aria-label="Itens anteriores">
                ←
              </button>
              <button type="button" className="carouselBtn" onClick={nextFeatures} aria-label="Próximos itens">
                →
              </button>
            </div>
          </div>

          <div className="featuresCarouselViewport">
            <div
              key={featureStart}
              className="featuresCarouselRow"
              data-count={visibleFeatures.length}
            >
              {visibleFeatures.map((feature) => (
                <article key={feature.title} className="featurePeekCard">
                  <span className="featurePeekAccent" aria-hidden="true" />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="featuresCarouselDots" role="tablist" aria-label="Posição no carrossel">
            {Array.from({ length: dotCount }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={featureStart === i}
                aria-label={`Grupo ${i + 1} de ${dotCount}`}
                className={`dot ${featureStart === i ? "isActive" : ""}`}
                onClick={() => setFeatureStart(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section sectionFeatureCatalog" aria-labelledby="catalogo-funcionalidades">
        <div className="container">
          <h2 id="catalogo-funcionalidades">Tudo o que o Plan Brasil cobre</h2>
          <p className="sectionLead">
            Expanda cada item para visualizar detalhes de cada ponto estratégico do produto.
          </p>
          <ol className="featureAccordion">
            {features.map((feature, index) => (
              <li key={feature.title} className="featureAccordionItem">
                <details open={index === 0}>
                  <summary>
                    <span className="featureAccordionIndex" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="featureAccordionTitle">{feature.title}</span>
                    <span className="featureAccordionIcon" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{feature.description}</p>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section sectionDark" id="vantagens">
        <div className="container twoColumns">
          <div>
            <h2>Por que escolher o Plan Brasil?</h2>
            <p>
              Desenvolvido para a realidade do varejo brasileiro, com foco em produtividade, controle
              e experiência de atendimento do primeiro ao último pedido do dia.
            </p>
          </div>
          <ul className="benefits">
            {benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section cta" id="contato">
        <div className="container">
          <h2>Pronto para levar sua loja ao próximo nível com o Plan Brasil?</h2>
          <p>
            Fale com a equipe do Plan Brasil e descubra como implementar uma operação mais
            eficiente.
          </p>
          <a href="mailto:planbrasilweb@gmail.com" className="btn btnPrimary">
            Entrar em contato
          </a>
        </div>
      </section>

      <footer className="siteFooter">
        <div className="container footerLayout">
          <div>
            <p className="footerBrand">Plan Brasil</p>
            <p className="footerCopy">Plataforma inteligente para operação de loja com foco em escala.</p>
          </div>
          <div className="footerLinks">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <a href="mailto:planbrasilweb@gmail.com" className="footerMail">
            planbrasilweb@gmail.com
          </a>
        </div>
      </footer>
    </main>
  );
}
