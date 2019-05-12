import { Repository } from '../../dao/Repository'
import { ProjectInterface } from './ProjectInterface'

const ProjectSchema = {
  title: {
    type: String,
    required: true
  },
  describe: {
    type: String,
    required: true
  },
  term: {
    type: Date,
    required: true
  },
  enable: {
    type: Boolean,
    required: true,
    default: true
  }
}

const methods = {
  novoMetodo (): void {
    // teste
  }
}

export default new Repository<ProjectInterface>('Project', ProjectSchema, { timestamps: true }, methods).getModel()
