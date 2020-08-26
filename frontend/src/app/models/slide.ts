import { OutputData } from '@editorjs/editorjs';

export class Slide {
  constructor(
    public title: string,
    public setting: string,
    public owner: string,
    public content?: OutputData,
    public _id?: string
  ){}
}
