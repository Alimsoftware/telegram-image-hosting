import { Check, Copy, Eye, Image as ImageIcon, Trash2, Upload, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { UploadHistoryPanel } from "../components/UploadHistoryPanel";
import { useUploadHistory } from "../hooks/useUploadHistory";
import { useState } from "react";

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function Home() {
  const history = useUploadHistory();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyUrl = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.warn("Clipboard error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <header className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">MemeIndex</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">Seus envios</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Acesse e organize os arquivos enviados neste navegador.
            </p>
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <Upload className="h-4 w-4" />
            Novo envio
          </Link>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Galeria do canal</h2>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Imagens e vídeos dos links gerados pelos seus envios.
              </p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {history.entries.length} arquivo{history.entries.length === 1 ? "" : "s"}
            </span>
          </div>

          {history.entries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center dark:border-gray-600">
              <ImageIcon className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
              <p className="mt-3 text-gray-700 dark:text-gray-300">Nenhum arquivo enviado ainda.</p>
              <Link to="/upload" className="mt-4 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Fazer o primeiro envio
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {history.entries.map((entry) => {
                const isVideo = entry.fileType.startsWith("video/");
                return (
                  <article key={entry.id} className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                      {isVideo ? (
                        <video src={entry.url} className="h-full w-full object-cover" controls preload="metadata" />
                      ) : (
                        <img src={entry.url} alt={entry.originalName} className="h-full w-full object-cover" loading="lazy" />
                      )}
                      <button
                        type="button"
                        onClick={() => history.removeEntry(entry.id)}
                        className="absolute right-2 top-2 rounded-full bg-black/60 p-2 text-white transition hover:bg-red-600"
                        aria-label={`Remover ${entry.originalName}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-3 p-4">
                      <div>
                        <h3 className="truncate font-medium text-gray-900 dark:text-white" title={entry.originalName}>
                          {entry.originalName}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(entry.uploadedAt)} · {formatBytes(entry.size)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => copyUrl(entry.id, entry.url)}
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          {copiedId === entry.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          {copiedId === entry.id ? "Copiado" : "Copiar link"}
                        </button>
                        <a
                          href={`${entry.url}?a=view`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded border border-blue-200 px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          {isVideo ? <Video className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          Abrir
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <UploadHistoryPanel
          entries={history.entries}
          viewMode={history.viewMode}
          onViewModeChange={history.setViewMode}
          sortMode={history.sortMode}
          onSortModeChange={history.setSortMode}
          onRemove={history.removeEntry}
          onClear={history.clearHistory}
          onDownload={history.downloadHistory}
          title="Envios recentes"
          showWarning
        />
      </div>
    </div>
  );
}