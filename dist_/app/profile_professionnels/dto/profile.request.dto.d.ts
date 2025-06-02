export declare class CreateProfileDto {
    namePro: string;
    service: string;
    description: string;
    longitude: string;
    latitude: string;
    titleEmplacement: string;
    cover?: Express.Multer.File;
}
export declare class UpdateProfileDto {
    name_pro: string;
    description: string;
}
export declare class FindByServiceDto {
    service: string;
    namePro: string;
    description: string;
}
