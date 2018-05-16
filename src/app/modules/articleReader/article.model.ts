import { Metadata } from "../metaData";
import { ContentModel } from '../contentModel';

export class Article {
  filePath: string;
  metadata: Metadata;
  content: ContentModel;
}
