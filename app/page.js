"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

const slides = [
  {
    title: "PDV de alta performance para picos de venda",
    description:
      "Registre vendas em poucos toques, emita cupom não fiscal e acompanhe cada operador com rastreabilidade completa."
  },
  {
    title: "Estoque dinâmico e inteligência de reposição",
    description:
      "Atualizações em tempo real com alertas automáticos de ruptura, histórico de movimentações e visão por produto ou categoria."
  },
  {
    title: "Gestão financeira e relatórios estratégicos",
    description:
      "Monitore fluxo de caixa, ticket médio, produtos campeões e horários mais lucrativos para crescer com previsibilidade."
  }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallaxY(window.scrollY * 0.18);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const previousSlide = () =>
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <main style={{ "--parallax-y": `${parallaxY}px` }}>
      <header className="hero">
        <div className="container heroLayout">
          <div className="heroContent">
            <span className="badge">Plan Brasil</span>
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
          <div className="heroPanels">
            <div className="mockupShowcase">
              <div className="mockupCard">
                <Image
                  src="/images/mockup.png"
                  alt="Mockup do Plan Brasil em celular"
                  fill
                  className="mockupImage phoneImage"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw" // Ajuda na performance
                  style={{ objectFit: 'cover' }} // Ou 'contain', dependendo do seu design
                />
              </div>
            </div>
            <p className="platformNote">
              O Plan Brasil roda com excelência em diferentes plataformas: desktop, notebook e
              dispositivos móveis.
            </p>
          </div>
        </div>
      </header>

      <section className="section" id="funcionalidades">
        <div className="container">
          <h2>Tecnologia completa para uma operação inteligente</h2>
          <div className="grid">
            {features.map((feature) => (
              <article key={feature.title} className="card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sectionCarousel">
        <div className="container">
          <div className="carouselHeader">
            <h2>Experiência premium para gestão e vendas</h2>
            <div className="carouselControls">
              <button
                type="button"
                className="carouselBtn"
                onClick={previousSlide}
                aria-label="Slide anterior"
              >
                ←
              </button>
              <button
                type="button"
                className="carouselBtn"
                onClick={nextSlide}
                aria-label="Próximo slide"
              >
                →
              </button>
            </div>
          </div>

          <div className="carousel">
            <div className="carouselTrack" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {slides.map((slide) => (
                <article key={slide.title} className="carouselSlide">
                  <span className="slideTag">Plan Brasil Performance</span>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="carouselDots">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={`dot ${activeSlide === index ? "isActive" : ""}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Mais controle no caixa, estoque e financeiro</h2>
          <div className="highlights">
            <article className="highlightCard">
              <h3>Cupom não fiscal com impressão imediata</h3>
              <p>
                Finalize vendas com agilidade e entregue comprovantes claros para o cliente, com
                todos os itens e total da compra.
              </p>
            </article>
            <article className="highlightCard">
              <h3>Estoque dinâmico em tempo real</h3>
              <p>
                Cada venda atualiza automaticamente o estoque. Receba alertas de itens críticos e
                evite perda de venda por falta de produto.
              </p>
            </article>
            <article className="highlightCard">
              <h3>Relatórios para decisão de crescimento</h3>
              <p>
                Descubra o que mais vende, quais horários performam melhor e onde estão os gargalos
                da operação para crescer com previsibilidade.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section sectionDark">
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
          <a href="mailto:contato@planbrasil.com" className="btn btnPrimary">
            Entrar em contato
          </a>
        </div>
      </section>
    </main>
  );
}