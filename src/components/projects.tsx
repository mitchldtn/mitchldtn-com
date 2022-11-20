import React from 'react'
import { IconType } from 'react-icons'
import {
  SiReact, SiScala, SiRedis, SiTypescript, SiPython, SiNodedotjs,
  SiIonic, SiPostgresql, SiGo, SiMongodb, SiKubernetes, SiGooglecloud,
  SiAmazonaws, SiHeroku, SiGraphql, SiDocker
} from "react-icons/si"

const Projects = () => {

  interface ProjectLangLogoProps {
    Logo: IconType,
    logoText: string
  }

  const ProjectLangLogo: React.FC<ProjectLangLogoProps> = ({Logo, logoText}) => {
    return <div className="flex py-2 md:py-0 mr-5"><Logo
      className="w-5 h-5 mr-1"
    />{logoText}</div>
  }

  interface ProjectTextInputProps {
    text: string,
    input: React.ReactNode
  }

  const ProjectTextInput: React.FC<ProjectTextInputProps> = ({text, input}) => {
    return <>
      <div className="pt-5 pl-5 pb-2 opacity-50">{text}</div>
      <div className="ml-5">{input}</div>
    </>
  }

  interface ProjectProps {
    title: string,
    description: string,
    platform: string,
    react?: boolean,
    scala?: boolean,
    redis?: boolean,
    typescript?: boolean,
    python?: boolean,
    nodejs?: boolean,
    reactNative?: boolean,
    ionic?: boolean,
    postgres?: boolean,
    golang?: boolean,
    mongodb?: boolean,
    k8s?: boolean,
    gcloud?: boolean,
    aws?: boolean,
    heroku?: boolean,
    graphql?: boolean,
    docker?: boolean,
  }

  const Project: React.FC<ProjectProps> = props => {
      return <div className="my-5 bg-blackish h-full rounded-lg">
        <div className="p-2 w-full h-full">
          <ProjectTextInput
            text="project"
            input={props.title} />
          <ProjectTextInput
            text="description"
            input={props.description} />
          <ProjectTextInput
            text="platform"
            input={props.platform} />
          <ProjectTextInput
            text="stack"
            input={
              <div className="flex-wrap flex">
                {props.scala && <ProjectLangLogo Logo={SiScala} logoText="Scala" />}
                {props.typescript && <ProjectLangLogo Logo={SiTypescript} logoText="TypeScript" />}
                {props.react && <ProjectLangLogo Logo={SiReact} logoText="React" />}
                {props.reactNative && <ProjectLangLogo Logo={SiReact} logoText="React Native" />}
                {props.redis && <ProjectLangLogo Logo={SiRedis} logoText="redis" />}
                {props.python && <ProjectLangLogo Logo={SiPython} logoText="python" />}
                {props.nodejs && <ProjectLangLogo Logo={SiNodedotjs} logoText="Nodejs" />}
                {props.ionic && <ProjectLangLogo Logo={SiIonic} logoText="ionic" />}
                {props.postgres && <ProjectLangLogo Logo={SiPostgresql} logoText="PostgreSQL" />}
                {props.golang && <ProjectLangLogo Logo={SiGo} logoText="Go" />}
                {props.mongodb && <ProjectLangLogo Logo={SiMongodb} logoText="MongoDB" />}
                {props.graphql && <ProjectLangLogo Logo={SiGraphql} logoText="GraphQL" />}
                {props.docker && <ProjectLangLogo Logo={SiDocker} logoText="docker" />}
                {props.k8s && <ProjectLangLogo Logo={SiKubernetes} logoText="kubernetes" />}
                {props.gcloud && <ProjectLangLogo Logo={SiGooglecloud} logoText="GCP" />}
                {props.aws && <ProjectLangLogo Logo={SiAmazonaws} logoText="AWS" />}
                {props.heroku && <ProjectLangLogo Logo={SiHeroku} logoText="heroku" />}
              </div>
            } />
      </div>
    </div>
  }

  return <div className="px-2 mt-10">
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
      docker={true}
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
      docker={true}
      k8s={true}
      aws={true}/>
  </div>
}

export default Projects
