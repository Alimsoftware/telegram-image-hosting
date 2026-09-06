import React, { useState } from 'react';
import { Code, Copy, Check, Key, Upload, FileText, Info } from 'lucide-react';

export function ApiDocs() {
  const [copiedCode, setCopiedCode] = useState<string>('');

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CodeBlock = ({ code, language, id }: { code: string; language: string; id: string }) => (
    <div className="relative bg-gray-900 dark:bg-gray-800 border border-gray-700 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-white px-4 py-2">
        <span className="text-sm font-medium">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200"
        >
          {copiedCode === id ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copiar</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-gray-100 dark:text-gray-200 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );

  const curlExample = `curl -X POST https://your-domain.com/api/upload \\
  -H "X-API-Key: sua-chave-de-api-aqui" \\
  -F "file=@/path/to/your/image.jpg"`;

  const jsExample = `const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('https://your-domain.com/api/upload', {
  method: 'POST',
  headers: {
    'X-API-Key': 'sua-chave-de-api-aqui'
  },
  body: formData
});

const result = await response.json();
console.log(result.url); // Your hosted image URL`;

  const pythonExample = `import requests

url = "https://your-domain.com/api/upload"
headers = {"X-API-Key": "sua-chave-de-api-aqui"}

with open("image.jpg", "rb") as file:
    files = {"file": file}
    response = requests.post(url, headers=headers, files=files)
    
result = response.json()
print(result["url"])  # Your hosted image URL`;

  const responseExample = `{
  "success": true,
  "url": "https://your-domain.com/file/abc123def456.jpg",
  "filename": "abc123def456.jpg",
  "originalName": "my-image.jpg",
  "size": 1024000,
  "uploadedAt": 1640995200000,
  "method": "API"
}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Code className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Documentação da API
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
           Integre o Telegram Image Hosting em seus aplicativos com nossa API REST simples.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Authentication */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-200">
            <div className="flex items-center space-x-3 mb-6">
              <Key className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Autenticação</h2>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <p className="text-yellow-800 dark:text-yellow-200">
                  <strong>Chave da API Necessária:</strong> Entre em contato com o administrador para obter sua chave da API.
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Todas as solicitações de API requerem autenticação usando uma chave de API. Inclua sua chave de API nos cabeçalhos da solicitação:
            </p>
            
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm text-gray-900 dark:text-gray-200">
              X-API-Key: sua-chave-de-api-aqui
            </div>
          </div>

          {/* Upload Endpoint */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-200">
            <div className="flex items-center space-x-3 mb-6">
              <Upload className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Enviar arquivo</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Endpoint</h3>
                <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-3 font-mono text-sm text-gray-900 dark:text-gray-200">
                  POST /api/upload
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Content-Type</h3>
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-3 font-mono text-sm text-gray-900 dark:text-gray-200">
                  multipart/form-data
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Parâmetros</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Parâmetro</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tipo</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Necessário</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descrição</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-mono text-sm text-gray-900 dark:text-white">file</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Arquivo</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Sim</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Imagem ou arquivo de vídeo (max 5MB)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tipos de Arquivo Suportados</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Imagens</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• JPEG (.jpg, .jpeg)</li>
                  <li>• PNG (.png)</li>
                  <li>• GIF (.gif)</li>
                  <li>• WebP (.webp)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Vídeos</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• MP4 (.mp4)</li>
                  <li>• WebM (.webm)</li>
                  <li>• QuickTime (.mov)</li>
                </ul>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Resposta</h3>
            <CodeBlock code={responseExample} language="JSON" id="response" />
          </div>

          {/* Code Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-200">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Exemplos de códigos</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">cURL</h3>
                <CodeBlock code={curlExample} language="bash" id="curl" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">JavaScript</h3>
                <CodeBlock code={jsExample} language="javascript" id="js" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Python</h3>
                <CodeBlock code={pythonExample} language="python" id="python" />
              </div>
            </div>
          </div>

          {/* Error Codes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-200">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Códigos de erro</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Código de status</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Erro</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descrição</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-mono text-sm text-gray-900 dark:text-white">400</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Requisição inválida</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Nenhum arquivo enviado ou tipo de arquivo inválido</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-mono text-sm text-gray-900 dark:text-white">401</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Não autorizado</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Chave API inválida ou ausente</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-mono text-sm text-gray-900 dark:text-white">413</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Carga útil muito grande</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Tamanho do arquivo excede o limite de 5MB</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-mono text-sm text-gray-900 dark:text-white">500</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Erro do Servidor Interno</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-white">Erro no servidor durante o upload</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-200">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Limites e diretrizes de taxas</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Limites</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Tamanho máximo do arquivo: 5MB</li>
                  <li>• Limite de taxa: 30 envios/hora (anônimo), 200/hora (chave API)</li>
                  <li>• Os arquivos são armazenados permanentemente</li>
                  <li>• Nenhuma autenticação necessária para acesso a arquivos</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Melhores Práticas</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Otimize as imagens antes do envio</li>
                  <li>• Use formatos de arquivo apropriados</li>
                  <li>• Armazene URLs retornados com segurança</li>
                  <li>• Lidar com erros normalmente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}