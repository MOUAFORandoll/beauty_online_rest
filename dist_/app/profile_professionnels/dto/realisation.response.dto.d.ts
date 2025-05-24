import { Realisation, RealisationFileModel } from 'src/databases/main.database.connection';
export declare class RealisationResponseDto {
    id: string;
    title: string;
    price: string;
    profile_professionnel_id: string;
    realisation_files: {
        id: string;
        file_path: string;
    }[];
    static fromRealisation(realisation: Realisation, realisationFileModel: RealisationFileModel): Promise<RealisationResponseDto>;
}
