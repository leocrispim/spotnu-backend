export class Band {
    constructor(
      private id: string,
      private name: string,
      private album: string[]
    ) {}
  
    public getId(): string {
      return this.id;
    }
  
    public getName(): string {
      return this.name;
    }

    public getAlbums(): string[] {
        return this.album;
      }
  }
  