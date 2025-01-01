import { FormControl } from "@angular/forms";

export interface IFaq{
    id: string,
    titleAr: string,
    titleEn: string,
    descriptionAr: string,
    descriptionEn: string,
}

export interface IFaqFormGroup{
    titleAr: FormControl<string>,
    titleEn: FormControl<string>,
    descriptionAr: FormControl<string>,
    descriptionEn: FormControl<string>,
}