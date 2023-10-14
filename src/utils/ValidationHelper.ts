import { ServerValidationErrors } from "@/types/validation";

export function getServerValidationErrors(formErrors:Array<[]> , field:string) {
    const errorsArray = formErrors.find((e) => e.field === field);
    if (errorsArray?.field) {
        return errorsArray.errors[0];
    }
    return "";
}
