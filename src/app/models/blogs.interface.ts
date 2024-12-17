import { FormControl } from "@angular/forms";

export interface IBlog{
    id: string,
    slug: string,
    imageUrl?: string,
    image?:File | null,
    titleAr: string,
    titleEn: string,
    createdDate: string,
    descriptionAr: string,
    descriptionEn: string,
}

export interface IBlogFormGroup{
    id: FormControl<string | null>;
    slug: FormControl<string>;
    titleAr: FormControl<string>;
    titleEn: FormControl<string>;
    descriptionAr: FormControl<string>;
    descriptionEn: FormControl<string>;
    image: FormControl<File | null>;
    imageUrl: FormControl<string | null>;
}