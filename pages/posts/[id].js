import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

// Next.js automatically passes a context object to
// getStaticProps behind the scenes in a dynamic route page.
// context: {params. preview, previewData}

export async function getStaticProps({ params }) {
  // In here we destructuring the context object.

  const postData = await getPostData(params.id);
  console.log(params.id);

  return {
    props: {
      postData,
    },
  };
}

// Next.js uses the return value of getStaticPaths to determine the paths 
// that need to be pre-rendered at build time.
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

