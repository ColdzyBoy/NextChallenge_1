import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import { useRouter } from "next/router";
import fetchOneMovie from "@/lib/fetch-one-movie";
import Head from "next/head";

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params!;
  const book = await fetchOneMovie(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입무비</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입무비" />
          <meta
            property="og:description"
            content="한입 무비에 등록된 영화를 만나보세요"
          />
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  }

  if (!book) return "문제 발생";

  const {
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = book;

  return (
    <>
      <Head>
        <title>한입무비 - {title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} />
        </div>

        <div className={style.info_container}>
          <div>
            <h2>{title}</h2>
            <div>
              {releaseDate} / {genres.join(", ")} / {runtime}분
            </div>
            <div>{company}</div>
          </div>

          <div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.description}>{description}</div>
          </div>
        </div>
      </div>
    </>
  );
}
