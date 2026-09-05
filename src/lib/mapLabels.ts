/*
 * Uebernommen aus dem Schwesterprojekt "Entgegen - Bibel lesen und verstehen"
 * (github.com/roruffm/bible-study). Nur die Importpfade sind angepasst.
 */
/**
 * Beschriftungen auf der Karte so verteilen, dass sie sich möglichst nicht
 * überdecken.
 *
 * Kartenbeschriftung ist ein bekanntes Optimierungsproblem; hier genügt ein
 * einfaches gieriges Verfahren: Für jeden Punkt werden mögliche Positionen der
 * Reihe nach durchprobiert (rechts, links, darüber, darunter …) und die erste
 * genommen, die frei ist. Bei wenigen Dutzend Punkten reicht das völlig.
 */

export interface LabelInput {
  x: number;
  y: number;
  text: string;
  /**
   * Beschriftung sitzt auf dem Punkt selbst statt daneben – für Landschaften,
   * die keine Markierung haben, sondern nur einen Namen im Gebiet. Solche
   * Beschriftungen werden zuerst gesetzt, alle anderen weichen ihnen aus.
   */
  fixed?: boolean;
}

export type Anchor = 'start' | 'end' | 'middle';

export interface PlacedLabel extends LabelInput {
  labelX: number;
  labelY: number;
  anchor: Anchor;
  /** Wahr, wenn keine freie Position gefunden wurde. */
  crowded: boolean;
}

interface Box {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

function overlaps(a: Box, b: Box): boolean {
  return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1);
}

/**
 * @param unit   Größe eines Bildschirmpixels in Zeichenkoordinaten – bei
 *               gezoomter Ansicht sind Beschriftungen sonst riesig.
 * @param bounds Sichtbarer Bereich. Beschriftungen, die darüber hinausragen,
 *               werden am Rand abgeschnitten und sind unbrauchbar; sie gelten
 *               deshalb als nicht platzierbar.
 */
export function layoutLabels(items: LabelInput[], unit = 1, bounds?: Box): PlacedLabel[] {
  const inside = (box: Box) =>
    !bounds ||
    (box.x1 >= bounds.x1 && box.x2 <= bounds.x2 && box.y1 >= bounds.y1 && box.y2 <= bounds.y2);

  // Grobe Textbreite; genauer ginge nur durch Messen im Browser. Feste
  // Beschriftungen stehen gesperrt und in Kapitälchen und brauchen mehr Platz.
  const widthOf = (text: string, fixed = false) => text.length * (fixed ? 10 : 7.2) * unit;

  const placed: Box[] = [];
  const result = new Array<PlacedLabel>(items.length);

  // Feste Beschriftungen zuerst: Sie sitzen auf ihrem Punkt und blockieren die
  // Fläche, bevor die freien Beschriftungen verteilt werden. Sie weichen
  // einander aus, nicht aber den Ortspunkten – ein Landschaftsname darf über
  // einer Stadt liegen, er steht ja im Hintergrund.
  items.forEach((item, i) => {
    if (!item.fixed) return;
    const width = widthOf(item.text, true);
    const box: Box = {
      x1: item.x - width / 2,
      y1: item.y - 12 * unit,
      x2: item.x + width / 2,
      y2: item.y + 3 * unit,
    };
    const crowded = !inside(box) || placed.some((other) => overlaps(other, box));
    placed.push(box);
    result[i] = { ...item, labelX: item.x, labelY: item.y, anchor: 'middle', crowded };
  });

  // Erst jetzt gelten die Ortspunkte als belegt, damit keine Beschriftung auf
  // einem fremden Punkt zu liegen kommt.
  for (const item of items) {
    if (item.fixed) continue;
    placed.push({
      x1: item.x - 6 * unit,
      y1: item.y - 6 * unit,
      x2: item.x + 6 * unit,
      y2: item.y + 6 * unit,
    });
  }

  items.forEach((item, i) => {
    if (item.fixed) return;
    const width = widthOf(item.text);
    const height = 14 * unit;
    const gap = 9 * unit;

    const candidates: [number, number, Anchor][] = [
      [item.x + gap, item.y + 4 * unit, 'start'],
      [item.x - gap, item.y + 4 * unit, 'end'],
      [item.x, item.y - 10 * unit, 'middle'],
      [item.x, item.y + 17 * unit, 'middle'],
      [item.x + gap, item.y - 9 * unit, 'start'],
      [item.x - gap, item.y - 9 * unit, 'end'],
      [item.x + gap, item.y + 17 * unit, 'start'],
      [item.x - gap, item.y + 17 * unit, 'end'],
      [item.x, item.y - 24 * unit, 'middle'],
      [item.x, item.y + 31 * unit, 'middle'],
    ];

    for (const [labelX, labelY, anchor] of candidates) {
      const left =
        anchor === 'start' ? labelX : anchor === 'end' ? labelX - width : labelX - width / 2;
      // Unter der Schriftlinie liegen noch Unterlängen und der helle Rand,
      // mit dem der Text vom Kartenbild abgesetzt wird.
      const box: Box = {
        x1: left,
        y1: labelY - height,
        x2: left + width,
        y2: labelY + 4 * unit,
      };

      if (inside(box) && !placed.some((other) => overlaps(other, box))) {
        placed.push(box);
        result[i] = { ...item, labelX, labelY, anchor, crowded: false };
        return;
      }
    }

    // Nichts frei: erste Position nehmen und den Punkt als gedrängt melden,
    // damit die Darstellung ihn zurücknehmen kann.
    const [labelX, labelY, anchor] = candidates[0];
    result[i] = { ...item, labelX, labelY, anchor, crowded: true };
  });

  return result;
}
