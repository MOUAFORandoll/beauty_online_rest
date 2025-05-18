import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSchema } from '../../base.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { applySortedMongooseAdditionalFunctions } from '../../base.functions';
import { USER_MODEL_NAME } from 'src/databases/users/entities';
import { REALISATION_MODEL_NAME } from './realisations.schema';
import { CRENEAU_MODEL_NAME } from './creneaux.schema';

export enum StatusRendezVous {
    ATTENTE = 'EN ATTENTE',
    ACCEPTER = 'ACCEPTE',
    REFUSER = 'REFUSE',
}

// RENDEZ_VOUS
export const RENDEZ_VOUS_MODEL_NAME = 'rendez_vous';
@Schema({ collection: RENDEZ_VOUS_MODEL_NAME })
class RendezVousSchema extends BaseSchema {
    @Prop({ type: String, enum: StatusRendezVous })
    status: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
    user_id: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
    realisation_id: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: CRENEAU_MODEL_NAME })
    creneau_id: string;
}

export type RendezVous = RendezVousSchema & Document;
export type RendezVousModel = Model<RendezVousSchema>;
export const RendezVoussSchema = applySortedMongooseAdditionalFunctions(
    SchemaFactory.createForClass(RendezVousSchema),
);
// async findPrestataireRendezVous(
//         user_id: string,
//         pagination: PaginationPayloadDto,
//     ): Promise<{ data: RendezVous[]; total: number }> {
//         try {
//             const profile = this.profileService.findUserProfile(user_id);

//             // 1. Find Agendas linked to the professional profile
//             const agendas = await this.agendaModel
//                 .find({ profile_professionnel_id: profile._id }, '_id') // Select only the IDs
//                 .exec();

//             if (!agendas || agendas.length === 0) {
//                 return { data: [], total: 0 }; // No agendas found for this profile
//             }

//             const agendaIds = agendas.map((a) => a._id);

//             // 2. Find RendezVous linked to these Agendas
//             const query = { agenda_id: { $in: agendaIds } };

//             const [rawRendezVous, total] = await Promise.all([
//                 this.rendezVousModel
//                     .find(query)
//                     .sort({ timeOfArrival: 1 }) // Optional: sort by arrival time
//                     .skip((pagination.page - 1) * pagination.size)
//                     .limit(pagination.size)
//                     .exec(),
//                 this.rendezVousModel.countDocuments(query).exec(),
//             ]);

//             // 3. Map raw data to DTOs

//             return { data: rawRendezVous, total: total };
//         } catch (error) {
//             console.error(
//                 Error finding prestataire rendez-vous for profile ${profile_professionnel_id}:,
//                 error,
//             );
//             // Depending on requirements, you might want to throw or return an empty result
//             throw new Error(Failed to find prestataire rendez-vous: ${error.message});
//         }
//     }


// corrige


// class RendezVousSchema extends BaseSchema {
//     @Prop({ type: String, enum: StatusRendezVous })
//     status: string;

//     @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_MODEL_NAME })
//     user_id: string;

//     @Prop({ type: MongooseSchema.Types.ObjectId, ref: REALISATION_MODEL_NAME })
//     realisation_id: string;

//     @Prop({ type: MongooseSchema.Types.ObjectId, ref: CRENEAU_MODEL_NAME })
//     creneau_id: string;
// }



// dans rdv on a creneau_id, dans crenau on a agenda_id , dans agenda on a professionnel_id