import Layout from './layout';
import Head from 'next/head';
import React from 'react';
import Date from './date';
import utilStyles from '../styles/utils.module.css';
// import { GetStaticProps, GetStaticPaths } from 'next';
import { Content, TemplateType } from '../lib/enums';
import { useSelector } from 'react-redux';
import { RootState } from "../data/store";

function renderParagraph(paragraph: string) {
  return (
    <p className="mb-4 text-base text-neutral-600">
      {paragraph}
    </p>
  )
}

export default function Preview() {
    const contents: Content[] = useSelector((state: RootState) => state.content.savedContent);
    console.log("In preview: ", contents);
    const currentContent = contents[0]

    if (!currentContent) {
        return (
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
            </div>
          </div>
        );
    }
    const type = currentContent.template_type;
    console.log("Preview: ", currentContent.text);
    if (type == TemplateType.Template_1) {
        return (
          <div
            className="mt-5 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <h5
              className="text-center mb-2 text-xl font-medium leading-tight text-neutral-800 ">
              {currentContent.title}
            </h5>
            {
              currentContent.text.split('\n\n').map(renderParagraph)
            }
          </div>
          )
    }
    else if (type == TemplateType.Template_2) {
        return (
            <div
            className="mt-5 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
              {
                currentContent.text.split('\n\n').map(renderParagraph)
              }
          </div>
          )
    }
    else if (type == TemplateType.Template_3) {
        return (
          <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
            <div className="-m-1 flex flex-wrap md:-m-2">
              <div className="flex w-full flex-wrap">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center"
                    src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
    else if (type == TemplateType.Template_4) {
        return (
          <div className="container mx-auto px-5 py-2 lg:px-5 lg:pt-10">
            <div className="-m-1 flex flex-wrap md:-m-2">
              <div className="flex w-1/2 flex-wrap">
                <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                  <h5 className="text-center mb-2 text-xl font-medium leading-tight text-neutral-800 ">
                    {currentContent.title}
                  </h5>
                  {currentContent.text.split("\n\n").map(renderParagraph)}
                </div>
              </div>
              <div className="flex w-1/2 flex-wrap">
                <div className="w-full p-1 md:p-2 flex justify-center items-center">
                  <img
                    alt="gallery"
                    className="block rounded-sm object-cover object-center"
                    src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
    else {
        return (
            <Layout>
              <Head>
                <title>{currentContent.title}</title>
              </Head>
              <article>
                <h1 className={utilStyles.headingXl}>{currentContent.title}</h1>
                <div className={utilStyles.lightText}>
                  <Date dateString={currentContent.text} />
                </div>
              </article>
            </Layout>
          )
    }
}