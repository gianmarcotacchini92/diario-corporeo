# Diario Corporeo

App web (PWA) per registrare le misurazioni corporee, con sincronizzazione cloud tra PC e telefono.

## Schede

- **⚖️ Bilancia** — valori rilevati dalla bilancia impedenziometrica: peso, grasso %, acqua %,
  massa muscolare, metabolismo basale, grasso viscerale, età metabolica, BMI, punteggio fisico,
  massa ossea.
- **🩺 Nutrizionista** — gli stessi valori di composizione corporea più le misure prese in studio:
  circonferenze (vita, addome, fianchi, cosce) e pliche (petto, addome, coscia, sovrailiaca,
  sottoscapola, tricipiti), con il totale calcolato automaticamente.
- **👤 Account** — obiettivo di peso, altezza, accesso Google e backup completo.

## Funzioni

- Grafico dell'andamento per ogni singola metrica, con variazione dal primo all'ultimo rilevamento.
- Grafico interattivo: passando il mouse (o toccando su telefono) compare il valore puntuale,
  la data e la differenza rispetto alla misurazione precedente.
- Riepilogo dell'ultima misurazione con la differenza rispetto alla precedente.
- BMI calcolato in automatico dall'altezza quando il campo viene lasciato vuoto.
- Storico completo con modifica ed eliminazione delle singole misurazioni.
- Import/export JSON per scheda o backup completo, più ripristino del backup automatico.
- Funziona offline (service worker) e si installa sul telefono come app.

## Sincronizzazione

I dati sono salvati in locale (`localStorage`) e, dopo l'accesso con Google, replicati su
Firebase Firestore nel documento `bodyStates/{uid}`. Usando lo stesso account Google su più
dispositivi i dati restano allineati in tempo reale.

La sincronizzazione non sovrascrive mai dati reali con uno stato vuoto.

## Dati iniziali

Al primo avvio entrambe le schede vengono precaricate:

- **Bilancia** — 35 pesate esportate dalla bilancia (CSV) dal 14/01/2023 al 15/08/2026.
  Il BMI è ricalcolato dall'altezza e il grasso viscerale è normalizzato (l'export perde il
  separatore decimale: `65` → `6,5`).
- **Nutrizionista** — 17 rilevazioni del foglio "Weight Tracker" dal 14/01/2023 al 20/12/2025.

In ogni scheda il pulsante *"↻ Ricarica storico iniziale"* permette di reinserire i dati in
qualsiasi momento: le misurazioni con la stessa data vengono aggiornate, quelle aggiunte a mano
restano intatte.
