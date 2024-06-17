Milestone 0:
Progettare la struttura della logica della nostra applicazione attraverso l’uso di: 
global state, mista, oppure esclusivamente con props ed $emit sulla linea degli esercizi svolti nei giorni precedenti.
// Creo una funzione per effettuare una chiamata all'api e ottenere una lista di film in base alla query inserita (ricerca in italiano). Inserisco i risultati in un array salvato in store.js.

Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: 
Titolo,
Titolo Originale,
Lingua,
Voto.
// Collego la v-model dell'input al parametro query della funzione (attraverso una variabile in store.js) e cliccando sul bottone ottengo il risultato della chiamata. Per ogni oggetto dell'array stampo in pagina i valori richiesti.


Milestone 2:
Trasformiamo la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome) [per ogni film].
// Uso una api per sostituire la stringa della lingua con la bandiera corrispondente.

Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
// Nella stessa funzione faccio la chiamata per le serie tv e creo un unico contenitore per film e serie tv (eventualmente bottoni per filtrare?).

Milestone 3:
In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse. Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la parte finale dell’URL passata dall’API.
Esempio di URL:
https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
// Per ogni risultato aggiungo l'immagine (URL base + dimensione + path fornito dai dati). Aggiungo un p per gli elementi senza immagine (eventualmente una copertina modello).

Trasformiamo poi il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P). 
// Creo una funzione per dividere il voto per 2 e, se il risultato della divisione non è un intero o non è uguale a 5, arrotondo per eccesso . Creo un array costituito da 5 '0' e sostituisco gli '0' con tanti '1' a seconda del voto. Agli '1' assegno la stella piena, agli '0' la vuota.

Milestone 4:
Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp, creando un layout completo simil-Netflix:
● Un header che contiene logo e search bar;
● Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio la poster_path con w342);
● Andando con il mouse sopra una card (on hover), appaiono le informazioni aggiuntive già prese nei punti precedenti più la overview;

Milestone 5 (Opzionale):
Partendo da un film o da una serie, richiedere all'API quali sono gli attori che fanno parte del cast aggiungendo alla nostra scheda Film / Serie SOLO i primi 5 restituiti dall’API con Nome e Cognome, e i generi associati al film con questo schema: “Genere 1, Genere 2, …”.

Milestone 6 (Opzionale):
Creare una lista di generi richiedendo quelli disponibili all'API e creare dei filtri con i generi tv e movie per mostrare/nascondere le schede ottenute con la ricerca.
