import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata = {
  title: "Plan Brasil | Gestão da loja no celular, tablet ou PC",
  description:
    "Sistema simples para PDV, estoque e notas fiscais (NF-e pelo XML da Fazenda). Funciona no navegador no celular, tablet ou computador — mesma conta na nuvem."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}