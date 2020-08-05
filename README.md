# Happy Tiger - Abgabe Prima 2020
Repository für das Spiel "Happy Tiger" mit Fudge

[Pages-Version](https://deneway.github.io/Happy-Tiger-Game-2020-Prima/)

- [HAPPY TIGER](https://deneway.github.io/Happy-Tiger-Game-2020-Prima/Happy-Tiger/index.html)
- [CODE](https://github.com/deneway/Happy-Tiger-Game-2020-Prima)
- [ARCHIV](https://github.com/deneway/Happy-Tiger-Game-2020-Prima/Archiv-Timon-Dehmer.zip)


## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Happy Tiger                 |
|    | Timon Dehmer                  |
|    | 256322        |
|  1 | Nutzerinteraktion     | Mit „D“ läuft der Tiger nach rechts, mit „A“ nach links. Mit „Space“ springt er und auf „S“ duckt er sich.  Mit „F“ rennt der Tiger in die Richtung, die gerade anvisiert ist.                                                                                                                                                    |
|  2 | Objektinteraktion     | Der Tiger sammelt die Münzen auf und stirbt, wenn er von einer Rakete getroffen wird.                                                                                                                                                                              |
|  3 | Objektanzahl variabel | Beim Start des Spieles wird eine variable Anzahl an Floors generiert. Die Anzahl der Raketen passt sich zudem der Anzahl der Floors an.                                                                                                                                                        |
|  4 | Szenenhierarchie      | Level ist Child von Game. Der Tiger, die Raketen, Münzen, Floors und der Hintergrund sind Kinder von Level. Somit ist gewährleistet, dass zum Beispiel verschiedene Level erstellt werden könnten.                                                                                                                                                       |
|  5 | Sound                 | Es ist eine Hintergrundmusik eingebunden. Zudem werden Soundeffekte beim Einsammeln von Münzen abgespielt und, wenn man von einer Rakete getroffen wird.                                                          |
|  6 | GUI                   | Der User kann durch das GUI am Beginn folgende Optionen wählen. 
1.	Er startet direkt das Spiel über „Start“.
2.	Er wählt „Optionen“ und kann die Lautstärke der Musik und Soundeffekte regulieren.
3.	Er geht auf Anleitung um zu erfahren, wie er den Tiger steuert.
Sobald er verliert oder gewinnt erhält er die Option über „Restart“ das Level neu zu laden und noch einmal zu spielen. 
|
|  7 | Externe Daten         | Über die „data.json“ kann extern ein Spielparameter verändert werden. So kann die Anzahl der Coins in der Datei definiert werden. Die Anzahl an Coins die angegeben ist wird im Spiel generiert.                                                                                  |
|  8 | Verhaltensklassen     | Jedes Objekt im Spiel hat eine eigene Klasse. So ist das Verhalten des Tigers in „Tiger.ts“ definiert. Andere Verhaltensklassen:
•	Rakete -> Rocket.ts
•	Münzen -> Coin.ts•	…                                                                                         |
|  9 | Subklassen            | In der Item.ts sind einige Eigenschaften beschrieben, die aufgrund von Überschneidungen von der Rakete in Rocket.ts und von den Münzen in Coin.ts geerbt werden.  |
| 10 | Maße & Positionen     | Die Maße, Skala und Positionen sind alle im Größen-Verhältnis dem Tiger angepasst. Das Spiel ist im Hochformat, da der Tiger von unten nach oben springen kann.                                                                 |
| 11 | Event-System          | Das Event-System wird verwendet. Zum Beispiel für:
1.	Keydown Event bei der Steurung des Charakters
2.	On-Click Events beim Klicken der Buttons im Menü
3.	Der Sound kann mit einem Regler gesteuert werden                                                                                                                                                                                  |

## Abgabeformat
* Fasse die Konzeption als ein wohlformatiertes Designdokument in PDF zusammen!
* Platziere einen Link in der Readme-Datei deines PRIMA-Repositories auf Github auf die fertige und in Github-Pages lauffähige Anwendung.
* Platziere ebenso Links zu den Stellen in deinem Repository, an denen der Quellcode und das Designdokument zu finden sind.
* Stelle zudem auf diese Art dort auch ein gepacktes Archiv zur Verfügung, welches folgende Daten enthält
  * Das Designdokument 
  * Die Projektordner inklusive aller erforderlichen Dateien, also auch Bild- und Audiodaten
  * Eine kurze Anleitung zur Installation der Anwendung unter Berücksichtigung erforderlicher Dienste (z.B. Heroku, MongoDB etc.) 
  * Eine kurze Anleitung zur Interaktion mit der Anwendung

