import {
  SiReact, SiScala, SiRedis, SiTypescript, SiPython, SiNodedotjs,
  SiIonic, SiPostgresql, SiGo, SiMongodb, SiKubernetes, SiGooglecloud,
  SiAmazonaws, SiHeroku, SiGraphql
} from "react-icons/si"

const Projects = () => {

  const ProjectLangLogo = ({Logo, logoText}) => {
    return <div className="flex py-2 md:py-0 mr-5"><Logo
      className="w-5 h-5 mr-1"
    />{logoText}</div>
  }

  const ProjectTextInput = ({text, input}) => {
    return <>
      <div className="pt-5 pl-5 pb-2 opacity-50">{text}</div>
      <div className="ml-5">{input}</div>
    </>
  }

  const Project = ({
    title, description, platform,
    react, scala, redis, typescript, python, nodejs, reactNative, ionic,
    postgres, golang, mongodb, k8s, gcloud, aws, heroku, graphql}) => {
      return <div className="my-5 bg-blackish h-full rounded-lg">
        <div className="md:p-5 w-full h-full">
          <ProjectTextInput
            text="project"
            input={title} />
          <ProjectTextInput
            text="description"
            input={description} />
          <ProjectTextInput
            text="platform"
            input={platform} />
          <ProjectTextInput
            text="stack"
            input={
              <div className="flex-wrap flex">
                {scala && <ProjectLangLogo Logo={SiScala} logoText="Scala" />}
                {typescript && <ProjectLangLogo Logo={SiTypescript} logoText="TypeScript" />}
                {react && <ProjectLangLogo Logo={SiReact} logoText="React" />}
                {reactNative && <ProjectLangLogo Logo={SiReact} logoText="React Native" />}
                {redis && <ProjectLangLogo Logo={SiRedis} logoText="redis" />}
                {python && <ProjectLangLogo Logo={SiPython} logoText="python" />}
                {nodejs && <ProjectLangLogo Logo={SiNodedotjs} logoText="Nodejs" />}
                {ionic && <ProjectLangLogo Logo={SiIonic} logoText="ionic" />}
                {postgres && <ProjectLangLogo Logo={SiPostgresql} logoText="PostgreSQL" />}
                {golang && <ProjectLangLogo Logo={SiGo} logoText="Go" />}
                {mongodb && <ProjectLangLogo Logo={SiMongodb} logoText="MongoDB" />}
                {graphql && <ProjectLangLogo Logo={SiGraphql} logoText="GraphQL" />}
                {k8s && <ProjectLangLogo Logo={SiKubernetes} logoText="kubernetes" />}
                {gcloud && <ProjectLangLogo Logo={SiGooglecloud} logoText="GCP" />}
                {aws && <ProjectLangLogo Logo={SiAmazonaws} logoText="AWS" />}
                {heroku && <ProjectLangLogo Logo={SiHeroku} logoText="heroku" />}
              </div>
            } />
      </div>
    </div>
  }

  return <div className="px-2 md:px-0 mt-10">
    <span className="text-4xl">Projects</span>
    <Project
      title="carrot"
      description="ecommerce, order fulfillment, rewards and customer support platform"
      platform="mobile/web"
      scala={true}
      react={true}
      typescript={true}
      redis={true}
      ionic={true}
      postgres={true}
      heroku={true}/>
    <Project
      title="metistack"
      description="no code solution that deploys personalized GraphQL API's for the customer on a k8s cluster using CI/CD"
      platform="web"
      redis={true}
      golang={true}
      nodejs={true}
      react={true}
      mongodb={true}
      k8s={true}
      gcloud={true}
      graphql={true}/>
    <Project
      title="blubrd"
      description="cross platform social mobile app"
      platform="mobile"
      redis={true}
      nodejs={true}
      graphql={true}
      reactNative={true}
      mongodb={true}
      aws={true}/>
  </div>
}

export default Projects
