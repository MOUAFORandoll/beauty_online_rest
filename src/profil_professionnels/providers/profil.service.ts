// profil.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfilDto, UpdateProfilDto, ProfilResponseDto } from '../dto';
import {
    PROFIL_PRO_MODEL_NAME,
    ProfilProfessionnel,
    ProfilProfessionnelModel,
} from 'src/databases/users/entities';
import { PROFIL_PRO_NOT_FOUND, ProfilProErrors } from '../errors';
import { DATABASE_CONNECTION } from 'src/databases/main.database.connection';
@Injectable()
export class ProfilService {
    constructor(
        @InjectModel(PROFIL_PRO_MODEL_NAME, DATABASE_CONNECTION)
        private readonly profilModel: ProfilProfessionnelModel,
    ) {}

    async create(dto: CreateProfilDto, user_id: string): Promise<ProfilProfessionnel> {
        const profil = new this.profilModel({ ...dto, user_id });
        return profil.save();
    }

    async findById(id: string): Promise<ProfilProfessionnel> {
        const profil = await this.profilModel.aggregate([
            { $match: { _id: id } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'services',
                    localField: 'service_id',
                    foreignField: '_id',
                    as: 'service',
                },
            },
            { $unwind: '$service' },
        ]);

        if (!profil) throw new NotFoundException(ProfilProErrors[PROFIL_PRO_NOT_FOUND]);
        return profil[0];
    }

    async update(id: string, dto: UpdateProfilDto): Promise<ProfilProfessionnel> {
        return this.profilModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.profilModel.findByIdAndDelete(id);
    }
}
