# Arcade: app installabile

Sala giochi che si installa sul telefono e funziona anche senza connessione.

## Contenuto

- `index.html`: la pagina Arcade con i bottoni dei giochi e il controllo aggiornamenti
- `tetris/index.html`: Blocchi Arcade (Tetris)
- `sw.js`: service worker, cioè la cache offline e la versione dell'app
- `manifest.webmanifest` e `icons/`: dati e icone per l'installazione
- `fonts/`: font locali (vedi sotto)

## 1. Font

Copia in `fonts/` questi tre file, con nomi esatti:

- `PressStart2P-Regular.woff2`
- `IBMPlexMono-Regular.woff2`
- `IBMPlexMono-SemiBold.woff2`

Se mancano, l'app funziona lo stesso con un font di sistema.

## 2. Pubblicazione

Le app installabili richiedono un indirizzo https. Due opzioni gratuite:

- **Netlify Drop**: vai su app.netlify.com/drop e trascina l'intera cartella. Ottieni subito un indirizzo https.
- **GitHub Pages**: crea un repository, carica il contenuto della cartella, poi Settings, Pages, branch `main`, cartella root.

Il sito sarà raggiungibile da chiunque conosca l'indirizzo.

## 3. Installazione sul telefono

- **Android (Chrome)**: apri l'indirizzo, menu con i tre puntini, Installa app.
- **iPhone (Safari)**: apri l'indirizzo, tasto Condividi, Aggiungi a Home.

Apri l'app una volta con la connessione attiva: da quel momento funziona anche offline.

## 4. Aggiornamenti

1. Modifica i file (o ricevi quelli nuovi).
2. In `sw.js` cambia `VERSION`, per esempio da `'1.0.0'` a `'1.0.1'`.
3. Ricarica tutti i file sull'hosting.

Sul telefono l'app controlla da sola quando la apri o la riprendi, e mostra "Nuova versione pronta". Il bottone "Controlla aggiornamenti" nella pagina Arcade fa lo stesso controllo subito. Record e impostazioni dei giochi restano salvati.

## 5. Aggiungere un gioco

1. Crea una cartella, per esempio `snake/`, con il suo `index.html`. Nella sua intestazione metti un link `../` per tornare ad Arcade.
2. In `index.html` della radice aggiungi un oggetto all'elenco `GAMES`.
3. In `sw.js` aggiungi `'snake/'` e `'snake/index.html'` all'elenco `CORE` e cambia `VERSION`.
