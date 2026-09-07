# Diario Corporeo

App web (PWA) per registrare le misurazioni corporee, con sincronizzazione cloud tra PC e telefono.

## Schede

- **⚖️ Bilancia** — valori rilevati dalla bilancia impedenziometrica: peso, grasso %, acqua %,
  massa muscolare, metabolismo basale, grasso viscerale, età metabolica, BMI, punteggio fisico.
- **🩺 Nutrizionista** — gli stessi valori di composizione corporea più le misure prese in studio:
  circonferenze (vita, addome, fianchi, cosce) e pliche (petto, addome, coscia, sovrailiaca,
  sottoscapola, tricipiti), con il totale calcolato automaticamente.
- **👤 Account** — obiettivo di peso, altezza, accesso Google e backup completo.

## Funzioni

- Grafico dell'andamento per ogni singola metrica, con variazione dal primo all'ultimo rilevamento.
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

Al primo avvio la scheda Nutrizionista viene precaricata con lo storico del foglio
"Weight Tracker" (17 rilevazioni dal 14/01/2023 al 20/12/2025). Il pulsante
*"↻ Ricarica storico iniziale"* permette di reinserirlo in qualsiasi momento.
