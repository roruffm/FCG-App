/**
 * ZU PRUEFEN: Zuordnung zwischen dieser App und der ChurchTools-API.
 *
 * Diese Datei ist die einzige Stelle, an der ChurchTools-Pfade stehen. Sie
 * beruht auf der oeffentlich dokumentierten REST-API und ist NICHT gegen eine
 * echte Instanz getestet - waehrend der Entwicklung war churchtools.de nicht
 * erreichbar.
 *
 * So wird sie geprueft, in zwei Minuten:
 *   1. In eurer Instanz https://<instanz>.church.tools/api oeffnen. Dort
 *      liegt die Swagger-Oberflaeche mit allen Pfaden eurer Version.
 *   2. `node server/check-churchtools.mjs` ausfuehren (siehe ANLEITUNG.md).
 *      Das Skript ruft jeden Pfad hier einmal auf und schreibt, was
 *      funktioniert und was nicht.
 *   3. Abweichungen nur hier korrigieren - der Rest bleibt unveraendert.
 */

export const mapping = {
  /** Anmeldung mit persoenlichem Login-Token eines technischen Nutzers. */
  auth: {
    header: (token) => ({ Authorization: `Login ${token}` }),
    /** Prueft Token und liefert die angemeldete Person. */
    whoami: '/api/whoami',
  },

  groups: {
    /** Alle Gruppen; Dienstteams werden ueber groupTypeId gefiltert. */
    list: '/api/groups',
    one: (id) => `/api/groups/${id}`,
    members: (id) => `/api/groups/${id}/members`,
  },

  /**
   * Dateien haengen in ChurchTools an einem Objekt ("domain"). Fuer eine
   * Gruppe ist das domainType "group" mit der Gruppen-Id.
   */
  files: {
    list: (groupId) => `/api/files/group/${groupId}`,
    upload: (groupId) => `/api/files/group/${groupId}`,
    one: (fileId) => `/api/files/${fileId}`,
    remove: (fileId) => `/api/files/${fileId}`,
  },

  /**
   * Beitraege einer Gruppe - in ChurchTools "Posts". Sie ersetzen den Chat
   * nicht eins zu eins: Der ChurchTools-Chat ist ein eigener Dienst (Matrix)
   * mit eigener Anmeldung. Fuer Absprachen im Team sind Posts der Weg, der
   * ohne zweiten Dienst auskommt.
   */
  posts: {
    list: (groupId) => `/api/posts?groupIds[]=${groupId}`,
    create: '/api/posts',
    remove: (postId) => `/api/posts/${postId}`,
  },

  /** Nur Gruppen dieses Typs gelten als Dienstteam. Id in der Instanz pruefen. */
  dienstteamGruppentyp: 2,
}
