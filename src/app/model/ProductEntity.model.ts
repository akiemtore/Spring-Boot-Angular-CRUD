export class  ProductEntity {

  id!: number

  name! : string

  price! : number

  description! : string

  constructor() {
  }

  public setName(name : string){
    this.name=name;
  }

  public setPrice(price : number){
    this.price= price;
  }

  public setDescription(description: string){
    this.description = description;
  }
}
