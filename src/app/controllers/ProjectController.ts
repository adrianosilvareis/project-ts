import Project from '../models/Project'
import CRUD from './CRUD'
import { ProjectInterface } from '../models/Project/ProjectInterface'

class ProjectController extends CRUD<ProjectInterface> {
  public constructor () {
    super(Project)
  }
}

export default new ProjectController()
