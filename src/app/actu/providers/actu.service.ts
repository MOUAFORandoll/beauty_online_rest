// realisation.service.ts
import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    DATABASE_CONNECTION,
   
    Realisation,
    REALISATION_MODEL_NAME,
    RealisationModel,
    RealisationFileModel, 
    REALISATION_FILE_MODEL_NAME,
} from 'src/databases/main.database.connection';
import { PaginationPayloadDto } from 'src/common/apiutils'; 
@Injectable()
export class ActuService {
  constructor(
    @InjectModel(REALISATION_MODEL_NAME, DATABASE_CONNECTION)
    private readonly realisationModel: RealisationModel,

    @InjectModel(REALISATION_FILE_MODEL_NAME, DATABASE_CONNECTION)
    private readonly realisationFileModel: RealisationFileModel,

       
  ) { }

  /**
   * Find all realisations
   * @param pagination Pagination options
   * @returns Paginated realisations with their files
   */
  async findAll(
    pagination: PaginationPayloadDto,
  ): Promise<{ data: Realisation[]; total: number }> {
   
    const [data, total] = await Promise.all([
      this.realisationModel
        .find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .skip((pagination.page - 1) * pagination.size)
        .limit(pagination.size)
        .exec(),
      this.realisationModel.countDocuments().exec(),
    ]);

    return { data, total };
  }
}
