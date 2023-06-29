import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

// Next.js automatically passes a context object to
// getStaticProps behind the scenes in a dynamic route page.
// context: {params. preview, previewData}

export async function getStaticProps({ params }) {
  // In here we destructuring the context object.

  const postData = getPostData(params.id);
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
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}

