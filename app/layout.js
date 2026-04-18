import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata = {
  title: "Plan Brasil | Plataforma de Gestão para Lojas",
  description:
    "Plan Brasil é a plataforma completa para lojas com PDV, cupom não fiscal, estoque dinâmico, relatórios, fluxo de caixa e entregas."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}