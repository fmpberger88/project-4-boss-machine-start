// Importieren der erforderlichen Module
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();


// Port-Konfiguration: Verwenden Sie entweder den von der Umgebung festgelegten Port oder 4001 als Standard
const PORT = process.env.PORT || 4001;

// Middleware: Fügt CORS-Unterstützung für alle Routen hinzu
// Dies erlaubt Cross-Origin-Anfragen
app.use(cors());

// Middleware: Verwendet den eingebauten Body-Parser von Express für JSON
// Dies ermöglicht den Zugriff auf den `req.body` in den Routen
app.use(express.json());

// Verwendung von Morgan für HTTP-Logging.
// Der 'dev' Modus ist einer der vordefinierten Logging-Modi, die die Entwicklungszeit angenehmer machen.
// Er liefert eine farbige und formatierte Ausgabe der HTTP-Anfragen.
app.use(morgan('dev'));

// Importieren und Einbinden des API-Routers
const apiRouter = require('./server/api');
app.use('/api' +
    '', apiRouter);

// Wenn diese Datei direkt ausgeführt wird (d.h. nicht als Modul importiert wird)
// dann wird der Server gestartet
if (!module.parent) {
    // Startet den Server und hört auf dem festgelegten Port
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

// Exportieren der App für andere Module
module.exports = app;