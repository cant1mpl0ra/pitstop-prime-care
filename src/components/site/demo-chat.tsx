import { useEffect, useRef, useState, type FormEvent } from "react";
import { Camera, LoaderCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CHAT_STORAGE_KEY, createDemoQuestion, parseDemoQuestions, removePhoto, validatePhoto, type DemoPhoto, type DemoQuestion } from "@/lib/demo-chat";
import { compressPhoto, loadPhotoQuestions, savePhotoQuestion } from "@/lib/demo-chat-storage";
import { formatSpanishDate } from "@/lib/demo-app";

function PhotoImage({ photo, large = false }: { photo: DemoPhoto; large?: boolean }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const next = URL.createObjectURL(photo.blob);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [photo.blob]);
  return url ? <img src={url} alt={`${photo.name} · No enviado al taller`} className={large ? "max-h-[60dvh] w-full object-contain" : "aspect-square w-full object-cover"} /> : <div className="aspect-square bg-muted" />;
}

export function DemoChat() {
  const [messages, setMessages] = useState<DemoQuestion[]>([]);
  const [photos, setPhotos] = useState<DemoPhoto[]>([]);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<DemoPhoto | null>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const files = useRef<HTMLInputElement>(null);
  const alive = useRef(true);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    alive.current = true;
    let legacy: DemoQuestion[] = [];
    try { legacy = parseDemoQuestions(window.localStorage.getItem(CHAT_STORAGE_KEY)); } catch { /* IndexedDB can still be available. */ }
    void loadPhotoQuestions().then(stored => {
      if (!alive.current) return;
      const merged = new Map([...legacy, ...stored].map(item => [item.id, item]));
      setMessages([...merged.values()].sort((a, b) => a.createdAt.localeCompare(b.createdAt)));
    }).catch(() => {
      if (!alive.current) return;
      setMessages(legacy);
      setError("El almacenamiento de fotos no está disponible. No guardaremos consultas hasta que el navegador permita almacenamiento local.");
    }).finally(() => { if (alive.current) setReady(true); });
    input.current?.focus({ preventScroll: true });
    return () => { alive.current = false; };
  }, []);

  async function selectPhotos(selected: File[]) {
    setBusy(true);
    setError(null);
    const next = [...photos];
    const warnings: string[] = [];
    for (const file of selected) {
      const invalid = validatePhoto(file, next.length);
      if (invalid) { warnings.push(`${file.name}: ${invalid}`); continue; }
      try {
        const blob = await compressPhoto(file);
        next.push({ id: crypto.randomUUID(), name: file.name, originalSize: file.size, blob });
      } catch { warnings.push(`${file.name}: no se puede leer o comprimir esta imagen. Prueba JPEG, PNG o WEBP.`); }
    }
    if (!alive.current) return;
    setPhotos(next);
    setError(warnings.length ? warnings.join(" ") : null);
    setBusy(false);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const question = createDemoQuestion(draft, crypto.randomUUID(), new Date(), photos);
    if (!question) return;
    setBusy(true);
    try {
      await savePhotoQuestion(question);
      if (!alive.current) return;
      setMessages(current => [...current, question]);
      setDraft(""); setPhotos([]); setError(null);
      input.current?.focus({ preventScroll: true });
      requestAnimationFrame(() => end.current?.scrollIntoView({ block: "nearest" }));
    } catch {
      if (alive.current) setError("No se pudo guardar: almacenamiento local lleno o no disponible. Conservamos tu texto y fotos; el historial anterior no se ha borrado. No enviado al taller.");
    } finally { if (alive.current) setBusy(false); }
  }

  return <>
    <div className="mb-6"><p className="text-[11px] font-bold uppercase text-primary">Chat · demostración</p><h1 className="mt-2 font-display text-2xl font-semibold">Preguntar al taller.</h1></div>
    <div className="border-l-2 border-primary bg-surface-blue p-4 text-sm leading-6" role="note">
      <p className="font-semibold">No conectado al taller</p>
      <p className="mt-1 text-muted-foreground">Preguntas y fotos guardadas solo en este navegador. No enviado al taller. No recibirás respuestas aquí mientras no se conecte el servicio.</p>
    </div>
    <section className="my-6" aria-label="Historial de preguntas">
      {!ready ? <p className="text-sm text-muted-foreground">Cargando historial…</p> : !messages.length ? <p className="py-6 text-center text-sm text-muted-foreground">Todavía no tienes preguntas guardadas.</p> :
        <ol className="space-y-4">{messages.map(message => <li key={message.id} className="ml-3 border border-border bg-surface-blue p-4">
          <p className="text-[10px] font-semibold uppercase text-primary">Tú · Demo</p>
          {message.text && <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 [overflow-wrap:anywhere]">{message.text}</p>}
          {!!message.photos?.length && <div className="mt-3 grid grid-cols-2 gap-2">{message.photos.map(photo => <div key={photo.id} className="min-w-0">
            <Button type="button" variant="ghost" className="h-auto w-full p-0" aria-label={`Ampliar ${photo.name}`} onClick={() => setExpanded(photo)}><PhotoImage photo={photo} /></Button>
            <p className="mt-1 break-words text-[10px] [overflow-wrap:anywhere]">{photo.name}</p><p className="text-[10px] text-muted-foreground">No enviado al taller</p>
          </div>)}</div>}
          <time dateTime={message.createdAt} className="mt-3 block text-[10px] text-muted-foreground">{formatSpanishDate(message.createdAt)}</time>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">No enviado al taller</p>
        </li>)}</ol>}
      <div ref={end} />
    </section>
    <form onSubmit={submit} className="border-t border-border pt-4">
      <Label htmlFor="chat-question">Tu pregunta (opcional con fotos)</Label>
      <Textarea ref={input} id="chat-question" value={draft} onChange={e => setDraft(e.target.value)} placeholder="Escribe tu pregunta…" className="mt-2 min-h-28" disabled={!ready || busy} />
      <input ref={files} type="file" accept="image/*" multiple className="sr-only" tabIndex={-1} aria-label="Seleccionar fotografías" disabled={busy} onChange={e => { const selected = Array.from(e.target.files ?? []); e.target.value = ""; void selectPhotos(selected); }} />
      <Button type="button" variant="outline" className="mt-3 min-h-11" disabled={!ready || busy || photos.length >= 5} onClick={() => files.current?.click()}><Camera className="size-4" aria-hidden />Adjuntar fotos</Button>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">Hasta 5 fotos · máximo 5 MB por original. Se comprimen para guardarlas en este dispositivo. No enviado al taller.</p>
      {!!photos.length && <ul aria-label="Fotos seleccionadas" className="mt-3 grid grid-cols-2 gap-3">{photos.map(photo => <li key={photo.id} className="min-w-0 border border-border p-2">
        <PhotoImage photo={photo} />
        <p className="mt-2 break-words text-xs [overflow-wrap:anywhere]">{photo.name}</p>
        <p className="mt-1 text-[10px] text-muted-foreground">Original: {(photo.originalSize / 1024).toFixed(0)} KB · guardada: {(photo.blob.size / 1024).toFixed(0)} KB</p>
        <p className="mt-1 text-[10px] text-muted-foreground">No enviado al taller</p>
        <Button type="button" size="sm" variant="ghost" className="mt-1 min-h-11 w-full px-1" disabled={busy} aria-label={`Quitar ${photo.name}`} onClick={() => setPhotos(current => removePhoto(current, photo.id))}><X className="size-4" aria-hidden />Quitar</Button>
      </li>)}</ul>}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Solo en este dispositivo</p>
        <Button type="submit" disabled={!ready || busy || (!draft.trim() && !photos.length)}>{busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}Guardar pregunta</Button>
      </div>
      {error && <p role="alert" className="mt-3 break-words text-sm text-destructive [overflow-wrap:anywhere]">{error}</p>}
      <p role="status" aria-live="polite" className="sr-only">{busy ? "Procesando fotos o guardando consulta" : `${photos.length} fotos seleccionadas. ${messages.length} preguntas locales. No enviado al taller.`}</p>
    </form>
    <Dialog open={!!expanded} onOpenChange={open => { if (!open) setExpanded(null); }}>
      {expanded && <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-auto p-4">
        <DialogTitle className="break-words pr-8 [overflow-wrap:anywhere]">{expanded.name}</DialogTitle>
        <DialogDescription>No enviado al taller · fotografía local de demostración</DialogDescription>
        <PhotoImage photo={expanded} large />
      </DialogContent>}
    </Dialog>
  </>;
}