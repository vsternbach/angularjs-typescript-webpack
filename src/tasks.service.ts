import { Injectable } from 'angular-ts-decorators';

export interface ITasklist {
  id: string;
  kind: string;
  selfLink: string;
  title: string;
  updated: string;
}

export interface ITask extends ITasklist {
  etag: string;
  position: string;
  status: string;
  due?: string;
  notes?: string;
  completed?: string;
}

type Partial<T> = {
  [P in keyof T]?: T[P];
  };

export type PartialTask = Partial<ITask>;

export const taskStatus = {
  completed: 'completed',
  needsAction: 'needsAction'
};

interface IGTasksAPI {
  tasks: any;
  tasklists: any;
}
// interface IGTasksEndpoints {
// }

const defaultTasklist = '@default';
@Injectable('TasksService')
export class TasksService {
  public tasklistId: string;

  /*@ngInject*/
  constructor() {
    this.tasklistId = defaultTasklist;
  }

  public static isTaskCompleted(task: ITask) {
    return task.status === taskStatus.completed;
  }

  public async getTasklists(): Promise<ITasklist[]> {
    let response;
    try {
      response = await this.gTasksAPI.tasklists.list();
      return response.result.items;
    } catch (e) {
      console.error(e);
    }
  }

  public async addTasklist(title: string): Promise<ITasklist> {
    let response = await this.gTasksAPI.tasklists.insert({title});
    return response.result;
  }

  public async updateTasklist(tasklist: string, props: PartialTask): Promise<ITasklist> {
    let response = await this.gTasksAPI.tasklists.patch({
      tasklist,
      ...props
    });
    return response.result;
  }

  public async deleteTasklist(tasklist: string): Promise<boolean> {
    await this.gTasksAPI.tasklists.delete({ tasklist });
    if (this.tasklistId === tasklist) {
      this.tasklistId = defaultTasklist;
    }
    return true;
  }

  public async addTask(props: PartialTask): Promise<ITask> {
    let response = await this.gTasksAPI.tasks.insert({ tasklist: this.tasklistId, ...props });
    return response.result;
  }

  public async deleteTask(task: string): Promise<boolean> {
    await this.gTasksAPI.tasks.delete({ tasklist: this.tasklistId, task });
    return true;
  }

  public async getTasks(tasklist: string): Promise<ITask[]> {
    this.tasklistId = tasklist;
    let response = await this.gTasksAPI.tasks.list({ tasklist });
    return response.result.items || [];
  }

  public async updateTask(taskId: string, props: PartialTask) {
    if (props.status === taskStatus.needsAction) {
      props.completed = null;
    }
    let response = await this.gTasksAPI.tasks.patch({
      tasklist: this.tasklistId,
      task: taskId,
      ...props
    });
    return response.result;
  }

  private get gTasksAPI(): IGTasksAPI{
    return gapi.client['tasks'];
  }
}
