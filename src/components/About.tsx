import React from "react";
import { Upload, Zap, Shield, Globe, Heart, Github, Cloud, Send, Mail } from "lucide-react";

const infrastructureItems = [
  { label: "Frontend", value: "React 18 + TypeScript" },
  { label: "Backend", value: "Cloudflare Pages Functions" },
  { label: "Armazenamento", value: "API de bot de telegrama" },
  { label: "Metadata", value: "Cloudflare KV (somente análise)" },
  { label: "CDN", value: "Rede global Cloudflare" },
  { label: "Estilo", value: "Tailwind CSS" },
];

const specificationItems = [
  { label: "Tamanho máximo do arquivo", value: "5 MB por arquivo" },
  { label: "Formatos suportados", value: "JPEG, PNG, GIF, WebP, MP4, WebM, MOV" },
  { label: "Métodos de envio", value: "UI da Web, API, arrastar e soltar, área de transferência" },
  { label: "API", value: "REST com autenticação de chave API" },
  { label: "Admin", value: "Dashboard com métricas de uso e gerenciamento de chaves de API" },
  { label: "Tempo de resposta", value: "Otimizado para entrega global" },
];

const acknowledgments = [
  { icon: Cloud, label: "Desenvolvido por páginas Cloudflare", description: "CDN global e implantação sem servidor para hospedagem rápida e confiável." },
  { icon: Send, label: "Hospedagem Gratuita por Telegram", description: "Armazenamento descentralizado de arquivos via Telegram Bot API para uploads permanentes e seguros." },
  { icon: Github, label: "Código aberto no GitHub", description: "Bifurque, contribua e auto-implante este projeto livremente." },
  { icon: Heart, label: "Construído por Tas33n", description: "Criado com paixão por soluções de auto-hospedagem de código aberto. Contato: farhanisteak84@gmail.com | Telegram: @lamb3rt" },
];

export function About() {
  const githubUrl = "https://github.com/tas33n/telegram-image-hosting";
  const email = "farhanisteak84@gmail.com";
  const telegramHandle = "@lamb3rt";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Sobre o MemeIndex</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Um projeto gratuito de hospedagem de imagens e vídeos que armazena arquivos por meio do Telegram e os veicula nas páginas da Cloudflare.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Destacados</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Upload, title: "Uploads flexíveis", body: "Arraste e solte, cole da área de transferência ou navegue pelo disco." },
                { icon: Zap, title: "Entrega rápida", body: "Nós de borda do Cloudflare mantêm os downloads de arquivos rápidos em todo o mundo." },
                { icon: Shield, title: "Armazenamento seguro", body: "Os arquivos vivem em um canal privado do Telegram gerido pelo seu bot." },
                { icon: Globe, title: "Acesso global", body: "Respostas otimizadas para usuários em cada região." },
                { icon: Heart, title: "Código aberto", body: "Hospede e personalize cada parte da pilha." },
                { icon: Github, title: "Amigável para desenvolvedores", body: "Ferramentas modernas e uma API simples tornam as contribuições fáceis." },
              ].map((item, index) => (
                <div key={index} className="text-center transition-colors duration-200">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <item.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Detalhes técnicos</h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Infraestrutura</h3>
                <ul className="space-y-2">
                  {infrastructureItems.map((item, index) => (
                    <li key={index}>
                      • <strong>{item.label}:</strong> {item.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Especificações</h3>
                <ul className="space-y-2">
                  {specificationItems.map((item, index) => (
                    <li key={index}>
                      • <strong>{item.label}:</strong> {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Agradecimentos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {acknowledgments.map((ack, index) => (
                <div key={index} className="text-center transition-colors duration-200">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <ack.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{ack.label}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{ack.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                <Github className="w-5 h-5" />
                <span>Visualizar no GitHub</span>
              </a>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Precisa de ajuda?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Reporte bugs, sugira recursos ou compartilhe como você está usando o projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </a>
              <a
                href={`https://t.me/${telegramHandle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Telegram
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}