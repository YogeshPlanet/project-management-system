import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise, Projects } from '@prisma/client';
import { count } from 'console';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private readonly prismaService:PrismaService) {}


   async createProject(data: Prisma.ProjectsCreateInput): Promise<Projects> {
        return this.prismaService.projects.create({
            data,
        });
    }

    
    async getAllProject(): Promise<Projects[]> {
        return this.prismaService.projects.findMany();
      }

    
    
    async updateStatus(params: {
        where: Prisma.ProjectsWhereUniqueInput;
        data: Prisma.ProjectsUpdateInput;
    }): Promise<Projects> {
        const {where, data} = params;
        return this.prismaService.projects.update({
            where,
            data
        })
    }

    async countTotalProjects(status?: string): Promise<PrismaPromise<number>> {
      const whereClause = status ? { status } : {};
      return this.prismaService.projects.count({
        where: whereClause,
      });
    }
    
    
    async getTotalProjectsCount(): Promise<number> {
      return await this.prismaService.projects.count();
    }


      // running record it date is less than todays date 
      async runningDelayProjectsCount(): Promise<number> {
        const currentDate = new Date();
        const count = await this.prismaService.projects.count({
          where: {
            status: 'running',
            end_date_as_per_project_plan: {
              lt: currentDate,
            },
          },
        });
        console.log(count);
        return count;
      }



    //   for chart service use 

    async chartTotalProjects(): Promise<number> {
        return await this.prismaService.projects.count();
      }
    
      async getChartData(): Promise<{closedProjectsCount: { department: string, closedCount: number, totalCount: number }[] }> {
        const allProjectsCount = await this.prismaService.projects.count();
        const closedProjectsByDepartment = await this.prismaService.projects.groupBy({
          by: ['department'],
          _count: true,
          where: {
            status: 'closed',
          },
        });
    
        const closedProjectsCount = await Promise.all(closedProjectsByDepartment.map(async (item: any) => {
          const department = item.department;
          const closedCount = item._count;
          const totalCount = await this.prismaService.projects.count({
            where: {
              department,
            },
          });
    
          return { department, closedCount, totalCount };
        }));
    
        return { closedProjectsCount };
      }

      
    
}
