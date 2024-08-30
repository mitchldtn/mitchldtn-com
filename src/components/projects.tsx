import React from 'react'
import { IconType } from 'react-icons'
import {
  SiReact, SiScala, SiRedis, SiTypescript, SiPython, SiNodedotjs,
  SiIonic, SiPostgresql, SiGo, SiMongodb, SiKubernetes, SiGooglecloud,
  SiHeroku, SiGraphql, SiDocker, SiOpenai,
} from "react-icons/si"
import { FaAws } from 'react-icons/fa'

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
    text: string
    input: React.ReactNode
  }

  const ProjectTextInput: React.FC<ProjectTextInputProps> = ({text, input}) => {
    return <>
      <div className="pt-4 pl-5 pb-2 opacity-50">{text}</div>
      <div className="ml-5 mb-2">{input}</div>
    </>
  }

  interface ProjectProps {
    title: string
    description: string
    platform: string
    current?: boolean
    react?: boolean
    scala?: boolean
    redis?: boolean
    typescript?: boolean
    python?: boolean
    nodejs?: boolean
    reactNative?: boolean
    ionic?: boolean
    postgres?: boolean
    golang?: boolean
    mongodb?: boolean
    k8s?: boolean
    gcloud?: boolean
    aws?: boolean
    heroku?: boolean
    graphql?: boolean
    docker?: boolean
    openai?: boolean
  }

  const Company: React.FC<ProjectProps> = props => {
    return <div className={`my-5 ${props.current && "border-2 border-greyish"} bg-blackish h-full rounded-lg`}>
      <div className="p-2 w-full h-full">
        <ProjectTextInput
          text={`${props.current ? "current" : ""} company`}
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
            <div className="flex-wrap flex gap-y-2">
              {props.scala && <ProjectLangLogo Logo={SiScala} logoText="Scala" />}
              {props.typescript && <ProjectLangLogo Logo={SiTypescript} logoText="TypeScript" />}
              {props.react && <ProjectLangLogo Logo={SiReact} logoText="React" />}
              {props.openai && <ProjectLangLogo Logo={SiOpenai} logoText="OpenAI" />}
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
              {props.aws && <ProjectLangLogo Logo={FaAws} logoText="AWS" />}
              {props.heroku && <ProjectLangLogo Logo={SiHeroku} logoText="heroku" />}
            </div>
          } />
    </div>
  </div>
  }

  return <>
    <div className="px-2 mt-10">
      <span className="text-4xl">Recent Professional Experience</span>
      <Company
        title="chatmeter"
        description="AI-driven platform for managing and optimizing online reputation and local SEO for multi-location businesses"
        platform="mobile/web"
        current={true}
        scala={true}
        react={true}
        typescript={true}
        python={true}
        nodejs={true}
        k8s={true}
        mongodb={true}
        reactNative={true}
        redis={true}
        aws={true}
        openai={true}/>
      <Company
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
    </div>
  </>
}

export default Projects
