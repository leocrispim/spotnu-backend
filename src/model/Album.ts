export class Album {
  constructor(
    private id: string,
    private name: string,
    private band: string
  ) { }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getBand(): string {
    return this.band;
  }

  public getData(): any {
    return {
      id: this.id,
      name: this.name,
      band_id: this.band
    }
  }
}
