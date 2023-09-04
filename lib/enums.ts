// Enums definition
export enum TemplateType {
  Template_1,
  Template_2,
  Template_3,
  Template_4,
};

export interface Content {
    id: string;
    template_type: TemplateType;
    text: string;
    title: string;
    image_url: string;
};