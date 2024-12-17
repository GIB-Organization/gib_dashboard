import { Validators } from "@angular/forms";

export const VALIDATORS = {
    email: Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    phone: Validators.pattern(/^(05)([0-9]{8})$/),
    password: Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[\w\W]{8,16}$/), 
    noSpaces: Validators.pattern(/^\S+$/), 
}