import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AccessLogModel, AccessLogDocument } from '@models/access-log.model';
import { CitizenModel, CitizenDocument } from '@models/citizen.model';
import { PlaceModel, PlaceDocument } from '@models/place.model';
import { RoleModel } from '@models/role.model';

import { CheckAuthDto } from '@apono/dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(PlaceModel.name) private placeModel: Model<PlaceDocument>,
    @InjectModel(CitizenModel.name) private citizenModel: Model<CitizenDocument>,
    @InjectModel(AccessLogModel.name) private accessLogModel: Model<AccessLogDocument>
  ) {}

  /**
   * Checks if a given citizen is allowed to enter a specific place
   * Logs the access attempt regardless of the result
   */
  async checkAuth({ citizen: citizenName, place: placeName }: CheckAuthDto): Promise<'allowed' | 'denied'> {
    // Find the citizen by name and populate their roles
    const citizen: CitizenDocument | undefined = (await this.citizenModel
        .findOne({ name: citizenName })
        .populate('roles')
        .exec()
    )?.toObject();
    if (!citizen) throw new Error('Citizen not found');

    // Find the place by name and populate allowed roles
    const place: PlaceDocument | undefined = (await this.placeModel
        .findOne({ name: placeName })
        .populate('rolesAllowed')
        .exec()
    )?.toObject();
    if (!place) throw new Error('Place not found');

    // Check if the citizen has an allowed role
    const { status, role } = this.checkRoleAccess({ citizen, rolesAllowed: place.rolesAllowed });

    // Log the access attempt in the database
    await this.accessLogModel.insertOne({
      citizen: citizen.name,
      role,
      place: place.name,
      result: status
    })

    return status;
  }

  /**
   * Checks if the citizen has one of the allowed roles (or a matching sub-role)
   */
  checkRoleAccess({ citizen, rolesAllowed }: { citizen: CitizenDocument, rolesAllowed: RoleModel[] }): { role: string, status: 'allowed' | 'denied' } {
    for (const role of citizen.roles) {
      // Check for direct match
      if (rolesAllowed.some(r => r.name === role.name)) {
        return { role: role.name, status: 'allowed' };
      }

      // Check if any of the role's subRoles are allowed
      const subRole = role.subRoles
        .find(subRole => rolesAllowed
          .some(r => r.name === subRole)
        );
      if (subRole) {
        return { role: subRole, status: 'allowed' };
      }
    }

    // If no role matches, deny access and fallback to the first citizen role name (if exists)
    return { role: citizen.roles[0]?.name ?? '', status: 'denied' };
  }
}