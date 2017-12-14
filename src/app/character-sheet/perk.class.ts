export class Perk {
  description: string;
  hasObtained: boolean;

  constructor(description: string) {
    this.description = description;
    this.hasObtained = false;
  }
}
