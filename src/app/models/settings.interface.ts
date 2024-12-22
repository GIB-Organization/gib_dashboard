import { FormControl } from "@angular/forms";

export interface IGeneralSettings{
    siteTitleAr: string,
    siteTitleEn: string,
    siteDescriptionAr: string,
    siteDescriptionEn: string,
    address:string,
    instagram: string,
    facebook:string,
    youtube:string,
    x:string,
    phone: string,
    email: string,
    showMedicalFaults:boolean,
    showMedicalInsurance:boolean,
    showCarInsurance:boolean,
}
export interface IGeneralSettingsFormGroup{
    siteTitleAr: FormControl<string | null>,
    siteTitleEn: FormControl<string | null>,
    siteDescriptionAr: FormControl<string | null>,
    siteDescriptionEn: FormControl<string | null>,
    address:FormControl<string | null>,
    instagram: FormControl<string | null>,
    facebook:FormControl<string | null>,
    youtube:FormControl<string | null>,
    x:FormControl<string | null>,
    phone: FormControl<string | null>,
    email: FormControl<string | null>,
    showMedicalFaults:FormControl<boolean | null>,
    showMedicalInsurance:FormControl<boolean | null>,
    showCarInsurance:FormControl<boolean | null>,
}

export interface ISeoSettings{
    homeTitle: string,
    homeDescription:string,
    contactTitle:string,
    contactDescription: string,
    aboutTitle:string,
    aboutDescription: string,
    blogsTitle:string,
    blogsDescription: string,
    privacyPolicyTitle:string,
    privacyPolicyDescription: string,
    termsTitle:string,
    termsDescription: string,
}

export interface ISeoSettingsFormGroup{
    homeTitle: FormControl<string | null>,
    homeDescription:FormControl<string | null>,
    contactTitle:FormControl<string | null>,
    contactDescription: FormControl<string | null>,
    aboutTitle:FormControl<string | null>,
    aboutDescription: FormControl<string | null>,
    blogsTitle:FormControl<string | null>,
    blogsDescription: FormControl<string | null>,
    privacyPolicyTitle:FormControl<string | null>,
    privacyPolicyDescription: FormControl<string | null>,
    termsTitle:FormControl<string | null>,
    termsDescription: FormControl<string | null>,
}