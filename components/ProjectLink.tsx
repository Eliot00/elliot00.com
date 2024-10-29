export type ProjectsWallProps = {
  readonly projects: {
    readonly title: string
    readonly description: string
    readonly link: string
    readonly avatar?: string
  }[]
}

export default function ProjectsWall({ projects }: ProjectsWallProps) {
  return (
    <div className="my-2 w-full py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {projects.map((project) => {
        return (
          <a
            className="col-span-1 flex gap-2 items-center cursor-pointer group"
            key={project.title}
            href={project.link}
          >
            <span className="text-4xl w-14 aspect-square flex items-center justify-center rounded-2xl bg-slate-200 text-white transition-transform duration-300 transform group-hover:-translate-y-2">
              {project.title.charAt(0).toUpperCase()}
            </span>
            <span className="flex flex-col">
              <span>{project.title}</span>
              <span className="font-light text-sm">{project.description}</span>
            </span>
          </a>
        )
      })}
    </div>
  )
}
