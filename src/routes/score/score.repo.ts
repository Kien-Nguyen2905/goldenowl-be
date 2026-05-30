import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class ScoreRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findBySbd(sbd: string) {
    return await this.prisma.exam_results.findUnique({
      where: { sbd },
    });
  }
}
