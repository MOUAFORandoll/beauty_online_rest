export declare class CreateRealisationDto {
    title: string;
    price: string;
    files?: Express.Multer.File[];
}
export declare class CreateRealisationVideoDto {
    title: string;
    price: string;
    file?: Express.Multer.File;
}
export declare class UpdateRealisationDto {
    title?: string;
    image_path?: string;
}
export declare class FindRealisationDto {
    title?: string;
    namePro: string;
}
