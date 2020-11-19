export type TaskAttributes = {
  id?: number,
  title: string,
  description: string,
  email?: string,
  author?: string,
  completionDate: Date,
  statuses?: {
    id: number,
    name: string,
  }
}