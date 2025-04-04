export interface Plot {
  id: string;
  name: string;
  width: number;
  height: number;
  numSquares: number;
  plants: Record<number, Plant>;
}

export interface Plant {
  id: string;
  name: string;
  colors: FlowerColor[];
  lifecycle: PlantLifecycle;
  zones: number[];
  bloomPeriod: BloomPeriod;
}

export enum PlantLifecycle {
  Annual = 'annual',
  Perennial = 'perennial',
}

export enum FlowerColor {
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Indigo = 'indigo',
  Violet = 'violet',
  White = 'white',
  Pink = 'pink',
  Other = 'other',
}

// Week numbers (1-26) corresponding to Apr 1 - Oct 31
export interface BloomPeriod {
  startWeek: number;
  peakStartWeek: number;
  peakEndWeek: number;
  endWeek: number;
}

export const dateToWeekNumber = (date: Date): number => {
  const may1 = new Date(date.getFullYear(), 4, 1); // Month is 0-based, so 4 = May
  const diffTime = date.getTime() - may1.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.ceil(diffDays / 7);
};

export const getBloomOpacity = (
  currentWeek: number,
  bloomPeriod: BloomPeriod
): number => {
  if (
    currentWeek < bloomPeriod.startWeek ||
    currentWeek > bloomPeriod.endWeek
  ) {
    return 0;
  }
  if (
    currentWeek >= bloomPeriod.peakStartWeek &&
    currentWeek <= bloomPeriod.peakEndWeek
  ) {
    return 1;
  }
  if (currentWeek < bloomPeriod.peakStartWeek) {
    return 0.45;
  }
  return 0.55;
};
