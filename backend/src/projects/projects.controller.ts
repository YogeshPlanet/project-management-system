import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Projects } from '@prisma/client';
import { count } from 'console';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('create')
  async addProject(
    @Body()
    userData: {
      projectName: string;
      reasons: string;
      type: string;
      division: string;
      category: string;
      priority: string;
      department: string;
      start_date_as_per_project_plan: string;
      end_date_as_per_project_plan: string;
      location: string;
      status: string;
    },
  ): Promise<Projects> {
    return this.projectService.createProject(userData);
  }

  @Get('allrecord')
  async getAllrecord(): Promise<Projects[]> {
    return this.projectService.getAllProject();
  }


// for update the status

  @Put('status/:id')
  async editStatus(
    @Param('id') id: Number,
    @Body()
    data: {
      projectName: string;
      reasons: string;
      type: string;
      division: string;
      category: string;
      priority: string;
      department: string;
      start_date_as_per_project_plan: string;
      end_date_as_per_project_plan: string;
      location: string;
      status: string;
    },
  ): Promise<Projects> {
    const {
      projectName,
      reasons,
      type,
      division,
      category,
      priority,
      department,
      start_date_as_per_project_plan,
      end_date_as_per_project_plan,
      location,
      status,
    } = data;
    return this.projectService.updateStatus({
      where: { id: Number(id) },
      data: {
        projectName,
        reasons,
        type,
        division,
        category,
        priority,
        department,
        start_date_as_per_project_plan,
        end_date_as_per_project_plan,
        location,
        status,
      },
    });
  }


  // for counting the projects status

  // @Get('total-project')
  // async totalProject(@Query('status') status?: string) : Promise<{ total: number }[]> {
  //   const total  = await this.projectService.allProjectCount(status);

  //   return [{ total }];
  // }

  @Get('all-counts')
  async allProjectCount(): Promise<{total:number; closed: number; running: number; cancelled: number;delayRunning:number }> {
    const total  = await this.projectService.getTotalProjectsCount();
    const closed = await this.projectService.countTotalProjects('Closed');
    const running = await this.projectService.countTotalProjects('running');
    const cancelled = await this.projectService.countTotalProjects('cancelled');
    const delayRunning = await this.projectService.runningDelayProjectsCount();

    return {total, closed, running, cancelled,delayRunning };
  }

  // running where date is less than today's date
  // @Get('closure-delay') 
  // async closureDelayRecord():Promise<number> {
  //   const delayRunning = await this.projectService.runningDelayProjectsCount();
    
  //   return delayRunning;
    
  // }

  // for chart

  @Get('chart-data')
  async countAllProjectsAndClosedProjects(): Promise<{closedProjectsCount: { department: string, closedCount: number, totalCount: number }[] }> {
    const chartData = await this.projectService.getChartData();
    return chartData;
  }

  

 
}
